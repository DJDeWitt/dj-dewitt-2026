import * as React from 'react'

export type Testimonial = {
  quote: string
  name: string
  title: string
  context?: string
  avatarText?: string // e.g. initials
  tone?: 'default' | 'muted'
}

export function TestimonialCard({
  quote,
  name,
  title,
  context,
  avatarText,
  tone = 'default',
}: Testimonial) {
  return (
    <figure className={`card card--testimonial card--${tone}`}>
      <blockquote className="quote">“{quote}”</blockquote>
      <figcaption className="byline">
        <div className="avatar" aria-hidden="true">
          {avatarText ?? name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
        </div>
        <div>
          <div className="byline__name">{name}</div>
          <div className="byline__title">{title}</div>
          {context ? <div className="byline__context">{context}</div> : null}
        </div>
      </figcaption>
    </figure>
  )
}