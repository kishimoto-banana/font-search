import 'cropperjs/dist/cropper.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Cropper } from 'react-cropper'
import ExampleModal from '../components/exampleModal'
import FontModal from '../components/fontModal'
import Footer from '../components/Footer'
import ImageUploader from '../components/imageUploader'
import Loading from '../components/loading'
import Share from '../components/share'
import niwatori from '../public/niwatori.jpeg'

const fontSearchApiEndpoint = process.env.NEXT_PUBLIC_FONT_SEARCH_API_ENDPOINT
const visionApiEndpoint = `${process.env.NEXT_PUBLIC_VISION_API_ENDPOINT}?key=${process.env.NEXT_PUBLIC_VISION_API_KEY}`

const title = 'フォントピント（β）'
const maxChars = 25
const abortTime = 15000

type PredictFont = {
  fontName: string
  fontNameJa: string
  fontNameEn: string
  fontWeight: number
  score: number
}

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
    default:
      return 'font-notosansjp'
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
    default:
      return 'font-normal'
  }
}

const Home: NextPage = () => {
  const [image, setImage] = useState('')
  const [cropper, setCropper] = useState<any>()
  const [text, setText] = useState('')
  const [fonts, setFonts] = useState<PredictFont[]>([])
  const [loading, setLoading] = useState(false)
  const [submitCount, setSubmitCount] = useState(0) // 送信されたときに useEffect走るように（countじゃくていいのだが…）
  const firstRender = useRef(true)
  // const [showModal, setShowModal] = useState(false)
  const [croppedImage, setCroppedImage] = useState('')
  const [selectedFont, setSelectedFont] = useState<PredictFont>({
    fontName: 'notosansjp',
    fontNameJa: 'Noto Sans Japanese',
    fontNameEn: 'Noto Sans Japanese',
    fontWeight: 400,
    score: 1.0,
  })
  const [errorOcr, setErrorOcr] = useState(false)
  const [errorVfr, setErrorVfr] = useState(false)
  const [timeoutVfr, setTimeoutVfr] = useState(false)

  const displayFontName = selectedFont
    ? selectedFont.fontNameJa +
      ' ' +
      fontWeightClassName(selectedFont.fontWeight).replace('font-', '') +
      '-' +
      selectedFont.fontWeight
    : ''
  const displayText = errorOcr
    ? 'サンプル文字です'
    : Boolean(text)
    ? text
    : '＼(^o^)／'

  const fontModalKey = 'font-modal'

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
        return Promise.all(
          responses.map((res) =>
            res instanceof Error ? res : res.json().catch((err: any) => err)
          )
        )
      })
      .then((data) => {
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center px-8 pt-10 text-center">
        {!Boolean(image) && (
          <>
            <h1 className="pb-5 text-3xl">{title}</h1>
            <div className="pb-14 text-center text-lg">
              <p>画像中のテキストに似ている</p>
              <p>日本語フォントを探します</p>
            </div>
          </>
        )}
        <div className="mb-4">
          <ImageUploader onChange={onSelectFile} />
        </div>

        {Boolean(image) && (
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
        )}

        {Boolean(image) && (
          <>
            <label
              htmlFor="example-modal"
              className="modal-button cursor-pointer pt-1 text-lg text-indigo-500 underline hover:text-indigo-800"
            >
              良い例と悪い例
            </label>

            <div>
              <button
                className="btn mt-4"
                onClick={() => setSubmitCount(submitCount + 1)}
              >
                検索
              </button>
            </div>
          </>
        )}

        {!loading && !errorVfr && errorOcr && (
          <div className="pt-4">
            <Image
              src={niwatori}
              width={100}
              height={100}
              objectFit="contain"
            />
            <p className="text-lg font-bold">文字を認識できていません</p>
          </div>
        )}

        {loading ? (
          <Loading />
        ) : errorVfr ? (
          timeoutVfr ? (
            <div className="py-4">
              <Image
                src={niwatori}
                width={100}
                height={100}
                objectFit="contain"
              />
              <p className="text-lg font-bold">数分後にお試しください</p>
              <p className="text-lg font-bold">
                （タイミングによって遅いときがあります）
              </p>
            </div>
          ) : (
            <div className="py-4">
              <Image
                src={niwatori}
                width={100}
                height={100}
                objectFit="contain"
              />
              <p className="text-lg font-bold">現在動いていません</p>
            </div>
          )
        ) : (
          Boolean(fonts) &&
          fonts.map((font, index) => (
            <label
              key={index}
              className="my-1 w-80 animate-fade-in-up cursor-pointer rounded-lg bg-white py-4 px-4 shadow-lg transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 md:w-100 md:px-8"
              onClick={() => setSelectedFont(font)}
              htmlFor={fontModalKey}
            >
              <div>
                <p
                  className={`mt-2 text-3xl md:text-5xl ${fontWeightClassName(
                    font.fontWeight
                  )} ${fontClassName(font.fontName)}`}
                >
                  {displayText}
                </p>
              </div>
              <div className="mt-2 flex justify-end md:mt-4">
                <p className="text-md font-normal text-gray-400 md:text-lg">
                  {font.fontNameJa}{' '}
                  {fontWeightClassName(font.fontWeight).replace('font-', '')}-
                  {font.fontWeight}
                </p>
              </div>
            </label>
          ))
        )}

        <div className="pt-16">
          <Share />
        </div>

        <FontModal
          id={fontModalKey}
          fontName={displayFontName}
          img={croppedImage}
          styleFont={fontClassName(selectedFont.fontName)}
          styleFontWeight={fontWeightClassName(selectedFont.fontWeight)}
          text={displayText}
        />

        <ExampleModal />
      </main>
      <Footer />
    </div>
  )
}

export default Home
