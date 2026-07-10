# Cursor Prompt: Safer CMU CS Academy Knowledge Distillation Workflow

I want to improve this CMU CS Academy CS1 tutor without copying CMU’s lesson pages wholesale. Please help implement a safer “knowledge distillation” workflow instead of storing full copyrighted notes.

## Goal

Create private, RAG-friendly Markdown knowledge files that capture CMU CS Academy CS1 facts, syntax, misconceptions, and debugging rules in my own words, without preserving CMU’s exact instructional prose or copying large chunks of their pages.

## Recommended Approach

1. Do not scrape or bulk-copy CMU CS Academy lesson pages into the repo.

2. Do not place CMU-derived notes in `public/`.

3. Store private tutor knowledge under:

   ```text
   skills/cs1-unit1/knowledge/
   ```

4. For each CMU lesson page, create a short original Markdown file with this structure:

   ````md
   # Unit X.Y Topic Name

   ## Purpose

   One or two sentences explaining what the student should understand.

   ## CMU CS Academy Syntax Facts

   - Fact 1
   - Fact 2
   - Fact 3

   ## Tiny Original Examples

   ```python
   # Original example, not copied from CMU
   Rect(50, 50, 100, 100, fill='orange')
   ```

   ## Common Beginner Mistakes

   - Mistake 1
   - Mistake 2

   ## Tutor Guidance

   - How the AI tutor should explain this topic.
   - What it should not say.
   - What Socratic question it can ask.

   ## Source Reference

   Internal note: based on CMU CS Academy CS1 section X.Y, paraphrased and condensed by the teacher.
   ````

5. The output should not reproduce CMU’s page wording, page sequence, exercises, checkpoints, or large examples.

6. Prefer API facts and teacher-authored explanations over rewritten CMU prose.

7. Use original examples whenever possible.

8. Add a concise `unit1-api-facts.md` file as the highest-priority source.

9. Later, implement simple local Markdown retrieval so the tutor pulls only the most relevant chunks into the model prompt.

## What I Want Cursor To Do Next

Please inspect the current repo and recommend the next concrete step.

If retrieval is not yet implemented, recommend how to add simple local Markdown retrieval from:

```text
skills/cs1-unit1/knowledge/
```

If retrieval already exists, recommend a clean workflow for adding more distilled knowledge files lesson by lesson.

## Important Implementation Notes

The tutor should use a defense-in-depth approach:

```text
strong model
+ hardcoded CMU tutor prompt
+ SKILL.md behavior rules
+ distilled CMU knowledge files
+ local retrieval/RAG
+ regression tests
+ banned-library checks
```

The tutor should consistently answer using CMU CS Academy / `cmu_graphics` syntax such as:

```python
Rect(50, 50, 100, 100, fill='orange')
Circle(200, 200, 50)
Oval(100, 100, 150, 80)
Line(0, 0, 400, 400)
Label('Hello', 200, 200)
```

The tutor should not drift into:

```text
turtle
tkinter
pygame
matplotlib
JavaScript
HTML canvas
CSS
generic Python graphics libraries
```

Unless the student explicitly asks about those libraries outside the CMU CS Academy context.

## Desired Repo Structure

A reasonable structure is:

```text
skills/
  cs1-unit1/
    SKILL.md
    knowledge/
      unit1-api-facts.md
      cmu-cs1-unit1-1.2.1-fills-and-borders.md
docs/
  openai-api-pricing-and-model-selection.md
  preventing-non-cmu-graphics-answers.md
lib/
  prompts/
    cmuUnit1TutorPrompt.ts
```

## Suggested Knowledge Card Template

Use this template when creating new distilled knowledge files:

````md
# Unit X.Y Topic Name

## Purpose

Briefly state what students should understand after this topic.

## CMU CS Academy Syntax Facts

- Fact 1
- Fact 2
- Fact 3

## Tiny Original Examples

```python
# Original example written for this tutor project
Rect(50, 50, 100, 100, fill='orange')
```

## Common Beginner Mistakes

- Mistake 1
- Mistake 2
- Mistake 3

## Debugging Cues

- If the student says X, check Y.
- If the student says A, explain B.

## Tutor Guidance

- Use CMU CS Academy vocabulary.
- Keep explanations short.
- Ask one guiding question when practical.
- Do not give complete graded homework solutions.

## Forbidden Answer Styles

Do not answer with:

- `turtle`
- `tkinter`
- `pygame`
- JavaScript canvas
- HTML/CSS graphics
- generic Python graphics examples

## Source Reference

Internal note: based on CMU CS Academy CS1 section X.Y, paraphrased and condensed by the teacher.
````
