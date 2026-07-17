import { createHash, timingSafeEqual } from "node:crypto";

type ConsumerKeyHashes = Record<string, string>;

export type ApiAuthResult =
  | { ok: true; consumerId: string }
  | { ok: false; status: 401 | 500; error: string };

function bearerToken(request: Request): string | null {
  const authorization = request.headers.get("authorization");
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

export function hashApiKey(apiKey: string): string {
  return createHash("sha256").update(apiKey).digest("hex");
}

function hashesMatch(actualHex: string, expectedHex: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(expectedHex)) return false;

  const actual = Buffer.from(actualHex, "hex");
  const expected = Buffer.from(expectedHex, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function authenticateConsumerToken(
  token: string | null,
  serializedHashes: string | undefined
): ApiAuthResult {
  if (!serializedHashes) {
    return {
      ok: false,
      status: 500,
      error: "API consumer authentication is not configured.",
    };
  }

  let consumers: ConsumerKeyHashes;
  try {
    consumers = JSON.parse(serializedHashes) as ConsumerKeyHashes;
  } catch {
    return {
      ok: false,
      status: 500,
      error: "API consumer authentication is misconfigured.",
    };
  }

  if (
    !consumers ||
    typeof consumers !== "object" ||
    Array.isArray(consumers)
  ) {
    return {
      ok: false,
      status: 500,
      error: "API consumer authentication is misconfigured.",
    };
  }

  if (!token) {
    return { ok: false, status: 401, error: "Missing API key." };
  }

  const tokenHash = hashApiKey(token);
  for (const [consumerId, expectedHash] of Object.entries(consumers)) {
    if (hashesMatch(tokenHash, expectedHash)) {
      return { ok: true, consumerId };
    }
  }

  return { ok: false, status: 401, error: "Invalid API key." };
}

export function authenticateConsumer(request: Request): ApiAuthResult {
  return authenticateConsumerToken(
    bearerToken(request),
    process.env.API_CONSUMER_KEY_HASHES
  );
}

export function authenticateAdmin(request: Request): ApiAuthResult {
  const adminHash = process.env.METERING_ADMIN_KEY_HASH;
  const serializedHashes = adminHash
    ? JSON.stringify({ admin: adminHash })
    : undefined;

  return authenticateConsumerToken(bearerToken(request), serializedHashes);
}
