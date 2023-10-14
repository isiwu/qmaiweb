import React, { useState,useRef } from 'react'
import {HiUpload} from "react-icons/hi";
import DatePicker from "react-datepicker"

const AdminUpdateProfile = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [file, setFile] = useState("")
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    confirmPassword : "",
  })
  const [inputForm, setInputForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    birth: new Date(),
    education: "",
    discipline: "",
    job: "",
  })
  const handleInput = (input:string) => (evet:React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [input]: evet.target.value
    })
  }
  const handlePassword = (password:string) => (evet:React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput({
      ...passwordInput,
      [password]:evet.target.value
    })
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const handleInputRef = (evet:React.ChangeEvent<HTMLInputElement>) => {
    setFile(URL.createObjectURL(evet.target.files[0]))
  }
  const handleClick = () => {
    inputRef.current.click()
  }
  return (
 <div className="md:w-[900px] md:ml-12">
            <div className="text-[#32ba32] font--[600] text-lg pt-2 pr-5 md:pr-0 flex justify-end items-center  leading-6" >
                <div>Save Profile</div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-2 px-4 mt-4 bg-[ #F5F5F5]  pt-3 pb-20 rounded-xl  w-[910px] h-[550px] my-8 md:border ">
        <div className=" rounded-lg">
                      <div>
                          <h1 className="text-[#32ba32] text-xl  font-[500] md:hidden block "> Profile Record</h1>
                              
                        </div>
          <div className='w-[108px] h-[108px]'>          
            <img src={file?file:"/assets/avatar.svg"} className="w-full max-w-[70%]"  />
            </div>
                  <div>
                    <input
                        type="file"
              className="border w-full hidden" 
              ref={inputRef}
              onChange={handleInputRef}
                  />
                    <div className='flex items-center mt-4  text-[#32ba32] cursor-pointer 'onClick={handleClick}>
                      <span ><HiUpload /> </span>
                      <p className='pl-2'>Upload  </p>
                    </div>
                  </div>
                
                </div>
                <div>
                    <div>
                        <h1 className="text-[#32ba32] text-xl  font-[500] hidden md:block ">Profile Record</h1>
                        
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
                  <div className=' mb-3'>
                      <div>
                          <label htmlFor='firstName'  className="text-[#272727] text-xl md:text-[14px]">First Name</label>
                      </div>
                        <input value={inputForm.firstName} type="text" id='firstName' className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]"  placeholder='Oluwaseyi' onChange={handleInput("firstName")}/>
                  </div>
                      
                  <div className=' mb-3'>
                      <div>
                        <label htmlFor='lastName' className="text-[#272727] text-xl md:text-[14px]">Last Name</label>
                      </div>
                         <input value={inputForm.lastName} type="text" id='lastName' className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]"  placeholder='James' onChange={handleInput("lastName")}/>
                  </div>
                  </div>

                   <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
                      <div className=' mb-3'>
                          <div>
                              <label htmlFor='email' className="text-[#272727] text-xl md:text-[14px]">Email</label>
                          </div>
                        <input value={inputForm.email} type="email" id='email' className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]" placeholder='Jamesoluwaseyi@gmail.com' onChange={handleInput("email")}/>
                      </div>
                      
                    <div className=' mb-3'>
                      <div>
                        <label htmlFor='phoneNumber' className="text-[#272727] text-xl md:text-[14px]">Phone Number</label>
                      </div>
                        <input value={inputForm.phoneNumber} type="number" id='phoneNumber'  className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]" placeholder='+2348675789423' onChange={handleInput("phoneNumber")}/>
                    </div>

                    <div className=' mb-3'>
                      <div>
                         <label htmlFor='birth' className="text-[#272727] text-xl md:text-[14px]">Date of Birth</label>
                      </div>
                        <DatePicker selected={inputForm.birth} onChange={() => {}} />
                        {/* <input value={inputForm.birth} type="date" id='birth'  className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]" placeholder='03 September 2022' onChange={handleInput("birth")}/> */}
                    </div>
                  </div>

                   <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
                  <div className=' mb-3'>
                      <div>
                        <label htmlFor='education' className="text-[#272727] text-xl md:text-[14px]">Highest Education</label>
                      </div>
                        <input value={inputForm.education} type="text" id='education' className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]" placeholder='B.SC' onChange={handleInput("education")}/>
                  </div>
                      
                    <div className=' mb-3'>
                      <div>
                          <label htmlFor='discipline' className="text-[#272727] text-xl md:text-[14px]">Discipline</label>
                      </div>
                         <input value={inputForm.discipline} type="text" id='discipline'  className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]" placeholder='Accounting' onChange={handleInput("discipline")}/>
                     </div>
                      
                  <div className=' mb-3'>
                    <div>
                        <label htmlFor='job-title' className="text-[#272727] text-xl md:text-[14px]">Job Title</label>
                    </div>
                        <input value={inputForm.job} type="text" id='job-title' className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]" placeholder='Accounting'onChange={handleInput("job")}/>
                  </div>
                  </div>
                   <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
                  <div className=' mb-3'>
                    <div>
                      <label className="text-[#272727] text-xl md:text-[14px]">Password</label>
                    </div>
                        <input value={passwordInput.password} type="password"  className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB]" placeholder='password' onChange={handlePassword("password")}/>
                  </div>
                      
                 <div className=' mb-3'>
                    <div>
                      <label htmlFor='confirm-password' className="text-[#272727] text-xl md:text-[14px]">Confirm Password</label>
                    </div>
                      <input value={passwordInput.confirmPassword} type="password" id='confirm-password' className="md:w-[216px] w-[320px] rounded-xl outline-none hover:outline-none hover:border-[#307D0B] hover:border bg-[#FBFBFB] disabled:cursor-not-allowed" placeholder='password'onChange={handlePassword("confirmPassword")}/>
                  </div>
          </div>
          <div className='flex justify-center items-center'>
            <button className='bg-text2 h-[40px] w-[216px] rounded-full text-[#FFFFFF] my-2 disabled:cursor-not-allowed' disabled={passwordInput.password!==passwordInput.confirmPassword} >
              Save Password
            </button>
          </div>
               </div>  
          </div>
      </div>
  )
}

export default AdminUpdateProfile
