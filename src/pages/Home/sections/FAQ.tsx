// src/pages/Home/sections/FAQ.tsx
import { Section } from '../components/Section'
import { Accordion } from '../components/Accordion'
import { faqs } from '../data/faqs'

export function FAQ() {
  return (
    <Section id="faq" tone="muted">
      <div className="faq">
        <header className="section-header">
          <h2>FAQ</h2>
          <p>Questions I’d ask if I were hiring me.</p>
        </header>

        <Accordion items={faqs} />
      </div>
    </Section>
  )
}
