import Image from 'next/image'
import okNgImage from '../public/ok_ng.jpeg'

const ExampleModal = () => {
  return (
    <>
      <input type="checkbox" id="example-modal" className="modal-toggle" />
      <label htmlFor="example-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="example-modal"
            className="btn btn-circle btn-sm absolute right-2 top-2 z-10"
          >
            ✕
          </label>
          <Image
            className="z-0"
            src={okNgImage}
            layout="responsive"
            objectFit="contain"
          />
        </label>
      </label>
    </>
  )
}

export default ExampleModal
