// src/pages/Home/sections/Projects.tsx
import { Section } from '../components/Section'
import { ProjectCard } from '../components/ProjectCard'
import { projects } from '../data/projects'
import { CTAButton } from '../components/CTAButton'

export function Projects() {
  return (
    <Section id="projects" tone="default">
      <div className="projects">
        <header className="section-header">
          <h2>Projects</h2>
          <p>Some things I’ve built (and some things I’m building). Software, games, and creative experiments.</p>
        </header>

        <div className="grid grid--3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
        </div>

        <div className="projects__footer">
          <CTAButton to="#contact" variant="primary">
            Want the full story? Let’s talk.
          </CTAButton>
        </div>
      </div>
    </Section>
  )
}
