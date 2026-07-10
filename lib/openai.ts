/** Default chat model for CMU CS1 tutoring (override with OPENAI_MODEL). */
export const DEFAULT_OPENAI_MODEL = "gpt-5.4";

export function resolveOpenAIModel(): string {
  return process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL;
}
