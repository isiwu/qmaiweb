import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdPlayArrow } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { FaBars, FaUserCheck } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setLayoutSubSubTitle, setLayoutSubTitle, signout } from "../../features/user/userSlice";

type AppProps = {
  setShowMenu?: React.Dispatch<React.SetStateAction<boolean>>
}

export const DashboardHeader = ({setShowMenu}: AppProps) => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(state => state.user.layoutTitle);
  const subTitle = useAppSelector(state => state.user.subTitle);
  const subSubTitle = useAppSelector(state => state.user.subSubTitle);
  const user = useAppSelector(state => state.user.data);
  const atpData = useAppSelector(state => state.atp.data);
  const router = useRouter();
  const [showMenu, setMenu] = useState(false);
  const handleClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setMenu(prevState => !prevState);
  };
  const handleSignout = async () => {
    dispatch(signout());
    setMenu(prevState => !prevState);
    await router.replace("/signin");
    window.location.reload();
  };

  const handleViewProfile = () => {
    router.push("profile");
  }
  const backToMenu = () => {
    dispatch(setLayoutSubTitle(""));
  };
  const backToSubMenu = () => {
    dispatch(setLayoutSubSubTitle(""));
    dispatch(setLayoutSubSubTitle(""));
  }
  useEffect(() => {
    window.onclick = function () {
      setMenu(false);
    }
  }, [])



  return (
    <div className="w-full px-2 md:pl-6 border-b-2">
      <div className="flex pt-6 items-center md:items-center">
        <div className="mr-auto text-[24px] font-[400] font-lexend pt-3 hidden md:block">
          { title && !subTitle && !subSubTitle && <p className="text-green2 hover:cursor-default">{title}</p>}
          { title && subTitle && !subSubTitle && <div className="flex space-x-2">
              <p className="hover:cursor-pointer" onClick={backToMenu}>{title}</p>
              <p className="text-green2 flex items-center hover:cursor-default"><span className="pt-1"><MdPlayArrow /></span> <span>{subTitle}</span></p>
            </div>
          }
          { title && subTitle && subSubTitle && <div className="flex space-x-2">
              <p className="hover:cursor-pointer" onClick={backToMenu}>{title}</p>
              <p className="flex space-x-2 hover:cursor-pointer" onClick={backToSubMenu}><span className="pt-2"><MdPlayArrow /></span><span>{subTitle}</span></p>
              <p className="text-green2 flex space-x-2 hover:cursor-default"><span className="pt-1"><MdPlayArrow /></span><span>{subSubTitle}</span></p>
            </div>
          }
        </div>
        <div className="mr-auto text-2xl md:hidden" onClick={() => setShowMenu(true)}><FaBars /></div>
        <div className="flex space-x-1 items-center pr-8">
          <div className="hidden md:block text-[16px] font-[500] font-lexend text-[#4A4A4A]">{atpData?.name?(atpData.name.charAt(0)?.toUpperCase() + atpData.name.slice(1)):(user?.name?.first?.charAt(0)?.toUpperCase() + user?.name?.first?.slice(1))}</div>
          <div className="mb-2">
            <img src={user?.profileId?.avatar?user?.profileId?.avatar:atpData?.avatar?atpData.avatar:"/assets/avatar.svg"} alt="" className="w-9 h-9 rounded-lg" />
          </div>
          <div className="relative">
            <MdPlayArrow className={classNames("relative rotate-90 hover:text-green-600 hover:cursor-pointer", {"text-green-500": showMenu})} onClick={handleClick} />
            {showMenu && <div className="relative after:absolute after:border-8 after:border-r-transparent after:border-b-[#F9F9F9] after:border-l-transparent after:-top-1 after:left-[38%] after:border-t-transparent">
              <div className="absolute top-3 w-52 py-2 bg-[#F9F9F9] -right-5 z-50 rounded-lg pl-3 text-[#307D0B] font-[300] text-[14px] shadow-xl">
                <p className="flex items-center my-2 hover:cursor-pointer" onClick={handleViewProfile}><span className="pr-2 text-lg"><IoEyeOutline/></span> View Profile</p>
                <p className="flex items-center mb-2 hover:cursor-pointer" onClick={handleSignout}><span className="pr-2 text-lg"><FaUserCheck/></span> Sign Out</p>
              </div>
            </div>
            }
          </div>
        </div>
        {/* <div className="mb-2 md:hidden">
          <img src={user?.profileId?.avatar?user?.profileId?.avatar:atpData?.avatar?atpData.avatar:"/assets/avatar.svg"} alt="" className="w-9 h-9 rounded-full" />
        </div> */}
      </div>
    </div>
  )
}

