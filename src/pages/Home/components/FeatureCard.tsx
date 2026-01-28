import * as React from 'react'

type FeatureCardProps = {
  eyebrow?: string
  title: string
  body: string
  bullets?: string[]
  icon?: React.ReactNode
  tone?: 'default' | 'muted' | 'accent'
}

export function FeatureCard({
  eyebrow,
  title,
  body,
  bullets,
  icon,
  tone = 'default',
}: FeatureCardProps) {
  return (
    <div className={`card card--feature card--${tone}`}>
      <div className="card__head">
        {icon ? <div className="card__icon" aria-hidden="true">{icon}</div> : null}
        <div className="card__titles">
          {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
          <h3 className="h3">{title}</h3>
        </div>
      </div>
      <p className="p">{body}</p>
      {bullets?.length ? (
        <ul className="list">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}