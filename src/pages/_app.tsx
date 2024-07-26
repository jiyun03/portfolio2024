import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Header from '@/components/common/Header'
import { ThemeProvider } from '@/context/themeProvider'
import { GlobalStyle } from '@/theme/GlobalStyle'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const is404 = router.pathname === '/404'

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
      <Head>
        <title>박지윤 포트폴리오</title>
        <meta property="og:title" content="박지윤 포트폴리오" />
        <meta property="og:description" content="박지윤의 포트폴리오 사이트입니다." />
        <meta property="og:image" content="/assets/img/common/menu_point.jpg" />
        <meta property="og:url" content="https://sprare06.vercel.app" />
      </Head>
      {!is404 && <Header />}
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
