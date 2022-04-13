const Footer = () => {
  return (
    <footer className="mt-8 flex w-full flex-col items-center justify-center gap-2 border-t">
      <div className="flex flex-row flex-wrap gap-8 pt-2">
        <a
          href="https://twitter.com/unpuy_tw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md hover:underline"
        >
          運営者
        </a>
        <a
          href="https://form.run/@fontpint"
          target="_blank"
          rel="noopener noreferrer"
          className="text-md hover:underline"
        >
          お問い合わせ
        </a>
      </div>
      <p className="text-md flex items-center justify-center">&copy; bootch</p>
    </footer>
  )
}

export default Footer
