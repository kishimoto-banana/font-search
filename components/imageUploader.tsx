type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ImageUploader: React.FC<Props> = ({ onChange }) => {
  return (
    <div>
      <label
        htmlFor="file"
        className="cursor-pointer rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
      >
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
