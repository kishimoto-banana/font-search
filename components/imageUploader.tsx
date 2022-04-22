type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
  hasImage: boolean
}

const ImageUploader: React.FC<Props> = ({ onChange, hasImage }) => {
  const btnSize = hasImage ? 'btn-md' : 'btn-lg'
  return (
    <div>
      <label htmlFor="file" className={`btn ${btnSize}`}>
        画像を選択
      </label>
      <input
        id="file"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={onChange}
      />
    </div>
  )
}

export default ImageUploader
