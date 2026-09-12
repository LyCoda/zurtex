"""Outline the existing Afacad lettering beside Zurtex's original SVG mark."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

root = Path(__file__).resolve().parents[1]
font = instantiateVariableFont(
    TTFont(root / ".vinext/fonts/afacad-460663111fd9/afacad-f43deb4e.woff2"),
    {"wght": 650},
    inplace=False,
)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
scale = 76 / font["head"].unitsPerEm
x = 75.0
paths = []
for character in "Zurtex":
    glyph = glyphs[cmap[ord(character)]]
    pen = SVGPathPen(glyphs)
    glyph.draw(TransformPen(pen, (scale, 0, 0, -scale, x, 61)))
    paths.append(f'<path d="{pen.getCommands()}"/>')
    x += glyph.width * scale - 1.25

width = round(x + 3)
mark = (root / "public/brand/zurtex-mark.svg").read_text(encoding="utf-8")
mark_content = mark[mark.index(">") + 1:mark.rindex("</svg>")]
for filename, ink in [("zurtex-logo.svg", "#0b5c59"), ("zurtex-logo-reversed.svg", "#ffffff")]:
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} 72" fill="{ink}">\n'
    svg += mark_content + "\n" + "\n".join(paths) + "\n</svg>\n"
    (root / "public/brand" / filename).write_text(svg, encoding="utf-8")
print(f"Outlined logo: {width} x 72; regular and reversed SVGs saved.")
