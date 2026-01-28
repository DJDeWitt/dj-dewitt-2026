// src/pages/Home/sections/Process.tsx
import { Section } from '../components/Section'
import { processSteps } from '../data/process'

export function Process() {
  return (
    <Section id="process" tone="default">
      <div className="process">
        <header className="section-header">
          <h2>How it works</h2>
          <p>Hiring me is basically onboarding a very polite shipping machine.</p>
        </header>

        <ol className="process__steps">
          {processSteps.map((step) => (
            <li key={step.title} className="process-step">
              <div className="process-step__badge">{step.step}</div>
              <div className="process-step__content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <ul>
                  {step.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="process__integrations">
          <h3>Integrates with</h3>
          <ul className="chips">
            <li className="chip">Figma</li>
            <li className="chip">Notion</li>
            <li className="chip">Slack</li>
            <li className="chip">Existing codebases</li>
            <li className="chip">Reality</li>
            <li className="chip">Dad jokes</li>
          </ul>
        </div>
      </div>
    </Section>
  )
}
