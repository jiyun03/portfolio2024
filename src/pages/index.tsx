import { ThemeProvider } from '@/context/themeProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'

export default function Home() {
  return (
    <ThemeProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
}
