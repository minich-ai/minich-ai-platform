"use client";

import { FormEvent, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];

    setMessages(nextMessages);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = (await response.json()) as {
        content?: string;
        skillId?: string;
        skillTitle?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong.");
      }

      if (!data.content) {
        throw new Error("No response received.");
      }

      const assistantContent = data.content;

      if (data.skillTitle) {
        setActiveSkill(data.skillTitle);
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: assistantContent },
      ]);
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Failed to send message.";
      setError(message);
      setMessages((current) => current.slice(0, -1));
      setInput(trimmed);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="app">
      <header className="header">
        <p className="eyebrow">Minich AI Platform</p>
        <h1>CS1 Tutor</h1>
        <p>
          Ask a programming question. The agent selects the best Skill for your
          topic — Unit 1 (shapes and variables) or Unit 2 (conditionals).
        </p>
      </header>

      <section className="chat" aria-live="polite">
        {messages.length === 0 && !isLoading ? (
          <div className="empty-state">
            Try: &ldquo;I&apos;m confused why my rectangle doesn&apos;t
            appear.&rdquo; or &ldquo;What&apos;s the difference between = and
            ==?&rdquo;
          </div>
        ) : (
          <div className="messages">
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`message ${message.role}`}
              >
                <span className="message-role">
                  {message.role === "user" ? "You" : "Tutor"}
                </span>
                {message.content}
              </article>
            ))}
            {isLoading ? <div className="typing">Thinking…</div> : null}
          </div>
        )}

        {error ? <div className="error">{error}</div> : null}
      </section>

      <form className="composer" onSubmit={handleSubmit}>
        <div className="composer-inner">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a CS1 programming question…"
            disabled={isLoading}
            aria-label="Your question"
          />
          <div className="composer-actions">
            <p className="hint">
              {activeSkill
                ? `Skill: ${activeSkill}`
                : "Agent selects the best Skill for your question"}
            </p>
            <button type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? "Sending…" : "Send"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
