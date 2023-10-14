import classNames from "classnames";
import React, { useState } from "react";
import { MdPlayArrow } from "react-icons/md";

type AppProps = {
  children?: React.ReactNode,
  value?: string,
  onChange?: (evt: React.MouseEvent) => void,
  placeHolder?: string,
  options?: {[index: string]: string}[]
}
const Select = ({children, value, placeHolder, onChange, options}: AppProps) => {
  const [showOpt, setOpt] = useState(false);
  const handleShowOpt = () => {
    setOpt(prevSt => !prevSt)
  }
  const handleClick = (evt: React.MouseEvent) => {
    handleShowOpt();
    onChange(evt);
  }
 
  return (
    <div className={classNames("w-full relative", {"border-2 border-green6 rounded-[8px]": showOpt})}>
      <p className={classNames("hover:cursor-pointer h-full pl-3 pt-1 font-[500] text-[18px] text-[#272727]")} onClick={handleShowOpt}>{value?value:placeHolder}</p>
      <span className={classNames("absolute right-1 rotate-90 top-2 hover:cursor-pointer text-xl", {
        "text-green5": showOpt
      })} onClick={handleShowOpt}><MdPlayArrow /></span>
      {showOpt && <div className="flex flex-col pb-3 z-50 mt-3 bg-gray-200 rounded-bl-[8px] rounded-br-[8px]" onClick={handleClick}>
          {
            options?.length? options.map((option => <option value={option.name.toLowerCase()} className='hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1' key={option._id}>{option.name}</option>)):children
          }
        </div>
      }
    </div>
  )
}

export default Select;