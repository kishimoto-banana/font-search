import { Head, Html, Main, NextScript } from 'next/document'
import { GoogleAnalytics } from '../lib/gtag'

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=BIZ+UDGothic:wght@400;700&family=BIZ+UDMincho&family=BIZ+UDPMincho&family=Dela+Gothic+One&family=DotGothic16&family=Hachi+Maru+Pop&family=Hina+Mincho&family=Kaisei+Decol:wght@400;500;700&family=Kaisei+HarunoUmi:wght@400;500;700&family=Kaisei+Opti:wght@400;500;700&family=Kaisei+Tokumin:wght@400;500;700;800&family=Kiwi+Maru:wght@300;400;500&family=Klee+One:wght@400;600&family=Kosugi&family=Kosugi+Maru&family=M+PLUS+1+Code:wght@100;200;300;400;500;600;700&family=M+PLUS+1:wght@100;200;300;400;500;600;700;800;900&family=M+PLUS+2:wght@100;200;300;400;500;600;700;800;900&family=Mochiy+Pop+One&family=Murecho:wght@100;200;300;400;500;600;700;800;900&family=New+Tegomin&family=Noto+Sans+JP:wght@100;300;400;500;700;900&family=Noto+Serif+JP:wght@200;300;400;500;600;700;900&family=Potta+One&family=Rampart+One&family=Reggae+One&family=RocknRoll+One&family=Sawarabi+Gothic&family=Sawarabi+Mincho&family=Shippori+Antique&family=Shippori+Mincho:wght@400;500;600;700;800&family=Stick&family=Train+One&family=Yomogi&family=Yuji+Boku&family=Yuji+Mai&family=Yuji+Syuku&family=Yusei+Magic&family=Zen+Antique&family=Zen+Antique+Soft&family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&family=Zen+Kurenaido&family=Zen+Maru+Gothic:wght@300;400;500;700;900&family=Zen+Old+Mincho:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
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
