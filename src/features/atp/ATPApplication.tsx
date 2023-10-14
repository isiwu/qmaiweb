import React, { useState } from 'react'
import {RiErrorWarningFill} from "react-icons/ri"
import ATPMembershipModal from './ATPMembershipModal'
import Button from '../../components/Button'
import MembershipProgressStatus from '../../components/MembershipApplication/MembershipProgressStatus'

function ATPApplication() {
    const [showModal, setShowModal] = useState(false)
  return (
      <div className="pl-4 my-10">
          {/* <div> <MembershipProgressStatus/></div> */}
          <div className="flex justify-center">
            <div></div>
          <div className=" flex space-x-16 pl-4">
                
                <div>
                <div>
                    <p className="text-[#828282] font-[300]">ATP Name</p>
                </div>
                    <div className="pt-2">
                    <input type="text" placeholder="Management Line" className="border-none  w-[216px] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]"/>
                </div>
                </div>
                        
                <div>
                <div>
                    <p className="text-[#828282] font-[300]">Contact Details</p>
                </div>
                    <div className="pt-2">
                    <input type="text"  placeholder="James" className="border-none  w-[216px] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]"/>
                </div>
                </div>
                        
                <div>
                <div>
                    <p className="text-[#828282] font-[300]">Email</p>
                </div>
                    <div className="pt-2">
                    <input type="email"  placeholder="James@gmail.com" className="border-none   w-[216px] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]"/>
                </div>
            

                </div>    
            
                </div>
                
                <div className=" flex space-x-16 mt-6 pl-4">
                
                <div>
                <div>
                    <p className="text-[#828282] font-[300]">First Name</p>
                </div>
                    <div className="pt-2">
                    <input type="text" placeholder="Oluwaseyi" className="border-none  w-[216px] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]"/>
                </div>
                </div>
                        
                <div>
                <div>
                    <p className="text-[#828282] font-[300]">Last Name</p>
                </div>
                    <div className="pt-2">
                    <input type="text"  placeholder="James" className="border-none  w-[216px] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]"/>
                </div>
                </div>
                        
                <div>
                <div>
                    <p className="text-[#828282] font-[300]">Phone Number</p>
                </div>
                    <div className="pt-2">
                    <input type="number"  placeholder="+234894746453" className="border-none   w-[216px] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]"/>
                </div>
                </div>    
            
            </div>

    
          <div className='mt-8 pl-4'>
              
              <div className='text-[#CCCCCC] flex items-center'>
                  <p className='text-[#828282]'><RiErrorWarningFill /></p>
                  <p>Your name will appear this way on your membership certificate, if you wish to change it you can do that  </p>
                  

              </div>
              <p className=''>by <span className='text-[#73D942]'>Updating the Profile </span> </p>
          </div>
          <div className='pl-4 mt-10'>
              <p>Select Membership type</p>
              <select className='w-[440px] h-[40px] rounded-md outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] text-[#272727]' >
                   Select Membership Type
                  <option >Student Membership</option>
              </select>
          </div>
          </div>
          <div className='flex justify-center items-center mt-6 ' onClick={()=>setShowModal(!showModal)}>
              <Button text='Submit Application'/>
          </div>

          {showModal && <ATPMembershipModal setShowModal={setShowModal} />}

    </div>
  )
}

export default ATPApplication