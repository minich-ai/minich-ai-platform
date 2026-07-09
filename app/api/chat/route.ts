import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { loadCs1Unit1Skill } from "@/lib/skill";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured. Copy .env.example to .env.local and add your key." },
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

  try {
    const skill = await loadCs1Unit1Skill();
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [{ role: "system", content: skill }, ...messages],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "No response received from the model." },
        { status: 502 }
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Chat API error:", error);

    if (error instanceof OpenAI.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          {
            error:
              "OpenAI quota exceeded. Add billing or credits at platform.openai.com, then try again.",
          },
          { status: 429 }
        );
      }

      if (error.status === 401) {
        return NextResponse.json(
          { error: "Invalid OpenAI API key. Check OPENAI_API_KEY in .env.local." },
          { status: 401 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to generate a tutoring response." },
      { status: 500 }
    );
  }
}
