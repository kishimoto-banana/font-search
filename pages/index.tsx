import 'cropperjs/dist/cropper.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import { Cropper } from 'react-cropper'
import ImageUploader from '../components/imageUploader'

const fontSearchApiEndpoint = process.env.NEXT_PUBLIC_FONT_SEARCH_API_ENDPOINT
const visionApiEndpoint = `${process.env.NEXT_PUBLIC_VISION_API_ENDPOINT}?key=${process.env.NEXT_PUBLIC_VISION_API_KEY}`

const title = 'ふぉんとさーち（β）'

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
    <div className="flex justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
    </div>
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

  const getCropData = async () => {
    // console.log(cropper.getCroppedCanvas().toDataURL())
    // typeは検討
    // https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL
    setLoading(true)

    const encodedImage = cropper
      .getCroppedCanvas()
      .toDataURL()
      .replace(/^data:image\/(png|jpg);base64,/, '')

    const tasks = []

    const fontSearchHeaders = new Headers()
    fontSearchHeaders.append('Content-Type', 'application/json')
    fontSearchHeaders.append(
      'x-api-key',
      process.env.NEXT_PUBLIC_FONT_SEARCH_API_KEY
    )
    const fontSearchBody = JSON.stringify({
      content: encodedImage,
    })
    const fontSearch = fetch(fontSearchApiEndpoint, {
      method: 'POST',
      headers: fontSearchHeaders,
      body: fontSearchBody,
    })
    tasks.push(fontSearch)

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

    if (process.env.NODE_ENV !== 'development') {
      const ocr = fetch(visionApiEndpoint, {
        method: 'POST',
        headers: ocrHeaders,
        body: ocrBody,
      })
      tasks.push(ocr)
    }

    Promise.all(tasks)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        setFonts(data[0].fonts)
        if (data.length > 1) {
          const detectedText = data[1].responses[0].fullTextAnnotation.text
          setText(detectedText)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{title}</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div>
          <ImageUploader onChange={onSelectFile} />
          <Cropper
            src={image}
            style={{ height: 400, width: '100%' }}
            zoomTo={0.1}
            initialAspectRatio={1}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance)
            }}
            preview=".img-preview"
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

        {loading ? (
          <Loading />
        ) : (
          Boolean(fonts) &&
          fonts.map((font, index) => (
            <div
              key={index}
              className="w-100 my-1 rounded-lg bg-white py-4 px-8 shadow-lg"
            >
              <div>
                <p
                  className={`text-gray-600" mt-2 text-5xl ${fontWeightClassName(
                    font.fontWeight
                  )} ${fontClassName(font.fontName)}`}
                >
                  {Boolean(text) ? text : 'ロゴデザイン'}
                </p>
              </div>
              <div className="mt-4 flex justify-end">
                <p className="text-md font-normal text-indigo-500">
                  {font.fontNameJa}{' '}
                  {fontWeightClassName(font.fontWeight).replace('font-', '')}-
                  {font.fontWeight}
                </p>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  )
}

export default Home
