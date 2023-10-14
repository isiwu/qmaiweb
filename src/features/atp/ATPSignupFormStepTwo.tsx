import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import Button from '../../components/Button'
import { setAlert } from '../user/userSlice'
import { atpSignup } from './atpSlice'
type ComponentProps = {
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
    atp: string,
  },
  handleChange: (input: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
function ATPSignupStepTwo({signUpForm,handleChange}: ComponentProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const requestError = useAppSelector(state => state.atp.requestError);
  const status = useAppSelector(state => state.atp.status);
  const gotoSignin = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    router.push("/signin");
  };
  const handleSubmit = async () => {
    await dispatch(atpSignup(signUpForm)).unwrap();
    
    if (requestError) {
      dispatch(setAlert({show: true, status: "failed", message: "request not successful. please try again."}));
    } else {
      router.push("/verify-email");
    }
  }
 
  return (
    <div>
      <div className="w-[60%] mt-8 ">
      <div className="md:flex md:pl-4 md:space-x-12">
        <div className="mt-5">
            <div className='flex items-center text-green4 '>
            <h1 className='font-[900]'>ATP REGISTRATION</h1> 
              <p className='border-b-2 border-green4 w-40 mx-4 '></p> 
            <p>Step 2</p>                   
            </div>
            <div className="md:w-[400px] my-3">
              <input type="text" value={signUpForm.address} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2" placeholder="Address" onChange={handleChange("address")} />
            </div>
            <div className="md:w-[400px] mb-3">
              <input type="text" value={signUpForm.city}  className="w-full rounded-xl focus:outline-none focus:border-[#0f2e00] focus:border-2" placeholder="City/Town" onChange={handleChange("city")}/>
            </div>
        <div className='flex justify-between'>
          <div className="w-[184px] mb-3">
            <input type="text" value={signUpForm.country} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2" placeholder='Country' onChange={handleChange("country")}/>
          </div>

          <div className="w-[184px] mb-3">
            <input type="text" value={signUpForm.postalCode} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2" placeholder='Postal Code' onChange={handleChange("postalCode")}/>
          </div>
        </div>
        <div className="md:w-[400px] mb-3">
          <input type="text" value={signUpForm.interest} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2" placeholder='Training of interest' onChange={handleChange("interest")}/>
        </div>
      <div className="w-[400px] h-[126px] mb-3">
        <textarea value={signUpForm.otherInfo} cols={44} rows={5}  placeholder='Other Information' className=' rounded-xl px-4 resize-none outline-none focus:border-[#307D0B] focus:border' onChange={handleChange("otherInfo")}/>
      </div>
        <div className="md:w-[400px] mb-3">
          <input type="password" value={signUpForm.password} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B] focus:border-2" placeholder='Password'onChange={handleChange("password")} />
        </div>
        <div>
          <Button text='Submit Application' handler={handleSubmit} disabled={status === "loading"?true:false} />
        </div>
            <div className='mt-2'>
              <p> You have an account? <button className='text-green2 font-bold' onClick={gotoSignin}>Sign in</button></p>
            </div> 
      </div>
      </div>
      </div>        
    </div>
           
    
  )
}

export default ATPSignupStepTwo