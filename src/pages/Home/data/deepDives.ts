export type DeepDive = {
  id: string
  title: string
  subtitle: string
  body: string
  bullets: string[]
  metric: string
  visualTitle: string
  visualRows: { label: string; value: string }[]
}

export const deepDives: DeepDive[] = [
  {
    id: 'idea-to-ship',
    title: 'From idea → shipped (without the “wait, what are we building?” part)',
    subtitle: 'Alignment, scope, milestones, and reality-based scheduling.',
    body:
      'I like shipping in slices. We agree on the outcome, define the smallest valuable version, and iterate with fast feedback loops. It’s boring in the best way.',
    bullets: [
      'Kickoff doc that answers the uncomfortable questions',
      'Milestones that map to user value, not internal tasks',
      '“Risk register” so surprises have to file paperwork',
    ],
    metric: 'Metric: reduced “surprise scope” by 80% (scientifically measured by fewer Slack pings)',
    visualTitle: 'Delivery Dashboard',
    visualRows: [
      { label: 'Clarity', value: '✅ High' },
      { label: 'Scope creep', value: '🧯 Contained' },
      { label: 'Stakeholder alignment', value: '🤝 Strong' },
      { label: 'Deadline realism', value: '📐 Verified' },
    ],
  },
  {
    id: 'full-stack',
    title: 'Full-stack product cohesion (so the seams don’t show)',
    subtitle: 'Rails + React + mobile + data: one coherent experience.',
    body:
      'I obsess over end-to-end product feel: flows, edge cases, error states, performance, and “what happens when the network is bad.”',
    bullets: [
      'APIs designed for product flows, not database tables',
      'Consistency across web + native',
      'Instrumentation so we can learn, not guess',
    ],
    metric: 'Metric: fewer “why is mobile different?” bugs (and fewer forehead wrinkles)',
    visualTitle: 'Cohesion Checklist',
    visualRows: [
      { label: 'Web', value: '✅' },
      { label: 'iOS/Android', value: '✅' },
      { label: 'API', value: '✅' },
      { label: 'Offline/Latency', value: '✅ (planned)' },
    ],
  },
  {
    id: 'team-systems',
    title: 'Team systems that scale (communication is a feature)',
    subtitle: 'Docs, rituals, quality bars, and shared ownership.',
    body:
      'I enjoy building the scaffolding that makes teams faster: crisp planning, reasonable process, and a culture where people can do their best work.',
    bullets: [
      'Decision records (so we stop relitigating)',
      'Review standards that teach, not shame',
      'Release hygiene: rollback plans, monitoring, ownership',
    ],
    metric: 'Metric: less chaos, more shipping, and fewer 2am “who knows this service?” moments',
    visualTitle: 'Ops Readiness',
    visualRows: [
      { label: 'On-call panic', value: '⬇️' },
      { label: 'Observability', value: '⬆️' },
      { label: 'Ownership', value: '⬆️' },
      { label: 'Sleep', value: '⬆️ (everyone wins)' },
    ],
  },
]