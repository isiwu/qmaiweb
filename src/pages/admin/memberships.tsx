import AdminDashboardLayout from "../../components/layout/admin/AdminDashboardLayout"
import { NextPageWithLayout } from "../_app"
//import { ImAddressBook } from "react-icons/im";
import { FaUserEdit, FaUserMinus, FaUserClock, FaUserCheck } from "react-icons/fa";
import AdminDashboardItem from "../../components/layout/admin/AdminDashboardItem";
import { setLayoutSubTitle } from "../../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import NewMembers from "../../features/admin/NewMembers";
import PendingMembers from "../../features/admin/PendingMembers";
import ActiveMembers from "../../features/admin/ActiveMembers";
import InActiveMembers from "../../features/admin/InActiveMember";
import Head from "next/head";


const Memberships:NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(state => state.user.layoutTitle);
  const subTitle = useAppSelector(state => state.user.subTitle);
  const subSubTitle = useAppSelector(state => state.user.subSubTitle);
  const items = [
    {
      icon: <FaUserEdit />,
      text: "New Members",
      handleClick: (input: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(input));
      }
    },
    {
      icon: <FaUserClock />,
      text: "Pending Members",
      handleClick: (input: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(input));
      }
    },
    {
      icon: <FaUserCheck />,
      text: "Active Members",
      handleClick: (input: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(input));
      }
    },
    {
      icon: <FaUserMinus />,
      text: "Inactive Members",
      handleClick: (input: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(input));
      }
    }
  ];

  return (
    <> 
     <Head>
        <title>QMSAI | Admin Membership</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="mt-8 lg:mx-12 mx-4">
      { title && !subTitle && <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-y-4 place-items-center md:ml-12 ml-0">
          {
            items.map((item, index) => (<AdminDashboardItem text={item.text} icon={item.icon} handleClick={item.handleClick} className="px-3 py-6 lg:w-[170px] w-[150px]" key={++index} />))
          }
        </div>
      }

      { title && (subTitle === "New Members") && <div className="">
          <NewMembers />
        </div>
      }
      { title && (subTitle === "Pending Members") && <div className="">
          <PendingMembers />
        </div>
      }
      { title && (subTitle === "Active Members") && <div className="">
          <ActiveMembers />
        </div>
      }
      { title && (subTitle === "Inactive Members") && <div className="">
          <InActiveMembers />
        </div>
      }
    </div>
    </>
  )
}

Memberships.getLayout = AdminDashboardLayout;
export default Memberships;