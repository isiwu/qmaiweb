import React from 'react'

const AminViewProfile = () => {
    return (
       <div className="md:w-[80%] md:ml-12">
            <div className="text-[#32ba32] font-[600] text-lg pt-2 pr-5 md:pr-0 flex justify-end items-center  leading-6" >
                Update Profile
            </div>
            <div className="flex flex-col md:flex-row  items-center md:items-start space-y-2 md:space-y-0 md:space-x-2 px-4 mt-4 bg-[#FDFDFD] w-full pt-3 pb-20 rounded-xl">
                <div className="w-[108px] h-[108px] rounded-lg">
                    <img  src="/assets/avatar.svg" className="w-full" />
                </div>
                <div className='w-[100%]'>
                    <div className='flex flex-col justify-center md:ml-3 ml-[5rem] '>
                        <h1 className="text-[#32ba32] text-xl  font-[500] ">Mr Oluwayasayi James</h1>
                        <p className="font-500 text-[#828282] text-lg  "> Admin</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 place-items-center lg:space-x-14 space-x-0 pt-8">
                      
                      <div className='w-[190px] mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Email</p>
                       <p className=" font--[600] text-lg">Jameoluwayaseyi@gmail.com </p>
                        </div>


                        <div className='w-[190px] mb-3'>
                        <p className="text-[#828282] text-[14px] ">Phone Number</p>
                        <p className=" font--[600] text-lg" >+234845679878</p>
                        </div>

                        <div className='w-[190px] mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Date of Birth</p>
                       <p className=" font--[600] text-lg" > 07 June 2011 </p>
                      </div>
                  </div>
                  
                  <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-14 place-items-center lg:space-x-14 pt-6">
                        <div className='w-[190px] mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">About</p>
                       <p  className=" font--[600] text-lg" >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos  </p>
                      </div>
                      
                      <div className='w-[190px] mb-3'>
                          
                        <p className="text-[#828282] text-xl md:text-[14px]">Highest Education</p>
                       <p className=" font--[600] text-lg">B.SC Accounting</p>
                        </div>


                        <div className='w-[190px] mb-3'>
                        <p className="text-[#828282] text-[14px] ">Job Title</p>
                        <p  className=" font--[600] text-lg" >Accounting</p>
                        </div>
                    </div>
               </div> 
          </div>
          
            <hr className='mt-8 w-[100%]' />
      </div>
    
  )
}

export default AminViewProfile
