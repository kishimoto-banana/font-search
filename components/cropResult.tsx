import { PixelCrop } from 'react-image-crop'

type Props = {
  ref: React.RefObject<HTMLCanvasElement>
  crop: PixelCrop | undefined
}

const CropResult: React.FC<Props> = ({ ref, crop }) => {
  return (
    <canvas
      ref={ref}
      style={{
        border: '1px solid black',
        objectFit: 'contain',
        width: crop?.width,
        height: crop?.height,
      }}
    />
  )
}

export default CropResult
