import { useState } from "react";
import DashboardItem from "../../components/DashboardItem";
import AdminDashboardLayout from "../../components/layout/admin/AdminDashboardLayout";
import { NextPageWithLayout } from "../_app";
import {BsFillPersonFill,BsFillPersonLinesFill} from "react-icons/bs"
import AminViewProfile from "../../features/admin/Profile/AminViewProfile";
import AdminUpdateProfile from "../../features/admin/Profile/AdminUpdateProfile";
import Head from "next/head";

const Profile:NextPageWithLayout = () => {
  const [currentView, setCurrentView] = useState("");
    const handleClick = (text: string) => (evt: React.MouseEvent) => {
        setCurrentView(text);
    }
  return (
    <div>
       <Head>
        <title>QMSAI |Admin Profile</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        {
           currentView === "" && <div>
                <div className="flex lg:pl-20 pl-8 lg:mr-0 mr-4 pt-10 items-center hover:cursor-pointer lg:space-x-14 space-x-4">
                <div >
                    <DashboardItem  icon={<BsFillPersonFill  />}
                    text="View Profile"
                    handleClick={handleClick}
                    />
                      </div>
                      
                <div>
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
              currentView === "View Profile" && <div><AminViewProfile/></div>
          }
          {
             currentView === "Update Profile" && <div><AdminUpdateProfile/></div>  
          }
    </div>
  )
}

Profile.getLayout =AdminDashboardLayout;
export default Profile