import classNames from "classnames";
import React from "react";
import { useAppSelector } from "../app/hooks";

type AppProps = {
  text: string,
  handler?: (evt: React.MouseEvent<HTMLButtonElement>) => void,
  disabled?: boolean,
};

const Button = ({text, disabled=false, handler}:AppProps ) => {
  const status = useAppSelector(state => state.user.status);
  
  return (
    <button className={classNames("w-[80%] md:w-[100%] text-center hover:shadow-lg rounded-xl h-[40px] text-textWhite text-[18px] bg-qmaiButton", {"opacity-40 hover:cursor-not-allowed": (disabled?true:status === "loading")})} onClick={!disabled?handler:()=>{}} disabled={disabled?true:status === "loading"? true:false}>{text}</button>
  )
}

export default Button;