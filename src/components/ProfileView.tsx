import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLayoutSubTitle } from "../features/user/userSlice";


const ProfileView = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.data);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const handleUpdate = () => {
    dispatch(setLayoutSubTitle("Update Profile"))
  }
  return   (
    <div className="md:w-[844px] md:ml-12">
      <div className="text-[#32ba32] font-bold text-lg pt-2 pr-5 md:pr-0 flex justify-end items-center cursor-pointer leading-6" onClick={handleUpdate}>
        Update Profile
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-2 px-4 mt-4 bg-[#FDFDFD] w-full pt-3 pb-20 rounded-xl">
        <div className="w-[108px] h-[108px] rounded-lg">
          <img  src={user?.profileId?.avatar?user?.profileId?.avatar:"/assets/avatar.svg"} className="w-full" />
        </div>
        <div>
          <div>
            <h1 className="text-[#828282] font-[500] ">BIO DATA</h1>
            <p className="text-[#32ba32] font-bold text-xl pt-2 ">{user?.name?.first?.charAt(0).toUpperCase() + user?.name?.first?.slice(1)} {user?.name?.last?.charAt(0).toUpperCase() + user?.name?.last?.slice(1)}</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-14 pt-6">
            <div>
              <p className="text-[#828282] text-[14px]">Email</p>
              <p  className="text-[#272727] font-[500] text-[15px] md:text-[21px]">{user?.email}</p>
            </div>

            <div>
              <p className="text-[#828282] text-[14px]">Phone Number</p>
              <p  className="text-[#272727] font-[500] text-[15px] md:text-[21px]">{user?.phone}</p>
            </div>

           <div>
              <p className="text-[#828282] text-[14px]">Date of Birth</p>
              {user?.profileId?.dateOfBirth && <p className="text-[#272727] font-[500] text-[15px] md:text-[21px]">{new Date(user?.profileId?.dateOfBirth).getDate()} {months[new Date(user?.profileId?.dateOfBirth).getMonth()]} {new Date(user?.profileId?.dateOfBirth).getFullYear()}</p>}
            </div>

          </div>

          <h1 className={classNames("text-[#828282] text-xl", {
            "mt-8": user?.profileId?.academics?.length,
            "mt-28": !user?.profileId?.academics?.length,
          })} >WORK EXPERIENCE</h1>
          {user?.profileId?.workExps.length && 
          <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-2 pt-6">
            {user?.profileId?.workExps[0] && <>
              <div>
                <p className="text-[#828282] text-[14px]">Company Name</p>
                <p  className="text-[#272727] font-[500] text-[15px] md:text-[21px] pt-2">{user?.profileId?.workExps[0].title}</p>
              </div>

              <div>
                <p className="text-[#828282] text-[14px]">Job Role/Title</p>
                <p  className="text-[#272727] font-[500] text-[15px] md:text-[21px]">{user?.profileId?.workExps[0].title}</p>
              </div>

              <div>
                <p className="text-[#828282] text-[14px]"> Start Date</p>
                <p className="text-[#272727] font-[500] text-[15px] md:text-[21px]">{new Date(user?.profileId?.workExps[0].startDate).getFullYear()}-{new Date(user?.profileId?.workExps[0].startDate).getMonth()}-{new Date(user?.profileId?.workExps[0].startDate).getDate()}</p>
              </div>
            </>}
          </div>
          }

          <h1 className={classNames("text-[#828282] text-xl", {
            "mt-8": user?.profileId?.academics?.length,
            "my-28": !user?.profileId?.academics?.length,
          })} >EDUCATIONAL EXPERIENCE</h1>
          {user?.profileId?.academics?.length &&
           <div className="flex flex-col md:flex-row md:justify-between md:items-center md:space-x-4 pt-6">
            {user?.profileId?.academics[0] && <>
              <div>
                <p className="text-[#828282] text-[14px]">Highest Education</p>
                <p className="text-[#272727] font-[500] text-[15px] md:text-[21px] pt-2">{user?.profileId?.academics[0].title}</p>
              </div>
              <div className="flex-col items-center">
                <p className="text-[#828282] text-[14px]">Awarding Institution</p>
                <p  className="text-[#272727] font-[500] text-[15px] md:text-[21px]">{user?.profileId?.academics[0].institution}</p>
              </div>
              <div>
                <p className="text-[#828282] text-[14px]">Degree</p>
                <p  className="text-[#272727] font-[500]text-[15px] md:text-[21px]">{user?.profileId?.academics[0].discipline}</p>
              </div>
            </>}
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ProfileView;