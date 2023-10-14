import React from 'react'
import DashboardItem from '../../components/DashboardItem';
import { TbCertificate } from "react-icons/tb"
import { HiDownload } from "react-icons/hi"
import {BsShareFill} from "react-icons/bs"

type AppProps = {
    handleClick?: (text: string) => (evt:  React.MouseEvent) => void,
}

function ATPCertificate({ handleClick }: AppProps) {
  return (
      <div>
      <div className="md:pl-16 pl-4 grid md:grid-cols-3 grid-cols-2 gap-y-4  xl:w-[70%] mt-8 ">
            <DashboardItem icon={<TbCertificate />} text="View Certificate"  handleClick={handleClick} />
            <DashboardItem icon={<HiDownload />} text="Download Certificate"  handleClick={handleClick}/>
            <DashboardItem icon={<BsShareFill />} text="Share Certificate"  handleClick={handleClick} />
          </div>
        
       
      </div>
  )
}

export default ATPCertificate