import eightBall from '../8_ball_no_background.png'
import ParticleField from './ParticleField'

export default function Circle({ activeSection, lockedSection, onActivate, onReset, onLock }) {
  const is     = (s) => activeSection === s
  const locked = (s) => lockedSection === s

  return (
    <div id="circle-wrap">
      <div className="eightball-wrap" aria-hidden="true">
        <img src={eightBall} className="eightball-img" alt="" />
        <ParticleField />
      </div>
      <svg id="orbit" viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">

        {/* Static rings */}
        <circle className="ring rs" cx="280" cy="280" r="237" />
        <circle className="ring rd" cx="280" cy="280" r="175" />

        {/* Arc highlights */}
        <path className={`arc${is('exp')   ? ' on' : ''}`} d="M 380.1,65.2  A 237,237 0 0,1 474.1,144.1" />
        <path className={`arc${is('proj')  ? ' on' : ''}`} d="M 508.9,218.7 A 237,237 0 0,1 508.9,341.3" />
        <path className={`arc${is('about') ? ' on' : ''}`} d="M 474.1,415.9 A 237,237 0 0,1 380.1,494.8" />



        {/* Center label */}
        <text className="c-label" x="280" y="276">P · RANK</text>
        <text className="c-label" x="280" y="291" fontSize="8" opacity=".6">2026</text>

        {/* NODE: Experience — 50° above right */}
        <g
          className={`node${is('exp') ? ' on' : ''}${locked('exp') ? ' locked' : ''}`}
          onMouseEnter={() => onActivate('exp')}
          onMouseLeave={onReset}
          onClick={() => onLock('exp')}
          style={{ cursor: 'pointer' }}
        >
          <circle className="node-ring" cx="432.2" cy="98.4" r="11" />
          <circle className="node-dot"  cx="432.2" cy="98.4" r="3.5" />
          <line
            className={`node-line${is('exp') ? ' on' : ''}`}
            x1="436.3" y1="98.4" x2="548" y2="98.4"
          />
          <text className="node-label" x="432.2" y="86.3" textAnchor="middle">experience</text>
          <circle className="node-trigger" cx="432.2" cy="98.4" r="30" />
        </g>

        {/* NODE: Projects — 0° right */}
        <g
          className={`node${is('proj') ? ' on' : ''}${locked('proj') ? ' locked' : ''}`}
          onMouseEnter={() => onActivate('proj')}
          onMouseLeave={onReset}
          onClick={() => onLock('proj')}
          style={{ cursor: 'pointer' }}
        >
          <circle className="node-ring" cx="517" cy="280" r="11" />
          <circle className="node-dot"  cx="517" cy="280" r="3.5" />
          <line
            className={`node-line${is('proj') ? ' on' : ''}`}
            x1="521" y1="280" x2="548" y2="280"
          />
          <text className="node-label" x="517" y="268" textAnchor="middle">projects</text>
          <circle className="node-trigger" cx="517" cy="280" r="30" />
        </g>

        {/* NODE: About — 50° below right */}
        <g
          className={`node${is('about') ? ' on' : ''}${locked('about') ? ' locked' : ''}`}
          onMouseEnter={() => onActivate('about')}
          onMouseLeave={onReset}
          onClick={() => onLock('about')}
          style={{ cursor: 'pointer' }}
        >
          <circle className="node-ring" cx="432.2" cy="461.6" r="11" />
          <circle className="node-dot"  cx="432.2" cy="461.6" r="3.5" />
          <line
            className={`node-line${is('about') ? ' on' : ''}`}
            x1="436.3" y1="461.6" x2="548" y2="461.6"
          />
          <text className="node-label" x="432.2" y="479.7" textAnchor="middle">about</text>
          <circle className="node-trigger" cx="432.2" cy="461.6" r="30" />
        </g>

      </svg>
    </div>
  )
}
