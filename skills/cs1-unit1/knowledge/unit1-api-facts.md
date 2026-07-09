# CMU CS Academy CS1 Unit 1 API Facts

Use CMU Graphics syntax only.

Rect(left, top, width, height, ...)
Circle(centerX, centerY, radius, ...)
Oval(left, top, width, height, ...)
Line(x1, y1, x2, y2, ...)
Label(value, centerX, centerY, ...)

Coordinate system:
- x increases left to right
- y increases top to bottom
- canvas is usually 400 by 400

Drawing order:
- later shapes are drawn on top of earlier shapes

Rect defaults:
- fill defaults to 'black'
- border defaults to None
- borderWidth defaults to 2
- fill=None means transparent/no fill
- fill='white' means solid white fill

Style:
- color names are strings: fill='red'
- None is not a string: fill=None, not fill='None'