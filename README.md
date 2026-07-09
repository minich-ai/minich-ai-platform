# Minich AI Platform

> **A reusable AI platform for education, coaching, and professional AI adoption — built from the inside out.**

[![Status](https://img.shields.io/badge/status-early%20prototype-blue)](plans/ROADMAP.md)
[![Focus](https://img.shields.io/badge/focus-education%20%26%20AI%20literacy-green)](#what-this-is)

This repository is the working foundation for [**minich.ai**](https://minich.ai) — a platform that turns deep domain expertise and sound instructional design into **reusable AI Skills** that power tutoring agents, coaching experiences, and future commercial offerings.

It is not a single Custom GPT. It is infrastructure for building many high-quality AI experiences from one coherent architecture.

---

## What this is

Most AI products start with a chat box and hope the model behaves well. This project starts with the opposite question:

**What should the AI *do*, for whom, and how do we know it's doing it well?**

The answer is a library of **Skills** — versioned, testable specifications that define tutoring behavior, teaching philosophy, scope boundaries, and academic integrity rules. Agents load the right Skill for the context; students get consistent, thoughtful guidance instead of generic completions.

| Layer | Role |
| --- | --- |
| **Skills** | Reusable instructional assets (`SKILL.md` + `TESTS.md`) |
| **Agents** | Orchestration — select a Skill, handle the conversation |
| **Application** | Simple web UI that delivers the experience |
| **Evals** | Regression testing for tutoring *quality*, not just uptime |

The first demonstration is a **CMU CS Academy CS1 Unit 1 tutor** — Socratic, scope-aware, and designed for real beginners. The platform itself is the product; CS1 is proof that the approach works.

---

## Why this matters (for organizations)

If you're evaluating someone to help you adopt AI thoughtfully — not just wire up an API — this repo shows how I think about the problem:

- **Behavior before infrastructure.** Great AI experiences come from well-defined behavior, not from bolting auth and databases onto a vague prompt.
- **Skills as assets.** Instructional and domain expertise gets captured in reusable, reviewable artifacts — not trapped in one-off chat sessions.
- **Testable quality.** Each Skill ships with representative prompts and expected behaviors, so tutoring quality can be evaluated and improved over time.
- **Built to scale across domains.** The same platform pattern supports K–12 CS tutoring, AP CSA, AI literacy workshops, executive coaching, and consulting engagements — by adding Skills, not rebuilding from scratch.

I bring **classroom-tested instructional design**, **software engineering discipline**, and **practical AI implementation** to organizations that want AI that actually helps people learn and work better.

---

## Current focus

| Area | Status |
| --- | --- |
| CS1 Unit 1 Tutor Skill | ✅ [`skills/cs1-unit1/SKILL.md`](skills/cs1-unit1/SKILL.md) |
| Skill behavior tests | ✅ [`skills/cs1-unit1/TESTS.md`](skills/cs1-unit1/TESTS.md) — 18/18 passing |
| Local web prototype | ✅ Next.js chat app (see below) |
| Multi-skill agent routing | 📋 Planned |
| Auth, history, deployment | 📋 Later |

**Also on the roadmap:** AP Computer Science A, Python tutoring, AI literacy, teacher productivity tools, executive AI coaching, and workshop-ready experiences.

See the full plan in [`plans/ROADMAP.md`](plans/ROADMAP.md).

---

## Repository structure

```
minich-ai-platform/
├── app/                     # Next.js chat UI + API routes
│   ├── page.tsx             # Chat interface
│   └── api/chat/route.ts    # Loads SKILL.md, calls OpenAI
├── skills/                  # Reusable AI Skills (the core asset)
│   └── cs1-unit1/
│       ├── SKILL.md         # Behavior, philosophy, scope, integrity rules
│       └── TESTS.md         # Representative prompts + expected behavior
├── examples/                # Sample student questions for skill development
├── evals/                   # Future automated evaluation harnesses
├── plans/
│   └── ROADMAP.md           # Development phases and milestones
└── README.md
```

Each Skill is a self-contained instructional asset: purpose, audience, teaching process, code-example constraints, debugging approach, communication style, and academic integrity — all explicit and reviewable.

---

## Development philosophy

Build from the inside out:

1. **Build great tutoring behavior** — nail the Skill before writing platform code.
2. **Build reusable Skills** — capture expertise in portable, versioned artifacts.
3. **Build a simple web application** — prove the end-to-end loop (browser → app → model → response).
4. **Test with real students** — validate that it teaches, not just answers.
5. **Add infrastructure only when needed** — auth, databases, and deployment come after the experience is proven.

> *Build one excellent Skill before building a sophisticated platform.*

---

## Run locally

**Requirements:** Node.js 18+, an [OpenAI API key](https://platform.openai.com/api-keys)

```bash
npm install
cp .env.example .env.local
# Edit .env.local and set OPENAI_API_KEY

npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Each message is sent to the OpenAI API with `skills/cs1-unit1/SKILL.md` as the system prompt.

---

## Get involved

**Organizations** interested in AI strategy, custom Skills, tutoring platforms, workshops, or AI literacy programs:

→ [**minich.ai**](https://minich.ai)

**Developers and educators** curious about the architecture or contributing:

→ Open an issue or explore [`plans/ROADMAP.md`](plans/ROADMAP.md) for where this is headed.

---

## Status

🚧 **Early prototype — Summer 2026**

The foundation is in place: a production-quality first Skill, 18 passing behavior tests, a local chat prototype, and a clear roadmap. The next milestones are student testing and multi-skill agent routing.

---

*Built by [Curt Minich](https://minich.ai) — educator, software engineer, and AI consultant.*
