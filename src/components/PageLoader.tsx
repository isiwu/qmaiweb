import Loader from "./Loader";

const PageLoader = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-transparentBlack overflow-y-scroll">
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-center items-center"><Loader /></div>
      </div>
    </div>
  )
}

export default PageLoader;