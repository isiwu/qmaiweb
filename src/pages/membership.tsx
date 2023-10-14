import React, { useEffect } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardItem from "../components/DashboardItem";
import { FaUserEdit, FaHospitalUser, FaUserCheck } from 'react-icons/fa';

import type { NextPageWithLayout } from "./_app";
//import MembershipProgressStatus from "../components/MembershipApplication/MembershipProgressStatus";
import MembershipApplication from "../components/MembershipApplication/MembershipApplication";
import MembershipStatus from "../components/MembershipApplication/MembershipStatus";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setAlert, setLayoutSubTitle } from "../features/user/userSlice";
import { useRouter } from "next/router";
import Head from "next/head";
import classNames from "classnames";
//import { type GetServerSideProps } from "next";

// export const getServerSideProps: GetServerSideProps = async ({params}) => {
//   console.log(params.id)
//   return {
//     props: {completeApplication: true}
//   }
// }

const Membership: NextPageWithLayout = ({completeApplication}: {completeApplication?: boolean}) => {
  const layoutSubTitle = useAppSelector(state => state.user.subTitle);
  const user = useAppSelector(state => state.user.data);
  const alert = useAppSelector(state => state.user.alert);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (text: string) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(setLayoutSubTitle(text));
  };

  useEffect(() => {
    (async () => {
      if (!user?.profileId?.profileCompleted) {
        await router.replace("profile");
        dispatch(setAlert({show: true, status: "failed", message: "please complete your profile to continue."}))
      }
      if (completeApplication) dispatch(setLayoutSubTitle("Apply for Membership"));
    })()

    return () => {
      setTimeout(() => {
        dispatch(setAlert({show: false, status: "completed", message: ""}))
      }, 5000)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>QMSAI | Membership</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        alert.show && <div className={classNames("text-center fixed top-0 left-0 right-0 py-1 text-lg",{
          "bg-green-100 text-green2 fade": (alert?.status === "completed"),
          "bg-red-100 text-red-500 fade": (alert?.status === "failed")
        })}>{alert?.message}</div>
      }
      {layoutSubTitle === "" && <div>
        <div className="flex flex-col md:flex-row space-y-9 md:space-y-0 md:space-x-9 md:pl-20 pt-10 items-center hover:cursor-pointer">
          <div >
          {
              !user?.profileId?.isCertified && (user?.profileId?.membershipStatus === "Inactive") &&  <DashboardItem  icon={<FaUserEdit  />}
              handleClick={handleClick}
              text={"Apply for Membership"}
              disabled={user?.profileId?.isCertified && (user?.profileId?.membershipStatus === "Inactive")?true:false}
            />
            }
            {/* <DashboardItem  icon={<FaUserEdit  />}
              handleClick={handleClick}
              text={!user?.profileId?.isCertified && (user?.profileId?.membershipStatus === "Inactive")?"Apply for Membership":"Renew Membership"}
              disabled={user?.profileId?.isCertified && (user?.profileId?.membershipStatus === "Inactive")?true:false}
            /> */}
          </div>

          {user?.profileId?.isCertified && <div>
            <DashboardItem icon={< FaUserCheck />}
              handleClick={handleClick}
              text="Membership Status"
            />
          </div>}
        </div>
        <div className="pt-10 pl-10 md:pl-20 hidden md:block">
          <p className="text-[#828282] pb-2 font-bold">Recent Activities</p>
          <p className="border-b-[1px] border-[#CCCCCC]"></p>
        </div>
      </div>}

      {layoutSubTitle === "Apply for Membership" && <div className="pt-6"><MembershipApplication /></div>}
      {layoutSubTitle === "Renew Membership" && <div className="pt-6"><MembershipApplication /></div>}
      {layoutSubTitle === "Membership Status" && <div><MembershipStatus handleBack={handleClick} /></div>}
    </div>
  )
};

Membership.getLayout = DashboardLayout;
export default Membership;