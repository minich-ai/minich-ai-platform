import fs from "fs/promises";
import path from "path";

export const SKILL_IDS = ["cs1-unit1"] as const;

export type SkillId = (typeof SKILL_IDS)[number];

export type SkillMetadata = {
  id: SkillId;
  title: string;
  topics: string[];
};

export type Skill = SkillMetadata & {
  prompt: string;
};

function parseFrontmatter(raw: string): {
  metadata: Partial<SkillMetadata>;
  body: string;
} {
  if (!raw.startsWith("---\n")) {
    return { metadata: {}, body: raw };
  }

  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    return { metadata: {}, body: raw };
  }

  const frontmatter = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const metadata: Partial<SkillMetadata> = { topics: [] };
  let currentListKey: "topics" | null = null;

  for (const line of frontmatter.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const listMatch = trimmed.match(/^- (.+)$/);
    if (listMatch && currentListKey === "topics") {
      metadata.topics?.push(listMatch[1].trim());
      continue;
    }

    const keyValue = trimmed.match(/^([a-z_]+):\s*(.*)$/i);
    if (!keyValue) continue;

    const [, key, value] = keyValue;
    if (key === "id") {
      metadata.id = value as SkillId;
      currentListKey = null;
    } else if (key === "title") {
      metadata.title = value;
      currentListKey = null;
    } else if (key === "topics") {
      currentListKey = "topics";
      if (value) {
        metadata.topics = [value];
      }
    } else {
      currentListKey = null;
    }
  }

  return { metadata, body };
}

function skillPath(id: SkillId): string {
  return path.join(process.cwd(), "skills", id, "SKILL.md");
}

export async function loadSkill(id: SkillId): Promise<Skill> {
  const raw = await fs.readFile(skillPath(id), "utf-8");
  const { metadata, body } = parseFrontmatter(raw);

  if (!metadata.id || !metadata.title) {
    throw new Error(`Skill ${id} is missing required frontmatter (id, title).`);
  }

  return {
    id: metadata.id,
    title: metadata.title,
    topics: metadata.topics ?? [],
    prompt: body.trim(),
  };
}

export async function listSkills(): Promise<SkillMetadata[]> {
  const skills = await Promise.all(SKILL_IDS.map((id) => loadSkill(id)));
  return skills.map(({ id, title, topics }) => ({ id, title, topics }));
}
