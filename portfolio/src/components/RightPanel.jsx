import { AnimatePresence, motion } from 'framer-motion'
import projectsData from '../portfolio_content/projects.json'
import experiencesData from '../portfolio_content/experiences.json'
import ExperienceCard from './ExperienceCard'
import cornerTL from '../assets/top_left_corner.svg'
import cornerTR from '../assets/top_right_corner.svg'
import cornerBL from '../assets/bottom_left_corner.svg'
import cornerBR from '../assets/bottom_right_corner.svg'

const pane = {
  initial:  { opacity: 0, x: 12 },
  animate:  { opacity: 1, x: 0,  transition: { duration: 0.45, ease: 'easeInOut' } },
  exit:     { opacity: 0, x: -8, transition: { duration: 0.3,  ease: 'easeIn' } },
}

const stagger = (delay) => ({
  initial:  { opacity: 0, y: 18 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.7, delay, ease: 'easeOut' } },
})

const visibleSorted = (items) =>
  items
    .filter(i => i.active && i.display)
    .sort((a, b) => a.order - b.order)

export default function RightPanel({ activeSection, isFirstRender }) {
  const ghostNum = activeSection === 'exp' ? '01'
    : activeSection === 'proj'  ? '02'
    : activeSection === 'about' ? '03'
    : '01'

  const experiences = visibleSorted(experiencesData.items)
  const projects = visibleSorted(projectsData.items)

  return (
    <>
      <div className="pane-bg-pattern" aria-hidden="true" />

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

        {activeSection === 'exp' && (
          <motion.div key="exp" className="pane pane-flex" variants={pane} initial="initial" animate="animate" exit="exit">
            <div className="exp-frame">
              <img src={cornerTL} className="corner corner-tl" aria-hidden="true" alt="" />
              <img src={cornerTR} className="corner corner-tr" aria-hidden="true" alt="" />
              <img src={cornerBL} className="corner corner-bl" aria-hidden="true" alt="" />
              <img src={cornerBR} className="corner corner-br" aria-hidden="true" alt="" />
              <span className="exp-title">experience</span>
              <div className="exp-frame-inner">
                <ExperienceCard />
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'proj' && (
          <motion.div key="proj" className="pane" variants={pane} initial="initial" animate="animate" exit="exit">
            <div className="p-label">02 — Projects</div>

            {projects.map((item, idx) => (
              <div key={item.id} className="p-row">
                <div className="p-idx">{String(idx + 1).padStart(3, '0')}</div>
                <div className="p-title">{item.title}</div>
                {item.content.map((p, i) => (
                  <div key={i} className="p-desc">{p}</div>
                ))}
                {item.tech_stack.length > 0 && (
                  <div className="tags">
                    {item.tech_stack.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

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
