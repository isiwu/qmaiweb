import classNames from "classnames";
import { useState } from "react";
import { HiDownload } from "react-icons/hi";
import { MdPlayArrow } from "react-icons/md";

const ViewCertificate = () => {
  const [currImage, setCurrImage] = useState("/assets/cer-small.svg");
  const [indexOfCurrImage, setIndexOfCurrImage] = useState(0);
  const handleImageClick = (src: string, index) => (evt: React.MouseEvent) => {
    console.log(evt.target);
    setCurrImage(src);
    setIndexOfCurrImage(index)
  };
  const images = [
    {
      src: "/assets/cert-small.svg"
    },
    {
      src: "/assets/cert-small.svg"
    },
    {
      src: "/assets/cert-small.svg"
    },
    {
      src: "/assets/cert-small.svg"
    }
  ]
  return (
    <div>
      <div className="border rounded-lg w-[813px] py-7">
        <div className="flex items-center space-x-3 px-5 justify-center">
          <div><MdPlayArrow className="text-green3 text-2xl rotate-180 hover:cursor-pointer" /></div>
          <div className="flex items-center space-x-12">
            {
              images.map((image, index) => (
                <img src={image.src} alt="Certificate" className={classNames("hover:cursor-pointer w-[130.99px]", {
                  "border-4 border-green4 rounded-lg": indexOfCurrImage === index
                })} onClick={handleImageClick("/assets/cert-small.svg", index)} key={++index} />
              ))
            }
          </div>
          <div><MdPlayArrow className="text-green3 text-2xl hover:cursor-pointer" /></div>
        </div>
        <div className="flex justify-center mt-8">
          <img src={currImage} alt="Certificate" className="w-[465px]" />
        </div>

        <div className="flex justify-center items-center  mt-5">
            <a href="/assets/cert.svg" className="flex items-center space-x-3 justify-center border-2 border-green4 px-3 py-2 rounded-lg text-green2 hover:cursor-pointer hover:shadow-2xl w-52 transition-all duration-500" download>
              <HiDownload/>
              <span>Download  Certificate</span>
            </a>

          </div>
      </div>
    </div>
  )
};

export default ViewCertificate;