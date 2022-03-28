type Props = {
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const ImageUploader: React.FC<Props> = ({ onChange }) => {
  return (
    <div>
      <input type="file" accept="image/*" onChange={onChange} />
    </div>
  )
}

export default ImageUploader
