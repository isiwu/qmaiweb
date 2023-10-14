//import {useState } from "react";
import DashboardItem from "../components/DashboardItem";
import DashboardLayout from "../components/layout/DashboardLayout";
import type { NextPageWithLayout } from "./_app";
import { FaUser } from "react-icons/fa";
import { VscSymbolEnumMember } from 'react-icons/vsc';
import { TbCertificate } from "react-icons/tb";
import { SiAdobeaudition } from "react-icons/si";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLayoutTitle } from "../features/user/userSlice";
import Head from "next/head";

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const handleClick = (path: string) => async (evt: React.MouseEvent) => {
    await router.push(path.toLowerCase());
    dispatch(setLayoutTitle(path));
  }
  return (
    <>
      <Head>
        <title>QMSAI | Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className=" pl-4 grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 md  place-content-center place-items-center pt-5 md:w-[80%] w-[90%] gap-6">

        <div className="">
          <DashboardItem
            icon={<FaUser />}
            handleClick={handleClick}
            text="Profile"
          />
        </div>

        <div>
          <DashboardItem
            icon={<VscSymbolEnumMember />}
            handleClick={handleClick}
            text="Membership"
            disabled={!user?.profileId?.profileCompleted ? true : false}
          />
        </div>

        <div>
          <DashboardItem
            icon={<TbCertificate />}
            handleClick={handleClick}
            text="Certificate"
            disabled={!user?.profileId?.profileCompleted ? true : false}
          />
        </div>
        <div>
          <DashboardItem icon={<SiAdobeaudition />}
            handleClick={handleClick}
            text="Auditing"
            disabled={!user?.profileId?.profileCompleted ? true : false}
          />
        </div>
      </div>

      <div className="pt-10 pl-6 w-full">
        <p className="text-[#828282] pb-2 font-bold">Recent Activities</p>
        <p className="border-b-[1px] border-[#CCCCCC]"></p>
      </div>

    </>



  )
};

Dashboard.getLayout = DashboardLayout;

export default Dashboard;