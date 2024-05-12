import { createContext, useState, useContext, useCallback } from 'react'
import { ThemeProvider as StyledProvider } from 'styled-components'

import { lightTheme, darkTheme } from '@/theme/theme'
import media from '@/theme/media'

interface ThemeContextProps {
  themeMode: string
  setThemeMode: (mode: string) => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextProps>({ themeMode: '', setThemeMode: () => {} })

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  let localTheme = 'light'
  if (typeof window !== 'undefined') {
    localTheme = localStorage.getItem('theme') || 'light'
  }
  const [themeMode, setThemeMode] = useState<string>(localTheme)
  const themeObject = themeMode === 'light' ? lightTheme : darkTheme

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={{ ...themeObject, ...media }}>{children}</StyledProvider>
    </ThemeContext.Provider>
  )
}

function useTheme(): [string, () => void] {
  const context = useContext(ThemeContext)
  const { themeMode, setThemeMode } = context

  const toggleTheme = useCallback(() => {
    if (themeMode === 'light') {
      setThemeMode('dark')
      window.localStorage.setItem('theme', 'dark')
    } else {
      setThemeMode('light')
      window.localStorage.setItem('theme', 'light')
    }
  }, [themeMode, setThemeMode])

  return [themeMode, toggleTheme]
}

export { ThemeProvider, useTheme }
