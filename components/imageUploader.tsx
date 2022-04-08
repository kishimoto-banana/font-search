type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ImageUploader: React.FC<Props> = ({ onChange }) => {
  return (
    <div>
      <label htmlFor="file" className="btn">
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
