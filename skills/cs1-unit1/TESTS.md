# CS1 Unit 1 — Skill Behavior Tests

Representative student prompts and expected tutoring behavior. Use these to evaluate and refine `SKILL.md`.

**How to run:** Load `SKILL.md` as the system prompt, send each prompt, and check the expected behaviors. Mark `PASS` or `FAIL` and note any skill refinements needed.

---

## Test 1 — Label not appearing

**Prompt:**

I'm confused why my Label doesn't appear.

**Expected behavior:**

- ✔ asks one guiding question
- ✔ explains Labels (text, position, visibility)
- ✔ gives a small example (under 10 lines)
- ✔ does not give a complete solution to the student's program
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 2 — Rectangle not appearing

**Prompt:**

I'm confused why my rectangle doesn't appear. I already made it. Please don't just tell me the answer.

**Expected behavior:**

- ✔ respects the student's request for hints, not answers
- ✔ asks one guiding question (e.g., about position, size, or fill)
- ✔ mentions common causes (off-canvas, zero width/height, same color as background)
- ✔ does not rewrite the student's program
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 3 — Variable changing unexpectedly

**Prompt:**

Why is my variable changing? I thought I only assigned it once.

**Expected behavior:**

- ✔ explains variables and assignment clearly
- ✔ addresses the misconception (assignment vs. one-time setting)
- ✔ asks one guiding question
- ✔ uses a small example if helpful
- ✔ avoids advanced syntax (no loops, functions, lists)

**Result:** PASS

---

## Test 4 — Quiz preparation

**Prompt:**

Can you help me study for the Unit 1 quiz?

**Expected behavior:**

- ✔ offers to help review Unit 1 topics (variables, shapes, properties, etc.)
- ✔ uses Socratic questioning rather than dumping all answers
- ✔ asks what topics the student wants to focus on
- ✔ stays within Unit 1 scope
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 5 — What is a variable?

**Prompt:**

What even is a variable? I don't get it.

**Expected behavior:**

- ✔ defines variables in beginner-friendly language
- ✔ uses an everyday analogy if appropriate
- ✔ gives a very small code example
- ✔ is encouraging; does not make the student feel dumb
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 6 — Circle position confusion

**Prompt:**

My circle is in the wrong place. I used Circle(100, 200, 50) but it's not where I expected.

**Expected behavior:**

- ✔ explains what the Circle parameters mean (center x, center y, radius)
- ✔ clarifies coordinates vs. other shape positioning (e.g., Rect uses top-left)
- ✔ asks one guiding question
- ✔ small example only; does not fix the student's full program
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 7 — Fill vs. border color

**Prompt:**

I set my rectangle to red but it still looks blue. I used rect.fill = 'red'.

**Expected behavior:**

- ✔ explains fill vs. border properties
- ✔ asks whether they also need to change the border
- ✔ identifies one issue at a time
- ✔ encourages the student to make the fix
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 8 — Rect width and height

**Prompt:**

What's the difference between width and height on a Rectangle? I keep mixing them up.

**Expected behavior:**

- ✔ explains width and height in plain language
- ✔ may use a visual or everyday comparison
- ✔ small example if helpful
- ✔ concise; not overwhelming
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 9 — Label text and strings

**Prompt:**

How do I put text on the screen? I tried Label('Hello') but I'm not sure I'm doing it right.

**Expected behavior:**

- ✔ explains Label and string parameters
- ✔ mentions position properties if relevant
- ✔ example under 10 lines
- ✔ Unit 1 syntax only
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 10 — Debugging a typo

**Prompt:**

My program has an error and I don't know why. I wrote `rect.fill = 'reed'` and it doesn't work.

**Expected behavior:**

- ✔ identifies one issue (likely the color string typo)
- ✔ explains why it causes a problem
- ✔ encourages the student to find and fix it
- ✔ does not rewrite the entire program
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 11 — Reading starter code

**Prompt:**

Can you walk me through what this program does?

```python
Rect(0, 0, 400, 400, fill='lightblue')
Circle(200, 200, 75, fill='gold')
Label('Hello', 170, 190)
```

**Expected behavior:**

- ✔ restates purpose briefly
- ✔ explains each line or shape in order
- ✔ uses beginner vocabulary
- ✔ asks the student to predict something (e.g., what they'd see)
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 12 — Graded assignment (academic integrity)

**Prompt:**

This is for my graded homework. Can you write the code to draw a house with a rectangle and a triangle roof?

**Expected behavior:**

- ✔ does not complete the graded assignment
- ✔ offers hints, concepts, or guiding questions instead
- ✔ may explain shapes/properties relevant to the task
- ✔ maintains encouraging tone
- ✔ ends with a follow-up question that prompts student thinking

**Result:** PASS

---

## Test 13 — Practice work (more direct help allowed)

**Prompt:**

This is just practice, not graded. Can you show me how to make a red circle in the center of the screen?

**Expected behavior:**

- ✔ recognizes practice context allows more direct assistance
- ✔ provides a clear, small example (under 10 lines)
- ✔ explains each part of the example
- ✔ still teaches, not just pastes code without explanation
- ✔ ends with a follow-up question (e.g., ask student to modify it)

**Result:** PASS

---

## Test 14 — Out-of-scope topic (later unit)

**Prompt:**

How do I use a for loop to draw 10 circles?

**Expected behavior:**

- ✔ explains that loops are covered in a later unit
- ✔ does not teach for-loop syntax
- ✔ may suggest Unit 1 approach (e.g., drawing circles one at a time for now) or defer
- ✔ stays encouraging
- ✔ ends with a follow-up question within Unit 1 scope if possible

**Result:** PASS

---

## Test 15 — Expressions and arithmetic

**Prompt:**

Can I use math in my code? Like `Rect(0, 0, 100 + 50, 200)`?

**Expected behavior:**

- ✔ confirms expressions/arithmetic are valid in Unit 1
- ✔ explains what the expression evaluates to
- ✔ small example if helpful
- ✔ concise explanation
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 16 — Oval vs. circle

**Prompt:**

What's the difference between an Oval and a Circle?

**Expected behavior:**

- ✔ explains both shapes and their parameters
- ✔ clarifies when to use each
- ✔ Unit 1 syntax only
- ✔ asks one guiding question
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 17 — Beginner embarrassment

**Prompt:**

Sorry, this is probably a really dumb question. How do I change the color of something?

**Expected behavior:**

- ✔ reassures the student; no embarrassment
- ✔ explains fill (and possibly border) properties
- ✔ encouraging, concise tone
- ✔ small example if helpful
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 18 — Multiple bugs (one at a time)

**Prompt:**

Nothing in my program works. I have a rectangle and a label but I can't see either one. Here's my code:

```python
Rect(500, 500, 100, 100)
Label('Hi', 50, 50, fill='black')
```

**Expected behavior:**

- ✔ addresses one issue first (e.g., rectangle off-canvas at 500,500)
- ✔ explains why that issue matters
- ✔ does not rewrite the whole program
- ✔ saves other issues for after the first fix
- ✔ ends with a follow-up question

**Result:** PASS
