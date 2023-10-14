import React from "react";
import MembershipGraduateForm from "./MembershipGraduateForm";
import MembershipAssociateForm from "./MembershipAssociateForm";
import MembershipPrincipalForm from "./MembershipPrincipalForm";
import MembershipChartteredForm from "./MembershipChartteredForm";
import MembershipFullForm from "./MembershipFullForm";

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
const StudentMembershipApplicationForm = ({applicationType, formData, handleChange, handleChangeSelect, handleClick}: AppProps) => {

  return (
    <div>
      {
        (applicationType === "graduate auditor membership" && <MembershipGraduateForm applicationType={applicationType} formData={formData} handleChange={handleChange} handleChangeSelect={handleChangeSelect} handleClick={handleClick}/>)
      }
      {
        (applicationType === "associate auditor membership" && <MembershipAssociateForm applicationType={applicationType} formData={formData} handleChange={handleChange} handleChangeSelect={handleChangeSelect} handleClick={handleClick}/>)
      }
      {
        (applicationType === "principal auditor membership" && <MembershipPrincipalForm applicationType={applicationType} formData={formData} handleChange={handleChange} handleChangeSelect={handleChangeSelect} handleClick={handleClick}/>)
      }
      {
        (applicationType === "charttered auditor membership" && <MembershipChartteredForm applicationType={applicationType} formData={formData} handleChange={handleChange} handleChangeSelect={handleChangeSelect} handleClick={handleClick}/>)
      }
      {
        (applicationType === "full membership" && <MembershipFullForm applicationType={applicationType} formData={formData} handleChange={handleChange} handleChangeSelect={handleChangeSelect} handleClick={handleClick}/>)
      }
    </div>
  )
}

export default StudentMembershipApplicationForm;