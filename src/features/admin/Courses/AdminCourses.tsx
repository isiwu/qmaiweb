import React from 'react'
import { TbCertificate } from "react-icons/tb";
import {FaGraduationCap} from "react-icons/fa"
import DashboardItem from '../../../components/DashboardItem';
type AppProps = {
  handleClick:(text:string)=>(evet:React.MouseEvent)=>void
}
const AdminCourses = ({handleClick}:AppProps) => {
  return (
    <div>
       <div className="lg:pl-10 xl:pl-20 pl-4 grid lg:grid-cols-3 md:gap-x-0 gap-y-8 grid-cols-2 mt-8  md:w-[60%]">
            <DashboardItem icon={<TbCertificate />} text="Add New Course" handleClick={handleClick}   />
            <DashboardItem icon={<FaGraduationCap />} text="View Course List" handleClick={handleClick} />
            <DashboardItem icon={<TbCertificate />} text="Course Application" handleClick={handleClick} />
        </div>
    </div>
  )
}

export default AdminCourses
