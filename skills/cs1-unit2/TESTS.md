# CS1 Unit 2 — Skill Behavior Tests

Representative student prompts and expected tutoring behavior. Use these to evaluate and refine `SKILL.md`.

**How to run:** Load `SKILL.md` as the system prompt, send each prompt, and check the expected behaviors. Mark `PASS` or `FAIL` and note any skill refinements needed.

---

## Test 1 — What is an if statement?

**Prompt:**

What does an if statement even do? I don't get it.

**Expected behavior:**

- ✔ explains conditionals in beginner-friendly language
- ✔ uses an everyday analogy if appropriate
- ✔ gives a very small example
- ✔ is encouraging
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 2 — if vs else

**Prompt:**

When do I use else? I have an if but I'm not sure I need else.

**Expected behavior:**

- ✔ explains when `else` runs (when the `if` condition is false)
- ✔ asks one guiding question
- ✔ small example under 10 lines
- ✔ Unit 2 syntax only
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 3 — Equals vs assignment (= vs ==)

**Prompt:**

Why doesn't `if x = 5` work? I thought I was checking if x equals 5.

**Expected behavior:**

- ✔ explains `=` vs `==` clearly
- ✔ addresses the classic beginner misconception
- ✔ encourages the student to fix it
- ✔ does not rewrite the whole program
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 4 — Boolean values

**Prompt:**

What are True and False? My teacher said something about booleans.

**Expected behavior:**

- ✔ defines booleans simply
- ✔ connects to conditions in `if` statements
- ✔ small example if helpful
- ✔ concise
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 5 — Comparison operators

**Prompt:**

What's the difference between `>` and `>=`? I keep picking the wrong one.

**Expected behavior:**

- ✔ explains both operators in plain language
- ✔ may use a numeric example
- ✔ asks one guiding question
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 6 — and / or / not

**Prompt:**

How do I check if TWO things are true at the same time?

**Expected behavior:**

- ✔ explains `and` (and possibly mentions `or` briefly)
- ✔ small example combining two conditions
- ✔ Unit 2 syntax only
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 7 — Indentation error

**Prompt:**

I have an IndentationError on my if statement and I don't know why.

**Expected behavior:**

- ✔ explains indentation inside conditional blocks
- ✔ identifies one issue at a time
- ✔ encourages the student to fix it
- ✔ does not rewrite the entire program
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 8 — elif

**Prompt:**

My teacher said to use elif but I only know if and else.

**Expected behavior:**

- ✔ explains `elif` as "else if" / another condition to check
- ✔ small chained example if helpful
- ✔ concise
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 9 — Graded assignment (academic integrity)

**Prompt:**

This is graded homework. Can you write the if statement that changes the circle color when the mouse is on the left side?

**Expected behavior:**

- ✔ does not complete the graded assignment
- ✔ offers hints and guiding questions
- ✔ may explain relevant conditional concepts
- ✔ encouraging tone
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 10 — Out-of-scope topic (loops)

**Prompt:**

How do I use a for loop to draw 10 circles only when a key is pressed?

**Expected behavior:**

- ✔ explains that loops are covered in a later unit
- ✔ does not teach for-loop syntax
- ✔ may address the conditional part at Unit 2 level if appropriate
- ✔ stays encouraging
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 11 — Unit 2 quiz prep

**Prompt:**

Can you help me study for the Unit 2 quiz on conditionals?

**Expected behavior:**

- ✔ offers to review Unit 2 topics (booleans, comparisons, if/else, etc.)
- ✔ uses Socratic questioning
- ✔ asks what to focus on
- ✔ stays within Unit 2 scope
- ✔ ends with a follow-up question

**Result:** PASS

---

## Test 12 — Predict the branch

**Prompt:**

```python
x = 10
if x > 5:
    Rect(0, 0, 100, 100, fill='red')
else:
    Rect(0, 0, 100, 100, fill='blue')
```

Will I get a red rectangle or a blue one?

**Expected behavior:**

- ✔ walks through the condition evaluation
- ✔ asks the student to predict before confirming
- ✔ explains why the chosen branch runs
- ✔ beginner vocabulary
- ✔ ends with a follow-up question

**Result:** PASS
