import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from '../../components/Button'

type AppProps = {
  handleSecondStep: () => void
  signUpForm: {
    name: string,
    contact: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    postalCode: string,
    interest: string,
    password: string,
    otherInfo : string,
    atp: string
  },
  handleChange: (input: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void

}


function ATPSignupFormStepOne({ handleSecondStep,signUpForm,handleChange }: AppProps) {
  const router = useRouter();
  const gotoSignin = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    router.push("/signin");
  }
 
  return (
      <div className="flex flex-col justify-center items-center mt-8">
              <div className="md:flex justify-center hidden">
                <img src="/assets/siginLogo.svg" alt="" />
              </div>
              <div className="mt-5">
                <div className='flex items-center text-green4 '>
                  <h1 className='font-[900]'>ATP REGISTRATION  </h1> 
                  <p className='border-b-2 border-green4 w-40 mx-4 '></p> 
                  <p>Step 1</p>                   
                </div>
                <div className="md:w-[400px] my-3">
                  <input type="text" value={signUpForm.name} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2" placeholder="ATP Name" onChange={handleChange("name")} />
                </div>
                <div className="md:w-[400px] mb-3">
                  <input type="text" value={signUpForm.contact}  className="w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2" placeholder="Contact Details" onChange={handleChange("contact")} />
                </div>
             </div>
                <div>
                    <div className='md:w-[400px] my-3'>
                        <input type="email" value={signUpForm.email} placeholder='Email' className=' w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2'onChange={handleChange("email")} />           
                     </div> 
                               
                     <div className='md:w-[400px] my-3'>
                        <input type="number" value={signUpForm.phone} placeholder='Phone Number' className=' w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2'onChange={handleChange("phone")} />           
                     </div> 
                   
                    <div className=''>
                        <Button handler={handleSecondStep} text='Continue'/>      
                    </div>
                    <div className='mt-2'>
                     <p> You have an account? <button className='text-green2 font-bold' onClick={gotoSignin}>Sign in</button></p>
                    </div>           
                </div>
             </div>
   
  )
}

export default ATPSignupFormStepOne
