import React from 'react'
import Button from '../../../components/Button'
import {RiErrorWarningFill} from "react-icons/ri"

function Application() {
  return (
    <div className="pl-4 my-10">
    <div className="border w-[870px] h-[550px] rounded-xl mx-auto"> 
        <div className='pl-4 my-4'>
            <h2 className='text-[#73D942] text-2xl'>ATP Membership Application</h2>
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
                      <p className="text-[#828282] font-[300]">Date of Application</p>
                   </div>
                  <div className="pt-2">
                      <input type="number"  placeholder="03 September 2022" className="border-none   w-[216px] h-[40px] outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]"/>
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
        <p>Select Course Type</p>
        <select className='w-[440px] h-[40px] rounded-md outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] text-[#272727]' >
            
            <option >Junior Trainee</option>
        </select>
      </div>
        
      <div className='pl-4 mt-10'>
          <p>Other Information</p>
          <select className='w-[440px] h-[40px] rounded-md outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] text-[#272727]' >
              <option >Senior Trainee</option>
          </select>
       </div>
    <div className='flex justify-center items-center mt-8 ' >
        <Button text='Make Payment' />
        
        
    </div>

    

    </div>
     
</div>
  )
}

export default Application
