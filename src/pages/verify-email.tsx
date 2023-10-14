import Head from "next/head";
import Router from "next/router";
import React, {useEffect, useState} from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Button from "../components/Button";
import { setStatus, verifyEmail } from "../features/user/userSlice";
import type { NextPageWithLayout } from "./_app";
import classNames from "classnames";

const VerfiyEmail: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.user.status);
  const user = useAppSelector(state => state.user.data);
  const alert = useAppSelector(state => state.user.alert);
  const [code, setCode] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: ""
  });
  const onChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    setCode({
      ...code,
      [input]: evt.target.value
    })
  }

  const handleVerifyEmail = async () => {
    if (!code.input1 || !code.input2 || !code.input3 || !code.input4) {
      return;
    }
    const inputCode = code.input1 + code.input2 + code.input3 + code.input4;

    await dispatch(verifyEmail(inputCode)).unwrap()
    .then((data) => {
      if (data.status) Router.replace("verify-success");
    });

    dispatch(setStatus("idle"));
  }

  useEffect(() => {
    const inputEl = document.getElementsByTagName("input")
    
    if(!code.input1 && !code.input2 && !code.input3 && !code.input4) inputEl[0].focus();
    if(code.input1 && !code.input2 && !code.input3 && !code.input4) inputEl[1].focus();
    if(code.input1 && code.input2 && !code.input3 && !code.input4) inputEl[2].focus();
    if(code.input1 && code.input2 && code.input3 && !code.input4) inputEl[3].focus();
  }, [code])

  useEffect(() => {
    if(code.input1 && code.input2 && code.input3 && code.input4) {
      handleVerifyEmail()
    };
  }, [code])

  return(
    <div>
       <Head>
        <title>QMSAI | Verify Email</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        alert.show && <div className={classNames("text-center fixed left-0 right-0 py-1 text-lg",{
          "bg-green-100 text-green2 fade": (alert?.status === "completed"),
          "bg-red-100 text-red-500 fade": (alert?.status === "failed")
        })}>{alert?.message}</div>
      }
      <div className="flex flex-col md:flex-row items-center justify-center bg-backgroundWhite h-[100vh] pb-7 md:pb-0">
        <div className="w-[70px] h-[100px] rounded-b-full border-x-2 border-b-2 border-green-500 self-start mb-5 ml-3 md:hidden">
          <p className="bg-text  w-[50px] h-[90px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[38px] md:pt-[50px]">Verify</p>
        </div>
        <div className="w-[40%]">
          <div  className="flex justify-center">
            <img src="/assets/verify-email.svg" />
          </div>
        </div>
        <div className="w-1 h-full bg-[#307D0B] hidden md:block"></div>
        <div className="w-[95%] md:w-[60%] ">
          <div className="md:flex md:pl-4 md:space-x-12">
            <div className="hidden md:flex flex-col justify-between h-[100vh]">
              <div className="rounded-b-full border-x-2 border-b-2 border-green-500 hidden md:block">
                <p className="bg-text  w-[60px] h-[120px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[68px]">Verify</p>
              </div>
              <div className="bg-text  w-[80px] h-[60px] rounded-t-full"></div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="mt-5 pl-3 md:pl-0">
                <h2 className="font-[400] font-lexend text-[20px] md:text-2xl text-[#4A4A4A]">Verify Email </h2>
                <p className="text-[#676767] text-[14px] md:text-[16px] font-[400] font-lexend leadind-[17.5px] md:leading-5 mt-2">Enter the Code Sent to  your email to verify your email address</p>
                <div className="mb-24 md:my-5 flex space-x-5 md:space-x-14 justify-center">
                  <input type="text" value={code.input1} className="w-12 md:w-14 h-12 md:h-14 pl-5 rounded-xl focus:outline-none focus:border-2 focus:border-[#307D0B]" maxLength={1} onChange={onChange("input1")} />
                  <input type="text" value={code.input2} className="w-12 md:w-14 h-12 md:h-14 pl-5 rounded-xl focus:outline-none focus:border-2 focus:border-[#307D0B]" maxLength={1} onChange={onChange("input2")} />
                  <input type="text" value={code.input3} className="w-12 md:w-14 h-12 md:h-14 pl-5 rounded-xl focus:outline-none focus:border-2 focus:border-[#307D0B]" maxLength={1} onChange={onChange("input3")} />
                  <input type="text" value={code.input4} className="w-12 md:w-14 h-12 md:h-14 pl-5 rounded-xl focus:outline-none focus:border-2 focus:border-[#307D0B]" maxLength={1} onChange={onChange("input4")} />
                </div>
                <div className="flex justify-center mb-7">
                  <Button text={status === "loading"? "Verifying...":"Verify"} handler={handleVerifyEmail} />
                </div>
                <p className="text-[#ACACAC] font-[700] md:font-[400] font-lexend">You did not recieve code? <span className="text-[#73D942] ml-1 hover:cursor-pointer">Resend</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default VerfiyEmail;