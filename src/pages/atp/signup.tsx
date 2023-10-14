import { NextPageWithLayout } from "../_app";
import { useState, useEffect } from 'react';
import ATPSignupFormStepOne from "../../features/atp/ATPSignupFormStepOne";
import ATPSignupFormStepTwo from "../../features/atp/ATPSignupFormStepTwo";
import Button from "../../components/Button";
import Head from "next/head";
import { setAlert } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import classNames from "classnames";

const Signup: NextPageWithLayout = () => {

  const [firstStep, setfirstStep] = useState(true)
  const alert = useAppSelector(state => state.user.alert);
   const [signUpForm, setSignUpForm] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    interest: "",
    password: "",
    otherInfo : "",
    atp: "true"
  });
  const dispatch = useAppDispatch();
  const handleSecondStep = () => {
    setfirstStep(false)
  }
  const handleChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSignUpForm({
      ...signUpForm,
      [input]: evt.target.value,
    })
  };
  useEffect(() => {
    dispatch(setAlert({show: false, status: "completed", message: ""}))
  }, [])
  
  return (
    <div>
      <Head>
        <title>QMSAI |ATP Sign Up</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        alert.show && <div className={classNames("text-center fixed left-0 right-0 py-1 text-lg",{
          "bg-green-100 text-green2 fade": (alert?.status === "completed"),
          "bg-red-100 text-red-500 fade": (alert?.status === "failed")
        })}>{alert?.message}</div>
      }
      <div>
      <div className="flex flex-col md:flex-row items-center justify-center bg-backgroundWhite md:h-[100vh] pb-7 md:pb-0">
        <div className="w-[70px] h-[100px] rounded-b-full border-x-2 border-b-2 border-green4 self-start mb-5 ml-3 md:hidden">
          <p className="bg-text  w-[50px] h-[90px]  text-textWhite text-center mx-3 mb-3 rounded-b-full pt-[50px]">Sign up</p>
        </div>
        <div className="w-[40%]">
          <div  className="flex justify-center">
            <img src="/assets/signup.svg" />
          </div>
        </div>
        <div className="w-1 h-full bg-[#307D0B] hidden md:block"></div>
        <div className="w-[60%] ">
          <div className="md:flex md:pl-4 md:space-x-12">
            <div className="hidden md:flex flex-col justify-between h-[100vh]">
              <div className="rounded-b-full border-x-2 border-b-2 border-green4 hidden md:block">
                <p className="bg-text  w-[60px] h-[120px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[80px]">Sign up</p>
              </div>
              <div className="bg-text  w-[80px] h-[60px] rounded-t-full"></div>
              </div>
              <div>
                {firstStep && <ATPSignupFormStepOne handleSecondStep={handleSecondStep} signUpForm={signUpForm} handleChange={handleChange}  />}
                {!firstStep && <ATPSignupFormStepTwo signUpForm={signUpForm} handleChange={handleChange} />}
             </div> 
           
          </div>
         </div>
        </div>  
    </div>


      {/* <div>
        {firstStep && <ATPSignupFormStepOne handleSecondStep={handleSecondStep} />}
        {!firstStep && <ATPSignupFormStepTwo/>}
      </div> */}
    </div>
  )
}

export default Signup;