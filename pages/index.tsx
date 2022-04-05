import 'cropperjs/dist/cropper.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { Cropper } from 'react-cropper'
import ImageUploader from '../components/imageUploader'

const fontSearchApiEndpoint = process.env.NEXT_PUBLIC_FONT_SEARCH_API_ENDPOINT
const visionApiEndpoint = `${process.env.NEXT_PUBLIC_VISION_API_ENDPOINT}?key=${process.env.NEXT_PUBLIC_VISION_API_KEY}`

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

const Home: NextPage = () => {
  const [image, setImage] = useState('')
  const [cropper, setCropper] = useState<any>()
  const [text, setText] = useState('')
  const [fonts, setFonts] = useState([])

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

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const encodedImage = cropper
      .getCroppedCanvas()
      .toDataURL()
      .replace(/^data:image\/(png|jpg);base64,/, '')

    const tasks = []
    const fontSearchBody = JSON.stringify({
      content: encodedImage,
    })
    const fontSearch = fetch(fontSearchApiEndpoint, {
      method: 'POST',
      headers,
      body: fontSearchBody,
    })
    tasks.push(fontSearch)

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
        headers,
        body: ocrBody,
      })
      tasks.push(ocr)
    }

    Promise.all(tasks)
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((data) => {
        console.log(data)
        setFonts(data[0].fonts)
        if (data.length > 1) {
          const detectedText = data[1].responses[0].fullTextAnnotation.text
          setText(detectedText)
        }
      })
  }

  const getText = () => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    const body = JSON.stringify({
      requests: [
        {
          image: {
            content: cropper
              .getCroppedCanvas()
              .toDataURL()
              .replace(/^data:image\/(png|jpg);base64,/, ''),
          },
          features: [{ type: 'TEXT_DETECTION' }],
        },
      ],
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('ocr api skip')
      return
    }

    fetch(visionApiEndpoint, {
      method: 'POST',
      headers,
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }

  console.log(fonts)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>ふぉんとさーち（仮）</title>
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div>
          <ImageUploader onChange={onSelectFile} />
          <Cropper
            src={image}
            style={{ height: 400, width: '100%' }}
            zoomTo={0.5}
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
            <h1>Preview</h1>
            <div
              className="img-preview"
              style={{ width: '100%', height: 400 }}
            />
            <button onClick={getCropData}>そうしん！</button>
          </div>
        )}

        {Boolean(fonts) &&
          fonts.map((font, index) => (
            <div
              key={index}
              className="my-1 max-w-md rounded-lg bg-white py-4 px-8 shadow-lg"
            >
              <div>
                <p
                  className={`text-gray-600" mt-2 text-5xl ${fontWeightClassName(
                    font.fontWeight
                  )} ${fontClassName(font.fontName)}`}
                >
                  ロゴデザイン
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
          ))}
      </main>
    </div>
  )
}

export default Home
