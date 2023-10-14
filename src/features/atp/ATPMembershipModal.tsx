import React, { Dispatch, SetStateAction } from 'react';
import { FaGooglePay, FaApplePay } from "react-icons/fa"
import {BsPaypal,BsFillCreditCardFill} from "react-icons/bs";
import {FcGoogle} from "react-icons/fc"
type AppPros = {
   setShowModal: Dispatch<SetStateAction<boolean>>  
}
function ATPMembershipModal({setShowModal}:AppPros) {
  return (
<div className="fixed top-0 left-0 right-0 bottom-0 z-50 drop-shadow-2xl" onClick={()=> setShowModal(false)}>
      <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center justify-center">
          <div className="pt-3 pb-7 bg-[#F5F5F5] px-28 rounded-lg w-[70%] h-[426px]">
            <div className='flex items-center justify-center pt-6'>
                <h3 className='text-[#73D942] text-xl font-[800]'>Select Payment Option</h3>
            </div>
        <div className="flex flex-col space-y-3 items-center pt-14">
                          
            <div className='flex'>
                <div className="flex space-x-3 items-center  mt-4 pl-6 bg-[#FBFBFB] py-2 rounded-md text-xl w-[300px] h-[56px] ">
                <BsPaypal className="text-4xl" />
                <span className='text-[#272727]'>Paypal</span>
                </div>
                          
                <div className="flex space-x-2 items-center mt-4 ml-8 pl-6 bg-[#FBFBFB] py-2 rounded-md text-xl w-[300px] h-[56px] ">
                <FaApplePay className="text-5xl" />
                <span className='text-[#272727]'>Paystack</span>
              </div> 
            </div>
            <div className='flex'>
                <div className="flex space-x-3 items-center mt-4 pl-6 bg-[#FBFBFB] py-2 rounded-md text-xl w-[300px] h-[56px] ">
                <FcGoogle className="text-4xl" />
                <span className='text-[#272727]'>Google Pay</span>
              </div>
              
              <div className="flex space-x-3  items-center mt-4 ml-8 pl-6 bg-[#FBFBFB] py-2 rounded-md text-xl w-[300px] h-[56px] ">
                <BsFillCreditCardFill className="text-4xl" />
                <span className='text-[#272727]'>Card</span>
              </div>
            </div>
             
              
            </div>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default ATPMembershipModal