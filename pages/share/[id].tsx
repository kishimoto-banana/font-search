import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

type Props = {
  id: string
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as Props
  return {
    props: { id: id },
  }
}

const SharePage: React.FC<Props> = ({ id }) => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/')
  }, [])

  return (
    <Head>
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
        content="https://d173y4sbgdpniu.cloudfront.net/default/aries.png"
        key="og_image"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="https://fontpint.com" />
      <meta
        name="twitter:image"
        content="https://d173y4sbgdpniu.cloudfront.net/default/aries.png"
        key="og_twitter_image"
      />
    </Head>
  )
}

export default SharePage
