import classNames from "classnames";
import {RiErrorWarningFill} from "react-icons/ri"
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setPaymentModal, setReviewApplication } from "../../features/memberships/membershipSlice";
import MembershipApplicationForm from "./MemberApplicationForm";
import MembershipApplicationReview from "./MemberApplicationReview";
import MemberApplicationPaymentSucces from "./MembershipApplicationPaymentSuccess";

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
  handleChange: (input: string) => (evt: React.ChangeEvent<HTMLInputElement>) => void,
  handleChangeSelect: (input: string) => (evt: React.MouseEvent) => void,
}

const StudentMembershipApplication = ({formData, handleChange, handleChangeSelect}: AppProps) => {
  const applicationType = useAppSelector(state => state.membership.applicationType);
  const reviewApplication = useAppSelector(state => state.membership.reviewApplication);
  const makePayment = useAppSelector(state => state.membership.makePayment);
  const user = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (formData.membershipType === "graduate auditor membership") dispatch(setReviewApplication(true));
    else dispatch(setPaymentModal(true));
  };

  return (
    <div className={classNames("my-10")}>
      {/* APPLICATION */}
      <div className="flex items-center md:space-x-3 pl-4">
       { (!user?.profileId?.certificateMembershipPayment) && (!user?.profileId?.isCertified) && <h1 className="font-[500] text-[#828282] leading-3 tracking-wider">{applicationType.toUpperCase()} APPLICATION</h1>}
        {(user?.profileId?.certificateMembershipPayment) && (!user?.profileId?.isCertified) && <div className="text-green5 text-lg font-extrabold">Your Certificate will be ready in three minute time and will be sent to your Email.</div>}
      </div>
      { applicationType === "graduate auditor membership" && <div className="flex items-center space-x-2 mt-5 px-4">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">For anyone enrolled on a QMSAI accredited higher education course or studying management system auditing related course.</div>
        </div>
      }
      { applicationType === "associate auditor membership" && <div className="mt-5 px-4">
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">If you are not yet a fulltime internal auditor for an organization, but you conduct partial system audits such as first party audit (internal audit) or 2nd Party (supplier audits) for your organization. You are probably not a full-time auditor</div>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">Interested applicant must have conducted 5 internal audits that includes all elements of the audit cycle. You must not have audited your department or activities you are involved. Must have been conducted after your certification training.</div>
        </div>
      </div>
      }
      { applicationType === "principal auditor membership" && <div className="mt-5 px-4">
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">Are you a lead audits or are you and audit team leader conducting full first party audit (internal Audit) management system, or full second-party (supplier audits), or full third-party management system audits? Then this grade is for you.</div>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">Interested applicant must have passed a QMSAI certified Lead Auditor course for any of the ISO Management System or QMSAI recognized Internal Lead Auditor training course for any of the ISO Management System.</div>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">Interested applicant must have conducted at least 4 full ISO management system audits as the leader of the audit team. Total audit days must be at least 18 days, of this at least 12 days must be onsite.</div>
        </div>
      </div>
      }
      { applicationType === "charttered auditor membership" && <div className="mt-5 px-4">
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">Are you a suitable qualified audit professional with demonstratable good record of conducting audits, but you may no longer lead teams or audit regularly? Or You are management system consultant, Or management system / auditor trainer Or a highly experience audit professional who is now in a top management position</div>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">At least 3 years or more as an QMSAI Principal Auditor This could include audit managers, certification managers, audit training and development personnel (including management system auditor training course designers), and persons involved in the development of relevant audit and management system standards (such as ISO 19011). 2. A minimum of five years as an QMSAI Certified Auditor or Lead Auditor (for the relevant scheme) and  - Manager of audit programmes/schemes; - Responsible for developing and training auditors; - Involved in developing audit method and standards; - Consultancy in respect of management systems auditing. Other senior roles may be considered upon application.</div>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">Interested applicant must have conducted at least 5 full ISO management system audits as the leader of the audit team. Or verifiable evidence that you have been contracted by a third-party to carry out at least 4 certification audits. Or evidence of three years full-time employment as a management systems’ auditor with a certification body accredited by an IAF accreditation body.</div>
        </div>
      </div>
      }
      { applicationType === "full membership" && <div className="mt-5 px-4">
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">This is QMSAI’s highest level of professional membership. It is reserved for individuals approved by the Board of the Institute in recognition of their contribution and outstanding service to QMSAI and the profession. These are role models for the institute, members, their organizations and the profession.</div>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <div><RiErrorWarningFill /></div>
          <div className="font-[400] text-[13px] leading-3 text-black3">This is QMSAI’s highest level of professional membership. It is reserved for individuals approved by the Board of the Institute in recognition of their contribution and outstanding service to QMSAI and the profession. These are role models for the institute, members, their organizations and the profession.</div>
        </div>
      </div>
      }
     
      <div className="mt-10">
        {
          (!reviewApplication && !user?.profileId?.hasApplied)  && <MembershipApplicationForm applicationType={applicationType} formData={formData} handleClick={handleClick} handleChange={handleChange} handleChangeSelect={handleChangeSelect} />
        }
        
        {
          (user?.profileId?.hasApplied && !user?.profileId?.certificateMembershipPayment) && <MembershipApplicationReview formData={formData} />
        }
       
        {
          (user?.profileId?.certificateMembershipPayment) && <MemberApplicationPaymentSucces />
        }
      </div>
    </div>
  )
};

export default StudentMembershipApplication;