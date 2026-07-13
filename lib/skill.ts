import fs from "fs/promises";
import path from "path";

/** Domain folder under skills/ (e.g. skills/education/cs1-unit1). */
const SKILL_DOMAIN = "education";

export const SKILL_IDS = ["cs1-unit1", "cs1-unit2"] as const;

export type SkillId = (typeof SKILL_IDS)[number];

export type SkillMetadata = {
  id: SkillId;
  name: string;
  description: string;
  title: string;
  topics: string[];
};

export type Skill = SkillMetadata & {
  prompt: string;
};

type ParsedFrontmatter = {
  id?: SkillId;
  name?: string;
  title?: string;
  description?: string;
  topics: string[];
};

function parseFrontmatter(raw: string): {
  metadata: ParsedFrontmatter;
  body: string;
} {
  if (!raw.startsWith("---\n")) {
    return { metadata: { topics: [] }, body: raw };
  }

  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    return { metadata: { topics: [] }, body: raw };
  }

  const frontmatter = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const metadata: ParsedFrontmatter = { topics: [] };
  let currentListKey: "topics" | null = null;

  for (const line of frontmatter.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const listMatch = trimmed.match(/^- (.+)$/);
    if (listMatch && currentListKey === "topics") {
      const value = listMatch[1].trim().replace(/^["']|["']$/g, "");
      metadata.topics.push(value);
      continue;
    }

    const keyValue = trimmed.match(/^([a-z_]+):\s*(.*)$/i);
    if (!keyValue) continue;

    const [, key, value] = keyValue;
    if (key === "id") {
      metadata.id = value as SkillId;
      currentListKey = null;
    } else if (key === "name") {
      metadata.name = value;
      currentListKey = null;
    } else if (key === "title") {
      metadata.title = value;
      currentListKey = null;
    } else if (key === "description") {
      metadata.description = value;
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

function resolveSkillMetadata(
  directoryId: SkillId,
  metadata: ParsedFrontmatter
): SkillMetadata {
  const id = metadata.id ?? (metadata.name as SkillId | undefined);
  const name = metadata.name ?? metadata.id;
  const title = metadata.title ?? metadata.description;
  const description = metadata.description ?? metadata.title;

  if (!id || !name || !title || !description) {
    throw new Error(
      `Skill ${directoryId} is missing required frontmatter (name/id and title/description).`
    );
  }

  if (name !== directoryId) {
    throw new Error(
      `Skill ${directoryId} frontmatter name "${name}" must match the directory name.`
    );
  }

  if (metadata.id && metadata.name && metadata.id !== metadata.name) {
    throw new Error(
      `Skill ${directoryId} frontmatter id and name must match when both are present.`
    );
  }

  return {
    id,
    name,
    description,
    title,
    topics: metadata.topics,
  };
}

function skillDir(id: SkillId): string {
  return path.join(process.cwd(), "skills", SKILL_DOMAIN, id);
}

function skillPath(id: SkillId): string {
  return path.join(skillDir(id), "SKILL.md");
}

export async function loadSkill(id: SkillId): Promise<Skill> {
  const raw = await fs.readFile(skillPath(id), "utf-8");
  const { metadata, body } = parseFrontmatter(raw);
  const resolved = resolveSkillMetadata(id, metadata);

  return {
    ...resolved,
    prompt: body.trim(),
  };
}

export async function listSkills(): Promise<SkillMetadata[]> {
  const skills = await Promise.all(SKILL_IDS.map((id) => loadSkill(id)));
  return skills.map(({ id, name, description, title, topics }) => ({
    id,
    name,
    description,
    title,
    topics,
  }));
}
