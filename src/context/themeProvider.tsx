import { ReactNode, createContext, useState, useContext, useCallback, useEffect } from 'react'

import { lightTheme, darkTheme } from '@/theme/theme'
import media from '@/theme/media'

import { ThemeProvider as StyledProvider } from 'styled-components'

interface ThemeContextProps {
  themeMode: string
  setThemeMode: (mode: string) => void
}

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextProps>({ themeMode: '', setThemeMode: () => {} })

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useState<string>('light')

  useEffect(() => {
    const localTheme = localStorage.getItem('theme') || 'light'
    setThemeMode(localTheme)
  }, [])

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
      localStorage.setItem('theme', 'dark')
    } else {
      setThemeMode('light')
      localStorage.setItem('theme', 'light')
    }
  }, [themeMode, setThemeMode])

  return [themeMode, toggleTheme]
}

export { ThemeProvider, useTheme }
