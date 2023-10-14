import React from 'react'
import DashboardItem from '../../components/DashboardItem';
import {ImUserPlus } from "react-icons/im";
import { FaHospitalUser,FaUserCheck,FaUserCog,FaUserShield } from "react-icons/fa";
import {HiUsers} from "react-icons/hi"
type AppProps = {
    handleClick: (text:string)=>(evet:React.MouseEvent)=>void
}
function ATPTrainee({handleClick}:AppProps) {
  return (
      <div>
        <div className="md:pl-16 mt-8 pl-4 xl:w-[80%]  ">
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2   gap-y-4 ' >
                <DashboardItem icon={<ImUserPlus />} text="Add Trainee"  handleClick={handleClick} />
                <DashboardItem icon ={<HiUsers/>} text = "Add Trainee Score" handleClick={handleClick}/>
                <DashboardItem icon={<FaUserShield />} text="Trainee Certificate Payment" handleClick={handleClick} />
                {/* <DashboardItem icon={<FaHospitalUser />} text="List of Trainee" handleClick={handleClick} /> */}
                <DashboardItem icon={<FaUserCheck />} text="Active/Certified Trainees" handleClick={handleClick} />
                <DashboardItem icon={<FaUserCog />} text="Inactive/Certified Trainees" handleClick={handleClick} />
            </div>

            
        </div>
      
        
       
      </div>
  )
}

export default ATPTrainee