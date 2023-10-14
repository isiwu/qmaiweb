import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AdminDashboardLayout from "../../components/layout/admin/AdminDashboardLayout";
import { setLayoutSubTitle } from "../../features/user/userSlice";
import { type NextPageWithLayout } from "../_app";
import { TbCertificate } from "react-icons/tb";
import { MdDomainVerification, MdOutlinePreview } from "react-icons/md";
import AdminDashboardItem from "../../components/layout/admin/AdminDashboardItem";
import AddNewCertificate from "../../features/admin/cert/AddNewCertificate";
import EditCertificate from "../../features/admin/cert/EditCertificate";
import ViewCertificate from "../../features/admin/cert/ViewCertificate";
import VerifyCertificate from "../../features/admin/cert/VerifyCertificate";
import Head from "next/head";

const Certificates: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();
  const title = useAppSelector(state => state.user.layoutTitle);
  const subTitle = useAppSelector(state => state.user.subTitle);
  
  const items = [
    {
      icon: <TbCertificate />,
      text: "Add New Certificate",
      handleClick: (input: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(input));
      }
    },
    // {
    //   icon: <TbCertificate />,
    //   text: "Edit Certificate",
    //   handleClick: (input: string) => (evt: React.MouseEvent) => {
    //     dispatch(setLayoutSubTitle(input));
    //   }
    // },
    {
      icon: <MdOutlinePreview />,
      text: "View Certificate",
      handleClick: (input: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(input));
      }
    },
    {
      icon: <MdDomainVerification />,
      text: "Verify Certificate",
      handleClick: (input: string) => (evt: React.MouseEvent) => {
        dispatch(setLayoutSubTitle(input));
      }
    }
  ];

  return (
    <> 
     <Head>
        <title>QMSAI |Admin Certificate</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className="mt-8">
      { title && !subTitle && <div className="grid grid-cols-1 md:grid-cols-4 gap-1 gap-y-4 place-items-center md:place-items-start md:ml-16 md:pr-14">
          {
            items.map((item, index) => (<AdminDashboardItem text={item.text} icon={item.icon} handleClick={item.handleClick} className="px-3 py-6 w-[70%]" key={++index} />))
          }
        </div>
      }
      { title && (subTitle === "Add New Certificate") && <div className="lg:ml-24 ml-12">
          <AddNewCertificate />
        </div>
      }
      {/* { title && (subTitle === "Edit Certificate") && <div className="lg:ml-24 ml-12">
          <EditCertificate />
        </div>
      } */}
      { title && (subTitle === "View Certificate") && <div className="ml-24">
          <ViewCertificate />
        </div>
      }
      { title && (subTitle === "Verify Certificate") && <div className="lg:ml-24 ml-12">
          <VerifyCertificate />
        </div>
      }
    </div>
    </>
  )
};

Certificates.getLayout = AdminDashboardLayout;
export default Certificates;