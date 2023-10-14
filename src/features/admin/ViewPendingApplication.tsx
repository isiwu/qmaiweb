import React, {useState, useEffect, useRef} from "react";
import { type UserDetail } from "../user/userSlice";
import { type MemberData } from "./adminSlice";
import { VscVerified } from "react-icons/vsc";
import classNames from "classnames";

interface AppProps {
  closeModal: () => void,
  approveApplication: (id: string) => Promise<boolean>,
  application: MemberData,
  user: UserDetail
}
const ViewPendingApplicationModal = ({closeModal, approveApplication, application, user}: AppProps) => {
  console.log(application);
  const [showSuccModal, setSuccModal] = useState(false);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  console.log(user)
  const onApprove = async (evt: React.MouseEvent) => {
    evt.stopPropagation()
    // const successfull = await approveApplication(user._id);

    // if (successfull) {
    //   setBackButton(true);
    //   setSuccModal(true);
    // }
    setSuccModal(true);
  };
  // const handleCloseModal = (evt: React.MouseEvent) => {
  //   if (backButton) setBackButton(false);
  //   closeModal(evt);
  // }
  useEffect(() => {
    window.onclick = function() {
      setSuccModal(false);
    }
  })

  return (
    <div className="relative">
      <div className="flex bg-[#FDFDFD] pt-5 px-8 space-x-5 rounded-lg">
        <div>
          <div className="w-32">
            <img src={user?.profileId?.avatar} alt="avatar" />
          </div>
        </div>
        <div>
          {/* <h2 className="text-[#828282] uppercase text-[15px] font-[500] text-center">Bio Data</h2>
          <hr className="text-xl" /> */}
          <div className="grid grid-cols-2">
            <div className="flex flex-col mr-auto">
              <span className="text-[#828282] text-[13px] font-[400]">Name</span>
              <span className="text-[#272727] text-[16px] font-[500]">{user?.name?.first.charAt(0).toUpperCase() + user.name.first.slice(1)} {user?.name?.last.charAt(0).toUpperCase() + user?.name?.last.slice(1)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#828282] text-[13px] font-[400]">Email</span>
              <span className="text-[#272727] text-[16px] font-[400]">{user?.email}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="flex flex-col">
              <span className="text-[#828282] text-[13px] font-[400]">Phone</span>
              <span className="text-[#272727] text-[16px] font-[400]">{user?.phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#828282] text-[13px] font-[400]">Date of Birth</span>
              <span className="text-[#272727] text-[16px] font-[400]">{new Date(user?.profileId?.dateOfBirth).getDate()} {months[new Date(user?.profileId?.dateOfBirth).getMonth()]} {new Date(user?.profileId?.dateOfBirth).getFullYear()}</span>
            </div>
          </div>
          <div className="my-8">
            {user?.profileId?.academics[0] && <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col">
                <span className="text-[#828282] text-[13px] font-[400]">Awarding Institution</span>
                <span className="text-[#272727] text-[16px] font-[500] capitalize">{user?.profileId?.academics[0].institution}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[13px] font-[400]">Title</span>
                <span className="text-[#272727] text-[16px] font-[400] capitalize">{user?.profileId?.academics[0].title}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[13px] font-[400]">Discipline</span>
                <span className="text-[#272727] text-[16px] font-[400] capitalize">{user?.profileId?.academics[0].discipline}</span>
              </div>
            </div>
            }
          </div>
          <div className="grid grid-cols-2 gap-3 my-2">
            <div className="">
              <p className="text-[#828282] text-[13px] font-[400]">Type Of Membership</p>
              <p className="text-[#272727] text-[16px] font-[400] capitalize">{application?.type}</p>
            </div>
            <div className="">
              <p className="text-[#828282] text-[13px] font-[400]">Membership Fee</p>
              <p className="text-[#272727] text-[16px] font-[400] capitalize">$ {application?.amount?application?.amount:0}</p>
            </div>
          </div>
          <div className="text-center mt-7 mb-12">
            <button className={classNames("text-white font-[700] text-[15px] bg-text2 px-6 py-2 rounded-md", {
              "hover:shadow-xl": !showSuccModal,
              "hover:cursor-not-allowed": showSuccModal,
            })} onClick={onApprove} disabled={showSuccModal}>Approve Payment</button>
          </div>
        </div> 
      </div>
      {/* SUCCESS MODAL */}
      {showSuccModal && <div className="text-[#307D0B] w-[400px] rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl text-center bg-slate-100 py-6">
          <div className="flex justify-center mb-2"><VscVerified className="text-5xl" /></div>
          <p className="">This user membership payment have been sucessuflly approved</p>
        </div>
      }
    </div>
  )
};

export default ViewPendingApplicationModal;