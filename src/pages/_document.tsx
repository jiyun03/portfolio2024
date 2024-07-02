import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

interface MyDocumentInitialProps extends DocumentInitialProps {
  pathname?: string
}

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      const pathname = ctx.pathname

      return {
        ...initialProps,
        pathname,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      } as DocumentInitialProps
    } finally {
      sheet.seal()
    }
  }

  render() {
    const { pathname } = this.props as MyDocumentInitialProps
    const htmlClass = pathname ? pathname.replace(/\//g, '-').substring(1) : ''

    return (
      <Html lang="ko" className={`page-${htmlClass}`}>
        <Head />
        <body>
          <Main />
          <div id="portal"></div>
          <NextScript />
        </body>
      </Html>
    )
  }
}
