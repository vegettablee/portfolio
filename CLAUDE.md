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

  - using the spade_ouroboros.svg, add 3 different types of animations based on the layers in the svg. 
  - 1st: a vitality based one, where the spade along with the diamonds glow, reverberating almost as if the billiards player had received a great stroke of luck and made a beautiful shot. ideally this is going to be almost like between a vibrant red and a darker red, similar palette to the current color-scheme, but should subtly capture and oscillate, like almost like luck is being breathed in and out. 
  - 2nd: snake heavy animation directly based on the snake-head inline svgs, where it traces from the bottom of the snake(near the rattle-tail portion). get creative with what else you can add here, try different speeds in which they trace upon the snake, and if they reach the top, make this a separate unique effect as well.
  - 3rd: a colder-blue based animation, this one will be generally more subtle, but still have a clean effect. a more ocean-based one, almost like poseiden himself were pushing himself through the spade, with his staff being the snake heads itself.

  if needed, you may modify the categories of the inline svgs in the spade_ouroboros.svg as well if you need more granular control over which parts are used for each animation and what not. take your time creating each animation as these should be relatively complex, and put all of the animation activations into one file, but the ui specific code elsewhere, so i can easily choose which one to display at a time. when displaying the animations, play them for 4 seconds each, and then switch so i can easily view what went wrong, keeping it in the same place as the current spade is, in the top left corner of the homepage.

```

---

## Implementation Prompt

```
/frontend-design

Read design_elements/page_design/page_design.md for the full design spec. This includes some of the main fonts/colors/palette used, but does not always reflect what is currently on the portfolio already. This is just suggestion context when designing and adding other elements to the portfolio.

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
Use realistic content from page_preview.html — no placeholder text(if needed). 
Tech stack: React + Tailwind CSS + Framer Motion. However, depending on the task(like animation/complex-ui, new libraries are considered as well)
</constraints>

<frontend_aesthetics>
NEVER use generic AI-generated aesthetics: overused font families (Inter, Roboto, Arial, system fonts),
clichéd color schemes, predictable layouts, cookie-cutter components.
</frontend_aesthetics>
```
