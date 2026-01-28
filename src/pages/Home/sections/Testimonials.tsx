// src/pages/Home/sections/Testimonials.tsx
import { Section } from '../components/Section'
import { TestimonialCard } from '../components/TestimonialCard'
import { testimonials } from '../data/testimonials'

export function Testimonials() {
  return (
    <Section id="testimonials" tone="muted">
      <div className="testimonials">
        <header className="section-header">
          <h2>Reviews</h2>
          <p>Real words from real humans. (No, my dog did not write these. Probably.)</p>
        </header>

        <div className="grid grid--3">
          {testimonials.map((t) => (
            <TestimonialCard key={`${t.name}-${t.title}`} {...t} />
          ))}
        </div>
      </div>
    </Section>
  )
}
