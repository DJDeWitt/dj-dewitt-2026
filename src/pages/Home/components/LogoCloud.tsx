import * as React from 'react'

export type Logo = {
  name: string
  tagline?: string
  // simple inline SVG component
  Svg: React.FC<React.SVGProps<SVGSVGElement>>
}

export function LogoCloud({ logos }: { logos: Logo[] }) {
  return (
    <div className="logoCloud" role="list" aria-label="Trusted by">
      {logos.map((l) => (
        <div className="logoCloud__item" role="listitem" key={l.name}>
          <l.Svg className="logoCloud__svg" aria-hidden="true" />
          <div className="logoCloud__name">{l.name}</div>
          {l.tagline ? <div className="logoCloud__tagline">{l.tagline}</div> : null}
        </div>
      ))}
    </div>
  )
}