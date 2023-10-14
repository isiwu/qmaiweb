import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setLayoutSubTitle } from '../user/userSlice';

function ATPProfile() {
  const atpData = useAppSelector(state => state.atp.data);
  console.log(atpData.avatar);
  const dispatch = useAppDispatch();
  const showProfileUpdate = () => {
    dispatch(setLayoutSubTitle("Update Profile"))
  }
  return (
       <div className="md:w-[900px] md:ml-12">
            <div className="text-[#32ba32] font--[600] text-lg pt-2 pr-5 md:pr-0 flex justify-end items-center  leading-6 hover:cursor-pointer hover:text-[#30a330]" onClick={showProfileUpdate} >
                Update Profile
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-2 px-4 mt-4 bg-[#FDFDFD] w-full pt-3 pb-20 rounded-xl">
                <div className="w-[108px] h-[108px] rounded-lg">
                    <img  src={atpData?.avatar?atpData?.avatar:"/assets/avatar.svg"} className="w-full" />
                </div>
                <div >
                    {/* <div>
                        <h1 className="text-[#32ba32] text-xl  font-[500] ">Mr Oluwayasayi James</h1>
                        <p className="font-500 text-[#828282] text-lg  "> ATP Member</p>
                    </div> */}
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-14 mt-6">
                        <div className='mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">ATP Name</p>
                       <p className=" font--[600] text-lg" > {atpData?.name??"ATP Name"}</p>
                      </div>
                      
                      <div className='mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Email</p>
                       <p className=" font--[600] text-lg">{atpData?.email??"Jameoluwayaseyi@gmail.com"} </p>
                        </div>


                        <div className='mb-3'>
                        <p className="text-[#828282] text-[14px] ">Phone Number</p>
                        <p className=" font--[600] text-lg" >{atpData?.phone??"+234845679878"}</p>
                        </div>  

                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-14 mt-6">
                        <div className='mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Address</p>
                       <p  className=" font--[600] text-lg" >{atpData?.address??"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos"}  </p>
                      </div>
                      
                      <div className='mb-3'>
                          
                        <p className="text-[#828282] text-xl md:text-[14px]">City/Town</p>
                       <p className=" font--[600] text-lg">{atpData?.city??"Port Harcourt"} </p>
                        </div>


                        <div className='mb-3'>
                        <p className="text-[#828282] text-[14px] ">Country</p>
                        <p  className=" font--[600] text-lg" >{atpData?.country??"Nigeria"} </p>
                        </div>
                    </div>

                  <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
                       <div className='mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Training Interest</p>
                       <p  className=" font--[600] text-lg" >{atpData?.interest??"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos"}  </p>
                      </div>

                      <div className='mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Contact Details</p>
                       <p  className=" font--[600] text-lg" >{atpData?.contact??"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos"}  </p>
                      </div>

                      <div className='mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px] font-[500]">About</p>
                       <p  className=" font--[600] text-lg" >{atpData?.otherInfo??"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos "} </p>
                      </div>
                  </div>
               </div>  
          </div> 
      </div>
  )
}

export default ATPProfile