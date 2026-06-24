# design_elements

Decision layer between the design brief (`../../CLAUDE.md`) and implementation (`../../portfolio/`).

---

**`colors.md`** — defines 3 palettes (PALETTE-A · PALETTE-B · PALETTE-C) with CSS tokens and hex values.
**`colors_preview.html`** — open in browser to see all three palettes rendered with context mockups.

**`fonts.md`** — defines 5 pairings (FONT-1 through FONT-5) with Google Fonts links and typographic rules.
**`fonts_preview.html`** — open in browser to see all five pairings rendered in PALETTE-B.

---

**`page_design/page_designs.md`** — the active design spec. Set `PALETTE` and `FONT` at the top, then fill each section slot. One file = one design direction.
**`page_design/page_preview.html`** — single rendered output of whatever is in `page_designs.md`. Regenerated each iteration. Never holds more than one design.

---

Workflow: fill `page_designs.md` → render `page_preview.html` → review → iterate.
