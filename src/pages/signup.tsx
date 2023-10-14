import { useEffect } from "react";
import classNames from "classnames";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState} from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "../components/Button";
import { checkMailExists, setAlert, setStatus, signup } from "../features/user/userSlice";
import type { NextPageWithLayout } from "./_app";
//import Image from "next/image";


const SignUp: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.user.status);
  const alert = useAppSelector(state => state.user.alert);
  const router = useRouter();
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [emailExists, setEmailExists] = useState(false);
  const [emailEmpty, setEmailEmpty] = useState(false);

  const onChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signupForm,
      [input]: evt.target.value,
    })
  };
  const handleSignup = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    await dispatch(signup(signupForm)).unwrap()
    .then((data) => {
      if (data.status) { 
        if (data.data.role === "admin") return router.replace("signin");
        router.push("verify-email");
      } else {
        dispatch(setAlert({show: true, status: "failed", message: "request not successful. please try again."}))
      }
    });

    dispatch(setStatus("idle"));
  };
  const handleBlur = (evt: React.FocusEvent<HTMLInputElement>) => {
    const data = {email: evt.target.value};

    if (!evt.target.value) {
      setEmailEmpty(true);

      return;
    }

    dispatch(checkMailExists(data)).unwrap()
    .then(data => {
      if (data?.data) setEmailExists(true);
    })
  };
  const handleFocus = () => {
    if (emailEmpty) setEmailEmpty(false);
    setEmailExists(false);
  };
  const gotoSignin = (evt: React.MouseEvent) => {
    evt.preventDefault();
    
    if (status === "loading") return;
    router.push("signin");
  };
  const goToATPSignup = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    router.push("atp/signup");
  }
  useEffect(() => {
    dispatch(setAlert({show: false, status: "completed", message: ""}))
  }, [])

  return (
    <div>
       <Head>
        <title>QMSAI | Sign Up</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        alert.show && <div className={classNames("text-center fixed left-0 right-0 py-1 text-lg",{
          "bg-green-100 text-green2 fade": (alert?.status === "completed"),
          "bg-red-100 text-red-500 fade": (alert?.status === "failed")
        })}>{alert?.message}</div>
      }
      <div className="flex flex-col md:flex-row items-center justify-center bg-backgroundWhite md:h-[100vh] pb-7 md:pb-0">
        <div className="w-[70px] h-[100px] rounded-b-full border-x-2 border-b-2 border-green4 self-start mb-5 ml-3 md:hidden">
          <p className="bg-text  w-[50px] h-[90px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[50px]">Sign up</p>
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
            <div className="flex flex-col justify-center items-center">
              <div className="self-end -mr-24 text-lg"><button className="text-[#73D942] hover:text-[#75ff3f] mr-1 hover:cursor-pointer text-2xl" onClick={goToATPSignup}>ATP</button> sign up </div>
              <div className="md:flex justify-center hidden">
                <img src="/assets/siginLogo.svg" alt="" />
              </div>
              <div className="mt-5">
                <div className="flex space-x-2 md:space-x-3 mt-4">
                  <input type="text" value={signupForm.firstName} className="md:w-[194px] w-[150px] rounded-xl focus:outline-none focus:border-[#307D0B]" placeholder="First Name" onChange={onChange("firstName")} />
                  <input type="text" value={signupForm.lastName} className="w-[160px] md:w-[194px] rounded-xl focus:outline-none focus:border-[#307D0B]" placeholder="Last Name" onChange={onChange("lastName")} />
                </div>
                <div className="md:w-[400px] mt-3">
                  <input type="text" value={signupForm.email} className={classNames("w-full rounded-xl focus:outline-none focus:border-[#307D0B]", {"border-red-700 border-2": emailExists})} placeholder="Email" onChange={onChange("email")} onBlur={handleBlur} onFocus={handleFocus} />
                </div>
                {
                  emailExists && <span className="text-red-700">Email exists</span>
                }
                <div className="md:w-[400px] my-3">
                  <input type="text" value={signupForm.phone} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B]" placeholder="Phone Number" onChange={onChange("phone")} />
                </div>
                <div className="md:w-[400px] mb-3">
                  <input type="password" value={signupForm.password} className="w-full rounded-xl focus:outline-none focus:border-[#307D0B]" placeholder="Password" onChange={onChange("password")} />
                </div>
                <div className="flex justify-center mb-7 mt-8 md:mt-0">
                  <Button text={status === "loading"?"Loading...":"Sign up"} handler={handleSignup} disabled={emailExists?true:emailEmpty?true:false} />
                </div>
                <p className="text-[#ACACAC] font-[700] font-lexend">You have an account? <span className="text-[#73D942] ml-1 hover:cursor-pointer" onClick={gotoSignin}>Sign in</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;