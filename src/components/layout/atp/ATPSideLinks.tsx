import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUser, FaGraduationCap } from "react-icons/fa";
//import {TbCertificate} from "react-icons/tb";

//import SideLink from "../SideLink";
import ATPSideLink from "./ATPSideLink";

const ATPSideLinks = () => {

  const sideList = [
    {
      iconName: <MdOutlineSpaceDashboard />,
      text: "Dashboard",
      href: "/atp/dashboard",
    },
    {
      iconName: <FaUser />,
      text: "Profile",
      href: "/atp/profile",
    },
    {
      iconName: <FaGraduationCap />,
      text: "Trainees",
      href: "/atp/trainee",
    },
    {
      iconName: <FaGraduationCap />,
      text: "Certificate",
      href: "/atp/certificate",
    },
    {
      iconName: <MdOutlineSpaceDashboard />,
      text: "Courses",
      href: "/atp/courses",
    },
  ];

  return (
    <div>
      <div className="bg-[#004703] pb-12 pt-8 w-full">
        <div className="flex justify-center"><img src="/assets/siginLogo.svg" className="rounded-lg w-[40%]" /></div>
      </div>
      {
        sideList.map((sideListItem, index) => (
          <ATPSideLink iconName={sideListItem.iconName} text={sideListItem.text} href={sideListItem.href} key={++index} />
        ))
      }
      <div className="h-[291px] bg-[#004703]"></div>
    </div>
  )
};

export default ATPSideLinks;