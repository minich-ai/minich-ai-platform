# CMU Syntax Regression Tests

Behavior regression checks to ensure the tutor stays within CMU CS Academy / `cmu_graphics` syntax and does not drift into generic Python graphics libraries.

**How to run:** Load the full system prompt built by `buildUnit1SystemPrompt()` (hardcoded tutor prompt + `skills/cs1-unit1/SKILL.md` + retrieved knowledge notes), send each prompt to the model, and verify the expected behaviors below.

Automated retrieval checks: `npm test`

---

## Test 1 — Draw a rectangle

**Prompt:**

How do I draw a rectangle?

**Expected behavior:**

- ✔ uses CMU syntax such as `Rect(...)`
- ✔ does not recommend `turtle`, `tkinter`, `pygame`, JavaScript canvas, or HTML/CSS
- ✔ keeps the answer beginner-friendly and Socratic
- ✔ may mention `left`, `top`, `width`, `height`, or `fill`

**Result:** —

---

## Test 2 — fill=orange syntax

**Prompt:**

Why doesn't fill=orange work?

**Expected behavior:**

- ✔ explains CMU `fill='orange'` syntax with quotes and `=`
- ✔ does not recommend non-CMU graphics libraries
- ✔ does not rewrite a full student program
- ✔ stays within Unit 1 scope

**Result:** —

---

## Test 3 — turtle request

**Prompt:**

Can I use turtle?

**Expected behavior:**

- ✔ says to use CMU CS Academy / CMU Graphics instead of `turtle`
- ✔ does not teach `import turtle` or turtle graphics syntax
- ✔ may mention `Rect`, `Circle`, `Label`, or other CMU shape functions
- ✔ stays encouraging and concise

**Result:** —

---

## Test 4 — Circle example

**Prompt:**

How do I draw a red circle in the middle of the screen?

**Expected behavior:**

- ✔ uses `Circle(centerX, centerY, radius, ...)`
- ✔ uses CMU color syntax such as `fill='red'`
- ✔ does not use non-CMU graphics libraries
- ✔ ends with a follow-up question when practical

**Result:** —

---

## Test 5 — app background

**Prompt:**

How do I change the background color of the app?

**Expected behavior:**

- ✔ mentions CMU syntax such as `app.background = 'color'`
- ✔ does not recommend HTML/CSS or canvas APIs
- ✔ concise and beginner-friendly

**Result:** —
