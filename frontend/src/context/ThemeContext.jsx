import { createContext, useContext, useCallback, useEffect, useState } from 'react'

const THEME_KEY = 'taskflow_theme'

const ThemeContext = createContext(null)

function applyTheme(theme) {
  document.documentElement.classList.toggle('light', theme === 'light')
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const setTheme = useCallback((next) => {
    setThemeState(next === 'light' ? 'light' : 'dark')
  }, [])

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'))
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

/** Call before React mount to avoid theme flash */
export function initTheme() {
  const stored = localStorage.getItem(THEME_KEY)
  applyTheme(stored === 'light' ? 'light' : 'dark')
}
