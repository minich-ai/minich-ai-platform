# CMU CS Academy CS1 Unit 1 API Facts

Use CMU Graphics / CMU CS Academy syntax only.

This file is a high-priority reference for the CS1 tutor. When answering CMU CS Academy questions, follow these facts over general Python graphics knowledge.

---

## Do Not Use Non-CMU Graphics Libraries

Do not use or recommend:

- `turtle`
- `tkinter`
- `pygame`
- `matplotlib`
- JavaScript
- HTML canvas
- CSS
- generic Python graphics libraries

When giving graphics examples, use CMU CS Academy syntax such as:

```python
Rect(50, 50, 100, 100, fill='orange')
Circle(200, 200, 50)
Label('Hello', 200, 200)
```

---

## Basic Shapes

```python
Rect(left, top, width, height, ...)
Circle(centerX, centerY, radius, ...)
Oval(left, top, width, height, ...)
Line(x1, y1, x2, y2, ...)
Label(value, centerX, centerY, ...)
```

Use these CMU CS Academy shape functions instead of imports, classes, canvases, or external graphics packages.

---

## Coordinate System

- The canvas is usually 400 by 400.
- `x` increases from left to right.
- `y` increases from top to bottom.
- `(0, 0)` is the top-left corner.
- Larger `x` values move shapes to the right.
- Larger `y` values move shapes down.

---

## Drawing Order

Later shapes are drawn on top of earlier shapes.

Example:

```python
Rect(0, 0, 100, 100, fill='orange')
Rect(50, 50, 100, 100, fill='lime')
```

The lime rectangle appears on top of the orange rectangle because it is drawn second.

---

## Rect

```python
Rect(left, top, width, height, ...)
```

Required arguments:

```text
left, top, width, height
```

Common optional arguments:

```text
fill
border
borderWidth
dashes
opacity
rotateAngle
```

Example:

```python
Rect(50, 50, 100, 100, fill='orange')
```

---

## Rect Defaults

If optional arguments are not supplied, CMU CS Academy uses default values.

Important defaults:

- `fill` defaults to `'black'`
- `border` defaults to `None`
- `borderWidth` defaults to `2`

So this:

```python
Rect(50, 50, 100, 100)
```

creates a black rectangle.

---

## Fill

Use `fill` to change the inside color of a shape.

Correct:

```python
Rect(50, 50, 100, 100, fill='orange')
```

Incorrect:

```python
Rect(50, 50, 100, 100, fill=orange)
```

Why it is incorrect:

- Color names are strings.
- Strings need quotation marks.

Correct color examples:

```python
fill='red'
fill='blue'
fill='orange'
fill="green"
```

Single quotes and double quotes both work.

---

## None

`None` is a special Python value. It is not a string.

Correct:

```python
Rect(50, 50, 100, 100, fill=None)
```

Incorrect:

```python
Rect(50, 50, 100, 100, fill='None')
```

Also incorrect:

```python
Rect(50, 50, 100, 100, fill=none)
```

Use capital `N`:

```python
None
```

---

## Empty Fill vs White Fill

`fill=None` means no fill / transparent fill.

```python
Rect(50, 50, 100, 100, fill=None, border='blue')
```

`fill='white'` means a solid white fill.

```python
Rect(50, 50, 100, 100, fill='white', border='blue')
```

These are not the same.

If another shape is behind the rectangle:

- `fill=None` lets the shape behind it show through.
- `fill='white'` covers the shape behind it with white.

---

## Borders

Use `border` to set the outline color.

```python
Rect(50, 50, 100, 100, fill='yellow', border='blue')
```

By default, borders are 2 pixels wide.

Use `borderWidth` to change the thickness.

```python
Rect(50, 50, 100, 100, fill='yellow', border='blue', borderWidth=12)
```

---

## Dashes

Rectangle borders may use dashes.

Simple dashed border:

```python
Rect(50, 50, 100, 100, fill='cyan', border='navy', dashes=True)
```

Custom dash pattern:

```python
Rect(50, 50, 100, 100, fill='cyan', border='navy', dashes=(1, 4))
```

The pair `(dashWidth, gapWidth)` controls the dash pattern.

---

## Labels

```python
Label(value, centerX, centerY, ...)
```

Labels place text on the canvas.

Example:

```python
Label('Hello', 200, 200)
```

Important facts:

- The first argument is the text or value to display.
- The second argument is the center x-coordinate.
- The third argument is the center y-coordinate.
- Labels are positioned by their center, not by their top-left corner.

Common optional arguments may include:

```text
size
fill
bold
italic
font
```

Example:

```python
Label('Score', 200, 40, size=24, fill='blue')
```

---

## Common Beginner Mistakes

### Forgetting quotes around colors

Incorrect:

```python
Rect(50, 50, 100, 100, fill=orange)
```

Correct:

```python
Rect(50, 50, 100, 100, fill='orange')
```

---

### Using lowercase none

Incorrect:

```python
Rect(50, 50, 100, 100, fill=none)
```

Correct:

```python
Rect(50, 50, 100, 100, fill=None)
```

---

### Using `'None'` as a string

Incorrect:

```python
Rect(50, 50, 100, 100, fill='None')
```

Correct:

```python
Rect(50, 50, 100, 100, fill=None)
```

---

### Forgetting that drawing order matters

If a shape does not appear, it may be hidden behind a later shape.

Example:

```python
Rect(50, 50, 100, 100, fill='red')
Rect(50, 50, 100, 100, fill='blue')
```

The blue rectangle covers the red rectangle because it is drawn second.

---

## Tutor Rules

When a student asks about CMU CS Academy:

- Answer using CMU CS Academy syntax.
- Use `Rect`, `Circle`, `Oval`, `Line`, `Polygon`, `Label`, and `app.background` when appropriate.
- Do not switch to `turtle`, `tkinter`, `pygame`, JavaScript, HTML canvas, CSS, or generic Python graphics.
- Keep examples short and beginner-friendly.
- Use only Unit 1-appropriate syntax unless the student explicitly asks about a later topic.
- For graded homework, give hints and guiding questions instead of complete solutions.
- If a student asks for code, provide the smallest useful example.
- If a student is debugging, identify one likely issue at a time.
- End with one guiding question when practical.

---

## Good Answer Pattern

A good tutor answer should usually:

1. Identify the CMU CS Academy concept.
2. Explain the issue briefly.
3. Show a tiny CMU-style example if helpful.
4. Ask the student to predict or check one thing.

Example:

> In CMU CS Academy, color names need quotes because they are strings. So `fill=orange` causes an error, but `fill='orange'` works. What do you think would happen if you changed `'orange'` to `'blue'`?