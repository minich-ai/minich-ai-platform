import OpenAI from "openai";
import { loadSkill, listSkills, type SkillId } from "@/lib/skill";
import { CMU_UNIT1_TUTOR_PROMPT } from "@/lib/prompts/cmuUnit1TutorPrompt";

export type AgentMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AgentResponse = {
  content: string;
  skillId: SkillId;
  skillTitle: string;
};

function latestUserMessage(messages: AgentMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i].role === "user") {
      return messages[i].content;
    }
  }

  return "";
}

function topicMatches(text: string, topic: string): boolean {
  if (topic === "==") return text.includes("==");
  if (topic === "!=") return text.includes("!=");

  const escaped = topic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:\\b)${escaped}(?:\\b)`, "i").test(text);
}

type SkillScore = {
  id: SkillId;
  score: number;
  specificity: number;
};

export async function selectSkill(userMessage: string): Promise<SkillId> {
  const skills = await listSkills();

  const scores: SkillScore[] = skills.map((skill) => {
    let score = 0;
    let specificity = 0;

    for (const topic of skill.topics) {
      if (topicMatches(userMessage, topic)) {
        score += 1;
        specificity += topic.length;
      }
    }

    return {
      id: skill.id,
      score,
      specificity,
    };
  });

  scores.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.specificity - a.specificity;
  });

  return scores[0]?.id ?? "cs1-unit1";
}

function buildSystemPrompt(skillPrompt: string): string {
  return `
${CMU_UNIT1_TUTOR_PROMPT}

Additional selected skill instructions:

${skillPrompt}
`.trim();
}

export async function runAgent(
  messages: AgentMessage[],
  apiKey: string,
  model = process.env.OPENAI_MODEL ?? "gpt-4o-mini"
): Promise<AgentResponse> {
  const userMessage = latestUserMessage(messages);

  if (!userMessage.trim()) {
    throw new Error("No user message found.");
  }

  const skillId = await selectSkill(userMessage);
  const skill = await loadSkill(skillId);
  const openai = new OpenAI({ apiKey });

  const systemPrompt = buildSystemPrompt(skill.prompt);

  const completion = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("No response received from the model.");
  }

  return {
    content,
    skillId: skill.id,
    skillTitle: skill.title,
  };
}