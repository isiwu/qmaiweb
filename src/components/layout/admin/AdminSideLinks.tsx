import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUser, FaGraduationCap } from "react-icons/fa";
//import {TbCertificate} from "react-icons/tb";

import SideLink from "../SideLink";

const AdminSideLinks = () => {
  
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
    <div>
      <div className="bg-[#004703] pb-12 pt-8 w-full">
        <div className="flex justify-center"><img src="/assets/siginLogo.svg" className="rounded-lg w-[40%]" /></div>
      </div>
      {
        sideList.map((sideListItem, index) => (
          <SideLink iconName={sideListItem.iconName} text={sideListItem.text} href={sideListItem.href} key={++index} />
        ))
      }
      <div className="bg-[#004703] h-[147px]"></div>
    </div>
  )
};

export default AdminSideLinks;