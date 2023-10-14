import classNames from "classnames";
import React, {useState} from "react";
import { useAppSelector } from "../../app/hooks";
import PaymentModal from "../PaymentModal";
import MembershipApplicationType from "./MembershipApplicationType";
//import classNames from "classnames"
//import Button from "./Button"
import MembershipProgressStatus from "./MembershipProgressStatus"
import StudentMembershipApplication from "./StudentMembershipApplication";

const MembershipApplication = () => {
  const [isContinue, setContinue] = useState(false);
  const showModal = useAppSelector(state => state.membership.showPaymentModal);
  const user = useAppSelector(state => state.user.data);
  const cv: File | null = null;
  const otherRDoc: File | null = null;
  const [formData, setFormData] = useState({
    membershipType: "",
    studyingQMAI: false,
    yearsOfWork: "",
    yearsOfSystem: "",
    cv: cv,
    otherRDoc: otherRDoc,
    otherRDocName: "",
  });
  const handleChange = (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (input === "studyingQMAI") setFormData({
      ...formData,
      [input]: evt.target.checked,
    }) 
    else if (input === "cv" || input === "otherRDoc") {
      setFormData({
        ...formData,
        [input]: evt.target.files[0]
      })
    } else {
      setFormData({
        ...formData,
        [input]: evt.target.value,
      })
    }
  };
  const handleChangeSlect = (input: string) => (evt: React.MouseEvent)  => {
    evt.stopPropagation();
    const target = evt.target as Element;
    setFormData({
      ...formData,
      [input]: target.getAttribute("value")
    })
  }
  const handleContinue = () => {
    setContinue(true);
  };


  return (
    <div className={classNames("border rounded-[12px]  w-[90%] my-8 mx-auto")}>
      <div>
        <h1 className="text-[#32ba32] text-2xl font-[600] pl-2 my-4">{!user?.profileId?.isCertified && (user?.profileId?.membershipStatus === "Inactive")?"Membership Application":"Renew Membership Application"}</h1>
        <p  className=" border-b-[1px]"></p>
      </div>
      <div>
        <MembershipProgressStatus />
      </div>
      {
        (!isContinue && !user?.profileId?.hasApplied)  && <div>
          <MembershipApplicationType formData={formData} handleContinue={handleContinue} handleChangeSelect={handleChangeSlect} />
        </div>
      }
      {
        (isContinue || user?.profileId?.hasApplied) && <StudentMembershipApplication formData={formData} handleChange={handleChange} handleChangeSelect={handleChangeSlect} />
      }
      {
        showModal && <PaymentModal formData={formData} />
      }
    </div>
  )
}

export default MembershipApplication