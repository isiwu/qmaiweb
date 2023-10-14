import React from "react";

type AppProps = {
  text: string,
  disabled?: boolean,
  handleClick?: (evt: React.MouseEvent) => void,
}
const ApplicationButton = ({text,disabled=false, handleClick}: AppProps) => (
  <button  className=" py-2 text-[#FFFFFF] text-center rounded-[10px] bg-[#32ba32] w-[60%] h-40px hover:shadow-lg disabled:opacity-40 disabled:hover:shadow-none disabled:cursor-not-allowed" onClick={handleClick} disabled={disabled}>{text}</button>
);

export default ApplicationButton;