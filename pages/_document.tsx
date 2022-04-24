import { Head, Html, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '../lib/gtag'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicons/favicon-16x16.png"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
        <meta charSet="utf-8" />
        <meta property="og:site_name" content="フォントピント" />
        <meta
          property="og:title"
          content="フォントピント | 画像から日本語フォントを検索できるサイト"
        />
        <meta
          property="og:description"
          content="画像中のテキストから似ている日本語フォントを検索します。"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fontpint.com" />
        <meta
          property="og:image"
          content="https://fontpint.com/favicons/ogp.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://fontpint.comk" />
        <meta
          name="twitter:image"
          content="https://fontpint.com/favicons/ogp.png"
        />
        <meta name="keywords" content="フォント,検索,日本語フォント,画像" />
        <meta
          name="description"
          content="画像中のテキストから似ている日本語フォントを検索します"
        />
        <GoogleAnalytics />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
