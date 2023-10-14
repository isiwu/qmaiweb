import React from "react";
import { MdClose, MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUser, FaGraduationCap } from "react-icons/fa";
import classNames from "classnames";
import MobileSideNav from "../MobileSideNav";
import { useAppSelector } from "../../../app/hooks";

type AppProps = {
  showMenu?: boolean,
  setShowMenu?: React.Dispatch<React.SetStateAction<boolean>>,
}

const MobileSideLinks = ({showMenu, setShowMenu}: AppProps) => {
  const user = useAppSelector(state => state.admin.admin);
  const atpData = useAppSelector(state => state.atp.data)
  const sideList = [
    {
      iconName: <MdOutlineSpaceDashboard />,
      text: "Dashboard",
      href: "/admin",
    },
    {
      iconName: <FaUser />,
      text: "Profile",
      href: "/admin/profile",
    },
    {
      iconName: <MdOutlineSpaceDashboard />,
      text: "Memberships",
      href: "/admin/memberships",
    },
    {
      iconName: <FaGraduationCap />,
      text: "Courses",
      href: "/admin/courses",
    },
    {
      iconName: <FaGraduationCap />,
      text: "ATPs",
      href: "/admin/atps",
    },
    {
      iconName: <FaGraduationCap />,
      text: "Transactions",
      href: "/admin/transactions",
    },
    {
      iconName: <FaGraduationCap />,
      text: "Certificates",
      href: "/admin/certificates",
    },
  ];

  return (
    <div className={classNames("fixed top-0",{"-left-[100%] duration-700 ease-in-out": !showMenu, "left-0 right-0 duration-700 ease-in-out": showMenu})}>
      <div className={classNames("relative top-0", {"-left-[100%] duration-1000 ease-in": !showMenu, "left-0 duration-700 ease-in": showMenu})}>
        <div  className="absoulte top-0 left-0 bg-[#004703] w-[80%] rounded-br-2xl">
          <div className="flex justify-end">
            <div className="w-8 h-8 rounded-full bg-white justify-center items-center mt-1 mr-2">
             <div className="text-3xl" onClick={() => setShowMenu(false)}><MdClose /></div>
            </div>
          </div>
          <div className="flex flex-col pl-8 mb-3 mt-10">
            <div className="text-[16px] font-[500] font-lexend text-[#4A4A4A]">{atpData?.name?(atpData.name.charAt(0)?.toUpperCase() + atpData.name.slice(1)):(user?.name?.first?.charAt(0)?.toUpperCase() + user?.name?.first?.slice(1))}</div>
            {/* <div className="bg-[#004703] pb-12 pt-8 w-full">
              <div className="flex justify-center"><img src="/assets/siginLogo.svg" className="rounded-lg w-[40%]" /></div>
            </div> */}
            {
              sideList.map((sideListItem, index) => (
                <MobileSideNav iconName={sideListItem.iconName} text={sideListItem.text} href={sideListItem.href} key={++index} setShowMenu={setShowMenu} />
              ))
            }
            {/* <div className="bg-[#004703] h-[291px]"></div> */}
            <div className="mt-12 pl-12 pb-8">
              <img src="/assets/siginLogo.svg" className="rounded-lg w-[40%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileSideLinks