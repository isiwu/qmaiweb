import { useAppSelector } from "../../app/hooks";
import CertificateButton from "./CertificateButton";


const StudentMemberApplicationPaymentSucces = () => {
  const user = useAppSelector(state => state.user.data);
  return (
    <div className="flex space-x-6 ml-12">
      {/* <CertificateButton text="Download Certificate" className="bg-qmaiGreen text-white hover:shadow-2xl transition" disabled={!user?.profileId?.isCertified?true:false} />
      <CertificateButton text="View Certificate" className="border-2 border-qmaiGreen text-qmaiGreen hover:shadow-2xl duration-200" disabled={!user?.profileId?.isCertified?true:false} />
      <CertificateButton text="Share Certificate" className="text-qmaiGreen hover:shadow-2xl transition-all duration-200" disabled={!user?.profileId?.isCertified?true:false} /> */}

      
      {/* DUMMY BUTTONS */}
      <CertificateButton text="Download Certificate" className="bg-qmaiGreen text-white hover:shadow-2xl transition" disabled />
      <CertificateButton text="View Certificate" className="border-2 border-qmaiGreen text-qmaiGreen hover:shadow-2xl duration-200" disabled />
      <CertificateButton text="Share Certificate" className="text-qmaiGreen hover:shadow-2xl transition-all duration-200" disabled />
    </div>
  )
};

export default StudentMemberApplicationPaymentSucces;