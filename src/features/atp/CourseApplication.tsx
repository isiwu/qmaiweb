import React, {useState, useEffect} from 'react'
import Button from '../../components/Button';
import {RiErrorWarningFill} from "react-icons/ri"
import Select from '../../components/Select';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PaymentModalCertificate from '../../components/PaymentModalCertificate';
import { courseApplication } from './atpSlice';
import { setAlert } from '../user/userSlice';

function CourseApplication() {
  const dispatch = useAppDispatch();
  const atpData = useAppSelector(state => state.atp.data);
  const [courseForm, setForm] = useState({
    name: "",
    info: "",
  });
  const [showModal, setModal] = useState(false);
  const handleSelect = (input: string) => (evt: React.MouseEvent) => {
    const target = evt.target as Element;
    const targetValue = target.getAttribute("value");

    setForm({
      ...courseForm,
      [input]: targetValue
    })
  };
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...courseForm,
      info: evt.target.value
    })
  };
  const handlePayment = () => {
    setModal(true);
  };
  const handleSubmit = async () => {
  
    const courseData = {atpId: atpData._id, payload: {...courseForm, fee: "200", date: new Date()}}
    
    dispatch(setAlert({show: false, status: "failed", message: ""}))
    setModal(true);
    await dispatch(courseApplication(courseData)).unwrap()
    .then(async data => {
      if (!data?.status) {
        dispatch(setAlert({show: true, status: "failed", message: "action failed. try again."}))
      } else {
        dispatch(setAlert({show: true, status: "completed", message: "action successful!."}))
      }
    })
  }
  
  return (
    <div>
      <div className="ml-14 my-10">
    <div className="border w-[80%] rounded-xl">   
        <div>
            <h2 className='pt-6 text-2xl text-[#73D942] pl-4'>Course Application</h2>
        </div>
      <div className='pl-4 mt-8 '>
        <p>Select Course</p>
        <div className="w-[90%] md:w-[60%] h-[40px] bg-[#FBFBFB] rounded-[8px]">
            <Select placeHolder="Course Type" value={courseForm.name} onChange={handleSelect("name")}>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="graduate auditor course">Graduate Auditor Course</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="associate auditor course">Associate Auditor Course</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="principal auditor course">Principal Auditor Course</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="chartterred auditor course">Chartted Auditor Course</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="full membership">Full Membership</option>
            </Select>
          </div>
      </div>
      <div className='pl-4 mt-10'>
          <div>
            <label htmlFor="info" className='leading-10'>Why are you applying for this Course</label>
          </div>
          <div>
            <textarea value={courseForm.info} id='info'  rows={4} placeholder= "Junior Membership" className='w-[90%] md:w-[60%] bg-[#FBFBFB] text-[#272727] resize-none p-4 rounded-lg outline-none focus:border-2 focus:border-green5' onChange={handleChange} />
          </div>
       </div>
       <div className='flex justify-center items-center my-8 md:px-12 px-6 w-full md:w-[70%] mx-auto ' >
          <Button text='Make Payment' disabled={showModal?true:false} handler={handlePayment} />
       </div>
       </div>

       {
          showModal && <PaymentModalCertificate showModal={showModal} setModal={setModal} handleMakePayment={handleSubmit} />
        }
    </div>
    </div>
  )
}

export default CourseApplication