// src/pages/Home/sections/SocialProof.tsx
import { Section } from '../components/Section'
import { LogoCloud } from '../components/LogoCloud'
import { socialProofLogos } from '../data/socialProofLogos'

export function SocialProof() {
  return (
    <Section id="proof" tone="muted">
      <div className="social-proof">
        <div className="social-proof__header">
          <h2>Trusted by serious institutions</h2>
          <p>
            Like <em>Mom</em>. And also a handful of real humans who ship software for a living.
          </p>
        </div>

        <LogoCloud logos={socialProofLogos} />

        <div className="social-proof__truth">
          <p className="fineprint">
            Also true: I’ve shipped web + mobile products, worked cross-functionally with design/product/ops, and enjoy the
            part where everyone leaves the meeting aligned.
          </p>
        </div>
      </div>
    </Section>
  )
}
