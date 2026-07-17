import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const DEFAULT_RATE_LIMIT = 20;
const USAGE_RETENTION_SECONDS = 60 * 60 * 24 * 400;

let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

export type UsageDelta = Partial<{
  requests: number;
  successes: number;
  failures: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}>;

export type UsageSummary = {
  requests: number;
  successes: number;
  failures: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

function redisCredentials(): { url: string; token: string } {
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("Upstash Redis is not configured.");
  }

  return { url, token };
}

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis(redisCredentials());
  }
  return redis;
}

function configuredRateLimit(): number {
  const parsed = Number.parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE ?? "", 10);
  return Number.isSafeInteger(parsed) && parsed > 0
    ? parsed
    : DEFAULT_RATE_LIMIT;
}

function getRateLimiter(): Ratelimit {
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(configuredRateLimit(), "1 m"),
      prefix: "ratelimit:chat",
    });
  }
  return ratelimit;
}

export function usageMonth(date = new Date()): string {
  return date.toISOString().slice(0, 7);
}

function usageKey(consumerId: string, month: string): string {
  return `usage:${month}:${consumerId}`;
}

export async function enforceRateLimit(consumerId: string) {
  return getRateLimiter().limit(consumerId);
}

export async function recordUsage(
  consumerId: string,
  delta: UsageDelta,
  month = usageMonth()
): Promise<void> {
  const key = usageKey(consumerId, month);
  const pipeline = getRedis().pipeline();

  for (const [field, value] of Object.entries(delta)) {
    if (value) {
      pipeline.hincrby(key, field, value);
    }
  }

  pipeline.expire(key, USAGE_RETENTION_SECONDS);
  await pipeline.exec();
}

function numericField(
  usage: Record<string, unknown> | null,
  field: keyof UsageSummary
): number {
  const value = usage?.[field];
  const parsed = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function readUsage(
  consumerId: string,
  month: string
): Promise<UsageSummary> {
  const usage = await getRedis().hgetall<Record<string, unknown>>(
    usageKey(consumerId, month)
  );

  return {
    requests: numericField(usage, "requests"),
    successes: numericField(usage, "successes"),
    failures: numericField(usage, "failures"),
    promptTokens: numericField(usage, "promptTokens"),
    completionTokens: numericField(usage, "completionTokens"),
    totalTokens: numericField(usage, "totalTokens"),
  };
}
