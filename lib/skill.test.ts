import test from "node:test";
import assert from "node:assert/strict";
import { loadSkill } from "./skill.ts";

test("loadSkill reads Agent Skills name and description frontmatter", async () => {
  const skill = await loadSkill("cs1-unit1");

  assert.equal(skill.name, "cs1-unit1");
  assert.equal(skill.id, "cs1-unit1");
  assert.match(skill.description, /CMU CS Academy CS1 Unit 1/);
  assert.match(skill.description, /Rect/);
  assert.ok(skill.topics.includes("rectangles"));
  assert.ok(skill.prompt.includes("## Purpose"));
});

test("loadSkill loads unit 2 with matching name and description", async () => {
  const skill = await loadSkill("cs1-unit2");

  assert.equal(skill.name, "cs1-unit2");
  assert.match(skill.description, /conditionals/);
  assert.ok(skill.topics.includes("if"));
});
