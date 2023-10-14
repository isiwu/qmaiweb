import React, {useState, useEffect, useRef} from "react";
import { type UserDetail } from "../user/userSlice";
import { type MemberData } from "./adminSlice";
import { VscVerified } from "react-icons/vsc";
import { useAppSelector } from "../../app/hooks";

interface AppProps {
  closeModal: (evt: React.MouseEvent) => void,
  approveApplication: (id: string) => Promise<boolean>,
  application: MemberData,
  user: UserDetail
}
const ViewApplicationModal = ({closeModal, approveApplication, application, user}: AppProps) => {
  const [showSuccModal, setSuccModal] = useState(false);
  const [backButton, setBackButton] = useState(false);
  const status = useAppSelector(state => state.admin.status);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const onApprove = async (evt: React.MouseEvent) => {
    evt.stopPropagation()
    const successfull = await approveApplication(user._id);

    if (successfull) {
      setBackButton(true);
      setSuccModal(true);
    }
  };
  const handleCloseModal = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    if (backButton) setBackButton(false);
    closeModal(evt);
  }
  const closeSuccess = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setSuccModal(false)
    handleCloseModal(evt);
  }
  console.log(user)

  return (
    <div className="relative">
      <div className="flex bg-[#FDFDFD] pt-5 px-8 space-x-5">
        <div>
          <div className="w-32">
            <img src={user?.profileId?.avatar} alt="avatar" />
          </div>
        </div>
        <div>
          <h2 className="text-[#828282] uppercase text-[15px] font-[500]">Bio Data</h2>
          <hr className="text-xl" />
          <div className="grid grid-cols-2 mt-2">
            <div className="flex flex-col mr-auto">
              <span className="text-[#828282] text-[20px] font-[400]">Name</span>
              <span className="text-[#272727] text-[16px] font-[600]">{user.name.first.charAt(0).toUpperCase() + user.name.first.slice(1)} {user.name.last.charAt(0).toUpperCase() + user.name.last.slice(1)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#828282] text-[20px] font-[400]">Email</span>
              <span className="text-[#272727] text-[16px] font-[600]">{user.email}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            <div className="flex flex-col">
              <span className="text-[#828282] text-[20px] font-[400]">Phone</span>
              <span className="text-[#272727] text-[16px] font-[600]">{user.phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#828282] text-[20px] font-[400]">Date of Birth</span>
              <span className="text-[#272727] text-[16px] font-[600]">{new Date(user?.profileId?.dateOfBirth).getDate()} {months[new Date(user?.profileId?.dateOfBirth).getMonth()]} {new Date(user?.profileId?.dateOfBirth).getFullYear()}</span>
            </div>
          </div>
          <div className="my-8">
            <h2 className="text-[#828282] uppercase text-[15px] font-[500]">Work Experience</h2>
            <hr />
            {user?.profileId?.workExps[0] && <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Company Name</span>
                <span className="text-[#272727] text-[16px] font-[600]">{user.profileId.workExps[0].workPlace}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Job Role/Title</span>
                <span className="text-[#272727] text-[16px] font-[600]">{user.profileId.workExps[0].title}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Start Date</span>
                <span className="text-[#272727] text-[16px] font-[600]">{new Date(user?.profileId?.workExps[0].startDate).getFullYear()}-{new Date(user?.profileId?.workExps[0].startDate).getMonth()}-{new Date(user?.profileId?.workExps[0].startDate).getDate()}</span>
              </div>
            </div>
            }
            {user?.profileId?.workExps[1] && <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Company Name</span>
                <span className="text-[#272727] text-[16px] font-[600] capitalize">{user.profileId.workExps[1].workPlace}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Job Role/Title</span>
                <span className="text-[#272727] text-[16px] font-[600] capitalize">{user.profileId.workExps[1].title}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Start Date</span>
                <span className="text-[#272727] text-[16px] font-[600]">{new Date(user?.profileId?.workExps[0].startDate).getFullYear()}-{new Date(user?.profileId?.workExps[1].startDate).getMonth()}-{new Date(user?.profileId?.workExps[1].startDate).getDate()}</span>
              </div>
            </div>
            }
          </div>
          <div className="my-8">
            <h2 className="text-[#828282] uppercase text-[15px] font-[500]">Education Experience</h2>
            <hr />
            {user?.profileId?.academics[0] && <div className="grid grid-cols-3 gap-3 mt-2">
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Awarding Institution</span>
                <span className="text-[#272727] text-[16px] font-[600] capitalize">{user.profileId.academics[0].institution}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Title</span>
                <span className="text-[#272727] text-[16px] font-[600] capitalize">{user.profileId.academics[0].title}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#828282] text-[20px] font-[400]">Discipline</span>
                <span className="text-[#272727] text-[16px] font-[600] capitalize">{user?.profileId?.academics[0].discipline}</span>
              </div>
            </div>
            }
          </div> 
          <div className="mt-8">
            <h2 className="text-[#828282] uppercase text-[15px] font-[500]">Documents</h2>
            <hr />
            <div className="flex space-x-3 my-3">
              <div className="flex flex-col self-center">
                <span className="text-[#828282] text-[20px] font-[400]">Document Name</span>
                <span className="text-[#272727] text-[16px] font-[600] capitalize">Curriculum Vatie</span>
              </div>
              <div className="flex flex-col">
                <img src={application.cv} alt="cv" className="w-96 h-60" />
              </div>
            </div>
            <div className="flex space-x-3">
              <div className="flex flex-col self-center">
                <span className="text-[#828282] text-[20px] font-[400]">Other Document Name</span>
                <span className="text-[#272727] text-[16px] font-[600] capitalize">{application.otherRelevantDocument.name}</span>
              </div>
              <div className="">
                {application.otherRelevantDocument.url && <img src={application.otherRelevantDocument.url} alt="other relevant document" className="text-lg w-96 h-60" />}
              </div>
            </div>
          </div>
          {
            backButton && <div className="text-center mt-12 mb-16 ">
              <button className="font-[700] text-[15px] bg-green1 text-white rounded-md py-2 w-[30%] hover:shadow-xl" onClick={handleCloseModal} disabled={showSuccModal}>back</button>
            </div>
          }
          {!backButton && <div className="flex space-x-5 mt-7 mb-12">
              <button className="text-white font-[700] text-[15px] bg-text2 px-3 py-2 rounded-md hover:shadow-xl disabled:opacity-60 disabled:hover:shadow-none disabled:hover:cursor-not-allowed" onClick={onApprove} disabled={status==="loading"?true:false}>Approve Membership Application</button>
              <button className="text-green3 font-[700] text-[15px] border border-green2 rounded-md py-2 px-2 hover:shadow-xl disabled:opacity-60 disabled:hover:shadow-none disabled:hover:cursor-not-allowed" onClick={handleCloseModal} disabled={status==="loading"?true:false}>Decline Membership Application</button>
            </div>
          }
        </div> 
      </div>
      {/* SUCCESS MODAL */}
      { showSuccModal &&<div className="w-[400px] rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl bg-slate-100">
          <div className="flex justify-end">
            <div className="flex items-center justify-center"><span className="text-3xl pt-1 pr-3 hover:cursor-pointer" onClick={closeSuccess}>&times;</span></div>
          </div>
          <div className="text-center pb-8 text-[#307D0B]">
            <div className="flex justify-center mb-2"><VscVerified className="text-5xl" /></div>
            <p className="">This user membership application have been sucessuflly approved</p>
          </div>
        </div>
      }
    </div>
  )
};

export default ViewApplicationModal;