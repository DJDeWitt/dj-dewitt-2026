import * as React from 'react'
import { CTAButton } from './CTAButton'

export type Project = {
  slug: string
  name: string
  tagline: string
  description: string
  stack: string[]
  highlights: string[]
  links?: { label: string; href: string }[]
  badge?: string
}

export function ProjectCard(project: Project) {
  return (
    <article className="card card--project">
      <div className="project__top">
        <div>
          <div className="project__nameRow">
            <h3 className="h3">{project.name}</h3>
            {project.badge ? <span className="pill">{project.badge}</span> : null}
          </div>
          <div className="muted">{project.tagline}</div>
        </div>
      </div>

      <p className="p">{project.description}</p>

      <div className="chips">
        {project.stack.map((t) => (
          <span className="chip" key={t}>
            {t}
          </span>
        ))}
      </div>

      <ul className="list list--tight">
        {project.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>

      {project.links?.length ? (
        <div className="actions">
          {project.links.map((l) => (
            <CTAButton key={l.href} href={l.href} variant="secondary" size="sm">
              {l.label}
            </CTAButton>
          ))}
        </div>
      ) : null}
    </article>
  )
}