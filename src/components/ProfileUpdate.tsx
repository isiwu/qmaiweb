import classNames from 'classnames';
import React, { useState, useRef, forwardRef } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUserData, setAlert, setLayoutSubTitle, updateProfile } from '../features/user/userSlice';
import ButtonLoader from './ButtonLoader';
import { FcUpload } from "react-icons/fc";
import { IoIosArrowRoundBack } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type AppProps = {
  handleUpdate?: () => void
}
function ProfileUpdate({ handleUpdate }: AppProps) {
  const user = useAppSelector(state => state.user.data);
  const updateStatus = useAppSelector(state => state.user.status);
  const requestError = useAppSelector(state => state.user.requestError);
  const inputRef = useRef<HTMLInputElement | null>(null)


  const dispatch = useAppDispatch();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [academicsTitle, setAcademicsTitle] = useState("");
  const [academicsTitle2, setAcademicsTitle2] = useState("");
  const [academicsTitle3, setAcademicsTitle3] = useState("");
  const [academicsTitle4, setAcademicsTitle4] = useState("");
  const [academicsDiscipline, setAcademicsDiscipline] = useState("");
  const [academicsDiscipline2, setAcademicsDiscipline2] = useState("");
  const [academicsDiscipline3, setAcademicsDiscipline3] = useState("");
  const [academicsDiscipline4, setAcademicsDiscipline4] = useState("");
  const [academicsInstitution, setAcademicsInstitution] = useState("");
  const [academicsInstitution2, setAcademicsInstitution2] = useState("");
  const [academicsInstitution3, setAcademicsInstitution3] = useState("");
  const [academicsInstitution4, setAcademicsInstitution4] = useState("");
  const [workExpTitle, setWorkExpTitle] = useState("");
  const [workExpTitle2, setWorkExpTitle2] = useState("");
  const [workExpTitle3, setWorkExpTitle3] = useState("");
  const [workExpTitle4, setWorkExpTitle4] = useState("");
  const [workExpPlace, setWorkExpPlace] = useState("");
  const [workExpPlace2, setWorkExpPlace2] = useState("");
  const [workExpPlace3, setWorkExpPlace3] = useState("");
  const [workExpPlace4, setWorkExpPlace4] = useState("");
  const [workExpStartDate, setWorkExpStartDate] = useState(new Date());
  const [workExpStartDate2, setWorkExpStartDate2] = useState(new Date());
  const [workExpStartDate3, setWorkExpStartDate3] = useState(new Date());
  const [workExpStartDate4, setWorkExpStartDate4] = useState(new Date());
  const [workExpEndDate, setWorkExpEndDate] = useState(new Date());
  const [workExpEndDate2, setWorkExpEndDate2] = useState(new Date());
  const [workExpEndDate3, setWorkExpEndDate3] = useState(new Date());
  const [workExpEndDate4, setWorkExpEndDate4] = useState(new Date());
  const [avatar, setAvatar] = useState<File | null>(null);
  const [prevAvatar, setPreAvatar] = useState("");
  const handleDateOfBirth = (date: Date) => {
    setDateOfBirth(date);
  };
  const handleAcademicTitle = (input: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (input === 1) setAcademicsTitle(evt.target.value);
    if (input === 2) setAcademicsTitle2(evt.target.value);
    if (input === 3) setAcademicsTitle3(evt.target.value);
    if (input === 4) setAcademicsTitle4(evt.target.value);
  };
  const handleAcademicDiscipline = (input: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (input === 1) setAcademicsDiscipline(evt.target.value);
    if (input === 2) setAcademicsDiscipline2(evt.target.value);
    if (input === 3) setAcademicsDiscipline3(evt.target.value);
    if (input === 4) setAcademicsDiscipline4(evt.target.value);
  };
  const handleAcademicInstitution = (input: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (input === 1) setAcademicsInstitution(evt.target.value);
    if (input === 2) setAcademicsInstitution2(evt.target.value);
    if (input === 3) setAcademicsInstitution3(evt.target.value);
    if (input === 4) setAcademicsInstitution4(evt.target.value);
  };
  const handleWorkExpTitle = (input: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (input === 1) setWorkExpTitle(evt.target.value);
    if (input === 2) setWorkExpTitle2(evt.target.value);
    if (input === 3) setWorkExpTitle3(evt.target.value);
    if (input === 4) setWorkExpTitle4(evt.target.value);
  };
  const handleWorkExpPlace = (input: number) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (input === 1) setWorkExpPlace(evt.target.value);
    if (input === 2) setWorkExpPlace2(evt.target.value);
    if (input === 3) setWorkExpPlace3(evt.target.value);
    if (input === 4) setWorkExpPlace4(evt.target.value);
  };
  const handleWorkExpStartDate = (input: number) => (date: Date) => {
    if (input === 1) setWorkExpStartDate(date);
    if (input === 2) setWorkExpStartDate2(date);
    if (input === 3) setWorkExpStartDate3(date);
    if (input === 4) setWorkExpStartDate4(date);
  };
  const handleWorkExpEndDate = (input: number) => (date: Date) => {
    if (input === 1) setWorkExpEndDate(date);
    if (input === 2) setWorkExpEndDate2(date);
    if (input === 3) setWorkExpEndDate3(date);
    if (input === 4) setWorkExpEndDate4(date);
  };
  const handleAvatar = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files[0]) {
      setAvatar(evt.target.files[0]);
      setPreAvatar(URL.createObjectURL(evt.target.files[0]));
    }
  };
  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();

    inputRef.current.click();
    evt.stopPropagation();
  }
  const saveProfile = async (evt: React.MouseEvent) => {
    const academics = [
      {
        title: academicsTitle,
        discipline: academicsDiscipline,
        institution: academicsInstitution
      },
      {
        title: academicsTitle2,
        discipline: academicsDiscipline2,
        institution: academicsInstitution2
      },
      {
        title: academicsTitle3,
        discipline: academicsDiscipline3,
        institution: academicsInstitution3
      },
      {
        title: academicsTitle4,
        discipline: academicsDiscipline4,
        institution: academicsInstitution4
      }
    ];
    const workExps = [
      {
        workPlace: workExpPlace,
        title: workExpTitle,
        startDate: workExpStartDate,
        endDate: workExpEndDate
      },
      {
        workPlace: workExpPlace2,
        title: workExpTitle2,
        startDate: workExpStartDate2,
        endDate: workExpEndDate2
      },
      {
        workPlace: workExpPlace3,
        title: workExpTitle3,
        startDate: workExpStartDate3,
        endDate: workExpEndDate3
      },
      {
        workPlace: workExpPlace4,
        title: workExpTitle4,
        startDate: workExpStartDate4,
        endDate: workExpEndDate4
      }
    ];
    const formData = new FormData();
    formData.append("academics", JSON.stringify(academics));
    formData.append("workExps", JSON.stringify(workExps));
    formData.append("avatar", avatar);
    const dateArr = JSON.stringify(dateOfBirth).split("T");
    // console.log(dateArr[0]);
    // console.log(new Date(dateArr[0]));
    formData.append("dateOfBirth", dateArr[0]);
    const data = {
      id: user._id,
      payload: formData,
    }
    // if (dateOfBirth) {
    //   console.log(formData.get("dateOfBirth"));
    //   console.log(formData);
    //   return;
    // }

    const dataStore = await dispatch(updateProfile(data)).unwrap()


    if (!dataStore?.status) {
      dispatch(setAlert({ show: true, status: "failed", message: "update unsuccessful. Try again." }));
      return;
    }

    await dispatch(getUserData(user?._id)).unwrap();

    if (dataStore.status) {
      dispatch(setLayoutSubTitle("View Profile"))
    }
  };

  return (
    <div className="font-lexend">
      <div className="flex justify-end">
        {/* {updateStatus !== "loading"?<div className='text-3xl ml-14 pt-2 hover:text-[#32ba32] hover:-translate-x-3 duration-1000 hover:cursor-pointer' onClick={handleBack}><IoIosArrowRoundBack /></div>:<div></div>} */}
        <div>
          <div className={classNames("text-[#32ba32] font-bold text-lg pt-2 flex justify-end items-center pr-14 leading-6", {
            "cursor-pointer": updateStatus !== "loading",
            "hover:cursor-not-allowed": updateStatus === "loading"
          })} onClick={updateStatus !== "loading" ? saveProfile : () => { }}>
            {
              (updateStatus !== "loading") && "Save Profile"
            }
            {
              (updateStatus === "loading") && <><ButtonLoader /> <span className="ml-2">Saving</span></>
            }
          </div>
        </div>
      </div>
      {/* <div className={classNames("text-[#32ba32] font-bold text-lg pt-2 flex justify-end items-center pr-14 leading-6", {
      "cursor-pointer": updateStatus !== "loading",
      "hover:cursor-not-allowed": updateStatus === "loading"
    })} onClick={updateStatus !== "loading"?saveProfile:()=>{}}>
      {
        (updateStatus === "loading") && "Save Profile"
      }
      {
        (updateStatus !== "loading") && <><ButtonLoader /> <span className="ml-2">Saving</span></>
      }
    </div> */}
      <div className='border-[1px] w-[90%] border-[#CCCCCC] rounded-[16px] my-6 ml-4'>
        <div className='text-[#32ba32] font-bold text-2xl py-2 pl-8 border-b-2'>Profile Record</div>
        <div className='px-2 flex flex-col md:flex-row  pt-6'>

          <div className='hover:cursor-pointer hover:drop-shadow-md px-2 flex flex-row md:flex-col md:justify-start justify-center md:items-start items-center'>
            <img src={prevAvatar ? prevAvatar : user?.profileId?.avatar ? user?.profileId?.avatar : "/assets/avatar.svg"} alt="" className='w-[50%] md:max-w-[30%]  rounded-lg' onClick={handleClick} />
            <p className='flex space-x-2 items-center text-green1 mt-2' onClick={handleClick}><FcUpload className='text-green1' /><span>Upload picture</span></p>
            <input type="file" hidden ref={inputRef} onChange={handleAvatar} />
          </div>
          <div className='pt-3 w-[100%]'>
            <div className='flex space-x-2 items-center mt-2 mb-4'>
              <div className='font-[700] text-[#BBBBBB]'>Bio Record</div>
              <div className='w-[84%] h-[1px] bg-[#CCC]'></div>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-x-2 mb-4'>
              <div>
                <div className=' flex flex-col'>
                  <label >First Name</label>
                  <input type="text" value={user?.name?.first} placeholder='Oluwaseyi' className='w-full  h-[40px] mt-2 outline-none rounded-[8px] bg-[#FBFBFB] ' readOnly />
                </div>
              </div>
              <div>
                <div className='flex flex-col'>
                  <label >Last Name</label>
                  <input type="text" value={user?.name?.last} placeholder='James' className='w-full h-[40px] mt-2 outline-none rounded-[8px] bg-[#FBFBFB]' readOnly />
                </div>
              </div>
            </div>
            <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-x-2  mt-4 mb-6'>
              <div className='flex '>
                <div className=' flex flex-col w-full'>
                  <label >Email</label>
                  <input type="email" value={user?.email} placeholder='Oluwaseyi@gmail.com' className='border-0 w-full  mt-2 outline-none h-[40px] rounded-[8px] bg-[#FBFBFB] ' readOnly />
                </div>
              </div>
              <div className='flex'>
                <div className=' flex flex-col w-full'>
                  <label >Phone Number</label>
                  <input type="text" value={user?.phone} placeholder='+234667798098' className='border-0 w-full mt-2 outline-none h-[40px] rounded-[8px] bg-[#FBFBFB] ' readOnly />
                </div>
              </div>
              <div className='flex'>
                <div className=' flex flex-col w-full'>
                  <label >Date Of Birth</label>
                  <div>
                    <DatePicker
                      selected={dateOfBirth}
                      onChange={handleDateOfBirth}
                      className="w-full mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex space-x-2 items-center mt-12'>
              <div className='font-[700] text-[#BBBBBB]'>Academic Record</div>
              <div className='w-[80%] h-[1px] bg-slate-200'></div>
            </div>
            <div>
              <div className=' grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-2  mt-4 mb-6'>
                <div className='flex flex-col'>
                  <label htmlFor="">Highest Education/Degree</label>
                  <input type="text" value={academicsTitle} placeholder='B.Sc' className='w-full mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB]' onChange={handleAcademicTitle(1)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="">Discipline</label>
                  <input type="text" value={academicsDiscipline} placeholder='Accounting' className='w-full mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] ' onChange={handleAcademicDiscipline(1)} />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="">Awarding Institution</label>
                  <input type="text" value={academicsInstitution} placeholder='IMT' className='w-full mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] ' onChange={handleAcademicInstitution(1)} />
                </div>
              </div>
              {/* <div className='flex justify-end'>
              <button   className=' w-full mt-2 border-[1px] outline-none text-[#32ba32] border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB]'>Add More Academic Record</button>
            </div> */}
            </div>
            <div className='flex space-x-2 items-center mt-8'>
              <div className='font-[700] text-[#BBBBBB]'>Work Exprience</div>
              <div className='w-[80%] h-[1px] bg-slate-200'></div>
            </div>
            <div>
              <div className='  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-x-4 my-4'>
                <div className=' flex flex-col'>
                  <label >Lastest Work Place</label>
                  <input type="text" value={workExpPlace} placeholder='IMT' className='w-full mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] ' onChange={handleWorkExpPlace(1)} />
                </div>
                <div className=' flex flex-col'>
                  <label >Job Title</label>
                  <input type="text" value={workExpTitle} placeholder='Internal Auditor' className='w-full mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB] ' onChange={handleWorkExpTitle(1)} />
                </div>
                <div className=' flex flex-col'>
                  <label >Start Date</label>
                  <DatePicker
                    selected={workExpStartDate}
                    onChange={handleWorkExpStartDate(1)}
                    className="w-full  mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB]"
                  />
                </div>
                <div className=' flex flex-col'>
                  <label >End Date</label>
                  <DatePicker
                    selected={workExpEndDate}
                    onChange={handleWorkExpEndDate(1)}
                    className="w-full  mt-2 outline-none focus:border-2 focus:border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB]"
                  />
                </div>
              </div>
              {/* <div className='flex justify-end pb-6'>
              <button   className=' w-full mt-2 border-[1px] outline-none text-[#32ba32] border-[#32ba32] h-[40px] rounded-[8px] bg-[#FBFBFB]'>Add More Work Exprience</button>
            </div> */}
            </div>
            <div className='flex justify-center items-center pb-9'>
              <button className={classNames('flex items-center border-2 border-[#32ba32] py-3 px-8 rounded-lg text-[#32ba32] hover:shadow-xl disabled:hover:cursor-not-allowed')} onClick={updateStatus !== "loading" ? saveProfile : () => { }} disabled={updateStatus === "loading" ? true : false}>
                {
                  (updateStatus !== "loading") && "Save Profile"
                }
                {
                  (updateStatus === "loading") && <><ButtonLoader /> <span className="ml-2">Saving</span></>
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileUpdate