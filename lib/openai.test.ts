import test from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_OPENAI_MODEL, resolveOpenAIModel } from "./openai.ts";

test("DEFAULT_OPENAI_MODEL is gpt-5.4", () => {
  assert.equal(DEFAULT_OPENAI_MODEL, "gpt-5.4");
});

test("resolveOpenAIModel uses env override when set", () => {
  const previous = process.env.OPENAI_MODEL;
  process.env.OPENAI_MODEL = "gpt-5.5";
  try {
    assert.equal(resolveOpenAIModel(), "gpt-5.5");
  } finally {
    if (previous === undefined) {
      delete process.env.OPENAI_MODEL;
    } else {
      process.env.OPENAI_MODEL = previous;
    }
  }
});

test("resolveOpenAIModel falls back to default", () => {
  const previous = process.env.OPENAI_MODEL;
  delete process.env.OPENAI_MODEL;
  try {
    assert.equal(resolveOpenAIModel(), "gpt-5.4");
  } finally {
    if (previous !== undefined) {
      process.env.OPENAI_MODEL = previous;
    }
  }
});
