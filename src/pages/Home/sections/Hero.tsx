
import { Section } from '../components/Section'
import { CTAButton } from '../components/CTAButton'
// import heroVisual from '../../../assets/home-hero-visual.png'

export function Hero() {
  return (
    <Section id="top" tone="default">
      <div className="hero">
        <div className="hero__left" style={{ backgroundColor: 'white', textAlign: 'center', border: '2px solid lightgray', borderRadius: '8px', borderBottom: '4px solid lightgray', padding: '10px', marginBottom: '20px' }}>
          <h1 className="hero__title">
            I turn ambitious product ideas into shipped software.
            <span className="hero__subtitle"> Without the “we’ll circle back” spiral.</span>
          </h1>

          <p className="hero__lede">
            I’m a positive, detail-obsessed builder who loves collaborating with stakeholders (yes, really). I lead teams,
            ship full-stack features, and keep plans grounded in reality.
          </p>

          <div className="hero__ctas">
            <button>SEE PROJECTS</button>
            <CTAButton to="#projects" variant="primary">
              See Projects
            </CTAButton>
            <CTAButton to="#contact" variant="secondary">
              Let’s Talk
            </CTAButton>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__image"></div>
        </div>
      </div>
    </Section>
  )
}
