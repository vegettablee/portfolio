# Page Design Spec

Reference files:
- Palettes  → `../colors.md`   (PALETTE-A · PALETTE-B · PALETTE-C)
- Pairings  → `../fonts.md`    (FONT-1 · FONT-2 · FONT-3 · FONT-4 · FONT-5)
- Full spec → `../../CLAUDE.md`

---

## 01 — SELECTIONS

```
PALETTE  :  Custom — "Mist Teal" (override of PALETTE-C)
            #143842 bg · #1A4854 surface · #D8DDE8 text · #E8DCC0 accent (ivory) · #0D2A33 secondary · #4A6A7C secondary-accent (slate)
FONT     :  FONT-4      →  Cormorant Garamond (heading) · DM Sans 300 (body) · Fira Code (mono/labels)
```

---

## 02 — LAYOUT CONCEPT

```
Type        :  Two-panel, fixed viewport — NO SCROLL
Structure   :  Left 54% | Right 46%
Left panel  :  Name (top-left) + large rotating circle (centered)
Right panel  :  Content area — default state + 3 section panes (swapped via circle interaction)
Overflow    :  Hidden on body. Right pane content scrolls internally if needed (scrollbar hidden).
Max width   :  Full viewport, no container constraint
```

---

## 03 — NAVIGATION

```
Style       :  None — the circle IS the navigation
Nodes       :  3 interactive points on the circle at 50°, 0°, -50° (upper-right, right, lower-right)
Labels      :  Experience · Projects · About (Fira Code, 8.5px, 0.14em tracking, uppercase)
Social      :  LinkedIn ↗ · GitHub ↗ · email — shown in default right panel state only
Bottom strip:  Fixed 34px bar — role left, copyright right (fadeIn on load delay)
```

---

## 04 — CIRCLE (Guruguru)

```
Size        :  500px, SVG viewBox 560x560, center at 280,280
Rings       :  5 static rings at r=210,175,140,105,68 (alternating solid/dashed, opacity 0.06–0.10)
Outer ring  :  r=250, rotates 85s linear infinite
Text path   :  "SOLUTIONS ENGINEER · SOFTWARE ENGINEER ·" repeating, Fira Code 8.5px, opacity 0.22
Center text :  "P · RANK / 2026" — Fira Code, very dim

Node positions (on r=210 ring):
  Experience : 50° above horizontal  → cx=414.9, cy=119.1
  Projects   : 0°  (straight right)  → cx=490,   cy=280
  About      : 50° below horizontal  → cx=414.9, cy=440.9

Per node:
  - Dot: r=3.5, accent color, opacity 0.5 → 1.0 on active
  - Ring: r=11, stroke accent, opacity 0 → 0.35 on active
  - Line: stroke-dashoffset draw animation toward right edge (x2=548) on active
  - Label: Fira Code 8.5px, muted → var(--text) on active
  - Trigger: transparent circle r=30 for hover target

Arc highlights (r=210, ±15° around each node):
  Experience : M 368.7,89.7  A 210,210 0 0,1 452.0,159.6
  Projects   : M 482.8,225.7 A 210,210 0 0,1 482.8,334.3
  About      : M 452.0,400.4 A 210,210 0 0,1 368.7,470.3
  Style      : stroke #E8DCC0 (ivory), stroke-width 2.4, round caps,
              opacity 0.78 (ambient — softens to 0.5 idle, brightens to 0.9 on active node)

No cyan ring-hugs around the orb. Tight rings removed; arcs alone signal the orb.
```

---

## 05 — NAME BLOCK

```
Position    :  Top-left of left panel, z-index above circle
First name  :  Cormorant Garamond, italic, weight 300, clamp(44px–82px), color var(--text)
Last name   :  Cormorant Garamond, roman, weight 400, same size, color var(--muted)
Line height :  0.88
Animation   :  fadeUp staggered (first 0.15s delay, last 0.4s delay)
```

---

## 06 — RIGHT PANEL: DEFAULT STATE

```
Layout      :  Flex column, justify center, full height
Eyebrow     :  "Est. — United States" — Fira Code 9px, accent color, 0.22em tracking
Headline    :  "Building systems at the intersection of product and engineering."
              Cormorant Garamond, weight 300, ~28px, muted — "product and engineering" italic+white
Hint        :  "approach the circle to explore" — Fira Code 9px, dim, left rule line
Socials     :  LinkedIn ↗ · GitHub ↗ · email — Fira Code 9px, accent, 0.55 opacity → 1 hover
Animation   :  Each element fadeUp, staggered 1.1s–1.7s on load
```

---

## 07 — RIGHT PANEL: SECTION PANES

```
Transition  :  opacity 0→1 + translateX(12px→0), 0.45s ease
Ghost num   :  Absolute, bottom-right, Cormorant 240px weight 300, opacity 0.025
              Changes to "01"/"02"/"03" per active section, fades in with translateY

Divider glow:  1px right edge of left panel, accent gradient top→bottom→top
               opacity 0→0.35 when any section is active

Shared label:  "0N — Section Name" — Fira Code 9px, accent, 0.22em, with 44px border-color rule after

Experience entries (3):
  Layout    :  Stacked rows, border-bottom var(--border)
  Company   :  Cormorant Garamond italic 26px, white
  Date      :  Fira Code 9px, dim — right-aligned in same row
  Role      :  DM Sans 9px, 0.16em tracking, uppercase, accent
  Desc      :  DM Sans 12px, 1.85 line-height, muted

Project entries (3):
  Index     :  Fira Code 8px, dim ("001" / "002" / "003")
  Title     :  Cormorant Garamond italic 36px, weight 300, muted → white on row hover
  Desc      :  DM Sans 12px, 1.85 line-height, muted
  Tags      :  Fira Code 8px, accent, 1px border rgba(accent, 0.24), padding 3px 9px

About:
  Bio       :  Cormorant Garamond 21px weight 300, muted, key phrase italic+white
  Interests :  Labeled list (Fira Code eyebrow), Cormorant 18px entries
               border-bottom rows, hover: color white + padding-left 9px (0.22s ease)
```

---

## 08 — GLOBAL DETAILS

```
Cursor        :  Custom square (13px, 1px slate border #4A6A7C) + 3px dot center
                 Expands to 22px when hovering an active node
Grain overlay :  Two-pass cool-light noise, screen blend (not multiply — works against teal)
                 Pass A (z:60): SVG fractalNoise 320px tile, baseFrequency 0.78, octaves 3,
                                colorMatrix tinted (0.80, 0.88, 0.98), alpha 0.10, opacity 0.55
                 Pass B (z:2):  SVG fractalNoise 240px tile, baseFrequency 1.05, octaves 2,
                                colorMatrix tinted (0.72, 0.82, 0.95), alpha 0.08, opacity 0.40
                 Both pointer-events: none, mix-blend-mode: screen
Scroll        :  overflow hidden on html/body — intentional, no scroll
Animations    :  CSS only for load sequence. JS IntersectionObserver not needed (no scroll).
                 Node interaction via mouseenter/mouseleave JS (~30 lines)
Border radius :  None — all elements are sharp
Dividers      :  1px solid var(--border) = rgba(232,220,192,0.14)  /* ivory at low alpha */
Background    :  Solid Mist Teal #143842 — flat color, no gradient. Texture is grain only.
```

---

## 09a — VOID BUBBLES (washed-out billiard potions)

```
Concept     :  Frutiger-aero glass spheres scattered around the orb, but desaturated
              and mesh-textured so they read as ghosts of billiard balls drifting
              through the abyss — never glossy, never decorative.

Placement   :  3 per page (or per panel), absolutely positioned in left panel's
              negative space. Sizes vary 38–54px. Never overlap the orb.

Geometry    :
  Shape        : border-radius: 50%, overflow: hidden (so the mesh stays clipped)
  Rim          : box-shadow
                   0 0 0 0.5px rgba(255,255,255,0.10),    /* outer rim */
                   inset 0 0 0 0.5px rgba(255,255,255,0.04), /* inner rim */
                   inset -4px -6px 14px rgba(0,0,0,0.18)  /* gentle volume */
  NO outer glow halo. NO bright specular highlight.

Mesh overlay :  Pseudo-element ::after, inset:0, border-radius: 50%, z:1
                Background: SVG fractalNoise 160px tile, baseFrequency 0.92, octaves 2
                  colorMatrix tinted (0.78, 0.80, 0.84), alpha 0.58
                Opacity 0.55, mix-blend-mode: overlay
                Effect: breaks up any smoothness; reads as worn / faded glass.

Potion gradients (radial-gradient at 35% 30%, all stops <=22% alpha):
  b8  · charcoal :  (180,185,195,.16) → (120,125,135,.14) 22% → (60,65,75,.18) 55% → (20,22,28,.28) 100%
  b9  · ochre    :  (200,195,170,.16) → (160,140,90,.16)  30% → (110,95,55,.18) 65% → (70,60,30,.22) 100%
  b11 · brick    :  (200,180,178,.16) → (155,95,90,.16)   30% → (110,60,55,.18) 65% → (70,35,30,.22) 100%
  b13 · terracotta: (205,190,170,.16) → (170,120,70,.16)  30% → (115,75,40,.18) 65% → (70,45,22,.22) 100%
  b14 · sage     :  (190,200,180,.16) → (110,140,100,.16) 30% → (70,100,70,.18) 65% → (40,65,42,.22) 100%

Number glyph (the ball's digit, centered):
  Font         : Fira Code 400, letter-spacing 0.04em, z:3 (above mesh)
  Sizes        : scale with bubble (~font-size = bubble-width × 0.42)
  Colors       :
    b8  : rgba(220,222,228,0.72) + text-shadow 0 1px 0 rgba(0,0,0,0.40)
    b9  : rgba(40,32,12,0.78)   + text-shadow 0 1px 0 rgba(220,200,150,0.30)
    b11 : rgba(45,15,12,0.80)   + text-shadow 0 1px 0 rgba(225,190,185,0.28)
    b13 : rgba(40,20,8,0.78)    + text-shadow 0 1px 0 rgba(225,200,170,0.28)
    b14 : rgba(15,30,18,0.80)   + text-shadow 0 1px 0 rgba(200,220,200,0.28)

Pool         :  At least one bubble per panel should be b8. Pair with one or two
                colored variants (9, 11, 13, 14) — never all the same hue. Aim for
                tonal balance, not chromatic loudness.
```

---

## 09 — IMPLEMENTATION NOTES

```
Stack         :  React + Tailwind CSS + Framer Motion
Circle        :  SVG inline component. Rotation via CSS animation (not Framer).
                 Node interaction via onMouseEnter/onMouseLeave props → state.
Line draw     :  stroke-dashoffset animation — CSS transition or Framer motion path.
Pane swap     :  Framer AnimatePresence for enter/exit transitions on section panes.
Ghost number  :  Framer motion opacity + y transition.
Grain         :  CSS pseudo-element or fixed div with SVG data URI.
No-scroll     :  overflow: hidden on body. Right pane overflow-y: auto internally.
Fonts         :  Google Fonts — preconnect + single link tag.
               Cormorant Garamond: 300,400,500 + italic variants
               DM Sans: 300,400 (opsz 9..40)
               Fira Code: 300,400
```
