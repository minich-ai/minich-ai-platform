import { CMU_UNIT1_TUTOR_PROMPT } from "@/lib/prompts/cmuUnit1TutorPrompt";
import { formatKnowledgeNotes, retrieveKnowledge } from "@/lib/knowledge";
import { loadSkill, type SkillId } from "@/lib/skill";

export async function buildUnit1SystemPrompt(userMessage: string): Promise<string> {
  const skill = await loadSkill("cs1-unit1");
  const knowledgeChunks = await retrieveKnowledge("cs1-unit1", userMessage);
  const sourceNotes = formatKnowledgeNotes(knowledgeChunks);

  const sections = [
    CMU_UNIT1_TUTOR_PROMPT.trim(),
    "## Selected skill instructions",
    skill.prompt,
  ];

  if (sourceNotes) {
    sections.push("## CMU CS Academy source notes", sourceNotes);
  }

  return sections.join("\n\n").trim();
}

export async function buildSystemPromptForSkill(
  skillId: SkillId,
  userMessage: string
): Promise<string> {
  if (skillId === "cs1-unit1") {
    return buildUnit1SystemPrompt(userMessage);
  }

  const skill = await loadSkill(skillId);

  return `
${CMU_UNIT1_TUTOR_PROMPT.trim()}

## Selected skill instructions

${skill.prompt}
`.trim();
}
