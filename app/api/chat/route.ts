import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { authenticateConsumer } from "@/lib/api-auth";
import {
  enforceRateLimit,
  recordUsage,
  type UsageDelta,
} from "@/lib/metering";
import { resolveOpenAIModel } from "@/lib/openai";
import { buildUnit1SystemPrompt } from "@/lib/systemPrompt";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

function latestUserMessage(messages: ChatMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i].role === "user") {
      return messages[i].content;
    }
  }

  return "";
}

function rateLimitHeaders(result: {
  limit: number;
  remaining: number;
  reset: number;
}): HeadersInit {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.reset),
  };
}

async function recordUsageSafely(
  consumerId: string,
  delta: UsageDelta
): Promise<void> {
  try {
    await recordUsage(consumerId, delta);
  } catch (error) {
    console.error("Usage metering error:", error);
  }
}

export async function POST(request: NextRequest) {
  const auth = authenticateConsumer(request);
  if (!auth.ok) {
    if (auth.status === 500) {
      console.error(auth.error);
    }
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "OPENAI_API_KEY is not configured. Copy .env.example to .env.local and add your key.",
      },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = body.messages;

  if (!messages?.length || messages.at(-1)?.role !== "user") {
    return NextResponse.json(
      { error: "Request must include at least one user message." },
      { status: 400 }
    );
  }

  let rateLimit;
  try {
    rateLimit = await enforceRateLimit(auth.consumerId);
  } catch (error) {
    console.error("Rate limiter error:", error);
    return NextResponse.json(
      { error: "Usage controls are temporarily unavailable." },
      { status: 503 }
    );
  }

  const headers = rateLimitHeaders(rateLimit);
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Try again after the reset time." },
      { status: 429, headers }
    );
  }

  try {
    await recordUsage(auth.consumerId, { requests: 1 });
  } catch (error) {
    console.error("Usage metering error:", error);
    return NextResponse.json(
      { error: "Usage controls are temporarily unavailable." },
      { status: 503, headers }
    );
  }

  try {
    const userMessage = latestUserMessage(messages);
    const systemPrompt = await buildUnit1SystemPrompt(userMessage);
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: resolveOpenAIModel(),
      messages: [{ role: "system", content: systemPrompt }, ...messages],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      await recordUsageSafely(auth.consumerId, { failures: 1 });
      return NextResponse.json(
        { error: "No response received from the model." },
        { status: 502, headers }
      );
    }

    await recordUsageSafely(auth.consumerId, {
      successes: 1,
      promptTokens: completion.usage?.prompt_tokens ?? 0,
      completionTokens: completion.usage?.completion_tokens ?? 0,
      totalTokens: completion.usage?.total_tokens ?? 0,
    });

    return NextResponse.json(
      {
        content,
        skillId: "cs1-unit1",
        skillTitle: "CMU CS Academy CS1 Unit 1 Tutor",
      },
      { headers }
    );
  } catch (error) {
    console.error("Chat API error:", error);
    await recordUsageSafely(auth.consumerId, { failures: 1 });

    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          {
            error:
              "OpenAI quota exceeded. Add billing or credits at platform.openai.com, then try again.",
          },
          { status: 429, headers }
        );
      }

      if (error.status === 401) {
        return NextResponse.json(
          {
            error:
              "Invalid OpenAI API key. Check OPENAI_API_KEY in .env.local.",
          },
          { status: 500, headers }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to generate a tutoring response." },
      { status: 500, headers }
    );
  }
}
