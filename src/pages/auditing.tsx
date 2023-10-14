import DashboardItem from "../components/DashboardItem";
import DashboardLayout from "../components/layout/DashboardLayout";
import { SiAdobeaudition } from "react-icons/si";
import { AiOutlineAudit } from "react-icons/ai";
import { NextPageWithLayout } from "./_app";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLayoutSubTitle } from "../features/user/userSlice";
import AuditRecord from "../features/memberships/AuditRecord";
import AddAudit from "../features/memberships/AddAudit";
import Head from "next/head";


const Auditing: NextPageWithLayout = () => {
  const layoutTitle = useAppSelector(state => state.user.layoutTitle);
  const subTitle = useAppSelector(state => state.user.subTitle);
  const dispatch = useAppDispatch();
  const handleClick = (text: string) => (evt: React.MouseEvent) => {
    dispatch(setLayoutSubTitle(text));
  }
  return (
    <div>
      <Head>
        <title>QMSAI | Membership Audit</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      {
        layoutTitle && subTitle === "" && <div className="flex space-x-12 mt-10 ml-10">
          <DashboardItem icon={<AiOutlineAudit />} text="Audit Record" handleClick={handleClick} />
          <DashboardItem icon={<SiAdobeaudition />} text="Add Audit" handleClick={handleClick} />
        </div>
      }
      {
        layoutTitle && subTitle === "Audit Record" && <div className="mx-8">
          <AuditRecord />
        </div>
      }
      {
        layoutTitle && subTitle === "Add Audit" && <div>
          <AddAudit />
        </div>
      }
    </div>
  )
}

Auditing.getLayout = DashboardLayout;
export default Auditing;