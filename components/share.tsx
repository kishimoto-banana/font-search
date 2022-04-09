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
  const url = 'https://font-search.vercel.app/'
  const title = '日本語フォントを検索します'
  return (
    <div className="flex flex-row gap-4">
      <TwitterShareButton url={url} title={title}>
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
