import fs from "fs/promises";
import path from "path";
import type { SkillId } from "@/lib/skill";

/** Keep in sync with SKILL_DOMAIN in lib/skill.ts */
const SKILL_DOMAIN = "education";

export type KnowledgeChunk = {
  sourceFile: string;
  heading: string;
  content: string;
  topics: string[];
};

const PINNED_HEADINGS = new Set([
  "Do Not Use Non-CMU Graphics Libraries",
  "Tutor Rules",
]);

const QUERY_BOOSTS: Array<{ pattern: RegExp; headings: string[] }> = [
  {
    pattern: /\bturtle\b|\btkinter\b|\bpygame\b|javascript|html|canvas|css/i,
    headings: ["Do Not Use Non-CMU Graphics Libraries"],
  },
  {
    pattern: /\brect(angle)?\b|\bdraw\b/i,
    headings: ["Basic Shapes", "Rect", "Rect Defaults"],
  },
  {
    pattern: /\bfill\b|orange|color|border/i,
    headings: ["Fill", "Changing a Shape's Color with `fill`", "Borders", "Empty Fill vs White Fill"],
  },
];

function knowledgeDir(skillId: SkillId): string {
  return path.join(process.cwd(), "skills", SKILL_DOMAIN, skillId, "knowledge");
}

function stripFrontmatter(raw: string): { body: string; topics: string[] } {
  if (!raw.startsWith("---\n")) {
    return { body: raw, topics: [] };
  }

  const end = raw.indexOf("\n---\n", 4);
  if (end === -1) {
    return { body: raw, topics: [] };
  }

  const frontmatter = raw.slice(4, end);
  const body = raw.slice(end + 5);
  const topics: string[] = [];
  let inTopics = false;

  for (const line of frontmatter.split("\n")) {
    const trimmed = line.trim();
    const listMatch = trimmed.match(/^- (.+)$/);
    if (listMatch && inTopics) {
      topics.push(listMatch[1].trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    if (trimmed.startsWith("topics:")) {
      inTopics = true;
      continue;
    }

    if (trimmed && !trimmed.startsWith("-")) {
      inTopics = false;
    }
  }

  return { body, topics };
}

export function splitKnowledgeIntoChunks(
  sourceFile: string,
  raw: string
): KnowledgeChunk[] {
  const { body, topics } = stripFrontmatter(raw);
  const sections = body.split(/\n(?=## )/);
  const chunks: KnowledgeChunk[] = [];

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed) continue;

    const headingMatch = trimmed.match(/^## (.+)$/m);
    if (!headingMatch) continue;

    const heading = headingMatch[1].trim();

    chunks.push({
      sourceFile,
      heading,
      content: trimmed,
      topics,
    });
  }

  return chunks;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .match(/[a-z0-9_]+/g)
    ?.filter((token) => token.length > 2) ?? [];
}

export function scoreKnowledgeChunk(
  chunk: KnowledgeChunk,
  query: string
): number {
  const queryTokens = new Set(tokenize(query));
  const chunkText = `${chunk.heading} ${chunk.content}`.toLowerCase();
  let score = 0;

  for (const token of queryTokens) {
    if (chunkText.includes(token)) {
      score += 1;
    }
  }

  for (const topic of chunk.topics) {
    if (query.toLowerCase().includes(topic.toLowerCase())) {
      score += 2;
    }
  }

  if (PINNED_HEADINGS.has(chunk.heading)) {
    score += 1;
  }

  for (const boost of QUERY_BOOSTS) {
    if (!boost.pattern.test(query)) continue;
    if (boost.headings.includes(chunk.heading)) {
      score += 5;
    }
  }

  return score;
}

export async function loadKnowledgeChunks(skillId: SkillId): Promise<KnowledgeChunk[]> {
  const dir = knowledgeDir(skillId);

  let files: string[];
  try {
    files = await fs.readdir(dir);
  } catch {
    return [];
  }

  const markdownFiles = files
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .sort();
  const chunks: KnowledgeChunk[] = [];

  for (const file of markdownFiles) {
    const raw = await fs.readFile(path.join(dir, file), "utf-8");
    chunks.push(...splitKnowledgeIntoChunks(file, raw));
  }

  return chunks;
}

export async function retrieveKnowledge(
  skillId: SkillId,
  query: string,
  maxChunks = 4
): Promise<KnowledgeChunk[]> {
  const chunks = await loadKnowledgeChunks(skillId);
  if (!chunks.length) return [];

  const ranked = chunks
    .map((chunk) => ({
      chunk,
      score: scoreKnowledgeChunk(chunk, query),
    }))
    .sort((a, b) => b.score - a.score);

  const selected: KnowledgeChunk[] = [];
  const seen = new Set<string>();

  const pinned = chunks.find(
    (chunk) => chunk.heading === "Do Not Use Non-CMU Graphics Libraries"
  );
  if (pinned) {
    selected.push(pinned);
    seen.add(pinned.heading);
  }

  for (const { chunk, score } of ranked) {
    if (selected.length >= maxChunks) break;
    if (score <= 0) continue;
    if (seen.has(chunk.heading)) continue;

    selected.push(chunk);
    seen.add(chunk.heading);
  }

  if (selected.length === 1 && pinned) {
    for (const { chunk, score } of ranked) {
      if (selected.length >= maxChunks) break;
      if (score <= 0) continue;
      if (seen.has(chunk.heading)) continue;
      selected.push(chunk);
      seen.add(chunk.heading);
    }
  }

  return selected.slice(0, maxChunks);
}

export function formatKnowledgeNotes(chunks: KnowledgeChunk[]): string {
  if (!chunks.length) return "";

  return chunks
    .map(
      (chunk) =>
        `### ${chunk.heading}\n(Source: ${chunk.sourceFile})\n\n${chunk.content}`
    )
    .join("\n\n---\n\n");
}
