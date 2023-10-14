import { MdClose, MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import {TbCertificate} from "react-icons/tb";
import { SiAdobeaudition } from "react-icons/si";

import SideLink from "./SideLink";
import { useAppSelector } from "../../app/hooks";
import MobileSideNav from "./MobileSideNav";
import classNames from "classnames";

type AppProps = {
  setShowMenu?: React.Dispatch<React.SetStateAction<boolean>>,
  showMenu?: boolean,
};
const MobileSideLinks = ({setShowMenu, showMenu}: AppProps) => {
  const user = useAppSelector(state => state.user.data);
  const atpData = useAppSelector(state => state.atp.data);
  const sideList = [
    {
      iconName: <MdOutlineSpaceDashboard />,
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      iconName: <FaUser />,
      text: "Profile",
      href: "/profile",
    },
    {
      iconName: <MdOutlineSpaceDashboard />,
      text: "Membership",
      href: "/membership",
    },
    {
      iconName: <TbCertificate />,
      text: "Certificate",
      href: "/certificate",
    },
    {
      iconName: <SiAdobeaudition />,
      text: "Auditing",
      href: "/auditing",
    }
  ];

  return (
    <div className={classNames("fixed top-0",{"-left-[100%] duration-700 ease-in-out": !showMenu, "left-0 right-0 bottom-0 duration-700 ease-in-out": showMenu})}>
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
};

export default MobileSideLinks;