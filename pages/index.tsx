import 'cropperjs/dist/cropper.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { Cropper } from 'react-cropper'
import ImageUploader from '../components/imageUploader'

const fontSearchApiEndpoint = process.env.NEXT_PUBLIC_FONT_SEARCH_API_ENDPOINT
const visionApiEndpoint = `${process.env.NEXT_PUBLIC_VISION_API_ENDPOINT}?key=${process.env.NEXT_PUBLIC_VISION_API_KEY}`

const Home: NextPage = () => {
  const [image, setImage] = useState('')
  const [filename, setFileName] = useState('')
  const [cropper, setCropper] = useState<any>()
  const [text, setText] = useState('')

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImage(reader.result?.toString() || '')
      })
      reader.readAsDataURL(e.target.files[0])
      setFileName(e.target.files[0].name)
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
      name: filename,
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

    if (process.env.NODE_ENV === 'development') {
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
        const detectedText = data[1].responses[0].fullTextAnnotation.text
        setText(detectedText)
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

        {Boolean(text) && <p>{text}</p>}
      </main>
    </div>
  )
}

export default Home
