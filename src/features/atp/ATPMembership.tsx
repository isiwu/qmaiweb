import React from 'react'
import {FaGraduationCap,FaHospitalUser} from "react-icons/fa"
import DashboardItem from '../../components/DashboardItem'

type AppProps = {
    handleClick?: (text: string) => (evt:  React.MouseEvent) => void,
}
function ATPMembership({ handleClick }: AppProps) {
    
  return (
     <>
       <div className="md:pl-16 pl-4 grid md:grid-cols-3 grid-cols-2 gap-y-4 gap-x-4 pt-5 xl:w-[60%] ">

      <div className="">
        <DashboardItem 
            icon={<FaGraduationCap/>}
             text="Course Application"
             handleClick={handleClick}
        />
        
      </div>

      <div>
        <DashboardItem 
          icon={<FaGraduationCap/>}
          handleClick={handleClick}
          text = "Course List"
          
        />
      </div>
      </div>
    
    </>
  )
}

export default ATPMembership