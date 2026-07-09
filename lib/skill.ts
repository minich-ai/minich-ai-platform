import fs from "fs/promises";
import path from "path";

const SKILL_PATH = path.join(process.cwd(), "skills/cs1-unit1/SKILL.md");

export async function loadCs1Unit1Skill(): Promise<string> {
  return fs.readFile(SKILL_PATH, "utf-8");
}
