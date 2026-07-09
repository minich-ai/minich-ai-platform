# Minich AI Platform 

## Vision

Build a reusable library of AI tutoring **Skills** that eventually power one or more AI **Agents** capable of tutoring students (and later professionals) through a simple web application.

The long-term goal is **not** to build a single Custom GPT or small set of skills.

The goal is to build a reusable AI platform that supports:

- Student tutoring
- Adult AI literacy
- Executive AI coaching
- Consulting
- Workshops
- Future commercial offerings

---



# Development Philosophy

Build from the inside out.

Instead of beginning with authentication, databases, or school integrations:

1. Build great tutoring behavior.
2. Build reusable Skills.
3. Build a simple web application.
4. Test with real students.
5. Add infrastructure only when needed.

---



# Phase 1 — Build the Skill Library

Repository:

```
minich-ai-platform/
```

Initial structure:

```
README.md

skills/

    cs1-unit1/
        SKILL.md
        TESTS.md
        examples/

    cs1-unit2/
        SKILL.md
        TESTS.md

examples/

docs/
```

Future skills may include:

- CS1 Unit 1 (CMU CS Academy)
- CS1 Unit 2
- CS1 Unit 3
- CS1 Debugger
- CMU Graphics Expert
- AP CSA Unit 1 (CSAwesome)
- AP CSA FRQ Coach
- Executive AI Coach
- AI Literacy Coach
- Cybersecurity Advisor
- Python Style Coach
- Reflection Coach
- Quiz Generator

Each Skill should become a reusable instructional asset.

---



# Phase 2 — Evaluate the Skills

Each Skill should have:

```
SKILL.md
```

describing:

- Purpose
- Audience
- Teaching philosophy
- Scope
- Tutoring process
- Output style
- Academic integrity
- Examples

Each Skill should also have:

```
TESTS.md
```

containing representative prompts and expected behavior.

This becomes regression testing for tutoring quality.

---



# Phase 3 — Build a Local Prototype

Using Cursor Pro:

Build a very small Next.js application.

Version 1 should simply do:

```
Browser

↓

Chat page

↓

OpenAI API

↓

Response
```

No authentication.

No database.

No deployment.

No analytics.

Only prove the tutoring loop.

---



# Phase 4 — Build the First Agent

The first agent should:

- Read the appropriate Skill
- Receive the student's question
- Produce a tutoring response

Initially only one Skill will exist.

Eventually:

```
Student Question

↓

Agent

↓

Determine topic

↓

Load appropriate Skill

↓

Generate response
```

Example:

Rectangle question

↓

CS1 Unit 1 Skill

Variable question

↓

CS1 Unit 1 Skill

Quiz request

↓

Quiz Skill

---



# Phase 5 — Deploy

Deploy the application using:

Frontend:

- Vercel

Backend:

- Next.js API routes

AI:

- OpenAI API

Repository:

- GitHub

Eventually add:

- Supabase authentication
- Conversation history
- User accounts
- Usage limits

---



# Phase 6 — Student Testing

Begin with:

5–10 trusted student testers.

Goals:

- Does the tutoring style help?
- Does it ask good Socratic questions?
- Does it avoid simply giving answers?
- Does it feel like Mr. Minich?

Collect feedback.

Improve the Skills.

Repeat.

---



# Phase 7 — Expand

After CS1:

Possible additional Skill collections:

### High School

- CMU CS Academy
- AP Computer Science A
- AI Literacy
- Python
- Robotics



### College

- Data Structures
- Software Engineering



### Professional

- Executive AI Coaching
- AI Adoption
- AI Productivity
- Prompt Engineering
- AI Strategy

---



# Development Environment

Primary development tool:

✅ Cursor Pro

Use Cursor Agent for:

- Coding
- Repository management
- Architecture implementation
- Refactoring
- Debugging
- Testing

---

Use ChatGPT for:

- Second opinions
- Architecture discussions
- Educational design
- Tutoring philosophy
- Product ideas
- Business strategy
- Technology comparisons

---

GitHub remains the source of truth for all code and Skills.

---



# Immediate Milestones



## Milestone 1

Complete:

```
skills/cs1-unit1/SKILL.md
```

---



## Milestone 2

Create:

```
skills/cs1-unit1/TESTS.md
```

with approximately 20 representative prompts.

---



## Milestone 3

Develop:

```
skills/cs1-unit2/
```

---



## Milestone 4

Build the first local web prototype.

---



## Milestone 5

Test with real students.

---



# Long-Term Vision

Eventually create:

```
tutor.minich.ai
```

Students will:

- Open the website
- Log in (eventually)
- Ask questions
- Receive personalized tutoring
- Practice programming
- Build confidence

The tutoring behavior will be powered by a growing library of reusable AI Skills.

Future versions may include AI agents capable of selecting the appropriate Skill automatically.

---



# Guiding Principle

**Build one excellent Skill before building a sophisticated platform.**

A high-quality tutoring experience is the product. The web app, agents, authentication, databases, and deployment are simply delivery mechanisms.

---



## One change I'd make to the plan

After thinking through your long-term goals—retirement, consulting, AI literacy, tutoring, workshops, and educational software—I would make the **platform itself** the primary product, not just the tutor.

In other words, you're not building "a CS1 tutor." You're building **Minich AI Platform**, whose first demonstration happens to be a CS1 tutor.

That subtle shift will make it much easier to grow into AP CS A, executive coaching, AI consulting, and other domains without feeling like you're starting over. The platform stays the same; you simply add new, well-designed skills and experiences over time. I think that's a much stronger foundation for the career you're working toward after retirement.