import test from "node:test";
import assert from "node:assert/strict";
import { CMU_UNIT1_TUTOR_PROMPT } from "./prompts/cmuUnit1TutorPrompt.ts";
import {
  formatKnowledgeNotes,
  retrieveKnowledge,
  scoreKnowledgeChunk,
  splitKnowledgeIntoChunks,
} from "./knowledge.ts";
import { loadSkill } from "./skill.ts";

test("splitKnowledgeIntoChunks extracts section headings", () => {
  const chunks = splitKnowledgeIntoChunks(
    "sample.md",
    `# Title

## Rect

Use Rect(left, top, width, height).

## Fill

Use fill='orange'.
`
  );

  assert.equal(chunks.length, 2);
  assert.equal(chunks[0].heading, "Rect");
  assert.match(chunks[0].content, /Rect\(left, top, width, height\)/);
});

test("scoreKnowledgeChunk boosts turtle queries toward non-CMU library section", () => {
  const turtleChunk = {
    sourceFile: "unit1-api-facts.md",
    heading: "Do Not Use Non-CMU Graphics Libraries",
    content: "Do not use turtle, tkinter, or pygame.",
    topics: [],
  };
  const rectChunk = {
    sourceFile: "unit1-api-facts.md",
    heading: "Rect",
    content: "Rect(left, top, width, height)",
    topics: [],
  };

  const turtleScore = scoreKnowledgeChunk(turtleChunk, "Can I use turtle?");
  const rectScore = scoreKnowledgeChunk(rectChunk, "Can I use turtle?");

  assert.ok(turtleScore > rectScore);
});

test("retrieveKnowledge returns rectangle guidance for rectangle drawing questions", async () => {
  const chunks = await retrieveKnowledge(
    "cs1-unit1",
    "How do I draw a rectangle?"
  );
  const headings = chunks.map((chunk) => chunk.heading);

  assert.ok(headings.includes("Do Not Use Non-CMU Graphics Libraries"));
  assert.ok(
    headings.some((heading) => /rect/i.test(heading) || heading === "Basic Shapes")
  );
});

test("retrieveKnowledge returns fill guidance for fill syntax questions", async () => {
  const chunks = await retrieveKnowledge(
    "cs1-unit1",
    "Why doesn't fill=orange work?"
  );
  const headings = chunks.map((chunk) => chunk.heading);

  assert.ok(headings.includes("Do Not Use Non-CMU Graphics Libraries"));
  assert.ok(headings.some((heading) => /fill/i.test(heading)));
});

test("retrieveKnowledge returns non-CMU library guidance for turtle questions", async () => {
  const chunks = await retrieveKnowledge("cs1-unit1", "Can I use turtle?");
  const headings = chunks.map((chunk) => chunk.heading);

  assert.ok(headings.includes("Do Not Use Non-CMU Graphics Libraries"));
});

test("assembled unit1 system prompt includes tutor prompt, skill, and source notes", async () => {
  const skill = await loadSkill("cs1-unit1");
  const knowledgeChunks = await retrieveKnowledge(
    "cs1-unit1",
    "How do I draw a rectangle?"
  );
  const sourceNotes = formatKnowledgeNotes(knowledgeChunks);
  const prompt = [
    CMU_UNIT1_TUTOR_PROMPT.trim(),
    "## Selected skill instructions",
    skill.prompt,
    "## CMU CS Academy source notes",
    sourceNotes,
  ]
    .join("\n\n")
    .trim();

  assert.match(prompt, /CMU CS Academy CS1 Unit 1/);
  assert.match(prompt, /## Selected skill instructions/);
  assert.match(prompt, /## CMU CS Academy source notes/);
  assert.match(prompt, /Do Not Use Non-CMU Graphics Libraries/);
  assert.match(prompt, /Rect/);
});
