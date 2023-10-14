import Head from "next/head";
import { useRouter } from "next/router";
import { useAppSelector } from "../app/hooks";
import Button from "../components/Button";
import type { NextPageWithLayout } from "./_app";

const VerifySuccess: NextPageWithLayout = () => {
  const user = useAppSelector(state => state.user.data);
  const router = useRouter();
  const handleClick = () => {
    if (user.role === "atp") router.replace("atp/dashboard");
    else router.replace("dashboard");
  }

  return(
    <div>
       <Head>
        <title>QMSAI | Verify Successful</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col md:flex-row items-center justify-center bg-backgroundWhite h-[100vh] border-2">
        <div className="w-[70px] h-[100px] rounded-b-full border-x-2 border-b-2 border-green-500 self-start mb-5 ml-3 -mt-32 md:hidden">
          <p className="bg-text  w-[50px] h-[90px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[38px] md:pt-[50px]">Verify</p>
        </div>
        <div className="w-[40%]">
          <div  className="flex justify-center">
            <img src="/assets/verify-success.svg" />
          </div>
        </div>
        <div className="w-1 h-full bg-qmaiGreen hidden md:block"></div>
        <div className="w-[95%] md:w-[60%]">
          <div className="md:flex md:pl-4 md:space-x-12">
            <div className="hidden md:flex flex-col justify-between h-[100vh]">
              <div className="rounded-b-full border-x-2 border-b-2 border-green-500 hidden md:block">
                <p className="bg-text  w-[60px] h-[120px]  text-textWhite text-center mx-2 mb-2 rounded-b-full pt-[68px]">Verify</p>
              </div>
              <div className="bg-[#307D0B] w-[80px] h-[60px] rounded-t-full"></div>
            </div>
            <div className="flex flex-col justify-center items-center w-[60%]">
              <div className="mt-5 pl-3 md:pl-0">
                <h2 className="font-[400] font-lexend text-2xl text-[#4A4A4A] text-center">Verification Successful </h2>
                <div className="flex justify-center mt-20">
                  <Button text="Continue" handler={handleClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default VerifySuccess;