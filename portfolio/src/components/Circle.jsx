import eightBall from '../8_ball_no_background.png'

export default function Circle({ activeSection, lockedSection, onActivate, onReset, onLock }) {
  const is     = (s) => activeSection === s
  const locked = (s) => lockedSection === s

  return (
    <div id="circle-wrap" onMouseLeave={onReset}>
      <div className="eightball-wrap" aria-hidden="true">
        <img src={eightBall} className="eightball-img" alt="" />
      </div>
      <svg id="orbit" viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">

        {/* Static rings */}
        <circle className="ring rs" cx="280" cy="280" r="210" />
        <circle className="ring rd" cx="280" cy="280" r="175" />

        {/* Arc highlights */}
        <path className={`arc${is('exp')   ? ' on' : ''}`} d="M 368.7,89.7  A 210,210 0 0,1 452.0,159.6" />
        <path className={`arc${is('proj')  ? ' on' : ''}`} d="M 482.8,225.7 A 210,210 0 0,1 482.8,334.3" />
        <path className={`arc${is('about') ? ' on' : ''}`} d="M 452.0,400.4 A 210,210 0 0,1 368.7,470.3" />


        {/* Outer rotating ring + circling text */}
        <g id="outer">
          <circle className="ring rs" cx="280" cy="280" r="250" opacity=".07" />
          <defs>
            <path id="tp" d="M280,280 m-238,0 a238,238 0 1,1 476,0 a238,238 0 1,1 -476,0" />
          </defs>
          <text
            fontFamily="Fira Code,monospace"
            fontSize="8.5"
            fill="#D8DDE8"
            opacity=".22"
            letterSpacing="17.5"
          >
            <textPath href="#tp">
              SOLUTIONS ENGINEER · SOFTWARE ENGINEER · SOLUTIONS ENGINEER · SOFTWARE ENGINEER ·
            </textPath>
          </text>
        </g>

        {/* Center label */}
        <text className="c-label" x="280" y="276">P · RANK</text>
        <text className="c-label" x="280" y="291" fontSize="8" opacity=".6">2026</text>

        {/* NODE: Experience — 50° above right */}
        <g
          className={`node${is('exp') ? ' on' : ''}${locked('exp') ? ' locked' : ''}`}
          onMouseEnter={() => onActivate('exp')}
          onClick={() => onLock('exp')}
          style={{ cursor: 'pointer' }}
        >
          <circle className="node-ring" cx="414.9" cy="119.1" r="11" />
          <circle className="node-dot"  cx="414.9" cy="119.1" r="3.5" />
          <line
            className={`node-line${is('exp') ? ' on' : ''}`}
            x1="419" y1="119.1" x2="548" y2="119.1"
          />
          <text className="node-label" x="414.9" y="107" textAnchor="middle">Experience</text>
          <circle className="node-trigger" cx="414.9" cy="119.1" r="30" />
        </g>

        {/* NODE: Projects — 0° right */}
        <g
          className={`node${is('proj') ? ' on' : ''}${locked('proj') ? ' locked' : ''}`}
          onMouseEnter={() => onActivate('proj')}
          onClick={() => onLock('proj')}
          style={{ cursor: 'pointer' }}
        >
          <circle className="node-ring" cx="490" cy="280" r="11" />
          <circle className="node-dot"  cx="490" cy="280" r="3.5" />
          <line
            className={`node-line${is('proj') ? ' on' : ''}`}
            x1="494" y1="280" x2="548" y2="280"
          />
          <text className="node-label" x="490" y="268" textAnchor="middle">Projects</text>
          <circle className="node-trigger" cx="490" cy="280" r="30" />
        </g>

        {/* NODE: About — 50° below right */}
        <g
          className={`node${is('about') ? ' on' : ''}${locked('about') ? ' locked' : ''}`}
          onMouseEnter={() => onActivate('about')}
          onClick={() => onLock('about')}
          style={{ cursor: 'pointer' }}
        >
          <circle className="node-ring" cx="414.9" cy="440.9" r="11" />
          <circle className="node-dot"  cx="414.9" cy="440.9" r="3.5" />
          <line
            className={`node-line${is('about') ? ' on' : ''}`}
            x1="419" y1="440.9" x2="548" y2="440.9"
          />
          <text className="node-label" x="414.9" y="459" textAnchor="middle">About</text>
          <circle className="node-trigger" cx="414.9" cy="440.9" r="30" />
        </g>

      </svg>
    </div>
  )
}
