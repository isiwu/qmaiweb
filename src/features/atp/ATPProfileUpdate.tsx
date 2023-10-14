import { current } from '@reduxjs/toolkit';
import React,{useEffect, useRef, useState} from 'react';
import {HiUpload} from 'react-icons/hi'
import Button from '../../components/Button';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ButtonLoader from '../../components/ButtonLoader';
import { atpChangePassword, atpUpdateProfile, getATP } from './atpSlice';
import { setLayoutSubTitle, updateProfile } from '../user/userSlice';

function ATPProfileUpdate() {
  const updateStatus = useAppSelector(state => state.atp.status);
  const requestError = useAppSelector(state => state.atp.requestError);
  const atpData = useAppSelector(state => state.atp.data);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({
    preview: "",
    fileData: new File([""], "atpAvatar")
  });
  const [changePassword, setchangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const handlePassword = (password:string)=> (evet:React.ChangeEvent<HTMLInputElement>) => {
    setchangePassword({
      ...changePassword,
      [password] : evet.target.value
    })

  }
  const [inputForm, setInputForm] = useState(atpData);
  const handleInput = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setInputForm({
      ...inputForm,
      [input]: evt.target.value
    })
  }
  const inputRef = useRef<HTMLInputElement>(null)
  const handleClick = () => {
    inputRef.current.click();
  }
  const handleChange = (evet:React.ChangeEvent<HTMLInputElement>) => {
    setFile({
      preview: URL.createObjectURL(evet.target.files[0]),
      fileData: evet.target.files[0]
    })
  }

  const handleSave = async () => {
    const formData = new FormData();
    if (inputForm.name) formData.append("name", inputForm.name);
    if (inputForm.contact) formData.append("contact", inputForm.contact);
    if (inputForm.city) formData.append("city", inputForm.city);
    if (inputForm.address) formData.append("address", inputForm.address);
    if (inputForm.country) formData.append("country", inputForm.country);
    if (inputForm.interest) formData.append("interest", inputForm.interest);
    if (inputForm.otherInfo) formData.append("otherInfo", inputForm.otherInfo);
    if (file.fileData) formData.append("avatar", file.fileData);

    const data = {
      id: atpData._id,
      payload: formData 
    }

    setLoading(true);
    await dispatch(atpUpdateProfile(data)).unwrap();
    setLoading(false)
    
    if (!requestError) await dispatch(getATP(atpData._id)).unwrap();

    if (!requestError) {
      dispatch(setLayoutSubTitle("View Profile"));
    }
  }
  const handleChangePassword = async () => {
    const data = {
      id: atpData._id,
      payload: {
        oldPassword: changePassword.oldPassword,
        newPassword: changePassword.newPassword,
        email: atpData.email,
      }
    };

    await dispatch(atpChangePassword(data)).unwrap();

    if (!requestError) {
      setShowPassword(false);
    }
  }
  return (
 <div className="lg:w-[80%] w-full lg:ml-12 ">
            <div className="flex justify-end">
              {/* {updateStatus !== "loading"?<div className='text-3xl ml-14 pt-2 hover:text-[#32ba32] hover:-translate-x-3 duration-1000 hover:cursor-pointer' onClick={handleBack}><IoIosArrowRoundBack /></div>:<div></div>} */}
              <div>
                <div className={classNames("text-[#32ba32] font-bold text-lg pt-2 flex justify-end items-center pr-14 leading-6", {
                "cursor-pointer": updateStatus !== "loading",
                "hover:cursor-not-allowed": updateStatus === "loading"
                })} onClick={updateStatus !== "loading"?handleSave:()=>{}}>
                  {
                    (!loading) && "Save Profile"
                  }
                  {
                    (loading) && <><ButtonLoader /> <span className="ml-2">Saving</span></>
                  }
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-2 px-4 mt-4 bg-[#F5F5F5] w-full pt-3 pb-20 rounded-xl">
        <div className=" rounded-lg">
                      <div>
                          <h1 className="text-[#32ba32] text-xl  font-[500] md:hidden block ">ATP Profile Record</h1>
                              
                        </div>
          <div className='w-[108px] h-[108px]'>         
            <img src={file.preview?file.preview:inputForm.avatar?inputForm.avatar:"/assets/avatar.svg"} className="w-full max-w-[70%]" />
            </div>
                  <div>
                    <input
                        type="file"
                        className="border w-full hidden"
                        ref={inputRef}
                        onChange={handleChange}
                    />
                    <div className='flex items-center mt-2  text-[#32ba32] cursor-pointer' onClick={handleClick}>
                      <span ><HiUpload /> </span>
                      <p className='pl-2'>Upload  </p>
                    </div>
                  </div>
                
                </div>
                <div >
                    <div>
                        <h1 className="text-[#32ba32] text-xl  font-[500] hidden md:block ">ATP Profile Record</h1>
                        
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
                    <div className=' mb-3 w-full'>
                      <div>
                            <label htmlFor='name' className="text-[#828282] text-xl md:text-[14px] ">ATP Name</label>
                      </div>
                            <input value={inputForm.name} id='name' type="text"  className="w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Oluwaseyi' onChange={handleInput("name")}/>
                      </div>
                      
                    <div className=' mb-0 md:mb-3 w-full'>
                    <div>
                          <label htmlFor='contact' className="text-[#828282] text-xl md:text-[14px]">Contact Details</label>
                    </div>
                         <input value={inputForm.contact} id='contact' type="text"  className="w-[100%]   rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='James'onChange={handleInput("contact")}/>

                        </div>
                        

                  </div>

                  {/* <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
                        <div className=' mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Title</p>
                        <input type="text"  className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Mr'/>

                      </div>
                      
                      <div className=' mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">First Name</p>
                         <input type="text" className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Oluwaseyi'/>

                      </div>
                      
                      <div className=' mb-3'>
                        <p className="text-[#828282] text-xl md:text-[14px]">Last Name</p>
                         <input type="text"  className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='James'/>

                        </div>
                        

                  </div> */}

                   <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-4 md:pt-6">
                        <div className=' mb-3 w-full'>
                          <div>
                          <label htmlFor="email"  className="text-[#828282] text-xl md:text-[14px]">Email</label>
                          </div>
                        <input value={inputForm.email} id="email" type="email" readOnly  className=" w-[100%] rounded-xl outline-none border-none bg-[#FBFBFB]" placeholder='Jamesoluwaseyi@gmail.com'/>

                      </div>
                      
                      <div className=' mb-3 w-full'>
                           <div>
                                <label htmlFor='number' className="text-[#828282] text-xl md:text-[14px]">Phone Number</label>
                            </div>
                         <input value={inputForm.phone} id='number' type="number" readOnly className=" w-[100%] rounded-xl outline-none border-none bg-[#FBFBFB]" placeholder='+2348675789423'/>

                      </div>
                      
                  </div>

                   <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-4 md:pt-6">
            <div className=' mb-3 w-full'>
                  <div>
                          <label htmlFor='address' className="text-[#828282] text-xl md:text-[14px]">Address</label>
                  </div>
                        <input value={inputForm.address} id='address' type="text"  className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='No.15 East West Road' onChange={handleInput("address")}/>

                      </div>
                      
                 <div className=' mb-3 w-full'>
                    <div>
                        <label htmlFor='city' className="text-[#828282] text-xl md:text-[14px]">City/Town</label>
                    </div>
                         <input value={inputForm.city} id='city' type="text"  className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Port Harcourt' onChange={handleInput("city")}/>
                  </div>
                      
            <div className=' mb-3 w-full'>
                    <div>
                          <label htmlFor='country' className="text-[#828282] text-xl md:text-[14px]">Country</label>
                    </div>
                         <input value={inputForm.country} id='country' type="text" className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Nigeria' onChange={handleInput("country")}/>
            </div>
                        

                  </div>

                   <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-4 md:pt-6">
            <div className=' mb-3 w-full '>
                    <div>
                        <label htmlFor='training' className="text-[#828282] text-xl md:text-[14px]">Training Interest</label>
                    </div>
                        <input value={inputForm.interest} id='training' type="text"  className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Business Audition'onChange={handleInput("interest")}/>

              </div>
                      
            <div className=' mb-3 w-full'>
                <div>
                    <label htmlFor='information' className="text-[#828282] text-xl md:text-[14px]">Other Information</label>
                </div>
                    <input value={inputForm.otherInfo} id='information' type="text" className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Port Harcourt'onChange={handleInput("otherInfo")}/>

            </div>
          </div>

             <div className='mt-8'>
                  <button className='text-[#32ba32] text-xl  font-[600]' onClick={()=>setShowPassword(!showPassword)}>Change Password</button>
                {showPassword &&
                <div>
                <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-4 md:pt-6">
                      <div className=' mb-3 w-full'>
                        <div>
                            <label htmlFor='oldPassword' className="text-[#828282] text-xl md:text-[14px]">Old Password</label>
                        </div>
                            <input  value={changePassword.oldPassword}  id='oldPassword' type="password"  className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Business Auditing'onChange={handlePassword("oldPassword")}/>

                      </div>
                      
                  <div className=' mb-3 w-full'>
                    <div>
                        <label htmlFor='newPassword' className="text-[#828282] text-xl md:text-[14px]">New Password</label>
                    </div>
                         <input value={changePassword.newPassword} id='newPassword' type="password"  className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Business Auditing' onChange={handlePassword("newPassword")}/>
                  </div>
                      
                  <div className=' mb-3 w-full'>
                    <div>
                        <label htmlFor='confirmPassword' className="text-[#828282] text-xl md:text-[14px]">Confirm Password</label>
                    </div>
                         <input value={changePassword.confirmPassword} id='confirmPassword' type="password" className=" w-[100%] rounded-xl outline-none focus:outline-none focus:border-[#307D0B] focus:border bg-[#FBFBFB]" placeholder='Business Auditing' onChange={handlePassword("confirmPassword")}/>
                  </div>
                      
                </div>
                <div className='flex justify-center mt-4'>
                 <button className = "bg-text2  text-[#F9F9F9] w-[154px] h-[42px] rounded-md disabled:cursor-not-allowed disabled:opacity-[0.5]" disabled={(changePassword.newPassword !== changePassword.confirmPassword)? true: (updateStatus === "loading")? true:false} onClick={updateStatus === "loading"? () => {}:handleChangePassword}>{updateStatus === "loading"?"Saving...":"Save Password"}</button>
                </div>
                 </div>}
            </div>
                  
              </div> 
          </div>
      </div>
  )
}

export default ATPProfileUpdate