import { ReactNode } from 'react'
import CloseButton from './closeButton'

type Props = {
  title: string
  main: ReactNode
  setShowModal: Function
}

const Modal: React.FC<Props> = ({ title, main, setShowModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex animate-fade-in-up items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-center text-xl text-indigo-500">{title}</h3>
              <CloseButton onClick={() => setShowModal(false)} />
            </div>
            <div className="px-10 py-5">{main}</div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default Modal
