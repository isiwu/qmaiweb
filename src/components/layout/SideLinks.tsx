import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import {TbCertificate} from "react-icons/tb";
import { SiAdobeaudition } from "react-icons/si";

import SideLink from "./SideLink";

const SideLinks = () => {
  type SideList = {
    iconName: JSX.Element,
    text: string,
    href: string,
  }
  const sideList: SideList[] = [
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
    <div>
      <div className="bg-[#004703] pb-12 pt-8 w-full">
        <div className="flex justify-center"><img src="/assets/siginLogo.svg" className="rounded-lg w-[40%]" /></div>
      </div>
      {
        sideList.map((sideListItem, index) => (
          <SideLink iconName={sideListItem.iconName} text={sideListItem.text} href={sideListItem.href} key={++index} />
        ))
      }
      <div className="bg-[#004703] h-[291px]"></div>
    </div>
  )
};

export default SideLinks;