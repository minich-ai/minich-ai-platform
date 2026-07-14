# Minich AI Platform

A small Next.js app and a library of versioned **AI Skills** for Socratic tutoring—starting with a live **CMU CS Academy CS1** tutor.

**Live demo:** [minich-ai-platform.vercel.app](https://minich-ai-platform.vercel.app)  
**Project site:** [socraticcoachai.com](https://www.socraticcoachai.com/)

The goal is not a generic chatbot. Each Skill spells out who the tutor is for, what it may teach, how it should teach (Socratic, short, scope-aware), and what it must not do—including completing graded homework for students.

---

## What works today

| Area | Status |
| --- | --- |
| CS1 Unit 1 Skill + knowledge notes | Live in the demo |
| Unit 1 behavior tests | 18/18 documented PASS |
| CS1 Unit 2 Skill + tests | Written (12/12 PASS); not yet wired into the live chat route |
| Next.js chat UI + OpenAI API | Deployed on Vercel |
| Local Markdown retrieval into the system prompt | In use for Unit 1 |
| Auth, chat history, usage limits | Not built yet |

The live deployment currently runs the **Unit 1** tutor (shapes, colors, labels, variables). Skill-selection / multi-unit routing exists as scaffolding in `lib/agent.ts`; the production chat route is Unit 1–only until that wiring is finished.

---

## How it is built

Tutoring quality is treated as a product requirement, not a hope:

1. **Hardcoded tutor constraints** — stay on CMU CS Academy / `cmu_graphics` syntax; do not teach `turtle`, `pygame`, etc. for CS1 questions.
2. **`SKILL.md`** — teaching process, academic integrity, and scope.
3. **Distilled knowledge files** — teacher-authored facts under `skills/education/cs1-unit1/knowledge/` (not scraped lesson pages).
4. **Retrieval** — relevant knowledge chunks are injected into the system prompt for each question.
5. **Behavior tests** — representative student prompts and expected behaviors in each Skill’s `TESTS.md`.

Parents and teachers: the tutor is designed to **guide and question**, not to hand out finished homework solutions.

Related public work (see the project site): **Bio Buddy**, a Socratic biology study coach recognized in the **2026 Presidential AI Challenge** (Pennsylvania), developed with Chris Killinger at Wyomissing Area High School. Same design principles; separate product.

---

## Repository layout

```
minich-ai-platform/
├── app/                          # Chat UI + /api/chat
├── lib/                          # System prompt assembly, retrieval, skill loading
├── skills/education/
│   ├── cs1-unit1/                # Live Skill + TESTS.md + knowledge/
│   └── cs1-unit2/                # Skill + TESTS.md (not yet in live route)
├── docs/                         # Model choice, knowledge workflow, CMU-syntax guardrails
├── evals/                        # Manual syntax regression prompts; future automations
├── examples/                     # Sample student questions
└── plans/ROADMAP.md              # Longer-term plan
```

Skills follow a YAML frontmatter + Markdown pattern aligned with the [Agent Skills](https://agentskills.io/specification) `name` / `description` fields, plus project-specific metadata used for loading and topic matching.

---

## Run locally

**Requirements:** Node.js 18+, an [OpenAI API key](https://platform.openai.com/api-keys)

```bash
npm install
cp .env.example .env.local
# Set OPENAI_API_KEY (OPENAI_MODEL defaults to gpt-5.4)

npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm test    # retrieval / prompt-assembly checks
```

---

## Deploy (Vercel)

The production app is already hosted on Vercel. To recreate or fork:

1. Import this repo in Vercel (Next.js defaults are fine).
2. Set `OPENAI_API_KEY` (and optionally `OPENAI_MODEL=gpt-5.4`) for Production and Preview.
3. Deploy and smoke-test with a Unit 1 question such as: *“I’m confused why my rectangle doesn’t appear.”*

Notes on model choice and cost: [docs/openai-api-pricing-and-model-selection.md](docs/openai-api-pricing-and-model-selection.md).

---

## Roadmap (not current claims)

Possible next Skills and features—added as assets and wiring, not as unfinished marketing:

- Wire Unit 2 (conditionals) into the live chat route
- Broader CMU CS1 coverage via distilled knowledge files
- AP Computer Science A Skills
- Auth, history, and usage limits for a small student pilot
- Stronger automated eval harnesses under `evals/`

Full plan: [plans/ROADMAP.md](plans/ROADMAP.md).

---

## Contact

Curt Minich — educator and AI / software consultant  
**Site:** [socraticcoachai.com](https://www.socraticcoachai.com/)  
**Demo:** [minich-ai-platform.vercel.app](https://minich-ai-platform.vercel.app)

---

*Early prototype · Summer 2026*
