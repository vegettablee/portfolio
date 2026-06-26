# Portfolio — Frontend Design Prompt

---

## Project Constraints

- When constructing any prompt for this project, reference `prompt_engineering/CLAUDE.md` for best practices before writing it
- For all aesthetic, layout, color, and typography decisions, read `design_elements/page_design/page_design.md` — do not repeat those details here
- `design_elements/page_design/page_preview.html` is the visual reference — match it precisely
- Active palette and font are declared in `design_elements/page_design/page_design.md` section 01
- Never rebuild from scratch when status is ITERATING — apply only the declared delta
- Never use Inter, Roboto, system-ui, or any generic font family
- No mobile breakpoints for now — desktop-only prototype

---

## Design References

```
Spec           →  design_elements/page_design/page_design.md
Visual ref     →  design_elements/page_design/page_preview.html
Color options  →  design_elements/colors.md
Font options   →  design_elements/fonts.md
Design layer   →  design_elements/CLAUDE.md
Prompt guide   →  prompt_engineering/CLAUDE.md
```

---

## Prototype Status: Selected -> [ITERATING]

### ── SET ONE BEFORE INVOKING ──

```
STATUS: NEW PROTOTYPE

Build from scratch using page_design.md as spec and page_preview.html as visual reference.
Target: portfolio/src/
```

---

```
STATUS: ITERATING

Previous build: portfolio/src/ (existing implementation)
Preserve everything not listed below. Do not rebuild.

Changes this iteration:
  - add the pattern called pattern_portfolio_1 to overlay in the background 

```

---

## Implementation Prompt

```
/frontend-design

Read design_elements/page_design/page_design.md for the full design spec.
Read design_elements/page_design/page_preview.html as the visual reference — match it precisely(only if status is NEW PROTOTYPE, otherwise, this is subject to change significantly). 

<identity>
Name: Preston Rank
Role: Solutions Engineer and Software Engineer
Tagline: Building systems at the intersection of product and engineering.
Tone: captivation through dark mystery — warmth revealed through interacting with the circle
</identity>

<status>
[ paste active STATUS block here before invoking ]
</status>

<constraints>
Do not invent layout, color, or interaction patterns not described in page_design.md.
Do not add features not in the spec.
Use realistic content from page_preview.html — no placeholder text.
Tech stack: React + Tailwind CSS + Framer Motion.
</constraints>

<frontend_aesthetics>
NEVER use generic AI-generated aesthetics: overused font families (Inter, Roboto, Arial, system fonts),
clichéd color schemes, predictable layouts, cookie-cutter components. The visual direction is fully
specified in page_design.md — execute it, do not improvise.
</frontend_aesthetics>
```
