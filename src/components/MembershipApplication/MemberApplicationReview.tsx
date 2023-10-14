import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { applyForMemeberShip, setPaymentModal } from "../../features/memberships/membershipSlice";
import { getUserData } from "../../features/user/userSlice";
import ApplicationButton from "./ApplicationButton";

interface AppProps {
  formData: {
    membershipType: string,
    studyingQMAI: boolean,
    yearsOfWork: string,
    yearsOfSystem: string,
    cv: File,
    otherRDoc: File,
    otherRDocName: string,
  },
  handleChange?: (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => void,
  handleChangeSelect?: (input: string) => (evt: React.ChangeEvent<HTMLSelectElement>) => void,
}


const StudentMembershipApplicationReview = ({formData}: AppProps) => {
  const user = useAppSelector(state => state.user.data);
  const status = useAppSelector(state => state.membership.status);
  const userStatus = useAppSelector(state => state.user.status);
  const showModal = useAppSelector(state => state.membership.showPaymentModal);
  const dispatch = useAppDispatch();
  const handleClick = async (evt: React.MouseEvent) => {
    evt.stopPropagation();

    if (!showModal) {
      dispatch(setPaymentModal(true));
      return;
    }
    const submitform = new FormData();
    submitform.append("membershipType", formData.membershipType);
    submitform.append("studyingQMAI", JSON.stringify(formData.studyingQMAI));
    submitform.append("yearsOfWorkExp", formData.yearsOfWork);
    submitform.append("yearsOfSystemExp", formData.yearsOfSystem);
    submitform.append("cv", formData.cv);
    submitform.append("otherRDoc", formData.otherRDoc);
    submitform.append("otherRDocName", formData.otherRDocName);

    const data = {
      id: user._id,
      payload: submitform,
    }

    try {
      await dispatch(applyForMemeberShip(data)).unwrap()
    } catch (error) {
      console.log(`Error in membership application due to: ${error.message}`);
    }

    
    try {
      await dispatch(getUserData(user._id)).unwrap();
    } catch (error) {
      console.log(`Error getting user data in the component due to: ${error.message}`);
    }
  };
  
  return (
    <div>
      {!user?.profileId?.applicationApproved && <h2 className="font-[500] leading-3 text-[#828282] pl-5">APPLICATION</h2> }
      <p className="my-8 font-[10] leading-[18px] text-[#676767] hover:cursor-pointer text-[18px] pl-5">{user?.profileId?.applicationApproved?"Your application has been reviewed and approved. Please go head and make payment to get your membership certificate":"Please bear with us your application is currently been reviewed. We will get back to you as soon as possible"} </p>
      <div className="flex flex-col space-y-2 pl-5">
        <label htmlFor="" className="font-[300] text-[#828282] text-[12px] tracking-widest">Membership Certificate Fee</label>
        <input type="text" id="" className="bg-[#FBFBFB] w-[216px] h-[48px] outline-none rounded-lg text-[#272727] font-[400] text-[18px] placeholder:text-[#272727]" value={"$10.00"} readOnly  />
      </div>
      <div className="flex justify-center items-center mt-16">
        <ApplicationButton text={"Make Payment"} handleClick={handleClick} disabled={!user?.profileId?.applicationApproved?true:showModal?true:status === "loading"?true:userStatus === "loading"?true:false} />
      </div>
    </div>
  )
}

export default StudentMembershipApplicationReview;