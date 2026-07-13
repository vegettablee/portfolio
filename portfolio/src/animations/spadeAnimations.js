import { useEffect, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   SPADE OUROBOROS — animation definitions
   Every knob for all three auditioning animations lives here.
   SpadeEmblem.jsx is structure only; it spreads these props onto
   its motion elements by target name.
   ═══════════════════════════════════════════════════════════════ */

export const SPADE_SEQUENCE = ['vitality', 'serpents', 'tide']
export const PHASE_MS = 4000

/* Set to 'vitality' | 'serpents' | 'tide' to pin one animation while reviewing */
export const FORCED_ANIMATION = null

/* Fira Code caption under the emblem naming the active phase */
export const SHOW_PHASE_LABEL = true

/* Resting brightness of the artwork — the chalk-solid elements sit at half
   strength so the animations read as light arriving, not decoration */
export const BASE_OPACITY = {
  body:   0.35,  // spade outline
  snakes: 0.35,  // bodies, scale ticks, rattle tails
  heads:  0.2,   // noticeably dimmer — the heads only wake when a trace arrives
  /* grain & diamonds are multipliers on their already-dim per-line opacities
     (max 0.55 and 0.65 respectively) — chosen so their brightest lines also
     land at ≈0.35 */
  grain:    0.65,
  diamonds: 0.55,
}

export const VITALITY = {
  vivid: '#C93232',   // vibrant red — the lucky stroke
  deep:  '#6E1212',   // darker red — the exhale
  ember: '#A83030',   // exhale red for the interior grain — deep sinks into the bg on thin lines
  chalk: '#FFFEDE',
}

export const TIDE = {
  bright: '#7FB4D4',  // cold surface blue
  deep:   '#3A6B85',  // deep water
}

/* Static styling of the masked blue duplicate layer — the emblem renders
   at ~58% of its viewBox size, so these run hotter than feels right on paper */
export const TIDE_LAYER = {
  opacity: 0.9,
  glow: 'drop-shadow(0 0 3px rgba(127, 180, 212, 0.75))',
  lineOpacityBoost: 0.35,
  lineWidthBoost: 0.3,
}

export function useSpadePhase() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (FORCED_ANIMATION) return
    const t = setInterval(() => setIdx(i => (i + 1) % SPADE_SEQUENCE.length), PHASE_MS)
    return () => clearInterval(t)
  }, [])
  return FORCED_ANIMATION ?? SPADE_SEQUENCE[idx]
}

/* ── shared helpers ─────────────────────────────────────────── */

const fillBox = { transformBox: 'fill-box', transformOrigin: 'center' }

const redGlow = (blur, alpha) =>
  `drop-shadow(0 0 ${blur}px rgba(201, 50, 50, ${alpha}))`
const chalkGlow = (blur, alpha) =>
  `drop-shadow(0 0 ${blur}px rgba(255, 254, 222, ${alpha}))`

/* ── 1. VITALITY — luck breathed in and out ─────────────────────
   Two full breaths across the 4s window. Vibrant red on the
   inhale, darker red on the exhale, glow travels down into the
   stem diamonds with a slight stagger. */

/* During vitality & tide the serpent recedes into the dark so the glow
   owns the spotlight. No restore needed — each phase remounts the artwork
   at resting opacity, so serpents gets the snakes back automatically. */
const RECEDE = {
  animate: { opacity: 0.06 },
  transition: { duration: 0.6, ease: 'easeOut' },
}
const serpentRecede = {
  snakeLeft: RECEDE, snakeRight: RECEDE,
  rattleLeft: RECEDE, rattleRight: RECEDE,
  headLeft: RECEDE, headRight: RECEDE,
}

const BREATH_TIMES = [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1]
const { vivid, deep, chalk } = VITALITY

const breathStroke = (delay = 0) => ({
  animate: { stroke: [chalk, vivid, deep, vivid, deep, vivid, chalk] },
  transition: { duration: 3.6, delay, times: BREATH_TIMES, ease: 'easeInOut' },
})

const breathFilter = {
  filter: [
    redGlow(0, 0), redGlow(12, 1), redGlow(4, 0.6),
    redGlow(12, 1), redGlow(4, 0.6), redGlow(12, 1), redGlow(0, 0),
  ],
}

const vitality = {
  ...serpentRecede,
  spadeGroup: {
    animate: { scale: [1, 1.015, 1.004, 1.015, 1.004, 1.015, 1] },
    transition: { duration: 3.6, times: BREATH_TIMES, ease: 'easeInOut' },
    style: fillBox,
  },
  bodyGroup: {
    animate: {
      ...breathFilter,
      /* the inhale lifts brightness well above resting — vibrant on the way
         in, sinking back toward the dim exhale */
      opacity: [BASE_OPACITY.body, 0.8, 0.5, 0.8, 0.5, 0.8, BASE_OPACITY.body],
    },
    transition: { duration: 3.6, times: BREATH_TIMES, ease: 'easeInOut' },
  },
  bodyStroke: breathStroke(0),
  diamondsGroup: {
    animate: {
      ...breathFilter,
      opacity: [BASE_OPACITY.diamonds, 0.9, 0.6, 0.9, 0.6, 0.9, BASE_OPACITY.diamonds],
    },
    transition: { duration: 3.6, delay: 0.1, times: BREATH_TIMES, ease: 'easeInOut' },
  },
  /* i = 0 stem diamond, 1 connector, 2..7 bottom row left→right */
  diamondStroke: (i) => breathStroke(0.06 + i * 0.045),
  /* interior grain breathes with the body but stays prominent through the
     glow — the outline is allowed to sink on the exhale, the grain is not */
  grainGroup: {
    animate: {
      ...breathFilter,
      opacity: [BASE_OPACITY.grain, 1, 0.85, 1, 0.85, 1, BASE_OPACITY.grain],
    },
    transition: { duration: 3.6, times: BREATH_TIMES, ease: 'easeInOut' },
  },
  /* per-line: red stroke + an opacity lift that preserves each line's
     relative weight (baseOp = the line's resting opacity attr) */
  grainLine: (baseOp) => ({
    animate: {
      stroke: [chalk, vivid, VITALITY.ember, vivid, VITALITY.ember, vivid, chalk],
      opacity: [
        baseOp, Math.min(1, baseOp + 0.4), Math.min(1, baseOp + 0.2),
        Math.min(1, baseOp + 0.4), Math.min(1, baseOp + 0.2),
        Math.min(1, baseOp + 0.4), baseOp,
      ],
    },
    transition: { duration: 3.6, delay: 0.12, times: BREATH_TIMES, ease: 'easeInOut' },
  }),
}

/* ── 2. SERPENTS — light traces each snake tail → head ──────────
   Rattles shimmer, then the right snake's trace runs fast
   (arriving at the LEFT head — the snakes cross) while the left
   runs slow (arriving at the RIGHT head). Each arrival gets its
   own flare beat. Scale ticks blink as the trace passes them. */

const TRACE = {
  left:  { delay: 0.3, duration: 3.0, ease: 'easeInOut' }, // ends 3.3s → right head
  right: { delay: 0.3, duration: 3.0, ease: 'easeInOut' }, // mirrored — both arrive together
}
const ARRIVAL = {
  leftHead:  TRACE.right.delay + TRACE.right.duration,
  rightHead: TRACE.left.delay + TRACE.left.duration,
}

const spineTrace = (side, glowUnderlay) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: glowUnderlay ? 0.5 : 1 },
  transition: {
    pathLength: TRACE[side],
    opacity: { delay: TRACE[side].delay, duration: 0.25 },
  },
})

const headFlare = (arrival) => ({
  animate: {
    scale: [1, 1.22, 1],
    opacity: [BASE_OPACITY.heads, 1, BASE_OPACITY.heads],
    filter: [chalkGlow(0, 0), chalkGlow(5, 0.9), chalkGlow(0, 0)],
  },
  transition: { delay: arrival, duration: 0.55, times: [0, 0.4, 1], ease: 'easeOut' },
  style: fillBox,
})

const headFlash = (arrival) => ({
  animate: { opacity: [0, 0.75, 0], scale: [0.4, 1.5, 1.9] },
  transition: { delay: arrival, duration: 0.55, times: [0, 0.35, 1], ease: 'easeOut' },
  style: fillBox,
})

/* the tail ignites first — glows to full chalk as the dashes march,
   then hands off to the spine trace (which departs at 0.3s) */
const rattleIgnite = {
  animate: {
    opacity: [BASE_OPACITY.snakes, 1, 1, 0.6],
    filter: [chalkGlow(0, 0), chalkGlow(4, 0.9), chalkGlow(2.5, 0.6), chalkGlow(0, 0)],
    strokeDashoffset: [0, -19.2],
  },
  transition: {
    opacity: { duration: 1.2, times: [0, 0.25, 0.7, 1] },
    filter:  { duration: 1.2, times: [0, 0.25, 0.7, 1] },
    strokeDashoffset: { duration: 1.2, ease: 'linear' },
  },
}

const serpents = {
  rattleLeft:  rattleIgnite,
  rattleRight: rattleIgnite,
  spineLeft:      spineTrace('left',  false),
  spineRight:     spineTrace('right', false),
  spineGlowLeft:  spineTrace('left',  true),
  spineGlowRight: spineTrace('right', true),
  /* ticks are ordered tail → head in the source; blink as the trace passes */
  tick: (side, i, n) => ({
    animate: { opacity: [1, 0.1, 1] },
    transition: {
      delay: TRACE[side].delay + (i / (n - 1)) * TRACE[side].duration * 0.88,
      duration: 0.35,
    },
  }),
  headLeft:   headFlare(ARRIVAL.leftHead),
  headRight:  headFlare(ARRIVAL.rightHead),
  flashLeft:  headFlash(ARRIVAL.leftHead),
  flashRight: headFlash(ARRIVAL.rightHead),
}

/* ── 3. TIDE — a cold swell pushes up through the spade ─────────
   A masked cold-blue duplicate of the linework is revealed by a
   soft gradient band sweeping bottom → top over the full window.
   The heads hold a steady cold glow (the staff), brightening as
   the swell reaches them. */

const tide = {
  ...serpentRecede,
  /* band rect: height 140, artwork spans y 0–272.
     y=272 → fully below (invisible) · y=-150 → fully above */
  tideRect: {
    initial: { attrY: 272 },
    animate: { attrY: -150 },
    transition: { duration: 3.9, ease: 'easeInOut' },
  },
}

export const SPADE_ANIMATIONS = { vitality, serpents, tide }
