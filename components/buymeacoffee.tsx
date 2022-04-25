import Image from 'next/image'
import buymeacoffee from '../public/buymeacoffee.png'

const BuyMeACoffee = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/unpuytw"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={buymeacoffee} alt="Buy Me A Coffee" width={174} height={48} />
    </a>
  )
}

export default BuyMeACoffee
