import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import Header from '@/components/common/Header'
import { ThemeProvider } from '@/context/themeProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const htmlClass = url.replace(/\//g, '-').substring(1) || 'home'
      document.documentElement.className = `page-${htmlClass}`
    }

    handleRouteChange(router.pathname)

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
