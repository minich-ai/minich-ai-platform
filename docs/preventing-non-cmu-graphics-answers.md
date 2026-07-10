# Preventing Non-CMU Graphics Answers in the CS1 Tutor

**Project:** Minich AI Tutor / CMU CS Academy CS1 Unit 1  
**Goal:** Reduce the chance that the tutor gives Python `turtle`, `tkinter`, `pygame`, JavaScript canvas, or generic Python graphics answers instead of CMU CS Academy / `cmu_graphics` style answers.

---

## 1. Core problem

The tutor app may use a strong OpenAI model, but model strength alone does not guarantee curriculum accuracy.

A general-purpose LLM has seen many Python graphics systems, including:

- `turtle`
- `tkinter`
- `pygame`
- matplotlib
- JavaScript canvas
- HTML/CSS graphics
- generic Python examples

CMU CS Academy CS1 uses its own graphics syntax and vocabulary. For example:

```python
Rect(50, 50, 100, 100, fill='orange')
Circle(200, 200, 50)
Label('Hello', 200, 200)
```

---

## 2. Defense in depth

Do not rely on model choice alone. This app uses:

1. **Default model:** `gpt-5.4` via `OPENAI_MODEL` (see `lib/openai.ts`)
2. **Hardcoded tutor prompt:** `lib/prompts/cmuUnit1TutorPrompt.ts`
3. **Skill rules:** `skills/cs1-unit1/SKILL.md`
4. **Retrieved knowledge:** `skills/cs1-unit1/knowledge/*.md` (pinned anti-turtle section + query-relevant chunks)
5. **Regression tests:** `npm test` and `evals/cmu-syntax-regression.md`

The assembled system message is built in `lib/systemPrompt.ts` under the heading **CMU CS Academy source notes**.
