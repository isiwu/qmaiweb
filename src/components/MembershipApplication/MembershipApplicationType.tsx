import { useRouter } from "next/router";
import React from "react";
import {RiErrorWarningFill} from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setApplicationType } from "../../features/memberships/membershipSlice";
import { setLayoutSubTitle, setLayoutTitle } from "../../features/user/userSlice";
import Select from "../Select";
import ApplicationButton from './ApplicationButton'

type AppProps = {
  formData: {
    membershipType: string,
    studyingQMAI: boolean,
    yearsOfWork: string,
    yearsOfSystem: string,
    cv: File,
    otherRDoc: File,
    otherRDocName: string,
  },
  handleChangeSelect: (input: string) => (evt: React.MouseEvent)  => void,
  handleContinue: () => void
}
const MembershipApplicationType = ({handleContinue, handleChangeSelect, formData}: AppProps) => {
  const user = useAppSelector(state => state.user.data);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleClick = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    dispatch(setApplicationType(formData.membershipType));

    handleContinue();
  }
  const handleToUpdate = () => {
    dispatch(setLayoutTitle("Profile"));
    dispatch(setLayoutSubTitle("Update Profile"));
    router.push("profile");
  };
  const memberships = [
    {name: "Graduate Auditor Membership"},
    {name: "Associate Auditor Membership"},
    {name: "Principal Auditor Membership"},
    {name: "Charttered Auditor Membership"},
    {name: "Full Membership"},
  ]
  return (
    <div className="pl-4 my-10">
        <div className =" flex space-x-16">
      <div>
          <div>
            <label className="text-[#828282] font-[300]">First Name</label>
          </div>
            <div className="pt-2">
            <input type="text" value={user?.name?.first} placeholder="Oluwaseyi" className="border-none outline-none w-[216px] h-[40px] bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]" readOnly />
          </div>
      </div>

      <div>
          <div>
            <label className="text-[#828282] font-[300]">Last Name</label>
          </div>
            <div className="pt-2">
            <input type="text" value={user?.name?.last} placeholder="James" className="border-none outline-none w-[216px] h-[40px] bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]" readOnly />
          </div>
      </div>

      <div>
          <div>
            <label className="text-[#828282] font-[300]">Phone Number</label>
          </div>
            <div className="pt-2">
            <input type="number" value={user?.phone} placeholder="+234894746453" className="border-none outline-none  w-[216px] h-[40px] bg-[#FBFBFB] rounded-[8px] font-[600] text-[18px] text-[#272727]" readOnly />
          </div>
      </div>
      
        </div>

      <div  className="pt-4 text-[#CCCCCC] font-[400]">
        <div className="flex items-center  ">
          <div> <RiErrorWarningFill /></div>
          <div>
            <p className="pl-2 leading-8"> Your name will appear this way on your membership certificate,if you wish to change it you can do that </p>
          </div>
        </div>
        <p>by <span className="text-[#32ba32] font-[600] hover:cursor-pointer" onClick={handleToUpdate}>updating your profile</span></p>
      </div>
      <div>
        <div>
          <div className="pt-8 mb-4">
            <label className="text-[#828282]"> Select Membership Type</label>
          </div>
          <div className="w-[300px] h-[40px] bg-[#FBFBFB] rounded-[8px]">
            <Select placeHolder="Membership Type" value={formData.membershipType} onChange={handleChangeSelect("membershipType")} options={memberships} />
            {/* <Select placeHolder="Membership Type" value={formData.membershipType} onChange={handleChangeSelect("membershipType")}>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="graduate auditor membership">Graduate Auditor Members</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="associate auditor membership">Associate Auditor Members</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="principal auditor membership">Principal Auditor Members</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="chartterred auditor membership">Charttered Auditor Members</option>
              <option className="hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="full membership">Full Membership</option>
            </Select> */}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-16">
        <ApplicationButton text="Contine" handleClick={handleClick} disabled={!formData.membershipType?true:false} />
      </div>

    </div>
  )
}

export default MembershipApplicationType;