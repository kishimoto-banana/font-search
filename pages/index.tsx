import 'cropperjs/dist/cropper.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { Cropper } from 'react-cropper'
import ImageUploader from '../components/imageUploader'

const fontSearchApiEndpoint = process.env.NEXT_PUBLIC_FONT_SEARCH_API_ENDPOINT
// const fontSearchApiEndpoint =
//   'https://1mt3pjzokj.execute-api.ap-northeast-1.amazonaws.com/prod/v1/fonts/'
// const visionApiEndpoint = `${process.env.NEXT_PUBLIC_VISION_API_ENDPOINT}?key=${process.env.NEXT_PUBLIC_VISION_API_KEY}`
const visionApiEndpoint = 'http://localhost:8000/mock/ocr/'

const title = 'ふぉんとさーち（β）'
const maxChars = 25
const abortTime = 15000

const fontClassName = (fontName: string) => {
  switch (fontName) {
    case 'kaiseiopti':
      return 'font-kaiseiopti'
    case 'kaiseidecol':
      return 'font-kaiseidecol'
    case 'kaiseiharunoumi':
      return 'font-kaiseiharunoumi'
    case 'kaiseitokumin':
      return 'font-kaiseitokumin'
    case 'hinamincho':
      return 'font-hinamincho'
    case 'kleeone':
      return 'font-kleeone'
    case 'rampartone':
      return 'font-rampartone'
    case 'shipporimincho':
      return 'font-shipporimincho'
    case 'sawarabigothic':
      return 'font-sawarabigothic'
    case 'sawarabimincho':
      return 'font-sawarabimincho'
    case 'newtegomin':
      return 'font-newtegomin'
    case 'kiwimaru':
      return 'font-kiwimaru'
    case 'delagothicone':
      return 'font-delagothicone'
    case 'yomogi':
      return 'font-yomogi'
    case 'hachimarupop':
      return 'font-hachimarupop'
    case 'pottaone':
      return 'font-pottaone'
    case 'stick':
      return 'font-stick'
    case 'rocknrollone':
      return 'font-rocknrollone'
    case 'reggaeone':
      return 'font-reggaeone'
    case 'trainone':
      return 'font-trainone'
    case 'dotgothic16':
      return 'font-dotgothic16'
    case 'yuseimagic':
      return 'font-yuseimagic'
    case 'kosugi':
      return 'font-kosugi'
    case 'kosugimaru':
      return 'font-kosugimaru'
    case 'mplus1':
      return 'font-mplus1'
    case 'mplus2':
      return 'font-mplus2'
    case 'mplus1code':
      return 'font-mplus1code'
    case 'notosansjp':
      return 'font-notosansjp'
    case 'notoserifjp':
      return 'font-notoserifjp'
    case 'zenantiquesoft':
      return 'font-zenantiquesoft'
    case 'murecho':
      return 'font-murecho'
    case 'mochiypopone':
      return 'font-mochiypopone'
    case 'yujisyuku':
      return 'font-yujisyuku'
    case 'yujiboku':
      return 'font-yujiboku'
    case 'yujimai':
      return 'font-yujimai'
    case 'zenkakugothicnew':
      return 'font-zenkakugothicnew'
    case 'zenmarugothic':
      return 'font-zenmarugothic'
    case 'zenkakugothicantique':
      return 'font-zenkakugothicantique'
    case 'zenoldmincho':
      return 'font-zenoldmincho'
    case 'zenantique':
      return 'font-zenantique'
    case 'zenkurenaido':
      return 'font-zenkurenaido'
    case 'shipporiantique':
      return 'font-shipporiantique'
    case 'morisawabizudgothic':
      return 'font-morisawabizudgothic'
    case 'morisawabizudmincho':
      return 'font-morisawabizudmincho'
    case 'morisawabizudpmincho':
      return 'font-morisawabizudpmincho'
  }
}

const fontWeightClassName = (fontWeight: number) => {
  switch (fontWeight) {
    case 100:
      return 'font-thin'
    case 200:
      return 'font-extralight'
    case 300:
      return 'font-light'
    case 400:
      return 'font-normal'
    case 500:
      return 'font-medium'
    case 600:
      return 'font-semibold'
    case 700:
      return 'font-bold'
    case 800:
      return 'font-extrabold'
    case 900:
      return 'font-black'
  }
}

const Loading = () => {
  return (
    <div className="height-0 absolute top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25">
      <div className="flex justify-center space-x-2">
        <div className="h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-100  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-200  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-300  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-400  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
      </div>
    </div>
  )
}

const Modal = ({ img, fontName, fontNameJa, fontWeight, setShowModal }) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex animate-fade-in-up items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-3xl">
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
              <h3 className="text-center text-2xl  text-indigo-500">
                {' '}
                {fontNameJa}{' '}
                {fontWeightClassName(fontWeight).replace('font-', '')}-
                {fontWeight}
              </h3>
              <button
                type="button"
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="px-10 pb-5">
              <img src={img} />
              <>
                <div>
                  <p
                    className={`mt-2 text-5xl ${fontWeightClassName(
                      fontWeight
                    )} ${fontClassName(fontName)}`}
                  >
                    ロゴデザイン
                  </p>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

const Home: NextPage = () => {
  const [image, setImage] = useState('')
  const [cropper, setCropper] = useState<any>()
  const [text, setText] = useState('')
  const [fonts, setFonts] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitCount, setSubmitCount] = useState(0) // 送信されたときに useEffect走るように（countじゃくていいのだが…）
  const firstRender = useRef(true)
  const [showModal, setShowModal] = useState(false)
  const [croppedImage, setCroppedImage] = useState('')
  const [selectedFont, setSelectedFont] = useState(null)
  const [errorOcr, setErrorOcr] = useState(false)
  const [errorVfr, setErrorVfr] = useState(false)
  const [timeoutVfr, setTimeoutVfr] = useState(false)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!doneSubmit()) {
      return
    }
    getCropData()
  }, [submitCount])

  const doneSubmit = () => {
    return Boolean(submitCount)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImage(reader.result?.toString() || '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const getCropData = () => {
    // console.log(cropper.getCroppedCanvas().toDataURL())
    // typeは検討
    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL
    setLoading(true)
    setCroppedImage(cropper.getCroppedCanvas().toDataURL())

    const encodedImage = cropper
      .getCroppedCanvas()
      .toDataURL()
      .replace(/^data:image\/(png|jpg);base64,/, '')

    const fontSearchHeaders = new Headers()
    fontSearchHeaders.append('Content-Type', 'application/json')
    fontSearchHeaders.append(
      'x-api-key',
      process.env.NEXT_PUBLIC_FONT_SEARCH_API_KEY
    )
    const fontSearchBody = JSON.stringify({
      content: encodedImage,
    })

    const ocrHeaders = new Headers()
    ocrHeaders.append('Content-Type', 'application/json')
    const ocrBody = JSON.stringify({
      requests: [
        {
          image: { content: encodedImage },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    })

    const fetchParams = [
      {
        endpoint: fontSearchApiEndpoint,
        method: 'POST',
        headers: fontSearchHeaders,
        body: fontSearchBody,
      },
      {
        endpoint: visionApiEndpoint,
        method: 'POST',
        headers: ocrHeaders,
        body: ocrBody,
      },
    ]

    const controller = new AbortController()
    const timeout = setTimeout(() => {
      controller.abort()
    }, abortTime)

    Promise.all(
      fetchParams.map((param) =>
        fetch(param.endpoint, {
          method: param.method,
          headers: param.headers,
          body: param.body,
          signal: controller.signal,
        }).catch((err) => err)
      )
    )
      .then((responses) => {
        // console.log('---responses--')
        // console.log(responses)
        return Promise.all(
          responses.map((res) =>
            res instanceof Error ? res : res.json().catch((err) => err)
          )
        )
      })
      .then((data) => {
        // console.log('---font--')
        // console.log(
        //   data[0],
        //   data[0] instanceof Error,
        //   typeof data[0],
        //   data[0].name
        // )
        // console.log('---orc--')
        // console.log(data[1], data[1] instanceof Error, typeof data[1])

        // フォント認識
        if ('error' in data[0] || data[0] instanceof Error) {
          if (data[0].name === 'AbortError') {
            setTimeoutVfr(true)
          }
          setErrorVfr(true)
        } else {
          setFonts(data[0].fonts)
          setErrorVfr(false)
          setTimeoutVfr(false)
        }

        // ocr
        if ('error' in data[1] || data[1] instanceof Error) {
          setErrorOcr(true)
          return
        }
        if ('fullTextAnnotation' in data[1].responses[0]) {
          const detectedText =
            data[1].responses[0].fullTextAnnotation.text.replace(/\r?\n/g, '')
          const slicedText =
            detectedText.length <= maxChars
              ? detectedText
              : detectedText.slice(0, maxChars)
          setText(slicedText)
          setErrorOcr(false)
          return
        }
        setText('')
        setErrorOcr(false)
      })
      .finally(() => {
        clearTimeout(timeout)
        setLoading(false)
      })
  }

  const handleClick = (font) => {
    setShowModal(true)
    setSelectedFont(font)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-8 pt-10 text-center">
        <div>
          {!Boolean(image) && (
            <>
              <h1 className="pb-3 text-3xl">{title}</h1>
              <h2 className="pb-10 text-lg">
                似ている日本語フォントを探します
              </h2>
            </>
          )}
          <div className="mb-4">
            <ImageUploader onChange={onSelectFile} />
          </div>
          <Cropper
            src={image}
            className="h-72 w-full md:h-96 md:w-156"
            zoomTo={0.1}
            initialAspectRatio={1}
            viewMode={1}
            responsive={true}
            autoCropArea={1}
            autoCrop={true}
            checkOrientation={true}
            onInitialized={(instance) => {
              setCropper(instance)
            }}
            guides={true}
          />
        </div>

        {Boolean(image) && (
          <div>
            <button
              className="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
              onClick={() => setSubmitCount(submitCount + 1)}
            >
              そうしん！
            </button>
          </div>
        )}

        {timeoutVfr && <h1>数分時間を置いてお試しください</h1>}
        {errorOcr && <h1>ocr エラー</h1>}
        {errorVfr && <h1>vfr エラー</h1>}

        {loading ? (
          <Loading />
        ) : (
          Boolean(fonts) &&
          fonts.map((font, index) => (
            <button
              key={index}
              className="w-100 my-1 animate-fade-in-up rounded-lg bg-white py-4 px-8 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
              // onClick={() => setShowModal(true)}
              onClick={() => handleClick(font)}
            >
              <div>
                <p
                  className={`mt-2 text-5xl ${fontWeightClassName(
                    font.fontWeight
                  )} ${fontClassName(font.fontName)}`}
                >
                  {errorOcr
                    ? 'サンプル文字です'
                    : Boolean(text)
                    ? text
                    : '(・_・)'}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <p className="text-md font-normal text-indigo-500">
                  {font.fontNameJa}{' '}
                  {fontWeightClassName(font.fontWeight).replace('font-', '')}-
                  {font.fontWeight}
                </p>
              </div>
            </button>
          ))
        )}

        {showModal && (
          <Modal
            img={croppedImage}
            fontName={selectedFont.fontName}
            fontNameJa={selectedFont.fontNameJa}
            fontWeight={selectedFont.fontWeight}
            setShowModal={setShowModal}
          />
        )}
      </main>
    </div>
  )
}

export default Home
