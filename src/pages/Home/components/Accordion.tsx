import * as React from 'react'

export type AccordionItem = {
  id: string
  question: string
  answer: React.ReactNode
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="accordion">
      {items.map((it) => (
        <details className="accordion__item" key={it.id}>
          <summary className="accordion__summary">
            <span>{it.question}</span>
            <span className="accordion__chev" aria-hidden="true">⌄</span>
          </summary>
          <div className="accordion__content">{it.answer}</div>
        </details>
      ))}
    </div>
  )
}