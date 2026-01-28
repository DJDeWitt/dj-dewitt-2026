import { createRootRoute, Outlet } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

import { GridBackgroundAscii } from '@/components/GridBackgroundAscii';
import { SiteHeader } from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'

export const Route = createRootRoute({
  component: Root,
})

type ThemeMode = 'light' | 'dark' | 'system'

const THEME_STORAGE_KEY = 'theme-preference'

const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system'
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  return 'system'
}

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (mode: ThemeMode) => {
  const theme = mode === 'system' ? getSystemTheme() : mode
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.setAttribute('data-theme-mode', mode)
}

function Root() {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => getStoredTheme())

  useEffect(() => {
    if (typeof window === 'undefined') return
    applyTheme(themeMode)
    window.localStorage.setItem(THEME_STORAGE_KEY, themeMode)
  }, [themeMode])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (themeMode !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => applyTheme('system')

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [themeMode])

  return (
    <div className="app-root">
      <GridBackgroundAscii />
      <SiteHeader themeMode={themeMode} onThemeChange={setThemeMode} />

      <main className="site-main" style={{ position: "relative", zIndex: 1 }}>
        <div className="content">
        <Outlet />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
