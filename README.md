# Minich AI Platform

**A reusable AI platform for education, coaching, and professional AI adoption, built from the inside out.**

[Status](plans/ROADMAP.md)
[Focus](#what-this-is)

This repository is the working foundation for **[minich.ai](https://minich.ai)**, a platform that turns deep domain expertise and sound instructional design into **reusable AI Skills** that power tutoring agents, coaching experiences, and future commercial offerings.

It is not a single Custom GPT. It is infrastructure for building many high-quality AI experiences from one coherent architecture.

---

## What this is

Most AI products start with a chat box and hope the model behaves well. This project starts with the opposite question:

**What should the AI *do*, for whom, and how do we know it's doing it well?**

The answer is a library of **Skills**: versioned, testable specifications that define tutoring behavior, teaching philosophy, scope boundaries, and academic integrity rules. Agents load the right Skill for the context; students get consistent, thoughtful guidance instead of generic completions.


| Layer           | Role                                                       |
| --------------- | ---------------------------------------------------------- |
| **Skills**      | Reusable instructional assets (`SKILL.md` + `TESTS.md`)    |
| **Agents**      | Orchestration: select a Skill, handle the conversation     |
| **Application** | Simple web UI that delivers the experience                 |
| **Evals**       | Regression testing for tutoring *quality*, not just uptime |


The first demonstration is a **CMU CS Academy CS1 Unit 1 tutor**: Socratic, scope-aware, and designed for real beginners. The platform itself is the product; CS1 is proof that the approach works.

---



## Why this matters (for organizations)

If you're evaluating someone to help you adopt AI thoughtfully, not just wire up an API, this repo shows how I think about the problem:

- **Behavior before infrastructure.** Great AI experiences come from well-defined behavior, not from bolting auth and databases onto a vague prompt.
- **Skills as assets.** Instructional and domain expertise gets captured in reusable, reviewable artifacts, not trapped in one-off chat sessions.
- **Testable quality.** Each Skill ships with representative prompts and expected behaviors, so tutoring quality can be evaluated and improved over time.
- **Built to scale across domains.** The same platform pattern supports K–12 CS tutoring, AP CSA, AI literacy workshops, executive coaching, and consulting engagements by adding Skills, not rebuilding from scratch.

I bring **classroom-tested instructional design**, **software engineering discipline**, and **practical AI implementation** to organizations that want AI that actually helps people learn and work better.

---



## Current focus


| Area                        | Status                                                     |
| --------------------------- | ---------------------------------------------------------- |
| CS1 Unit 1 Tutor Skill      | ✅ `[skills/cs1-unit1/SKILL.md](skills/cs1-unit1/SKILL.md)` |
| CS1 Unit 2 Tutor Skill      | ✅ `[skills/cs1-unit2/SKILL.md](skills/cs1-unit2/SKILL.md)` |
| Skill behavior tests        | ✅ Unit 1 (18/18) · Unit 2 (12/12)                          |
| Local web prototype         | ✅ Next.js chat app                                         |
| Multi-skill agent routing   | ✅ Unit 1 ↔ Unit 2                                          |
| Deployment                  | 🚧 Vercel (see below)                                      |
| Auth, history, usage limits | 📋 Later                                                   |


**Also on the roadmap:** AP Computer Science A, Python tutoring, AI literacy, teacher productivity tools, executive AI coaching, and workshop-ready experiences.

See the full plan in `[plans/ROADMAP.md](plans/ROADMAP.md)`.

---



## Repository structure

```
minich-ai-platform/
├── app/                     # Next.js chat UI + API routes
│   ├── page.tsx             # Chat interface
│   └── api/chat/route.ts    # Tutor API (gpt-5.4 default)
├── lib/
│   ├── openai.ts            # DEFAULT_OPENAI_MODEL (gpt-5.4)
│   ├── systemPrompt.ts      # Assembles tutor prompt + skill + knowledge
│   └── agent.ts             # Multi-skill routing
├── skills/                  # Reusable AI Skills (the core asset)
│   ├── cs1-unit1/
│   │   ├── SKILL.md
│   │   └── TESTS.md
│   └── cs1-unit2/
│       ├── SKILL.md
│       └── TESTS.md
├── examples/                # Sample student questions for skill development
├── evals/                   # Future automated evaluation harnesses
├── plans/
│   └── ROADMAP.md           # Development phases and milestones
└── README.md
```

Each Skill is a self-contained instructional asset: purpose, audience, teaching process, code-example constraints, debugging approach, communication style, and academic integrity, all explicit and reviewable.

---



## Development philosophy

Build from the inside out:

1. **Build great tutoring behavior**: nail the Skill before writing platform code.
2. **Build reusable Skills**: capture expertise in portable, versioned artifacts.
3. **Build a simple web application**: prove the end-to-end loop (browser → app → model → response).
4. **Test with real students**: validate that it teaches, not just answers.
5. **Add infrastructure only when needed**: auth, databases, and deployment come after the experience is proven.

> *Build one excellent Skill before building a sophisticated platform.*

---



## Run locally

**Requirements:** Node.js 18+, an [OpenAI API key](https://platform.openai.com/api-keys)

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set OPENAI_API_KEY (OPENAI_MODEL defaults to gpt-5.4)

npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The agent selects the best Skill and sends it to the OpenAI API as the system prompt.

---



## Deploy to Vercel

**Requirements:** A [Vercel](https://vercel.com) account linked to GitHub, and your OpenAI API key.

### 1. Import the repo

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `minich-ai/minich-ai-platform` from GitHub
3. Framework preset should auto-detect **Next.js**. Leave build settings as default:
  - Build command: `npm run build`
  - Output: (default)
  - Install command: `npm install`



### 2. Add environment variables

Before deploying, add these under **Environment Variables**:


| Name             | Value             | Environments                     |
| ---------------- | ----------------- | -------------------------------- |
| `OPENAI_API_KEY` | your `sk-...` key | Production, Preview, Development |
| `OPENAI_MODEL`   | `gpt-5.4`         | Production, Preview (optional)   |


Use the same key name as local dev (`minich-ai-platform-local` in OpenAI is fine).

### 3. Deploy

Click **Deploy**. Vercel builds from `main` and gives you a URL like `minich-ai-platform.vercel.app`.

### 4. Smoke test

Open your deployment URL and try:

- *"I'm confused why my rectangle doesn't appear."* → should route to **Unit 1**
- *"What's the difference between = and ==?"* → should route to **Unit 2**

Check the footer for the selected skill name.

### 5. Custom domain (optional, later)

In Vercel → Project → **Domains**, add something like `tutor.minich.ai` when you're ready.

**Note:** Every push to `main` auto-redeploys. Pull request previews get their own URLs if enabled.

### 6. API Pricing

For notes on OpenAI API pricing, model selection, and cost strategy, see `[docs/openai-api-pricing-and-model-selection.md](docs/openai-api-pricing-and-model-selection.md)`

---



## Get involved

**Organizations** interested in AI strategy, custom Skills, tutoring platforms, workshops, or AI literacy programs:

→ **[minich.ai](https://minich.ai)**

**Developers and educators** curious about the architecture or contributing:

→ Open an issue or explore `[plans/ROADMAP.md](plans/ROADMAP.md)` for where this is headed.

---



## Status

🚧 **Early prototype, Summer 2026**

The foundation is in place: two CS1 Skills with passing behavior tests, a working chat prototype with agent routing, and deployment-ready Next.js config. Next milestone: deploy to Vercel and run a small student pilot.

---

*Built by [Curt Minich](https://minich.ai), educator, software engineer, and AI consultant.*
