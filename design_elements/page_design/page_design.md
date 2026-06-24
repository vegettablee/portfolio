# Page Design Spec

Reference files:
- Palettes  → `../colors.md`   (PALETTE-A · PALETTE-B · PALETTE-C)
- Pairings  → `../fonts.md`    (FONT-1 · FONT-2 · FONT-3 · FONT-4 · FONT-5)
- Full spec → `../../CLAUDE.md`

---

## 01 — SELECTIONS

```
PALETTE  :  PALETTE-C   →  Cold Void (#080A0F bg · #10131A surface · #D8DDE8 text · #4A6A7C accent · #1C2030 secondary)
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
  Style      : stroke accent, stroke-width 2.5, round caps, opacity 0 → 0.55 on active
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
Cursor        :  Custom square (13px, 1px accent border) + 3px dot center
                 Expands to 22px when hovering an active node
Grain overlay :  SVG fractalNoise, 160px tile, opacity 0.026, fixed, z-index 400, pointer-events none
Scroll        :  overflow hidden on html/body — intentional, no scroll
Animations    :  CSS only for load sequence. JS IntersectionObserver not needed (no scroll).
                 Node interaction via mouseenter/mouseleave JS (~30 lines)
Border radius :  None — all elements are sharp
Dividers      :  1px solid var(--border) = rgba(74,106,124,0.14)
Background    :  No texture beyond grain — pure flat #080A0F
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
