import DashboardItem from "../../components/DashboardItem";
import AdminDashboardLayout from "../../components/layout/admin/AdminDashboardLayout";
import { NextPageWithLayout } from "../_app";
import { FaUser, FaGraduationCap } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { MdCardMembership } from "react-icons/md";
import AdminDashboardItem from "../../components/layout/admin/AdminDashboardItem";
import { setLayoutTitle } from "../../features/user/userSlice";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const Index: NextPageWithLayout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const user = useAppSelector(state =>state.admin.status)
  const handleClick =(path :string) => async(evt:React.MouseEvent)=>{
    await router.push(`/admin/${path.toLowerCase()}`)
    dispatch(setLayoutTitle(path))
  }
  return (
    <div>
      <div className="mt-2 lg:ml-28 ml-4 xl:mr-0 mr-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 lg:gap-12 md:gap-4 gap-y-8 gap-4  place-content-center font-[400] text-[22px] xl:w-[80%]">
          <div className="rounded-lg border-2 px-1 py-1 text-[#0D5BCF]">
            <p className="text-center">400</p>
            <p className="text-center">Members</p>
          </div>
          <div className="rounded-lg border-2 px-1 py-1 text-[#C91B1B]">
            <p className="text-center">400</p>
            <p className="text-center">ATPs</p>
          </div>
          <div className="rounded-lg border-2 px-1 py-1 text-[#059B92]">
            <p className="text-center">400</p>
            <p className="text-center">Trainees</p>
          </div>
          <div className="rounded-lg border-2 px-1 py-1 text-green2">
            <p className="text-center">400</p>
            <p className="text-center">Courses</p>
          </div>
          <div>
            <AdminDashboardItem text="Profile" icon={<FaUser />} className="py-7"  handleClick={handleClick}/>
          </div>
          <div>
            <AdminDashboardItem text="Memberships" icon={<MdCardMembership />} className="py-7"  handleClick={handleClick} />
          </div>
          <div>
            <AdminDashboardItem text="Certificates" icon={<TbCertificate />} className="py-7"  handleClick={handleClick} />
          </div>
          <div>
            <AdminDashboardItem text="Courses" icon={<FaGraduationCap />} className="py-7"  handleClick={handleClick} />
          </div>
          <div>
            <AdminDashboardItem text="Transactions" icon={<FaUser />} className="py-7"  handleClick={handleClick} />
          </div>
          <div>
            <AdminDashboardItem text="ATPs" icon={<FaUser />} className="py-7"  handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  )
};

Index.getLayout = AdminDashboardLayout;
export default Index;