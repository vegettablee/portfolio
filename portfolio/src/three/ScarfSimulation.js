/**
 * Verlet-integration spring-mass cloth simulation.
 * Each ScarfStrand is a chain of particles with distance constraints.
 * Wind and gravity forces are applied per-frame; constraint solving
 * iterates multiple times for stability.
 */

class Particle {
  constructor(x, y, pinned = false) {
    this.x  = x;  this.y  = y
    this.px = x;  this.py = y
    this.ax = 0;  this.ay = 0
    this.pinned = pinned
  }

  update() {
    if (this.pinned) return
    const vx = (this.x - this.px) * 0.976
    const vy = (this.y - this.py) * 0.976
    this.px = this.x
    this.py = this.y
    this.x += vx + this.ax
    this.y += vy + this.ay
    this.ax = 0
    this.ay = 0
  }

  applyForce(fx, fy) {
    this.ax += fx
    this.ay += fy
  }
}

export class ScarfStrand {
  /**
   * @param {number} ax          - anchor X in canvas-pixel space
   * @param {number} ay          - anchor Y in canvas-pixel space
   * @param {number} dirX        - initial unit direction X
   * @param {number} dirY        - initial unit direction Y
   * @param {number} numParticles
   * @param {number} restLength  - pixels between adjacent particles
   */
  constructor(ax, ay, dirX, dirY, numParticles = 20, restLength = 18) {
    this.particles   = []
    this.restLengths = []

    // Per-strand randomness so clusters don't move in lockstep
    this.windPhase = Math.random() * Math.PI * 2
    this.windFreq  = 0.00074 + Math.random() * 0.00038

    for (let i = 0; i < numParticles; i++) {
      this.particles.push(new Particle(
        ax + dirX * restLength * i,
        ay + dirY * restLength * i,
        i === 0               // only the anchor is pinned
      ))
      if (i > 0) this.restLengths.push(restLength)
    }
  }

  /**
   * Advance one physics tick.
   * @param {number} t - elapsed time in ms (from requestAnimationFrame)
   */
  step(t) {
    const n = this.particles.length

    // Apply forces
    for (let i = 1; i < n; i++) {
      const progress = i / (n - 1)      // 0 near anchor, 1 at tip
      const p = this.particles[i]

      // Primary horizontal wind (sinusoidal, phase-shifted per particle for wave feel)
      const wx = Math.sin(t * this.windFreq       + i * 0.38 + this.windPhase) * 0.098 * progress
      // Secondary cross-wind adds vertical flutter
      const wy = Math.cos(t * this.windFreq * 0.6 + i * 0.27 + this.windPhase + 1.4) * 0.044 * progress
      // Light gravity keeps strands from floating up
      const gy = 0.020 * progress

      p.applyForce(wx, gy + wy)
      p.update()
    }

    // Constraint satisfaction — more iterations = stiffer, more stable fabric
    for (let iter = 0; iter < 5; iter++) {
      for (let i = 0; i < n - 1; i++) {
        const a  = this.particles[i]
        const b  = this.particles[i + 1]
        const rl = this.restLengths[i]

        const dx = b.x - a.x
        const dy = b.y - a.y
        const d  = Math.sqrt(dx * dx + dy * dy) || 1
        const c  = (d - rl) / d * 0.5

        if (!a.pinned) { a.x += dx * c;  a.y += dy * c  }
        if (!b.pinned) { b.x -= dx * c;  b.y -= dy * c  }
      }
    }
  }
}
