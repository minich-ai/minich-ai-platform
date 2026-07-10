# CMU CS Academy Knowledge Distillation Workflow

**Goal:** Build private, RAG-friendly Markdown knowledge for the CS1 tutor without copying CMU lesson pages wholesale.

---

## What is already implemented

| Layer | Location | Status |
| ----- | -------- | ------ |
| Hardcoded tutor prompt | `lib/prompts/cmuUnit1TutorPrompt.ts` | ✅ |
| Skill behavior rules | `skills/cs1-unit1/SKILL.md` | ✅ |
| High-priority API facts | `skills/cs1-unit1/knowledge/unit1-api-facts.md` | ✅ |
| Lesson note (example) | `skills/cs1-unit1/knowledge/cmu-cs1-unit1-1.2.1-fills-and-borders.md` | ✅ |
| Local Markdown retrieval | `lib/knowledge.ts` | ✅ |
| Prompt assembly | `lib/systemPrompt.ts` → **CMU CS Academy source notes** | ✅ |
| Automated checks | `npm test`, `evals/cmu-syntax-regression.md` | ✅ |
| Default model | `gpt-5.4` via `lib/openai.ts` | ✅ |

Retrieval reads `skills/cs1-unit1/knowledge/*.md`, splits on `##` headings, scores chunks by keyword overlap, always pins **Do Not Use Non-CMU Graphics Libraries**, and injects up to four chunks into the system prompt.

---

## Copyright-safe rules

1. **Do not** scrape or bulk-copy CMU CS Academy lesson pages into this repo.
2. **Do not** place CMU-derived notes in `public/`.
3. **Do** paraphrase in your own words — API facts, syntax rules, misconceptions, debugging cues.
4. **Do** write tiny **original** code examples (a few lines max).
5. **Do not** reproduce CMU page wording, exercise sequences, checkpoints, or large examples.
6. Add a **Source Reference** line noting the CMU section, paraphrased by the teacher.

---

## Adding a new lesson note (step by step)

### 1. Copy the template

```bash
cp skills/cs1-unit1/knowledge/_TEMPLATE.md \
   skills/cs1-unit1/knowledge/cmu-cs1-unit1-X.Y.Z-topic-slug.md
```

Use a filename like `cmu-cs1-unit1-1.3.1-labels.md`.

### 2. Fill in YAML frontmatter

The `topics` list helps retrieval when a student question mentions those words:

```yaml
topics:
  - Label
  - text
  - size
```

### 3. Write short `##` sections

Retrieval splits on `##` headings. Keep sections focused (one concept per heading). Good headings match student language:

- `## Purpose`
- `## CMU CS Academy Syntax Facts`
- `## Common Beginner Mistakes`
- `## Debugging Cues`
- `## Tutor Guidance`

`unit1-api-facts.md` already covers cross-cutting API rules. Lesson files should go deeper on **one** CMU section.

### 4. Run checks

```bash
npm test
```

Add a retrieval test in `lib/knowledge.test.ts` if the topic has distinctive keywords (optional but recommended).

Run one or two prompts from `evals/cmu-syntax-regression.md` against the local API after adding substantial notes.

### 5. Commit the knowledge file

Knowledge files are private tutor assets — safe to commit in this repo (not in `public/`).

---

## Suggested Unit 1 lesson order

Add files lesson by lesson as students reach each section:

| Priority | CMU section | Suggested filename |
| -------- | ----------- | ------------------ |
| Done | 1.2.1 Fills and borders | `cmu-cs1-unit1-1.2.1-fills-and-borders.md` |
| Next | 1.1.x Shapes / coordinates | `cmu-cs1-unit1-1.1.x-shapes-and-coordinates.md` |
| Next | 1.3.x Labels | `cmu-cs1-unit1-1.3.x-labels.md` |
| Later | Variables / assignment | `cmu-cs1-unit1-…` |
| Later | Functions | `cmu-cs1-unit1-…` |

Keep `unit1-api-facts.md` as the global reference; add lesson files for section-specific debugging and tutor phrasing.

---

## Optional: improve retrieval for new topics

When a lesson introduces vocabulary retrieval does not yet boost, add a row to `QUERY_BOOSTS` in `lib/knowledge.ts`:

```ts
{
  pattern: /\blabel\b|\btext\b/i,
  headings: ["Labels", "Label"],
},
```

Only needed when keyword overlap alone misses the right chunk.

---

## Defense-in-depth stack

```text
gpt-5.4
+ CMU_UNIT1_TUTOR_PROMPT
+ SKILL.md
+ distilled knowledge (retrieved chunks)
+ npm test + cmu-syntax-regression.md
```

No single layer is sufficient. Model choice helps, but curriculum accuracy comes mainly from the prompt stack and distilled notes.
