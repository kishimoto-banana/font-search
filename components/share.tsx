import {
  TwitterShareButton,
  FacebookShareButton,
  HatenaShareButton,
  TwitterIcon,
  FacebookIcon,
  HatenaIcon,
} from 'react-share'

const Share = () => {
  const size = 32
  const url = 'https://fontpint.com'
  const title = 'フォントピント | 画像から日本語フォントを検索できるサイト'
  return (
    <div className="flex flex-row gap-4">
      <TwitterShareButton url={url} title={title} hashtags={['フォントピント']}>
        <TwitterIcon size={size} round={true} />
      </TwitterShareButton>

      <FacebookShareButton url={url}>
        <FacebookIcon size={size} round={true} />
      </FacebookShareButton>

      <HatenaShareButton url={url}>
        <HatenaIcon size={size} round={true} />
      </HatenaShareButton>
    </div>
  )
}

export default Share
