import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState} from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "../components/Button";
import { setATPData } from "../features/atp/atpSlice";
import { setAlert, setAuthenticated, setStatus, signin } from "../features/user/userSlice";
import type { NextPageWithLayout } from "./_app";
import classNames from "classnames";


const SignIn:NextPageWithLayout = () => {
  const router = useRouter()
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.user.status);
  const alert = useAppSelector(state => state.user.alert);
  //const user = useAppSelector(state => state.user.data);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })
  const onChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [input]: evt.target.value,
    })
  }
  const handlerSignin = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    
    // clear up redux alert data before dispatching action
    dispatch(setAlert({show: false, status: "completed", message: ""}))

    setLoading(true);
    const data = await dispatch(signin(loginForm)).unwrap();
    setLoading(false);
    if (data?.status) {
      dispatch(setAuthenticated(true));
      if (data.data.role === "admin") return router.replace("admin/");
      else if (data.data.role === "atp") {
        dispatch(setATPData(data.data));
        return router.replace("atp/dashboard"); 
      }
      else router.replace("dashboard");
    } else {
      dispatch(setAlert({show: true, status: "failed", message: "Username or Password Incorrrect!"}));

      // const alertTime = setTimeout(() => {
      //   dispatch(setAlert({show: false, status: "completed", message: ""}))

      //   clearTimeout(alertTime);
      // }, 1000)
    }

    //dispatch(setStatus("idle"));
  }

  const gotoSignup = (evt: React.MouseEvent) => {
    evt.preventDefault();
    
    if (status === "loading") return;
    router.push("signup");
  }
  useEffect(() => {
    dispatch(setAlert({show: false, status: "completed", message: ""}))
  }, [])

  return (
    <div>
       <Head>
        <title>QMSAI | Sign In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        alert.show && <div className={classNames("text-center fixed left-0 right-0 py-1 text-lg",{
          "bg-green-100 text-green2 fade": (alert?.status === "completed"),
          "bg-red-100 text-red-500 fade": (alert?.status === "failed")
        })}>{alert?.message}</div>
      }
    <div className="flex flex-col lg:flex-row bg-backgroundWhite w-full h-auto md:h-[100vh] ">
       <div className="w-[70px] h-[100px] rounded-b-full border-x-2 border-b-2 border-green4 self-start mb-5 ml-3 lg:hidden">
          <p className="bg-text  w-[50px] h-[90px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[50px]">Sign in</p>
        </div>
        <div className="lg:flex w-[100%] lg:w-[40%]">
          <div className="flex justify-center items-center w-[80%]">
            <img src="/assets/signup.svg" alt="" className="text-center"/>
           </div>
          <div className="border-r-4 border-[#307D0B] h-[100vh] pl-6 hidden lg:block w-[20%]" ></div>
        </div>
        <div className="flex">
          <div className="flex flex-col justify-between md:pl-4">
            <div className="rounded-b-full border-x-2 border-b-2 border-green4 hidden lg:block">
              <p className="bg-text  w-[60px] h-[120px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[80px]">Sign in</p>
            </div>
            <div className="bg-text w-[80px] h-[60px] rounded-t-full hidden lg:block"></div>
          </div>
          
          <div className="flex flex-col  items-center pl-0 lg:pl-[2rem] lg:pt-20 pt-4 w-full" >
            <div className=" hidden lg:block" >
              <img src="/assets/siginLogo.svg" alt="" className="text-center" />
            </div>
            <form className="flex flex-col mt-8 w-[70%] md:w-[400px]  " >
              <label className="py-4">
                <input type="email" value={loginForm.email} className="py-2 px-8 rounded-2xl w-[100%] outline-0 focus:border-[#307D0B] border-2" placeholder="Email" onChange={onChange("email")}/>
              </label>
              
              <input type="password" value={loginForm.password} className="border-2 py-2 px-8 rounded-2xl w-[100%] outline-0 focus:border-[#307D0B] " placeholder="password" onChange={onChange("password")} />
              <div className="flex py-2  rounded-2xl items-center">
                <input type="checkbox" className=" border-[#307D0B] " />
                <label className="pl-2" >Remember me </label>
              </div>
              <div className="flex justify-center my-4">
                <Button text={loading?"Loading...":"Sign in"} handler={handlerSignin} />
              </div>
              {/* <button className="border text-textWhite bg-text py-2 px-8 rounded-2xl w-[312px] md:w-[400px] hover:shadow-lg lg:block hidden">Sign in</button> */}
              <p className="text-[#ACACAC] py-4 mb-2">Dont have an account? <a className="text-[#73D942] font-bold hover:cursor-pointer" onClick={gotoSignup}>Sign up</a></p>
              
            </form>
          </div>
        </div>
         
       
      </div>
     
    </div>
  )
}

export default SignIn;