const Loading = () => {
  return (
    <div className="height-0 absolute top-0 flex h-screen w-screen items-center justify-center bg-black bg-opacity-25">
      <div className="flex justify-center space-x-2">
        <div className="h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-100  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-200  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-300  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
        <div className="animation-delay-400  h-4 w-1 animate-ping rounded-full bg-blue-700"></div>
      </div>
    </div>
  )
}

export default Loading
