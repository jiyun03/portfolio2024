import type { AppProps } from 'next/app'
import Header from '@/components/common/Header'
import { ThemeProvider } from '@/context/themeProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
