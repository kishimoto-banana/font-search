type Props = {
  id: string
  fontName: string
  img: string
  styleFont: string
  styleFontWeight: string
  text: string
}

const FontModal: React.FC<Props> = ({
  id,
  fontName,
  img,
  styleFont,
  styleFontWeight,
  text,
}) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <label htmlFor={id} className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-2xl text-indigo-500">{fontName}</h3>
          <div className="pt-4">
            <img src={img} />
            <p className={`py-4 text-5xl ${styleFont} ${styleFontWeight}`}>
              {text}
            </p>
          </div>
        </label>
      </label>
    </>
  )
}

export default FontModal