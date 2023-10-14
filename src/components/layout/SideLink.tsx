import { MouseEvent, useEffect } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useAppDispatch } from "../../app/hooks";
import { setLayoutSubSubTitle, setLayoutSubTitle, setLayoutTitle } from "../../features/user/userSlice";

type AppProps = {
  iconName: JSX.Element,
  text: string,
  href: string,
  disabled?: boolean,
};
const SideLink = ({iconName, text, disabled=false, href}: AppProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClick = async (evt: MouseEvent) => {
    evt.preventDefault();
    evt.stopPropagation();
    
    await router.push(href);
    dispatch(setLayoutSubTitle(""));
    dispatch(setLayoutSubSubTitle(""));
    dispatch(setLayoutTitle(text));

    const currEl = document.getElementsByClassName("current")[0];
    const prevEl = currEl.previousSibling as Element;
    prevEl.className += " rounded-br-2xl"

    const nextEl = currEl.nextSibling as Element;
    nextEl.className += " rounded-tr-2xl";
  };

  useEffect(() => {
    const currEl = document.getElementsByClassName("current")[0];
    const prevEl = currEl.previousSibling as Element;
    prevEl.className += " rounded-br-2xl"

    const nextEl = currEl.nextSibling as Element;
    nextEl.className += " rounded-tr-2xl";
  }, [])
  return (
    <div className={classNames("text-[16px] font-lexend",{"hover:cursor-default rounded-tr-none bg-[#004703] rounded-br-none font-[400] current": (!disabled && router.asPath === href), "hover:cursor-pointer text-white bg-[#004703] pr-12": (!disabled && router.asPath !== href), "hover:cursor-not-allowed": disabled})} onClick={!disabled?handleClick:()=>{}}>
      <div className={classNames("flex items-center space-x-3 text-md lg:text-lg py-3 pl-3",{
        "rounded-tl-full rounded-bl-full bg-white text-qmaiGreen": (!disabled && router.asPath === href)
      })}>
        <div>
          {iconName}
        </div>
        <div className="capitalize">
          {text}
        </div>
      </div>
    </div>
  )
}

export default SideLink;