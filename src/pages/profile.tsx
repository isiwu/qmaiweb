import React from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProfileView from "../components/ProfileView";
import ProfileUpdate from "../components/ProfileUpdate";
import type { NextPageWithLayout } from "./_app";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLayoutSubTitle } from "../features/user/userSlice";
import DashboardItem from "../components/DashboardItem";
import { FaUserEdit, FaUserAlt } from "react-icons/fa";
import Head from "next/head";

const Profile: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(state => state.user.layoutTitle);
  const subTitle = useAppSelector(state => state.user.subTitle);
  
  const handleUpdate = (input: string) => () => {
    dispatch(setLayoutSubTitle(input))
  }
  
  return (
    <>
     <Head>
        <title>QMSAI | Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="font-lexend" >
      {title && !subTitle && <div className="flex flex-col justify-center md:justify-start items-center md:items-start md:flex-row space-y-16 md:space-y-0 md:space-x-16 md:ml-16 mt-12">
        <div>
          <DashboardItem text="View Profile" icon={<FaUserAlt />} handleClick={handleUpdate} />
        </div>
        <div>
          <DashboardItem text="Update Profile" icon={<FaUserEdit />} handleClick={handleUpdate} />
        </div>
      </div>}
      { title && (subTitle === "View Profile" ) && <ProfileView />}
      { title && (subTitle === "Update Profile") && <ProfileUpdate /> }
       {/* <ProfileUpdate /> */}
    </div>
    </>
    
  )
};

Profile.getLayout = DashboardLayout;
export default Profile;