# Match a CSS color
# http://www.w3.org/TR/css3-color/#colorunits

@builtin "whitespace.ne" # `_` means arbitrary amount of whitespace
@builtin "number.ne"     # `int`, `decimal`, and `percentage` number primitives

csscolor -> "#" hexdigit hexdigit hexdigit hexdigit hexdigit hexdigit
          | "#" hexdigit hexdigit hexdigit
          | "rgb"  _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ ")"
          | "hsl"  _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ ")"
          | "rgba" _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ "," _ decimal _ ")"
          | "hsla" _ "(" _ colnum _ "," _ colnum _ "," _ colnum _ "," _ decimal _ ")"

hexdigit -> [a-fA-F0-9]
colnum   -> int | percentage