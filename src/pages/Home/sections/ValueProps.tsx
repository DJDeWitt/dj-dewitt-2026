// src/pages/Home/sections/ValueProps.tsx
import { Section } from '../components/Section'
import { FeatureCard } from '../components/FeatureCard'
import { valueProps } from '../data/valueProps'

export function ValueProps() {
  return (
    <Section id="skills" tone="default">
      <div className="value-props">
        <header className="section-header">
          <h2>Core capabilities</h2>
          <p>A traditional SaaS landing page would call these “features.” I call them “how I work.”</p>
        </header>

        <div className="grid grid--3">
          {valueProps.map((vp) => (
            <FeatureCard key={vp.title} {...vp} />
          ))}
        </div>
      </div>
    </Section>
  )
}
