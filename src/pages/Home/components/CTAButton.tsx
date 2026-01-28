import * as React from 'react'

type CTAButtonProps = {
  children: React.ReactNode
  to?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  ariaLabel?: string
}

export function CTAButton({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  ariaLabel,
}: CTAButtonProps) {
  const cls = [
    'cta',
    `cta--${variant}`,
    `cta--${size}`,
    className ?? '',
  ].join(' ')

  if (to) {
    return (
      <a className={cls} to={to} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button className={cls} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}