import { useEffect, useRef } from 'react'

const ENABLED = false

export default function ParticleField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!ENABLED) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width = 0, height = 0, dpr = window.devicePixelRatio || 1
    let raf = 0
    let particles = []

    const state = {
      hover: false,
      intensity: 0,          // 0 → 1, eases toward `hover ? 1 : 0`
      mouseX: 0,
      mouseY: 0,
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const spawnParticles = (count = 60) => {
      particles = Array.from({ length: count }, () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 0.35 + Math.random() * 0.15,   // fraction of canvas size
        speed:  (0.0004 + Math.random() * 0.0006) * (Math.random() < 0.5 ? -1 : 1),
        size:   0.6 + Math.random() * 1.2,
        alpha:  0.15 + Math.random() * 0.35,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const cx = width / 2, cy = height / 2
      const base = Math.min(width, height) / 2

      // ease intensity toward target
      state.intensity += ((state.hover ? 1 : 0) - state.intensity) * 0.06

      for (const p of particles) {
        p.angle += p.speed * (1 + state.intensity * 3) * 60
        const r = base * p.radius * (1 + state.intensity * 0.08)
        const x = cx + Math.cos(p.angle) * r
        const y = cy + Math.sin(p.angle) * r

        ctx.beginPath()
        ctx.arc(x, y, p.size * (1 + state.intensity * 0.6), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232, 220, 192, ${p.alpha * (0.5 + state.intensity * 0.5)})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    // Canvas is pointer-events: none, so listen on window and hit-test against rect
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom
      state.hover  = inside
      state.mouseX = e.clientX - rect.left
      state.mouseY = e.clientY - rect.top
    }
    const onLeaveWindow = () => { state.hover = false }

    resize()
    spawnParticles()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout',  onLeaveWindow)
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout',  onLeaveWindow)
      window.removeEventListener('resize', resize)
    }
  }, [])

  if (!ENABLED) return null
  return <canvas ref={canvasRef} className="particle-canvas" />
}
