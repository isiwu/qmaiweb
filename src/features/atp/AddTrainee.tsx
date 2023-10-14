import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
//import {RiErrorWarningFill} from "react-icons/ri"
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import Select from '../../components/Select';
import { setAlert } from '../user/userSlice';
//import { setLayoutSubTitle, setLayoutTitle } from '../user/userSlice';
import { addTrainee, getCourses } from './atpSlice';

const AddTrainee = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const atpData = useAppSelector(state => state.atp.data);
    const status = useAppSelector(state => state.atp.status);
    const [loading, setLoading] = useState(false);
    const courses = useAppSelector(state => state.atp.courses);
    const [options, setOptions] = useState([
        {
          name: "",
          info: "", 
          atpId: "",
          _id: "" 
        }
    ])
    const [addTraineeForm, setAddTraineeForm] = useState({
        firstName : "",
        lastName: "",
        email: "",
        course: ""
    })
   const  handleTraineeForm = (input:string)=>(evt:React.ChangeEvent<HTMLInputElement>)=>{
    setAddTraineeForm ({
        ...addTraineeForm,
        [input] : evt.target.value

    })
   };
   const  handleSelect = (input:string)=>(evt:React.MouseEvent)=>{
    const target = evt.target as Element;
    const targetValue = target.getAttribute("value")
    setAddTraineeForm ({
        ...addTraineeForm,
        [input] : targetValue

    })
   };
//    const handleUpdate = async () => {
//       await router.push("profile"); 
//       dispatch(setLayoutTitle("Profile"))
//       dispatch(setLayoutSubTitle("Update Profile"))
//    };
   const handleAddTrainee = async (evt: React.MouseEvent) => {
    evt.stopPropagation();

    const data = {
        atpId: atpData._id,
        payload: addTraineeForm
    }
    setLoading(true);
    dispatch(setAlert({show: false, status: "failed", message: ""}))
    await dispatch(addTrainee(data)).unwrap()
    .then(data => {
        if (data?.status) {
            setAddTraineeForm({
                firstName: "",
                lastName: "",
                email: "",
                course: ""
            })
            dispatch(setAlert({show: true, status: "completed", message: "action successfull."}))
        } else {
            dispatch(setAlert({show: true, status: "failed", message: "action failed. try again"}))
        }
        setLoading(false)
    })
   };
   useEffect(() => {
    (
        async () => {
            await dispatch(getCourses(atpData._id)).unwrap()
            .then((data: {status: boolean, data: {info: string, name: string, atpId: string, _id: string, fee: number}[]}) => {
                const newOptions = data?.data.map((item => {
                    return {
                        name: item.name,
                        info: item.info,
                        atpId: item.atpId,
                        _id: item._id
                    }
                }))

                setOptions(newOptions);
            });
        }
    )()
   }, [])

   return (
      <div className="">
          <div className="border md:w-[80%] w-[90%] rounded-xl ml-4 md:ml-10 my-10 ">
                <div className='ml-4 pt-6'>
                    <h1 className='text-[#73D942] text-2xl '>Add Trainee</h1>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 pt-6  mt-2 pl-4 flex-wrap"> 
                <div >
                <div>
                    <label htmlFor='firstName' className="text-[#828282] font-[300]">First Name</label>
                </div>
                    <div className="pt-2">
                        <input id='firstName' type="text" value={addTraineeForm.firstName} placeholder="Oluwaseyi"
                        className="md:w-[100%] w-[85%] h-[40px] outline-none focus:border-2 focus:border-[#307D0B] bg-[#FBFBFB] rounded-[8px] font-[100] text-[18px] text-[#272727]"onChange={handleTraineeForm("firstName")} />
                </div>
                </div>       
                <div className='md:mt-0 mt-3 pl-0 lg:pl-3'>
                <div>
                    <label htmlFor='lastName' className="text-[#828282] font-[300]">Last Name</label>
                </div>
                    <div className="pt-2">
                    <input id='lastName' type="text" value={addTraineeForm.lastName} placeholder="Endaline" className="md:w-[100%] w-[85%] h-[40px] outline-none hover:outline-none focus:border-2 focus:border-[#307D0B] bg-[#FBFBFB] rounded-[8px] font-[100] text-[18px] text-[#272727]"onChange={handleTraineeForm("lastName")}/>
                </div>
                </div>        
                <div className='lg:mt-0 mt-3'>
                <div>
                    <label htmlFor='email' className="text-[#828282] font-[300]">Email</label>
                </div>
                    <div className="pt-2">
                    <input id='email' type="email" value={addTraineeForm.email} placeholder="James@inmotion.com" className="md:w-[100%] w-[85%] h-[40px] outline-none focus:border-2 focus:border-[#307D0B] bg-[#FBFBFB] rounded-[8px] font-[100] text-[18px] text-[#272727]"onChange={handleTraineeForm("email")}/>
                </div>
                </div>    
            </div>
            <div className='pl-4 mt-10 w-[85%] md:w-[55%]'>
              <p className='pl-2'>Select Course ATP</p>
              <div className='bg-[#FBFBFB] h-[40px] rounded-[8px]'>
                <Select value={addTraineeForm.course} onChange={handleSelect("course")} placeHolder="course type" options={options} >
                    {/* {
                        courses?.map(course => (
                            <option value={course.name} className='hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1' key={course._id}>{course.name}</option>
                        ))
                    } */}
                    {/* <option value="Front End" className='hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1'>Front End</option>
                    <option value="Web Development" className='hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1'>Web Development</option>
                    <option value="Backend" className='hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1'>Backend</option>
                    <option value="Fullstack" className='hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1'>FullStack</option> */}
                </Select>
              </div>
            </div>
          <div className='flex justify-center items-center mt-20 mb-12 px-12 md:w-[60%] w-[100%] mx-auto' >
            <Button  text={loading?"Adding Trainee":'Add Trainee'} handler={handleAddTrainee} disabled={status==="loading"?true:false} />
          </div>
            </div>

        </div>   

  )
}

export default AddTrainee
