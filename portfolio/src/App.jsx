import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Circle from './components/Circle'
import RightPanel from './components/RightPanel'
import fonts from './portfolio_content/fonts.json'
import aceSymbol from './assets/ace_symbol.svg'
import SpadeEmblem from './components/SpadeEmblem'

const nameplateFont = `'${fonts.groups.nameplate.family}', ${fonts.groups.nameplate.fallback}`

export default function App() {
  const [hoverSection,  setHoverSection]  = useState(null)
  const [lockedSection, setLockedSection] = useState(null)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const curRef = useRef(null)
  const dotRef = useRef(null)
  const aceRef = useRef(null)

  const activeSection = lockedSection || hoverSection

  useEffect(() => {
    const handleMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      if (curRef.current)
        curRef.current.style.transform = `translate(${x - 6.5}px, ${y - 6.5}px)`
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${x - 1.5}px, ${y - 1.5}px)`
      if (aceRef.current)
        aceRef.current.style.transform = `translate(${x - 1.5}px, ${y - 1.5}px)`
    }
    document.addEventListener('mousemove', handleMove)
    return () => document.removeEventListener('mousemove', handleMove)
  }, [])

  const handleHover = (section) => {
    if (isFirstRender) setIsFirstRender(false)
    setHoverSection(section)
  }

  const handleHoverEnd = () => setHoverSection(null)

  const handleLock = (section) => {
    if (isFirstRender) setIsFirstRender(false)
    setLockedSection(prev => prev === section ? null : section)
  }

  return (
    <>
      {/* Custom cursor */}
      <div ref={curRef} id="cur" className={activeSection ? 'expand' : ''} />
      <div ref={dotRef} id="cur-dot" className={activeSection ? 'hide' : ''} />
      <img
        ref={aceRef}
        src={aceSymbol}
        id="cur-ace"
        className={activeSection ? 'show' : ''}
        alt=""
        aria-hidden="true"
      />

      {/* Two-panel layout */}
      <div id="layout">

        {/* ── LEFT PANEL ── */}
        <div id="left">

          {/* Background pattern (persistent) */}
          <div className="pane-bg-pattern" aria-hidden="true" />

          {/* Name block */}
          <motion.div
            id="name-block"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
          >
            <SpadeEmblem />
          </motion.div>

          {/* Divider glow */}
          <div id="divider-glow" className={activeSection ? 'on' : ''} />

          {/* Circle SVG */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <Circle
              activeSection={activeSection}
              lockedSection={lockedSection}
              onActivate={handleHover}
              onReset={handleHoverEnd}
              onLock={handleLock}
            />
          </motion.div>

        </div>

        {/* ── RIGHT PANEL ── */}
        <div id="right">
          <RightPanel activeSection={activeSection} isFirstRender={isFirstRender} />
        </div>

      </div>

      {/* Bottom strip */}
      <motion.div
        id="strip"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0, ease: 'easeOut' }}
      >
        <span className="strip-l">Solutions Engineer · Software Engineer</span>
        <span className="strip-r">© 2026 Preston Rank</span>
      </motion.div>
    </>
  )
}
