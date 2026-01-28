// src/pages/Home/sections/FinalCTA.tsx
import { Section } from '../components/Section'
import { CTAButton } from '../components/CTAButton'

export function FinalCTA() {
  return (
    <Section id="contact" tone="accent">
      <div className="final-cta">
        <h2>Want an engineer who ships and communicates?</h2>
        <p>
          I’m happiest when I’m building useful things with kind people. If you’re working on something ambitious, let’s
          chat.
        </p>

        <div className="final-cta__buttons">
          <CTAButton to="mailto:djdewitt@gmail.com" variant="primary">
            Email me
          </CTAButton>
          <CTAButton to="#projects" variant="secondary">
            See projects again (because dopamine)
          </CTAButton>
        </div>

        <p className="fineprint">No recruiter-speak required. Bonus points if you like dogs.</p>
      </div>
    </Section>
  )
}
