import { ThemeProvider } from '@/context/themeProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'
import Header from '@/components/common/Header'

export default function Home() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Header />
    </ThemeProvider>
  )
}
