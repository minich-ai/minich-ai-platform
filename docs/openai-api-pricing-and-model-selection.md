# OpenAI API Pricing and Model Selection

**Snapshot date:** July 9, 2026  
**Project:** Minich AI Tutor / CMU CS Academy CS1 tutoring app  
**Purpose:** Explain how this app chooses an OpenAI model, how API pricing works, and how to make reasonable cost/quality decisions.

---

## 1. Big idea

This app is not powered by a ChatGPT Plus subscription.

ChatGPT Plus and the OpenAI API are separate products with separate billing. ChatGPT Plus gives access to ChatGPT through the web/mobile/desktop apps. This Vercel app uses an OpenAI API key, and API usage is billed separately based on usage.

For this project, Vercel hosts the app, but Vercel does not choose the LLM model. The app code chooses the model.

The default model is centralized in `lib/openai.ts`:

```ts
export const DEFAULT_OPENAI_MODEL = "gpt-5.4";

export function resolveOpenAIModel(): string {
  return process.env.OPENAI_MODEL ?? DEFAULT_OPENAI_MODEL;
}
```

Both `app/api/chat/route.ts` and `lib/agent.ts` call `resolveOpenAIModel()`.

Override locally or on Vercel with:

```bash
OPENAI_MODEL=gpt-5.4
```

---

## 2. Why `gpt-5.4` for this tutor

CMU CS1 Unit 1 tutoring needs:

- strong instruction following (stay on CMU `cmu_graphics` syntax)
- short, beginner-friendly, Socratic replies
- low cost per student message (large system prompt: tutor rules + `SKILL.md` + knowledge notes)

`gpt-5.4` is a good default because it balances quality, latency, and price for short tutoring turns. Curriculum accuracy is enforced mainly by the prompt stack (hardcoded tutor prompt, selected skill, retrieved knowledge), not by using the most expensive frontier model.

| Model     | Input / Output (per 1M tokens) | Default reasoning | Fit for CS1 Unit 1 chat |
| --------- | ------------------------------ | ----------------- | ----------------------- |
| `gpt-5.4` | $2.50 / $15                    | `none`            | **Recommended default** |
| `gpt-5.5` | $5.00 / $30                    | `medium`          | Optional for harder debugging questions |

Use `gpt-5.5` only if evals show `gpt-5.4` struggling on complex student code questions. If you switch to `gpt-5.5`, consider lowering reasoning effort so answers stay concise.

---

## 3. Model IDs must match your API account

The model name in `OPENAI_MODEL` must be an ID your OpenAI project can access. If the API returns `model_not_found`, pick a model from your account's model list and update `.env.local` and Vercel.

This repo previously referenced `gpt-5.6-terra`, which is not available on all API accounts. The project now standardizes on `gpt-5.4`.

---

## 4. Cost drivers in this app

Each chat request sends:

1. A large **system prompt** (tutor rules + skill + retrieved knowledge)
2. The **conversation history**
3. A relatively short **assistant reply**

Costs scale with:

- **Input tokens** — system prompt size dominates early turns; prompt caching can help on repeated calls
- **Output tokens** — keep tutoring answers short by design
- **Model tier** — `gpt-5.4` is about half the price of `gpt-5.5` for comparable text usage

For a student pilot, monitor usage in the [OpenAI usage dashboard](https://platform.openai.com/usage) and adjust `OPENAI_MODEL` if needed.

---

## 5. Environment variables

| Variable         | Required | Default    | Purpose                          |
| ---------------- | -------- | ---------- | -------------------------------- |
| `OPENAI_API_KEY` | Yes      | —          | API authentication               |
| `OPENAI_MODEL`   | No       | `gpt-5.4`  | Chat model for tutoring responses |

Set the same values locally (`.env.local`) and on Vercel (Production + Preview).

---

## 6. Regression testing

Before changing models in production:

1. Run `npm test` (knowledge retrieval + prompt assembly)
2. Run the manual prompts in `evals/cmu-syntax-regression.md` against the local API
3. Confirm answers use CMU syntax (`Rect`, `Circle`, `fill='orange'`, `app.background`) and avoid `turtle`, `tkinter`, `pygame`, and web canvas APIs
