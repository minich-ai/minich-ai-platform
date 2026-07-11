---
title: "CMU CS Academy CS1 Unit 1.2.1 - Fills and Borders"
source: "CMU CS Academy CS1, Unit 1.2.1 Fills and Borders"
audience: "student-facing tutor knowledge"
topics:
  - Rect
  - fill
  - border
  - borderWidth
  - dashes
  - drawing order
  - fill=None
  - Inspector
  - syntax errors
---

# Unit 1.2.1 - Fills and Borders

## Purpose

This note explains CMU CS Academy CS1 rectangle styling concepts for Unit 1.2.1.
Use this as source context when helping students with questions about `fill`, `border`, `borderWidth`, `dashes`, drawing order, empty fills, and Inspector feedback.

Use CMU CS Academy / CMU Graphics syntax only.

---

## Changing a Shape's Color with `fill`

In CMU CS Academy, a shape's color can be changed with the optional `fill` argument.

```python
Rect(50, 50, 100, 100, fill='green')
```

This draws a rectangle at left `50`, top `50`, with width `100`, height `100`, and a green fill color.

### Rules for `fill`

When using `fill` with `Rect`, follow these rules:

1. Put `fill` after the required arguments: `left`, `top`, `width`, and `height`.
2. Use an equals sign between `fill` and the color.
3. Put color names in quotes.

Correct:

```python
Rect(50, 50, 100, 100, fill='orange')
```

Also correct:

```python
Rect(50, 50, 100, 100, fill="orange")
```

Incorrect:

```python
Rect(50, 50, 100, 100, fill=orange)
```

Why it is incorrect: color names such as `'orange'`, `'blue'`, and `'green'` are strings, so they need quotes.

---

## Drawing Order

The order of shape statements matters.

Each new shape is drawn on top of shapes that were created before it.

```python
Rect(0, 0, 100, 100, fill='orange')
Rect(50, 50, 100, 100, fill='lime')
```

In this example, the lime rectangle is drawn after the orange rectangle, so the lime rectangle appears on top where the two overlap.

Student misconception to watch for: a rectangle may seem to disappear if another shape is drawn over it later.

---

## Borders

A rectangle can have an optional border.

```python
Rect(50, 50, 100, 100, fill='yellow', border='blue')
```

This draws a yellow rectangle with a blue border.

The border color is also a string, so the color name needs quotes.

---

## `borderWidth`

The default border width is `2` pixels.

You can change the width of the border with `borderWidth`.

```python
Rect(50, 50, 100, 100, fill='yellow', border='blue', borderWidth=12)
```

This draws a yellow rectangle with a blue border that is 12 pixels wide.

Important spelling: use `borderWidth` with a capital `W`.

---

## Dashed Borders

Rectangle borders can be dashed by using the optional `dashes` argument.

```python
Rect(50, 50, 100, 100, fill='cyan', border='navy', dashes=True)
```

Usually, dashed borders use:

```python
dashes=True
```

A dash pattern can also be created with a pair of values:

```python
Rect(50, 50, 100, 100, fill='cyan', border='navy', dashes=(1, 4))
```

In `dashes=(dashWidth, gapWidth)`, the first number controls the dash length and the second number controls the gap length.

---

## Empty Fills with `fill=None`

A rectangle can have a border but no fill.

Use `fill=None`.

```python
Rect(50, 50, 100, 100, fill=None, border='blue', borderWidth=6)
```

Important rules:

- Use `None`, not `none`.
- Do not put quotes around `None`.
- `fill=None` means no fill / transparent fill.
- `fill='white'` means a solid white fill.

Correct:

```python
Rect(50, 50, 100, 100, fill=None, border='blue')
```

Incorrect:

```python
Rect(50, 50, 100, 100, fill='None', border='blue')
```

Incorrect:

```python
Rect(50, 50, 100, 100, fill=none, border='blue')
```

---

## `fill=None` Versus `fill='white'`

These are not the same.

### No fill

```python
Rect(0, 0, 100, 100, fill='orange')
Rect(50, 50, 100, 100, fill=None, border='blue', borderWidth=6)
```

The second rectangle has no fill, so the orange rectangle behind it can still be seen inside the border.

### White fill

```python
Rect(200, 0, 100, 100, fill='orange')
Rect(250, 50, 100, 100, fill='white', border='blue', borderWidth=6)
```

The second rectangle has a solid white fill, so it covers anything behind it.

---

## Default Values

Some rectangle arguments are optional. If an optional argument is not included, CMU Graphics uses a default value.

For rectangles in this lesson:

| Argument | Default value |
|---|---|
| `fill` | `'black'` |
| `border` | `None` |
| `borderWidth` | `2` |

Example:

```python
Rect(50, 50, 100, 100)
```

This rectangle has the default fill of `'black'`.

---

## The Inspector

The Inspector helps compare the student's canvas to the target canvas.

Important details:

- The Inspector gives useful information about shapes.
- It may show color information, but the student may need to reason about whether a color belongs to the fill or the border.
- Sometimes two canvases may look the same, but the underlying shapes or properties are different.
- If the canvas looks correct but the code is marked incorrect, the Inspector can help identify mismatched shape properties.

Example issue: a student may draw something that visually resembles the target, but one shape has `fill='white'` when the expected solution uses `fill=None`.

---

## Common Student Questions and Tutor Guidance

### "Why didn't `fill=orange` work?"

Likely issue: the color name is missing quotes.

Guide the student toward:

```python
fill='orange'
```

Ask: "What kind of value is a color name in CMU CS Academy - a number or a string?"

---

### "Why is my rectangle black?"

Likely issue: no `fill` was supplied, so the rectangle used the default fill color, `'black'`.

Ask: "Where could you add the optional `fill` argument after the required rectangle arguments?"

---

### "Why is my rectangle hidden?"

Likely issue: another shape may have been drawn after it.

Remind the student: later shapes appear on top of earlier shapes.

Ask: "Which shape is created last in your code?"

---

### "How do I make a rectangle with only an outline?"

Use `fill=None` and set a `border`.

```python
Rect(50, 50, 100, 100, fill=None, border='blue')
```

Ask: "Why should `None` not have quotes around it?"

---

### "Why does the picture look right but the checker says it is wrong?"

Possible issue: the visual image may match, but the shape properties may not match.

Use the Inspector to compare properties such as fill, border, border width, and shape type.

Ask: "What difference does the Inspector show between your canvas and the target canvas?"

---

## Tutor Rules for This Topic

When helping students with this lesson:

- Use CMU Graphics syntax only.
- Do not mention pygame, turtle, tkinter, JavaScript, HTML canvas, or generic graphics libraries.
- Do not complete graded exercises for students.
- Help students inspect one issue at a time.
- Emphasize syntax details: quotes, equals signs, capitalization, and argument order.
- Reinforce drawing order when shapes overlap.
- Reinforce the difference between `None` and string color names.
