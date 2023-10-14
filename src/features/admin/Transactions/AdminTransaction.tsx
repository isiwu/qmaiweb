import React from 'react'
import DashboardItem from '../../../components/DashboardItem';
import { TbCertificate } from "react-icons/tb";
import { FaHospitalUser,FaGraduationCap } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import { IoSchoolSharp } from "react-icons/io5";
import { MdOutlineAppRegistration } from "react-icons/md";
import {VscSymbolEnumMember} from "react-icons/vsc"


 type AppProps = {
        handleClick:(text:string)=>(evet:React.MouseEvent)=>void
    }
const AdminTransaction = ({handleClick}:AppProps) => {
   
  return (
    <div>
      <div className="lg:pl-20 pl-8 mt-8 xl:w-[80%] ">
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-y-8  '>
            <DashboardItem icon={<TbCertificate />} text="All Transactions" handleClick={handleClick}   />
            <DashboardItem icon={<FaHospitalUser />} text="Membership Payment" handleClick={handleClick} />
            <DashboardItem icon={<RiSecurePaymentFill />} text="ATP Payment" handleClick={handleClick} />
            <DashboardItem icon={<IoSchoolSharp />} text="ATP Student Transaction" handleClick={handleClick} />
            <DashboardItem icon={<FaGraduationCap />} text="ATP Course Application" handleClick={handleClick} />
            <DashboardItem icon={<MdOutlineAppRegistration />} text="ATP Application" handleClick={handleClick} />
            <DashboardItem icon={<VscSymbolEnumMember />} text="Membership Application" handleClick={handleClick} />
        </div>
      </div>
    </div>
  )
}

export default AdminTransaction
