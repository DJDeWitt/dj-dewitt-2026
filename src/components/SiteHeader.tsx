import { Link } from '@tanstack/react-router'
import PencilIcon from '@/assets/icons/icon-pencil'
import ControllerIcon from '@/assets/icons/icon-controller'
import SoftwareIcon from '@/assets/icons/icon-software'

import SunIcon from '@/assets/icons/icon-sun'
import rgbWheel from '@/assets/rgb-wheel-2.png'

type ThemeMode = 'light' | 'dark' | 'system'

type SiteHeaderProps = {
  themeMode: ThemeMode
  onThemeChange: (mode: ThemeMode) => void
}

export function SiteHeader({ themeMode, onThemeChange }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <div className="content">
        <div className="header-row">
          {/* sections */}
          <nav className="header-nav">
            <Link className="header-button glass-card" to="/software" activeProps={{ style: { backgroundColor: 'red', fontWeight: 700 } }}><SoftwareIcon />Software</Link>
            <Link className="header-button glass-card" to="/games" activeProps={{ style: { backgroundColor: 'green', fontWeight: 700 } }}><ControllerIcon />Games</Link>
            <Link className="header-button glass-card" to="/writing" activeProps={{ style: { backgroundColor: 'blue', fontWeight: 700 } }}><PencilIcon />Writing</Link>
          </nav>
          {/* header */}
          <div className="header-brand">
            <div className="header-logo">
              <Link className="header-link" to="/">
                <img src={rgbWheel} alt="DJ DeWitt" />
                DJ DeWitt
              </Link>
            </div>
          </div>
          {/* user controls */}
          <div className="theme-toggle" role="group" aria-label="Theme">
            <button
              type="button"
              className="theme-toggle__button"
              data-active={themeMode === 'light'}
              onClick={() => onThemeChange('light')}
              aria-pressed={themeMode === 'light'}
            >
              <SunIcon />
              Light
            </button>
            <button
              type="button"
              className="theme-toggle__button"
              data-active={themeMode === 'system'}
              onClick={() => onThemeChange('system')}
              aria-pressed={themeMode === 'system'}
            >
              System
            </button>
            <button
              type="button"
              className="theme-toggle__button"
              data-active={themeMode === 'dark'}
              onClick={() => onThemeChange('dark')}
              aria-pressed={themeMode === 'dark'}
            >
              Dark
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
