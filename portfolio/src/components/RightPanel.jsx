import { AnimatePresence, motion } from 'framer-motion'

const pane = {
  initial:  { opacity: 0, x: 12 },
  animate:  { opacity: 1, x: 0,  transition: { duration: 0.45, ease: 'easeInOut' } },
  exit:     { opacity: 0, x: -8, transition: { duration: 0.3,  ease: 'easeIn' } },
}

const stagger = (delay) => ({
  initial:  { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.7, delay, ease: 'easeOut' } },
})

export default function RightPanel({ activeSection, isFirstRender }) {
  const ghostNum = activeSection === 'exp' ? '01'
    : activeSection === 'proj'  ? '02'
    : activeSection === 'about' ? '03'
    : '01'

  return (
    <>
      {/* Ghost section number */}
      <motion.div
        id="ghost-num"
        animate={{
          opacity: activeSection ? 0.025 : 0,
          y:       activeSection ? 0 : 10,
        }}
        transition={{ duration: 0.6 }}
      >
        {ghostNum}
      </motion.div>

      <AnimatePresence mode="wait">

        {/* ── DEFAULT ── */}
        {!activeSection && (
          <motion.div key="default" className="pane" variants={pane} initial="initial" animate="animate" exit="exit">
            <div className="pane-default-inner">
              <motion.div className="d-eye"    {...stagger(isFirstRender ? 1.1  : 0.05)} >Est. — United States</motion.div>
              <motion.div className="d-line"   {...stagger(isFirstRender ? 1.25 : 0.15)} >
                Building systems at the intersection of<br /><em>product and engineering.</em>
              </motion.div>
              <motion.div className="d-hint"   {...stagger(isFirstRender ? 1.5  : 0.25)} >approach the circle to explore</motion.div>
              <motion.div className="d-socials" {...stagger(isFirstRender ? 1.7  : 0.35)} >
                <a href="https://linkedin.com/in/prestonrank" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="https://github.com/prestonrank"      target="_blank" rel="noreferrer">GitHub ↗</a>
                <a href="mailto:prestonrank5@gmail.com">prestonrank5@gmail.com</a>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ── EXPERIENCE ── */}
        {activeSection === 'exp' && (
          <motion.div key="exp" className="pane" variants={pane} initial="initial" animate="animate" exit="exit">
            <div className="p-label">01 — Experience</div>

            <div className="e-row">
              <div className="e-head">
                <span className="e-co">Salesforce</span>
                <span className="e-date">2023 — Present</span>
              </div>
              <div className="e-role">Solutions Engineer</div>
              <div className="e-desc">Architecting integration solutions for enterprise clients across the AMER region. Translating complex technical requirements into scalable system designs that reduce friction between product and infrastructure.</div>
            </div>

            <div className="e-row">
              <div className="e-head">
                <span className="e-co">Flexe</span>
                <span className="e-date">2021 — 2023</span>
              </div>
              <div className="e-role">Software Engineer</div>
              <div className="e-desc">Built internal tooling and API infrastructure for a distributed logistics platform. Owned the full lifecycle of several internal products from architecture through deployment.</div>
            </div>

            <div className="e-row">
              <div className="e-head">
                <span className="e-co">Independent</span>
                <span className="e-date">2019 — 2021</span>
              </div>
              <div className="e-role">Full-Stack Developer</div>
              <div className="e-desc">Developed client-facing web applications across e-commerce and media verticals. End-to-end ownership from scoping to production.</div>
            </div>
          </motion.div>
        )}

        {/* ── PROJECTS ── */}
        {activeSection === 'proj' && (
          <motion.div key="proj" className="pane" variants={pane} initial="initial" animate="animate" exit="exit">
            <div className="p-label">02 — Projects</div>

            <div className="p-row">
              <div className="p-idx">001</div>
              <div className="p-title">Meridian</div>
              <div className="p-desc">Developer tool for visualizing API dependency graphs in real time. Surfaces hidden coupling in distributed service architectures before it becomes a production problem.</div>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Node.js</span>
                <span className="tag">WebSocket</span>
                <span className="tag">D3</span>
              </div>
            </div>

            <div className="p-row">
              <div className="p-idx">002</div>
              <div className="p-title">Stratum</div>
              <div className="p-desc">Data pipeline orchestration dashboard for internal analytics teams. Makes complex ETL workflows legible to non-engineers without sacrificing depth.</div>
              <div className="tags">
                <span className="tag">Python</span>
                <span className="tag">React</span>
                <span className="tag">PostgreSQL</span>
              </div>
            </div>

            <div className="p-row">
              <div className="p-idx">003</div>
              <div className="p-title">Folio</div>
              <div className="p-desc">Lightweight portfolio scaffolding CLI for engineers. Generates an opinionated project structure from a single config file.</div>
              <div className="tags">
                <span className="tag">TypeScript</span>
                <span className="tag">CLI</span>
                <span className="tag">Open Source</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── ABOUT ── */}
        {activeSection === 'about' && (
          <motion.div key="about" className="pane" variants={pane} initial="initial" animate="animate" exit="exit">
            <div className="p-label">03 — About</div>
            <div className="a-bio">
              I build systems at the intersection of <em>product and engineering</em> — translating complexity
              into things that work and make sense. By day a solutions engineer, by night drawn to fashion
              archives, type, and the logic of cities.
            </div>
            <div className="a-ilabel">Interests</div>
            <ul className="a-list">
              <li>Fashion archives &amp; editorial</li>
              <li>Type design &amp; typography</li>
              <li>Urban photography</li>
              <li>Distance running</li>
              <li>Systems thinking</li>
            </ul>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  )
}
