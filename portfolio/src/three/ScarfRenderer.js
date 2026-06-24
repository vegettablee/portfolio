/**
 * Three.js WebGL renderer for ribbon-mesh scarf strands.
 *
 * Camera is orthographic with CSS-pixel coordinate convention:
 *   (0, 0)         → top-left of canvas
 *   (width, height) → bottom-right of canvas
 *
 * This means particle positions in CSS-pixel space map directly to
 * Three.js world coordinates — no conversion needed.
 */

import * as THREE from 'three'

export class ScarfRenderer {
  constructor(canvas, width, height) {
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    this.renderer.setSize(width, height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 0)

    this.scene = new THREE.Scene()

    // OrthographicCamera(left, right, top, bottom, near, far)
    // top=0, bottom=height → y=0 at top of screen, y=height at bottom (CSS convention)
    this.camera = new THREE.OrthographicCamera(0, width, 0, height, -10, 10)
    this.camera.position.z = 5

    this._entries = []
  }

  /**
   * Register a ScarfStrand and create its Three.js ribbon mesh.
   * @param {ScarfStrand} strand
   * @param {number} color        - hex color e.g. 0xC2CAD8
   * @param {number} opacity      - 0–1
   * @param {number} ribbonWidth  - half-width of ribbon strip in pixels
   */
  addStrand(strand, color, opacity, ribbonWidth) {
    const n   = strand.particles.length
    // Each particle → 2 vertices (left/right sides of ribbon)
    const pos = new Float32Array(n * 2 * 3)

    // Build index buffer — two triangles per quad segment
    const idx = []
    for (let i = 0; i < n - 1; i++) {
      const v = i * 2
      idx.push(v, v + 1, v + 2, v + 1, v + 3, v + 2)
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setIndex(idx)

    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      side:       THREE.DoubleSide,
      depthWrite: false,
    })

    const mesh = new THREE.Mesh(geo, mat)
    this.scene.add(mesh)
    this._entries.push({ mesh, strand, ribbonWidth })
  }

  _syncMesh({ mesh, strand, ribbonWidth }) {
    const pos = mesh.geometry.attributes.position.array
    const pts = strand.particles
    const n   = pts.length

    for (let i = 0; i < n; i++) {
      const p = pts[i]

      // Tangent direction along the strand
      let tdx, tdy
      if (i < n - 1) {
        tdx = pts[i + 1].x - p.x
        tdy = pts[i + 1].y - p.y
      } else {
        tdx = p.x - pts[i - 1].x
        tdy = p.y - pts[i - 1].y
      }
      const tlen = Math.sqrt(tdx * tdx + tdy * tdy) || 1

      // Perpendicular (ribbon width direction)
      const nx = (-tdy / tlen) * ribbonWidth
      const ny = ( tdx / tlen) * ribbonWidth

      const base = i * 6
      pos[base]     = p.x + nx;  pos[base + 1] = p.y + ny;  pos[base + 2] = 0
      pos[base + 3] = p.x - nx;  pos[base + 4] = p.y - ny;  pos[base + 5] = 0
    }

    mesh.geometry.attributes.position.needsUpdate = true
  }

  render() {
    for (const e of this._entries) this._syncMesh(e)
    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    for (const { mesh } of this._entries) {
      mesh.geometry.dispose()
      mesh.material.dispose()
    }
    this.renderer.dispose()
  }
}
