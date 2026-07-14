# Minich AI Platform — Roadmap

## Vision

Build a growing library of reusable AI tutoring **Skills** that power a simple web tutor students (and later adult learners) can use with confidence.

Start with **excellent CMU CS Academy CS1 tutoring**, then expand outward—more units, more courses, more subjects—without rebuilding the platform each time.

Near-term focus: students, tutees, and families who want thoughtful AI help that **teaches**, not homework shortcuts.

Longer term (elsewhere and later): workshops, AI literacy, and professional coaching. Those stay secondary here so this repo stays honest about what’s shipping for learners.

---



## Development philosophy

Build from the inside out:

1. Nail tutoring behavior in a Skill.
2. Test that behavior with representative student prompts.
3. Ship a simple app that uses the Skill.
4. Test with real students and refine.
5. Add auth, history, and school-ready features only when the tutoring experience earns them.

**Guiding line:** Build one excellent Skill before building a sophisticated platform.

---



## What’s already done (Phases 1–5, early)

These are no longer “next”—they’re the foundation:


| Item                                         | Status                                                    |
| -------------------------------------------- | --------------------------------------------------------- |
| CS1 Unit 1 `SKILL.md` + `TESTS.md` (18/18)   | Done                                                      |
| Distilled Unit 1 knowledge + local retrieval | Done                                                      |
| CS1 Unit 2 Skill + tests written             | Done (not yet in live chat route)                         |
| Next.js chat prototype + OpenAI              | Done                                                      |
| Deployed on Vercel                           | Done ([live demo](https://minich-ai-platform.vercel.app)) |
| Public project site                          | [socraticcoachai.com](https://www.socraticcoachai.com/)   |


**Honest gap:** the live demo is **Unit 1 only**. Multi-skill routing scaffolding exists; wiring Unit 2 (and others) into production is still ahead.

Current layout (simplified):

```
minich-ai-platform/
├── app/                 # Chat UI + API
├── lib/                 # Prompts, retrieval, skill loading
├── skills/education/
│   ├── cs1-unit1/       # Live + knowledge/
│   └── cs1-unit2/       # Written; not live yet
├── docs/
├── evals/
└── plans/ROADMAP.md
```

---



## Phase 6 — Student testing (next priority)

Small pilot with **5–10 trusted students**.

Questions to answer:

- Does the Socratic style actually help beginners?
- Does it stay in CMU CS Academy syntax?
- Does it avoid giving full graded solutions?
- Would a parent trust this as a homework helper?

Collect feedback → refine Skills and knowledge notes → repeat.

Related public work (same design values): **Bio Buddy** / 2026 Presidential AI Challenge — see the project site. Separate product; same “guide, don’t shortcut” idea.

---



## Phase 7 — Expand the Skill library (learner-facing)

After Unit 1 feels reliably strong with real students, grow what learners can study—**skills as assets**, not a bigger marketing claim.

### CMU CS Academy & high school CS

- Wire **Unit 2** (conditionals) into the live tutor
- Unit 3+ CMU CS1 topics via distilled knowledge files
- CS1 debugger / “why is this drawing wrong?” Skill
- Stronger CMU Graphics expertise notes
- **AP Computer Science A** (e.g. CSAwesome2) Skills when ready
- Python practice Skills (style, debugging, quiz prep)



### Projects that spark interest

- Raspberry Pi / maker-style project coaching (when a solid Skill exists)
- Robotics / introductory project help (same rule: Skill first)



### AI literacy for students & families

- Plain-language “how to use AI without cheating” guidance
- Study skills / reflection coach alongside course content



### Later (light touch here)

Adult / professional offerings (executive AI coaching, workshops, consulting) are long-term options, but they are **not** the primary roadmap for this education repo. 

---



## Phase 8 — Product readiness for families

When tutoring quality holds up in pilots:

- Simple accounts / login (e.g. Supabase)
- Conversation history
- Usage limits appropriate for a tutoring practice
- Clear parent-facing academic integrity wording in the product UI

Possible eventual URL: `tutor.minich.com` or a domain under socraticcoachai.com—decide when the pilot earns it.

---



## Near-term milestones

1. **Student pilot** for the live Unit 1 tutor (feedback loop).
2. **Wire Unit 2** into `/api/chat` (or a clear unit chooser) so conditionals questions work for real.
3. **More Unit 1 knowledge cards** (lesson-by-lesson distillation).
4. **Smoke-check** CMU-syntax regressions after each Skill change (`evals/` + `npm test`).
5. Only then: auth / history for a slightly larger cohort.

---



## Skill design standard (unchanged)

Every Skill should include:

- `SKILL.md` — purpose, audience, philosophy, scope, process, integrity, style  
- `TESTS.md` — representative prompts and expected behaviors

Prefer **teacher-authored, paraphrased knowledge** under `knowledge/` over copying publisher lesson text. Details: [docs/knowledge-distillation-workflow.md](../docs/knowledge-distillation-workflow.md).

---



## Long-term learner experience

Students (and parents) should eventually be able to:

1. Open a trustworthy tutoring site
2. Ask a course-scoped question
3. Get Socratic help that builds independence
4. Practice with confidence—not copy-paste answers

Behavior comes from the Skill library. The website is just how that help is delivered.

---

*Roadmap is a plan, not a promise. Status above is calibrated to Summer 2026.*