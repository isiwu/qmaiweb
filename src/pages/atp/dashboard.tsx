import React,{useState} from 'react';
import { BsFillPersonFill } from "react-icons/bs";
import { FaHospitalUser,FaGraduationCap } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import {HiAcademicCap} from "react-icons/hi"
import DashboardItem from '../../components/DashboardItem';
import { NextPageWithLayout } from '../_app';
import ATPDashboardLayout from '../../components/layout/atp/ATPDashbaordLayout';
import { useAppDispatch } from '../../app/hooks';
import { useRouter } from 'next/router';
import { setLayoutTitle } from '../../features/user/userSlice';
import Head from 'next/head';

const Dashboard: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const dashboardItems = [
    {
      text: "Profile",
      icon: <BsFillPersonFill />,
      handleClick: (input: string) => async (evet: React.MouseEvent) => {
        await router.push(input.toLowerCase());
        dispatch(setLayoutTitle(input));
      }
    },
    {
      text: "Trainee",
      icon: <BsFillPersonFill />,
      handleClick: (input: string) => async (evet: React.MouseEvent) => {
       await router.push(input.toLowerCase());
        dispatch(setLayoutTitle(input));
      }
    },
    {
      text: "Certificate",
      icon: < TbCertificate />,
      handleClick: (input: string) =>async (evet: React.MouseEvent) => {
        await router.push(input.toLowerCase());
        dispatch(setLayoutTitle(input));
      }
    },
    {
      text:"Courses",
      icon:< FaHospitalUser />,
      handleClick: (input: string) => async (evet: React.MouseEvent) => {
       await  router.push(input.toLowerCase());
        dispatch(setLayoutTitle(input));
      }
    },
  ]
  
  return (
    <div>
        <Head>
        <title>QMSAI | ATP Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div>
          <div className=" md:pl-20 pl-4 pt-10 grid md:grid-cols-4 grid-cols-2 gap-y-8  hover:cursor-pointer xl:w-[80%]">
            {
              dashboardItems.map((item, index) => <DashboardItem  icon={item.icon}
              text={item.text}
                handleClick={item.handleClick}
                key={index}
            />)
            }
          
        </div>
        <div className="pt-10 md:pl-20 pl-6">
          <p className="text-[#828282] pb-2 font-bold">Recent Activities</p>
          <p className="border-b-[1px] border-[#CCCCCC]"></p>
        </div>
      </div>


      
    </div>
  )
}

Dashboard.getLayout = ATPDashboardLayout;
export default Dashboard