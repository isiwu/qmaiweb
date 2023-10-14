import { useState, useEffect } from "react";
import DashboardItem from "../components/DashboardItem";
import DashboardLayout from "../components/layout/DashboardLayout";
import type { NextPageWithLayout } from "./_app";
import { EmailShareButton, FacebookShareButton, TwitterShareButton } from "react-share";
import { HiDownload } from "react-icons/hi";
import { BsShareFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAlert } from "../features/user/userSlice";
import { useRouter } from "next/router";
import Head from "next/head";
import { FaFacebook } from "react-icons/fa";
import { SiTwitter } from "react-icons/si";
import { TiTimes } from "react-icons/ti"
import image from "../../public/gmail.png"

const Certificate: NextPageWithLayout = () => {
  const [showModal, setShowModal] = useState(false)
  const user = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [viewCert, setCert] = useState("");
  const handleViewCert = (input: string) => (evt: React.MouseEvent) => {
    setCert(input);
  };
  const handleBack = () => {
    setCert("");
  };

  useEffect(() => {
    (async () => {
      if (!user?.profileId?.profileCompleted) {
        await router.replace("profile");
        dispatch(setAlert({ show: true, status: "failed", message: "please complete your profile to continue." }))
      }
      //if (completeApplication) dispatch(setLayoutSubTitle("Apply for Membership"));
    })()

    return () => {
      setTimeout(() => {
        dispatch(setAlert({ show: false, status: "completed", message: "" }))
      }, 5000)
    }
  }, [])
  const handleModal = () => {
    setShowModal(true)
  }

  return (
    <div>
      <Head>
        <title>QMSAI | Certificate</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="og:title" content="This is my Qmsai certificate" />
        <meta name="og:description" content="This is my Qmsai certificate" />
      </Head>

      <div className="md:pl-28 pl-8 md:w-[80%] w-[90%]">
        {/* {!viewCert && <div className="grid md:grid-cols-3 grid-cols-2 mt-8">
            <DashboardItem icon={<TbCertificate />} text="View Certificate" handleClick={handleViewCert} disabled={!user.profileId.isCertified} />
            <DashboardItem icon={<HiDownload />} text="Download Certificate" disabled={!user.profileId.isCertified} />
            <DashboardItem icon={<BsShareFill />} text="Share Certificate" disabled={!user.profileId.isCertified} />
          </div>
        } */}
        {!viewCert && <div className="mt-6">
          {/* <div className='text-3xl mt-2 w-10 hover:text-[#32ba32] hover:-translate-x-3 duration-1000 hover:cursor-pointer mb-4' onClick={handleBack}><IoIosArrowRoundBack /></div> */}
          <div className="rounded-lg border-2 py-6 px-16 w-[70%]">
            <img src="/assets/cert.svg" alt="certificate image" className="w-full" />
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mt-3 w-[90%]">
            <a href="/assets/cert.svg" className="flex items-center space-x-3 justify-center border-2 border-green4 px-3 py-2 rounded-lg text-green2 hover:cursor-pointer hover:shadow-2xl w-52 transition-all duration-500" download>
              <HiDownload />
              <span>Download  Certificate</span>
            </a>
            <div className="relative">
              <p className="flex items-center space-x-3 justify-center border-2 px-3 py-2 rounded-lg hover:cursor-pointer w-52 text-green2 hover:shadow-2xl transition-all duration-500" onClick={handleModal}>
                <p> <BsShareFill /></p>
                <p>  Certificate</p>
              </p>
              {showModal &&

                <div className="absolute -top-2 bg-slate-100 px-9 rounded-md" >
                  <div className="flex items-center justify-center space-x-4 text-3xl mt-3 ml-2 ">
                    <FacebookShareButton url={"https://qmai-inmotionhub.vercel.app/certificate"}>
                      <div className="text-blue-400">
                        <FaFacebook />
                      </div>
                    </FacebookShareButton>

                    <EmailShareButton url={"https://qmai-inmotionhub.vercel.app/certificate"}>
                      <div className="text-green2">
                        <img src="/gmail.png" alt="" className="w-full h-10" />
                      </div>
                    </EmailShareButton>

                    <TwitterShareButton url={"https://qmai-inmotionhub.vercel.app/certificate"}>
                      <div className="text-blue-400">
                        <SiTwitter />
                      </div>
                    </TwitterShareButton>

                  </div>

                  <div className="relative -top-12 right-[-8.5rem] px-4 cursor-pointer text-blue-400" onClick={() => setShowModal(!showModal)}>
                    <TiTimes />
                  </div>

                </div>
              }

            </div>

          </div>

        </div>

        }
      </div>
    </div>
  )
};

Certificate.getLayout = DashboardLayout;
export default Certificate;