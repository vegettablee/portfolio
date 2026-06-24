/**
 * ScarfCanvas — mounts a Three.js WebGL canvas that renders
 * spring-mass cloth simulation drapes around the left side of the orb.
 *
 * Five attachment clusters span the left hemisphere of the circle
 * (210° → 150° in SVG math convention). Each cluster fans 8 strands
 * with varying ribbon width and opacity, creating a layered fabric effect.
 *
 * The canvas is positioned behind the SVG circle so drapes appear to
 * emerge from beneath the orb into the surrounding negative space.
 */

import { useEffect, useRef } from 'react'
import { ScarfStrand }   from './ScarfSimulation'
import { ScarfRenderer } from './ScarfRenderer'

// ── Cluster anchor positions in SVG viewBox space (560 × 560) ──────────────
// dirX/dirY define the mean flow direction for each cluster's fan of strands.
// All anchors sit on the r=210 ring's left hemisphere — the side with no nodes.
const CLUSTERS = [
  { svgX: 98,  svgY: 175, dirX: -0.85, dirY: -0.52 },  // 210° — upper-left
  { svgX: 77,  svgY: 228, dirX: -0.97, dirY: -0.22 },  // ~200°
  { svgX: 70,  svgY: 280, dirX: -1.00, dirY:  0.00 },  // 180° — direct left
  { svgX: 77,  svgY: 332, dirX: -0.97, dirY:  0.22 },  // ~160°
  { svgX: 98,  svgY: 385, dirX: -0.85, dirY:  0.52 },  // 150° — lower-left
]

// ── Per-strand visual properties within each cluster ──────────────────────
// Ordered so the center strand (index 4 of 8) has highest visual weight.
// Outer strands fade out, creating a natural fabric-density gradient.
const STRAND_CONFIGS = [
  { opacity: 0.07, width: 0.9  },  // outermost edge
  { opacity: 0.11, width: 1.4  },
  { opacity: 0.15, width: 1.9  },
  { opacity: 0.19, width: 2.5  },
  { opacity: 0.22, width: 3.1  },  // center — densest
  { opacity: 0.19, width: 2.5  },
  { opacity: 0.15, width: 1.9  },
  { opacity: 0.11, width: 1.4  },  // outermost edge
]

const PER_CLUSTER  = STRAND_CONFIGS.length   // 8 strands per cluster
const FAN_ANGLE    = 0.34                    // ±0.34 rad ≈ ±20° fan spread
const NUM_PARTICLES = 22                     // particles per strand
const REST_LENGTH   = 17                     // px between adjacent particles (~374px total)

export default function ScarfCanvas() {
  const canvasRef = useRef(null)
  const wrapRef   = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    let renderer = null
    const strands = []

    const init = () => {
      const wrap   = wrapRef.current
      const canvas = canvasRef.current
      if (!wrap || !canvas) return

      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (!w || !h) return

      // ── Locate the SVG circle in page space ───────────────────────────
      const circleEl = document.getElementById('circle-wrap')
      if (!circleEl) return
      const wr = circleEl.getBoundingClientRect()
      const cr = wrap.getBoundingClientRect()

      // Origin of circle-wrap relative to this canvas container
      const ox    = wr.left - cr.left
      const oy    = wr.top  - cr.top
      // Scale factor: SVG viewBox 560 → rendered width
      const scale = wr.width / 560

      // ── Build renderer ─────────────────────────────────────────────────
      renderer = new ScarfRenderer(canvas, w, h)

      // ── Build strand clusters ──────────────────────────────────────────
      for (const cl of CLUSTERS) {
        const ax        = ox + cl.svgX * scale
        const ay        = oy + cl.svgY * scale
        const baseAngle = Math.atan2(cl.dirY, cl.dirX)

        for (let j = 0; j < PER_CLUSTER; j++) {
          // t ∈ [-1, +1] — evenly distributes strands across the fan
          const half  = (PER_CLUSTER - 1) / 2
          const t     = (j - half) / half
          const angle = baseAngle + t * FAN_ANGLE

          const strand = new ScarfStrand(
            ax, ay,
            Math.cos(angle), Math.sin(angle),
            NUM_PARTICLES, REST_LENGTH
          )
          strands.push(strand)

          const cfg = STRAND_CONFIGS[j]
          renderer.addStrand(strand, 0xC4CDD9, cfg.opacity, cfg.width)
        }
      }

      // ── Animation loop ─────────────────────────────────────────────────
      const loop = (time) => {
        rafRef.current = requestAnimationFrame(loop)
        for (const s of strands) s.step(time)
        renderer.render()
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    // Defer one frame so React has committed and browser has painted —
    // getBoundingClientRect returns correct values after layout.
    requestAnimationFrame(init)

    return () => {
      cancelAnimationFrame(rafRef.current)
      renderer?.dispose()
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
