import React, {useRef} from "react";
import {RiErrorWarningFill} from "react-icons/ri"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setApplication } from "../../features/memberships/membershipSlice";
import { getUserData, setAlert } from "../../features/user/userSlice";
import { applyForMemeberShip } from "../../features/memberships/membershipSlice";
import ApplicationButton from "./ApplicationButton";
import Select from "../Select";
import classNames from "classnames";

interface AppProps {
  applicationType: string,
  formData: {
    membershipType: string,
    studyingQMAI: boolean,
    yearsOfWork: string,
    yearsOfSystem: string,
    cv: File,
    otherRDoc: File,
    otherRDocName: string,
  }
  handleChange: (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => void,
  handleChangeSelect: (input: string) => (evt: React.MouseEvent) => void,
  handleClick: () => void
}
const MembershipFullForm = ({applicationType, formData, handleChange, handleChangeSelect, handleClick}: AppProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const membershipStatus = useAppSelector(state => state.membership.status);
  const requestError = useAppSelector(state => state.membership.error);
  const showModal = useAppSelector(state => state.membership.showPaymentModal);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputRef2 = useRef<HTMLInputElement | null>(null);
  const handleContinue = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    handleClick();
  };
  const handleSumbit = async (evt: React.MouseEvent) => {
    evt.stopPropagation();

    dispatch(setApplication(true));

    const submitform = new FormData();
    submitform.append("membershipType", formData.membershipType);
    submitform.append("studyingQMAI", JSON.stringify(formData.studyingQMAI));
    submitform.append("yearsOfWorkExp", JSON.stringify(parseInt(formData.yearsOfWork)));
    submitform.append("yearsOfSystemExp", JSON.stringify(parseInt(formData.yearsOfSystem)));
    submitform.append("cv", formData.cv);
    submitform.append("otherRDoc", formData.otherRDoc);
    submitform.append("otherRDocName", formData.otherRDocName);
    submitform.append("amount", "0.00");

    const data = {
      id: user._id,
      payload: submitform,
    }

    //dispatch(setAlert({show: false, status: "completed", message: ""}));
    await dispatch(applyForMemeberShip(data)).unwrap();
    
    if (requestError) {
      dispatch(setAlert({show: true, status: "failed", message: "application unsuccessful. try again."}));
      return;
    }

    await dispatch(getUserData(user._id)).unwrap();

    handleClick();
    
  };
  const handleUploadCV = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    inputRef.current.click();
  };
  const handleOtherRDoc = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    inputRef2.current.click();
  };

  return (
    <div>
      <div>
        <h2 className="font-[500] leading-3 text-[#828282] pl-4 mb-2">APPLICATION</h2>
        <hr />
        <div className="flex items-center my-8 space-x-4 px-4">
          <input type="radio" className={classNames("hover:cursor-pointer checked:bg-green3 checked:outline checked:outline-offset-2 checked:w-5 checked:h-5 checked:outline-green6 checked:rounded-full checked:appearance-none", {
            "w-16 h-16": formData.membershipType !== "graduate auditor membership"
          })} id="studying" onChange={handleChange("studyingQMAI")} />
          <label htmlFor="studying" className="font-[10] leading-[18px] text-[#676767] hover:cursor-pointer text-[18px]">Are you a lead audits or are you and audit team leader conducting full first party audit (internal Audit) management system, or full second-party (supplier audits), or full third-party management system audits? Then this grade is for you.</label>
        </div>
        <div className="flex space-x-5 px-4">
          <div className="flex flex-col space-y-2">
            <div className="pt-8">
              <label className="text-[15px] font-[300] text-[#828282]">Select Years of Working Experience</label>
            </div>
            <div className="w-[300px] h-[40px] bg-[#FBFBFB] rounded-[8px]">
              <Select placeHolder="0 Years" value={formData.yearsOfWork} onChange={handleChangeSelect("yearsOfWork")}>
                <option className="font-semibold text-[#272727] hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="3 years">3 years</option>
                <option className="font-semibold text-[#272727] hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="2 years">2 years</option>
                <option className="font-semibold text-[#272727] hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="1 years">1 years</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="pt-8">
              <label className="text-[15px] font-[300] text-[#828282]">Select Years of System  Experience</label>
            </div>
            <div className="w-[300px] h-[40px] bg-[#FBFBFB] rounded-[8px]">
              <Select placeHolder="0 Years" value={formData.yearsOfSystem} onChange={handleChangeSelect("yearsOfSystem")}>
                <option className="font-semibold text-[#272727] hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="3 years">3 years</option>
                <option className="font-semibold text-[#272727] hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="2 years">2 years</option>
                <option className="font-semibold text-[#272727] hover:cursor-pointer hover:bg-green2 hover:text-white pl-3 py-1" value="1 years">1 years</option>
              </Select>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4 my-5 px-4">
          <div><RiErrorWarningFill /></div>
          <div className="text-[#CCCCCC] text-[14px]">Aleast 5years work experience  and 3 years system experience</div>
        </div>
      </div>

      {/* DOCUMENT */}
      <div>
        <h2 className="font-[500] text-[14px] leading-3 text-[#828282] mb-2 pl-4">DOCUMENT</h2>
        <hr />
        <div className="flex items-center space-x-4 mt-10 px-4">
          <div className="flex flex-col space-y-1 -mt-6">
            <label htmlFor="cv" className="font-[300] text-[12px] text-[#828282] tracking-widest">Upload CV</label>
            <button id="cv" className="bg-[#FBFBFB] w-[216px] h-[48px] rounded-lg text-[#272727] font-[400]text-[18px]" onClick={handleUploadCV}>Click Here to Uplaod CV</button>
            <input type="file" ref={inputRef} className="hidden" onChange={handleChange("cv")} />
          </div>
          <div>
            <input type="text" value={formData.cv?formData.cv.name:""} className="bg-[#FBFBFB] w-[216px] h-[48px] rounded-lg border-none focus:outline-none" readOnly />
          </div>
        </div>
        <div className="flex items-center space-x-4 my-5 px-4">
          <div><RiErrorWarningFill /></div>
          <div className="text-[#CCCCCC] text-[14px]">Submit an audit log. A CV detailing verifiable work experience.</div>
        </div>
        <h3 className="font-[500] text-[14px] text-[#828282] mb-2 mt-10 pl-4">Other Relevant Document</h3>
        <div className="flex items-center space-x-3 px-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="doc-name" className="font-[300] text-[#828282] text-[12px] tracking-widest">Document Name</label>
            <input type="text" value={formData.otherRDocName} id="doc-name" className="bg-[#FBFBFB] w-[216px] h-[48px] rounded-lg focus:border-2 focus:outline-none focus:border-green6 text-[#272727] font-[400] text-[18px] placeholder:text-[#272727]" placeholder="BSc. Certificate" onChange={handleChange("otherRDocName")} />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="button" className="font-[300] text-[#828282] text-[12px] tracking-widest">Upload Document</label>
            <button id="cv" className="bg-[#FBFBFB] w-[216px] h-[48px] rounded-lg text-[#272727] font-[400]text-[18px]" onClick={handleOtherRDoc}>Click Here to Uplaod CV</button>
            <input type="file" ref={inputRef2} className="hidden" onChange={handleChange("otherRDoc")} />
          </div>
          <div className="flex flex-col space-y-2 mt-7">
            <input type="text" value={formData.otherRDoc?formData.otherRDoc.name:""} className="bg-[#FBFBFB] w-[216px] h-[48px] rounded-lg border-none focus:outline-none" readOnly />
          </div>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="">
        <h2 className="font-[500] leading-3 text-[#828282] mt-10 mb-2 pl-4">PAYMENT</h2>
        <hr />
        <div className="flex flex-col space-y-2 px-4 mt-8">
          <label htmlFor="" className="font-[300] text-[#828282] text-[16px] tracking-widest">Application Cost</label>
          <input type="text" id="" className="bg-[#FBFBFB] w-[216px] h-[48px] outline-none rounded-lg text-[#272727] font-[400] text-[18px] placeholder:text-[#272727]" value={applicationType === "graduate membership"?"$ 0.00": "$10.00"} readOnly  />
        </div>
      </div>
      <div className="flex justify-center items-center mt-16 px-4">
        <ApplicationButton text={formData.membershipType === "graduate auditor membership"?"Submit Application": "Contine"} handleClick={formData.membershipType === "graduate auditor membership"?handleSumbit:handleContinue} disabled={showModal?true:membershipStatus === "loading"?true:false} />
      </div>
    </div>
  )
}

export default MembershipFullForm;