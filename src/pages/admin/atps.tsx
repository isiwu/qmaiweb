import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import AdminDashboardLayout from "../../components/layout/admin/AdminDashboardLayout";
//import { setLayoutSubTitle } from "../../features/user/userSlice";
import { type NextPageWithLayout } from "../_app";
// import { FaListUl, FaUsers, FaUsersSlash } from "react-icons/fa";
// import { MdPendingActions } from "react-icons/md";
// import { TbFileCertificate } from "react-icons/tb";
import { BsEye } from "react-icons/bs"; 
//import AdminDashboardItem from "../../components/layout/admin/AdminDashboardItem";
import Head from "next/head";
import Application from "../../features/admin/trainee/Application";
// import Trainee from "../../features/admin/Trainee";
// import InActiveTrainee from "../../features/admin/trainee/InActiveTrainee";
// import PendingTrainee from "../../features/admin/trainee/PendingTrainee";
import TableActionMenu from "../../components/TableActionMenu";
import PageLoader from "../../components/PageLoader";
import TableActionModal from "../../components/TableActionModal";
import { atpData } from "../../features/atp/atpSlice";
import { getATPActiveTrainees, getATPInActiveTrainees, getATPPendingTrainees, getATPs } from "../../features/admin/adminSlice";
import Trainee from "../../features/admin/Trainee";
import ATP from "../../features/admin/ATP";
//import { VscFolderActive } from "react-icons/vsc";

const ATPs: NextPageWithLayout = () => {
  const atps = useAppSelector(state => state.admin.atps);
  const trainees = useAppSelector(state => state.admin.atpTrainees);
  const [currentRow, setCurrentRow] = useState(-1);
  const [currATP, setCurrATP] = useState(atpData);
  const [actionModal, setActionModal] = useState(false);
  const [viewStatus, setViewStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.admin.status);
  const handleTableMenu = (index: number) => (evt: React.MouseEvent) => {
      evt.stopPropagation();
      if (currentRow === index) return setCurrentRow(-1);
      setCurrentRow(index)
  };
  const handleViewATP = (atpId: string) => (evt: React.MouseEvent) => {
    //evt.stopPropagation();

    const atp = atps.find((atp) => atp._id === atpId);
    setCurrATP(atp);
    setActionModal(true);
    setViewStatus("atp");
  };
  const handleViewATPTrainees = (data: {atpId: string, traineeType: string}) => async (evt: React.MouseEvent) => {
    if (data.traineeType === "active") {
      setLoading(true);
      await dispatch(getATPActiveTrainees(data.atpId)).unwrap();
      console.log(trainees);
      setLoading(false)
      return;
      //setActionModal(true);
    }

    if (data.traineeType === "inactive") {
      setLoading(true);
      await dispatch(getATPInActiveTrainees(data.atpId)).unwrap();
      setActionModal(true);
      setLoading(false);
    }

    if (data.traineeType === "active") {
      setLoading(true);
      await dispatch(getATPPendingTrainees(data.atpId)).unwrap();
      setActionModal(true);
      setLoading(false);
    }

    setViewStatus("trainee");
  }

  useEffect(() => {
    (
      async () => {
        setLoading(true);
        await dispatch(getATPs()).unwrap();
        setLoading(false);
      }
    )()

    window.onclick = () => {
      setCurrentRow(-1);
    }
  }, [])

  // const pageItems = [
  //   {
  //     text: "Pending Trainee",
  //     icon: <MdPendingActions />,
  //     handleClick: (input: string) => (evt: React.MouseEvent) => {
  //       dispatch(setLayoutSubTitle(input));
  //     }
  //   },
  //   {
  //     text: "List of Trainee",
  //     icon: <FaListUl />,
  //     handleClick: (input: string) => (evt: React.MouseEvent) => {
  //       dispatch(setLayoutSubTitle(input));
  //     }
  //   },
  //   {
  //     text: "Active Trainee",
  //     icon: <FaUsers />,
  //     handleClick: (input: string) => (evt: React.MouseEvent) => {
  //       dispatch(setLayoutSubTitle(input));
  //     }
  //   },
  //   {
  //     text: "Inactive Trainee",
  //     icon: <FaUsersSlash />,
  //     handleClick: (input: string) => (evt: React.MouseEvent) => {
  //       dispatch(setLayoutSubTitle(input));
  //     }
  //   },
  //   {
  //     text: "Application",
  //     icon: <TbFileCertificate />,
  //     handleClick: (input: string) => (evt: React.MouseEvent) => {
  //       dispatch(setLayoutSubTitle(input));
  //     }
  //   }
  // ]
  return (
    <>
    <Head>
        <title>QMSAI | Admin-ATPS</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <div className='border mx-14 rounded-lg my-8 pb-3'>
    {
      atps[0]._id?  <div>
      <div className='my-4 text-2xl text-[#73D942]  pl-8'>
        <h1>ATPs</h1>
      </div>
      <table className='w-[100%]'>
          <tr className='text-[#828282] text-left'>
              <th className="pl-12">S/N</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
          </tr>
          {
             atps.map((atp, index) => (
              <tr className='even:bg-[#F5F5F5] odd:bg-[#FEFEFE] text-left text-[#828282] font-[500] text-[18px]'>
                  <td className='pl-12'>{++index}</td>
                  <td>{atp.name}</td>
                  <td>{atp.email}</td>
                  <td>{atp.address}</td>
                  <td>{atp.phone}</td>
                  <td className='relative'>
                      <div className="pl-2 flex space-x-1 items-center py-2 hover:cursor-pointer" onClick={handleTableMenu(index)}>
                          <span className="w-1 h-1 rounded-full bg-black1"></span>
                          <span className="w-1 h-1 rounded-full bg-black1"></span>
                          <span className="w-1 h-1 rounded-full bg-black1"></span>
                      </div>
                      {
                        (currentRow === index) && <TableActionMenu>
                            <div onClick={handleViewATP(atp._id)}>
                              <p className="flex items-center space-x-2 my-2 hover:cursor-pointer"><span className="text-xl"><BsEye /></span><span>View ATP</span></p>
                            </div>
                            <div onClick={handleViewATPTrainees({atpId: atp._id, traineeType: "active"})}>
                              <p className="flex items-center space-x-2 my-2 hover:cursor-pointer"><span className="text-xl"><BsEye /></span><span>ATP Active Trainees</span></p>
                            </div>
                            <div onClick={handleViewATPTrainees({atpId: atp._id, traineeType: "inactive"})}>
                              <p className="flex items-center space-x-2 my-2 hover:cursor-pointer"><span className="text-xl"><BsEye /></span><span>ATP InActive Trainees</span></p>
                            </div>
                            <div onClick={handleViewATPTrainees({atpId: atp._id, traineeType: "pending"})}>
                              <p className="flex items-center space-x-2 my-2 hover:cursor-pointer"><span className="text-xl"><BsEye /></span><span>ATP Pending Trainees</span></p>
                            </div>
                        </TableActionMenu>
                      }
                  </td>
              </tr>
             ))
          }
      </table>
      {
        actionModal && <TableActionModal scale={true} setCloseModal={setActionModal}>
            {/* <h1 className='text-center'>Add Score For <span className='font-bold'>{currTrainee.name.first.charAt(0).toUpperCase() + currTrainee.name.first.slice(1)} {currTrainee.name.last.charAt(0).toUpperCase() + currTrainee.name.last.slice(1)}</span></h1>
            <div className='mb-6 mt-4 text-center'>
                <input type="text" value={score} id="score" placeholder='trainee score' className='outline-none border-2 focus:border-2 focus:border-green5 rounded-md' onChange={onChange} />
            </div>
            <div className='flex justify-between'>
              <button className='border-2 border-green1 rounded-lg px-5 mr-12' onClick={handleCancel}>Cancel</button>
              <button className='py-3 bg-qmaiButton text-white px-4 rounded-lg' onClick={handleScore}>{status==="loading"?"Adding Score":"Add Score"}</button>
              <Button text={status==="loading"?"Adding Score":'Add Score'} disabled={status==="loading"?true:false} />
            </div> */}
            {
              viewStatus === "atp" && <ATP data={currATP} />
            }
            {
              viewStatus === "trainee" && <Trainee trainees={trainees} />
            }
        </TableActionModal>
      }
    </div>:<div className="text-center text-xl mt-5">
      <p>No ATP. Check Again</p>
    </div>
    }
    {
      loading && <PageLoader />
    }
    </div>
    </>
   
  )
};

ATPs.getLayout = AdminDashboardLayout;
export default ATPs;