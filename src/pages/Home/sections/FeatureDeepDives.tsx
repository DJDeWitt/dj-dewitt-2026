// src/pages/Home/sections/FeatureDeepDives.tsx
import { Section } from '../components/Section'
import { deepDives } from '../data/deepDives'
import { CTAButton } from '../components/CTAButton'

export function FeatureDeepDives() {
  return (
    <Section id="deep-dives" tone="muted">
      <div className="deep-dives">
        <header className="section-header">
          <h2>How I ship</h2>
          <p>Some light technobabble, some real process, and zero “AI synergy” buzzwords.</p>
        </header>

        <div className="deep-dives__list">
          {deepDives.map((dive, idx) => {
            const flip = idx % 2 === 1
            return (
              <article key={dive.title} className={`deep-dive ${flip ? 'deep-dive--flip' : ''}`}>
                <div className="deep-dive__copy">
                  <h3>{dive.title}</h3>
                  <p className="deep-dive__lede">{dive.lede}</p>

                  <ul className="deep-dive__bullets">
                    {dive.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  <div className="deep-dive__meta">
                    <div className="metric">
                      <span className="metric__label">{dive.metric.label}</span>
                      <strong className="metric__value">{dive.metric.value}</strong>
                    </div>
                    {dive.cta ? (
                      <CTAButton to={dive.cta.to} variant="secondary">
                        {dive.cta.label}
                      </CTAButton>
                    ) : null}
                  </div>
                </div>

                <div className="deep-dive__visual" aria-hidden="true">
                  <div className="mock-ui">
                    <div className="mock-ui__top">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                      <span className="mock-ui__title">{dive.visualTitle}</span>
                    </div>
                    <div className="mock-ui__body">
                      {dive.visualLines.map((line) => (
                        <div key={line} className="mock-ui__line">
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
