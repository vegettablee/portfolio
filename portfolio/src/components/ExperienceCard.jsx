export default function ExperienceCard() {
  return (
    <div className="exp-card-wrap">
      <div className="exp-card exp-card-back" />
      <div className="exp-card exp-card-front">
        <div className="exp-status">
          <span className="exp-status-text">active</span>
          <span className="exp-status-dot" />
        </div>
        <h3 className="exp-card-title">Solutions<br/>Engineer</h3>
        <p className="exp-card-preview">Preview description placeholder.</p>
      </div>
    </div>
  )
}
