import React from 'react'
import DashboardItem from '../../components/DashboardItem';
import {BsFillPersonFill,BsFillPersonLinesFill} from "react-icons/bs"
import ATPProfile from '../../features/atp/ATPProfile';
import ATPProfileUpdate from '../../features/atp/ATPProfileUpdate';
import { NextPageWithLayout } from '../_app';
import ATPDashboardLayout from '../../components/layout/atp/ATPDashbaordLayout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setLayoutSubTitle } from '../../features/user/userSlice';
import Head from 'next/head';

const Profile: NextPageWithLayout = () => {
    const title = useAppSelector(state => state.user.layoutTitle);
    const subTitle = useAppSelector(state => state.user.subTitle);
    const dispatch = useAppDispatch();
    const handleClick = (text: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(text));
        
    }


  return (
    <div>

    <Head>
        <title>QMSAI | ATP Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

        {
           title && !subTitle && <div>
                <div className="flex md:pl-20 pl-4 pt-10 items-center hover:cursor-pointer">
                <div >
                    <DashboardItem  icon={<BsFillPersonFill  />}
                    text="View Profile"
                    handleClick={handleClick}
                    />
                </div>
                <div className="px-8">
                    <DashboardItem icon={< BsFillPersonLinesFill />}
                    text="Update Profile"
                     handleClick={handleClick}
                    />
                </div>
            </div>
                <div className="pt-10 md:pl-20 pl-6">
                <p className="text-[#828282] pb-2 font-bold">Recent Activities</p>
                <p className="border-b-[1px] border-[#CCCCCC]"></p>
                </div>
            </div>   
          }
          {
              title && subTitle === "View Profile" && <div><ATPProfile/></div>
          }
          {
             title && subTitle === "Update Profile" && <div><ATPProfileUpdate/></div>  
          }
    </div>
  )
}

Profile.getLayout = ATPDashboardLayout;
export default Profile