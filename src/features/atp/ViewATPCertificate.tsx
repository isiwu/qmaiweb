import React from 'react';
import { HiDownload } from "react-icons/hi";
import {BsShareFill} from "react-icons/bs"

function ViewATPCertificate() {
  return (
      <div className='lg:pl-[8rem] pl-[3rem]'>
            <div className='text-3xl mt-2 w-10 hover:text-[#32ba32] hover:-translate-x-3 duration-1000 hover:cursor-pointer mb-4' ></div>
            <div className="rounded-lg border-2 py-6 px-16 w-[55%] flex justify-center">
              <img src="/assets/cert.svg" alt="certificate image" className="w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 place-center lg:space-x-7 space-x-0 mt-3  lg:gap-0 gap-6 md:w-[100%] lg:w-[50%]">
              <a href="/assets/cert.svg" className="flex items-center space-x-3 justify-center border-2 border-green4 px-3 py-2 rounded-lg text-green2 hover:cursor-pointer hover:shadow-2xl w-52 transition-all duration-500" download>
                <HiDownload />
                <span>Download  Certificate</span>
              </a>
              <p className="flex items-center space-x-3 justify-center border-2 px-3 py-2 rounded-lg hover:cursor-pointer w-52 text-green2 hover:shadow-2xl transition-all duration-500">
                <BsShareFill />
                <span>Share Certificate</span>
              </p>
            </div>
    </div>
        
    
  )
}

export default ViewATPCertificate