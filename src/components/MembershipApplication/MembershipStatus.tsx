
import { useAppSelector } from "../../app/hooks";
import CertificateButton from "./CertificateButton";

type AppProps = {
  handleBack: (input: string) => (evt: React.MouseEvent) => void,
}

const MembershipStatus = ({handleBack}: AppProps) => {
  const user = useAppSelector(state => state.user.data);
  console.log(user)
  return (
    <div>
      { user?.profileId?.membershipStatus.toLowerCase() === "active" &&
        <div className="border rounded-[12px]  w-[70%] my-8 ml-12 px-6 pb-8 pt-8">
          <h2 className="flex flex-col md:flex-row items-center justify-between">
            <span className="text-green3 text-lg md:text-xl lg:text-3xl font-[600]">Membership Status</span>
            <span  className="bg-green2 text-center text-white rounded-3xl px-4 font-[500] text-sm md:text-lg lg:text-4xl w-[191px]">Active</span>
          </h2>
          {/* <p className="text-[#676767] text-md md:text-lg lg:text-[28px] font-[500] my-2 text-center">{user?.name?.first.charAt(0).toUpperCase() + user?.name?.first.slice(1)} {user?.name?.last.charAt(0).toUpperCase() + user?.name?.last.slice(1)}</p> */}
          <p className="text-[#676767] text-md md:text-lg lg:text-[28px] font-[500] my-2 text-center md:text-left mt-8">Membership Type</p>
          <p className="text-[#828282] font-[500] text-[18px] capitalize text-center md:text-left mb-8">{user.membershipType}</p>
          <div className="flex flex-col md:flex-row items-center space-y-5 md:space-y-0 md:space-x-5 my-3">
            <div className="flex flex-col ">
              <span className="font-[500] text-[15px] text-[#828282] self-center md:self-start">Email</span>
              <span className="font-[500] text-[20px] text-[#272727]">{user?.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[500] text-[15px] text-[#828282] self-center md:self-start">Phone Number</span>
              <span className="font-[500] text-[20px] text-[#272727]">{user?.phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[500] text-[15px] text-[#828282]">Registration Date</span>
              <span className="font-[500] text-[20px] text-[#272727]">03 January 2022</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[500] text-[15px] text-[#828282]">Expiry Date</span>
              <span className="font-[500] text-[20px] text-[#272727]">03 January 2022</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-12">
            <CertificateButton text="Download Certificate" className="bg-qmaiGreen text-white hover:shadow-2xl transition" disabled={!user?.profileId?.isCertified?true:false} />
            <CertificateButton text="View Certificate" className="border-2 border-qmaiGreen text-qmaiGreen hover:shadow-2xl duration-200" disabled={!user?.profileId?.isCertified?true:false} />
            <CertificateButton text="Share Certificate" className="text-qmaiGreen hover:shadow-2xl transition-all duration-200" disabled={!user?.profileId?.isCertified?true:false} />
          </div>
      </div>
      }

      {
        user?.profileId?.membershipStatus.toLowerCase() !== "active" && 
        <div className="border rounded-[12px]  w-[70%] my-8 ml-12 px-6 pb-8 pt-8">
          <h2 className="flex items-center space-x-4">
            <span className="text-green3 text-3xl font-[600]">Membership Application</span>
            <span  className="bg-[#676767] text-center text-white rounded-3xl px-4 font-[500] text-[35px] w-[191px]">Inactive</span>
          </h2>
          <p className="text-[#676767] text-[28px] font-[500] mt-2">{user?.name?.first.charAt(0).toUpperCase() + user?.name?.first.slice(1)} {user?.name?.last.charAt(0).toUpperCase() + user?.name?.last.slice(1)}</p>
          <p className="text-[#828282] font-[500] text-[18px]">Junior Members</p>
          <div className="flex items-center space-x-5 my-3">
            <div className="flex flex-col ">
              <span className="font-[500] text-[15px] text-[#828282]">Email</span>
              <span className="font-[500] text-[20px] text-[#272727]">{user?.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[500] text-[15px] text-[#828282]">Phone Number</span>
              <span className="font-[500] text-[20px] text-[#272727]">{user?.phone}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[500] text-[15px] text-[#828282]">Registration Date</span>
              <span className="font-[500] text-[20px] text-[#272727]">03 January 2022</span>
            </div>
            <div className="flex flex-col">
              <span className="font-[500] text-[15px] text-[#828282]">Expiry Date</span>
              <span className="font-[500] text-[20px] text-[#272727]">03 January 2022</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mt-6 justify-between">
            <button className="bg-green2 text-white py-2 px-5 rounded-3xl w-48 hover:shadow-xl" onClick={handleBack("")}>Back</button>
            <button className="py-2 px-5 rounded-3xl border-2 border-green2 w-48 hover:shadow-xl">Renew Membership</button>
          </div>
        </div>
      }
    </div>
  )
};

export default MembershipStatus;