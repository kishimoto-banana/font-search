import 'cropperjs/dist/cropper.css'
import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
import { Cropper } from 'react-cropper'
import ImageUploader from '../components/imageUploader'

const Home: NextPage = () => {
  const [image, setImage] = useState('')
  const [cropData, setCropData] = useState('#')
  const [cropper, setCropper] = useState<any>()

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setImage(reader.result?.toString() || '')
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }

  // const getCropData = () => {
  //   if (typeof cropper !== 'undefined') {
  //     setCropData(cropper.getCroppedCanvas().toDataURL())
  //   }
  // }

  // const onCrop = () => {
  //   const imageElement: any = cropperRef?.current
  //   const cropper: any = imageElement?.cropper
  //   console.log(cropper.getCroppedCanvas().toDataURL())
  // }

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
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
