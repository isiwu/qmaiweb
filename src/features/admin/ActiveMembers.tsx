import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { approveApplication, getActiveMembers, viewMember } from "./adminSlice";
//import { IoCheckmarkCircle } from "react-icons/io5";
import { ImUserCheck, ImUserMinus } from "react-icons/im";
import { BsEye } from "react-icons/bs";
import ViewApplicationModal from "./ViewApplicationModal";
//import { setLayoutSubSubTitle } from "../user/userSlice";
import Loader from "../../components/Loader";
import ViewActiveMember from "./ViewActiveMember";
import PageLoader from "../../components/PageLoader";

const ActiveMembers = () => {
  const activeMembers = useAppSelector(state => state.admin.members);
  const activeMember = useAppSelector(state => state.admin.member);
  const requestError = useAppSelector(state => state.admin.error);
  const status = useAppSelector(state => state.admin.status);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    phone: "",
    role: "user",
    verified: false,
    _id: "",
    membershipType: "",
    profileId:{
      _id: "",
    dateOfBirth: "",
    avatar: "",
    profileCompleted: false,
    hasApplied: false,
    applicationReviewed: false,
    applicationApproved: false,
    certificateMembershipPayment: false,
    formMembershipPayment: false,
    isCertified: false,
    memberPayment: 0,
    membershipStatus: "inactive",
    academics: [
      {
        title: "",
        discipline: "",
        institution: "",
      }
    ],
    workExps: [
      {
        workPlace: "",
        title: "",
        startDate: "",
        endDate: "",
      }
    ],
    }
  });
  const [viewMemberModal, setViewMemberModal] = useState(false);
  const dispatch = useAppDispatch();
  const [currentRow, setCurrentRow] = useState(-1);
  const handleShowMenu = (index: number) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    if (currentRow === index) setCurrentRow(-1);
    else setCurrentRow(index);
  };
  const handleViewMember = (id: string)  => async (evt: React.MouseEvent) => {
  
    const data = activeMembers.find((item) => {
      return item._id === id; 
    })
    setUserData(data);

    setCurrentRow(-1);
    setLoading(true);
    await dispatch(viewMember(id)).unwrap();
    setLoading(false);
    setViewMemberModal(true);

    // if (!requestError) {
    //   setViewApplicationModal(true);
    // }
    
  }
  const handleApproveApplication = async (id: string) => {
    await dispatch(approveApplication(id)).unwrap();

    if (!requestError) {
      await dispatch(getActiveMembers()).unwrap();
      return true;
    }

    return false;
  };
  const handleCloseModal = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setViewMemberModal(false);
  }
  useEffect(() => {
    window.onclick = function () {
      setCurrentRow(-1);
    }
    dispatch(getActiveMembers());
  }, [])
  
  return (
    <div>
      {activeMembers?.length?<div className="mx-6 pr-16 relative">
        <table className="table-auto border-collapse border-spacing-x-9 w-full border-2">
          <thead>
            <tr className="text-[#828282] font-[300] text-[14px]"><th>No</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Action</th></tr>
          </thead>
          <tbody>
          {
            activeMembers?.map((newMember, index) => (
              <tr className="odd:bg-[#F5F5F5] even:bg-[#FEFEFE] text-center text-[#828282] font-[500] text-[18px]" key={++index}>
                <td>{++index}</td>
                <td>{newMember?.name?.first}</td>
                <td>{newMember?.name?.last}</td>
                <td>{newMember?.email}</td>
                <td className="relative">
                  <div className="flex space-x-1 justify-center items-center py-2 hover:cursor-pointer" onClick={handleShowMenu(index)}>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                  </div>
                  {currentRow === index && <div className="relative after:absolute after:border-8 after:border-r-transparent after:border-b-[#F9F9F9] after:border-l-transparent after:-top-3 after:left-[40%] after:border-t-transparent">
                    <div className="absolute top-1 w-44 py-2 bg-[#F9F9F9] -right-1 z-50 rounded-lg pl-3 text-[#307D0B] font-[300] text-[14px] shadow-xl">
                      <p className="flex items-center my-2 space-x-2 hover:cursor-pointer" onClick={handleViewMember(newMember._id)}><span className="text-xl"><BsEye /></span><span>View Member</span></p>
                      <p className="flex items-center space-x-2 mb-2 hover:cursor-pointer"><span className="text-xl"><ImUserCheck /></span><span>Activate Member</span></p>
                      <p className="flex items-center space-x-2 mb-2 hover:cursor-pointer"><span className="text-xl"><ImUserMinus /></span><span>Deactivate Member</span></p>
                    </div>
                  </div>
                  }
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        {viewMemberModal && <div className="fixed top-0 bottom-0 left-0 right-0 bg-transparentBlack overflow-y-scroll" onClick={handleCloseModal}>
            {!loading && <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center justify-center">
                <div>
                  <div className="flex justify-end">
                    <div className="w-6 h-6 rounded-full bg-green2 -mt-8 -mr-7 text-center hover:cursor-pointer relative" onClick={handleCloseModal}>
                      <div className="absolute -top-2 left-[1.4px]"><span className="text-4xl text-white">&times;</span></div>
                    </div>
                  </div>
                  <ViewActiveMember application={activeMember} user={userData} approveApplication={handleApproveApplication} closeModal={handleCloseModal} />
                  </div>
              </div>
            </div>
            }
            {loading && <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex justify-center items-center"><Loader /></div>
            </div>
            }
          </div>
        }
        {/* {viewMemberModal && <div className="fixed top-0 bottom-0 left-0 right-0 bg-transparentBlack overflow-y-scroll">
            {!loading && <div className="flex items-center justify-center">
                <ViewActiveMember application={activeMember} user={userData} approveApplication={handleApproveApplication} closeModal={handleCloseModal} />
              </div>
            }
            {loading && <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex justify-center items-center"><PageLoader /></div>
            </div>
            }
          </div>
        } */}
      </div>: <div className="text-center">NO ACTIVE MEMBER.</div>}
      {
        status === "loading" && !ViewApplicationModal && <PageLoader />
      }
    </div>
  )
};

export default ActiveMembers;