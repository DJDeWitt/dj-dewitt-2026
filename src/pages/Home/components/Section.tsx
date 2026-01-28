import type { ReactNode } from 'react'

export function Section({
  id,
  children,
  tone = 'default',
}: {
  id?: string
  children: ReactNode
  tone?: 'default' | 'muted' | 'accent'
}) {
  return (
    <section id={id} data-tone={tone} className="section">
      <div className="section__inner">{children}</div>
    </section>
  )
}
