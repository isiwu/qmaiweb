import classNames from "classnames";
import { useAppSelector } from "../../app/hooks";

const MembershipProgressStatus = () => {
  const user = useAppSelector(state => state.user.data);
  const applicationType = useAppSelector(state => state.membership.applicationType);
  const application = useAppSelector(state => state.membership.application);
  const makePayment = useAppSelector(state => state.membership.makePayment);
  return (
    <div>
      <div className="flex items-center justify-center pt-8">
        <span className={classNames("w-[18%] h-1 -mr-2", {
          "bg-green2": user?.profileId?.profileCompleted,
          "bg-[#D9D9D9]": !user?.profileId?.profileCompleted,
        })}></span>
        <span className={classNames("w-4 h-4 rounded-full bg-green2 relative -mt-2 -mr-2 z-40 after:absolute after:border-4 after:border-t-green2 after:border-r-transparent after:border-b-transparent after:border-l-transparent after:-bottom-[7px] after:left-[25%]", {
          "bg-green2 after:border-t-green2": user?.profileId?.profileCompleted,
          "bg-black3 after:border-t-black3": !user?.profileId?.profileCompleted,
        })}></span>
        <span 
          className={classNames("w-[18%] h-1 -mr-2", {
            "bg-green2": user.profileId?.hasApplied?true:applicationType?true:false,
            "bg-[#D9D9D9]": !(user.profileId?.hasApplied?true:applicationType?true:false),
          })}></span>
        <span className={classNames("w-4 h-4 rounded-full relative -mt-2 -mr-2 z-40 after:absolute after:border-4 after:border-r-transparent after:border-b-transparent after:border-l-transparent after:-bottom-[7px] after:left-[25%]", {
            "bg-green2 after:border-t-green2": (user.profileId?.hasApplied?true:applicationType?true:false),
            "bg-black3 after:border-t-black3": !(user.profileId?.hasApplied?true:applicationType?true:false)
          })}></span>
        <span className={classNames("w-[18%] h-1 -mr-2", {
          "bg-green2": (user.profileId?.hasApplied?true:application?true:false),
          "bg-[#D9D9D9]": !(user.profileId?.hasApplied?true:application?true:false)
        })}></span>
        <span className={classNames("w-4 h-4 rounded-full relative -mt-2 -mr-2 z-40 after:absolute after:border-4 after:border-r-transparent after:border-b-transparent after:border-l-transparent after:-bottom-[7px] after:left-[27%]", {
          "bg-green2 after:border-t-green2": (user.profileId?.hasApplied?true:application?true:false),
          "bg-black3 after:border-t-black3": !(user.profileId?.hasApplied?true:application?true:false)
        })}></span>
        <span className={classNames("w-[18%] h-1 -mr-2", {
          "bg-green2": (user.profileId?.applicationApproved?true:false),
          "bg-[#D9D9D9]": !(user.profileId?.applicationApproved?true:false),
        })}></span>
        <span className={classNames("w-4 h-4 rounded-full relative -mt-2 -mr-2 z-40 after:absolute after:border-4 after:border-r-transparent after:border-b-transparent after:border-l-transparent after:-bottom-[7px] after:left-[27%]", {
          "bg-green2 after:border-t-green2": (user.profileId?.applicationApproved?true:false),
          "bg-black3 after:border-t-black3": !(user.profileId?.applicationApproved?true:false),
        })}></span>
        <span className={classNames("w-[18%] h-1 -mr-2", {
          "bg-green2": (user.profileId?.certificateMembershipPayment?true:makePayment?true:false),
          "bg-[#D9D9D9]": !(user.profileId?.certificateMembershipPayment?true:makePayment?true:false)
        })}></span>
      </div>
      <div className="flex items-center justify-center mt-3">
        {/* <span className="w-[18%]"></span> */}
        <span className="font-[500] text-green2 text-[18px] lg:ml-12">Profile Completion</span>
        <span className="w-20"></span>
        <span className="font-[500] text-green2 text-[18px]">Application</span>
        <span className="w-20"></span>
        <span className="font-[500] text-green2 text-[18px]">Application Review</span>
        <span className="w-20"></span>
        <span className="font-[500] text-green2 text-[18px] lg:-ml-10">Membeship Payment</span>
        {/* <span className="w-20"></span> */}
      </div>
    </div>
  )
}

export default MembershipProgressStatus