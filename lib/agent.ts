import OpenAI from "openai";
import { loadSkill, listSkills, type SkillId } from "@/lib/skill";

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

export async function selectSkill(userMessage: string): Promise<SkillId> {
  const skills = await listSkills();
  const normalized = userMessage.toLowerCase();

  let bestId = skills[0]?.id ?? "cs1-unit1";
  let bestScore = -1;

  for (const skill of skills) {
    const score = skill.topics.reduce((total, topic) => {
      return normalized.includes(topic.toLowerCase()) ? total + 1 : total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestId = skill.id;
    }
  }

  return bestId;
}

export async function runAgent(
  messages: AgentMessage[],
  apiKey: string,
  model = process.env.OPENAI_MODEL ?? "gpt-4o-mini"
): Promise<AgentResponse> {
  const userMessage = latestUserMessage(messages);
  const skillId = await selectSkill(userMessage);
  const skill = await loadSkill(skillId);
  const openai = new OpenAI({ apiKey });

  const completion = await openai.chat.completions.create({
    model,
    messages: [{ role: "system", content: skill.prompt }, ...messages],
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
