const Footer = () => {
  return (
    <footer className="mt-8 flex w-full flex-col items-center justify-center gap-2 border-t">
      <div className="flex flex-row flex-wrap gap-8 pt-2">
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
        >
          利用規約
        </a>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
        >
          プライバシーポリシー
        </a>
        <a
          href="https://twitter.com/unpuy_tw"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline"
        >
          運営者
        </a>
      </div>
      <p className="flex items-center justify-center text-sm">&copy; bootch</p>
    </footer>
  )
}

export default Footer
