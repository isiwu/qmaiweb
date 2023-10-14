import React, { useState } from 'react'
import TableActionMenu from '../../../components/TableActionMenu';
import {BsEye} from "react-icons/bs";
import {IoCheckmarkCircle} from "react-icons/io5"
import PageLoader from '../../../components/PageLoader';
import { useAppSelector } from '../../../app/hooks';

function PendingTrainee() {
    const [showTableMenu, setShowTableMenu] = useState(false)
    const status = useAppSelector(state => state.admin.status);
    const [viewApplicationModal, setViewApplicationModal] = useState(false);
    const [pendingTrainees, setPendingTrainees] = useState([
        {
            name: {
                first: "Endaline",
                last: "Inmotion"
            },
            course: "Front End",
            OtherInformation:"Information"
        },
        {
            name: {
                first: "Seyi",
                last: "Inmotion"
            },
            course: "UI/UX",
            OtherInformation: "Information",
        },
        {
            name: {
                first: "Chibueze",
                last: "Inmotion"
            },
            course: "Graphics",
            OtherInformation:"Information"
        }
    ])
    const handleTableMenu = ()=>{
        setShowTableMenu(!showTableMenu)
    }

    // const handleViewApplication = (id: string)  => async (evt: React.MouseEvent) => {
    //     setViewApplicationModal(true);
    //     // const data = newMembers.find((item) => {
    //     //   return item._id === id; 
    //     // })
    //     // setUserData(data);
    
    //     // setCurrentRow(-1);
    //     // setLoading(true);
    //     // await dispatch(viewMember(id)).unwrap();
    //     // setLoading(false);
    
    //     // if (!requestError) {
    //     //   setViewApplicationModal(true);
    //     // }
        
    //   }
    const [currentRow, setCurrentRow] = useState(-1);
  const handleShowMenu = (index: number) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    if (currentRow === index) setCurrentRow(-1);
    else setCurrentRow(index);
  };

  
  return (
    <div className='border w-[100%] py-8 rounded-lg my-8'>
      <div>
        <div className='my-4 text-2xl text-[#73D942]  pl-8'>
        <h2>Pending ATP Trainess</h2>
        </div>
        <table className='w-[100%]  '>
            <tr className='text-[#828282] '>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Course Type</th>
                <th>Other Information</th>
                <th>Action</th>
            </tr>
            {
            pendingTrainees?.map((PendingTrainee, index) => (
              <tr className="even:bg-[#F5F5F5] odd:bg-[#FEFEFE] text-center text-[#828282] font-[5s00] text-[18px]" key={++index}>
                <td>{++index}</td>
                <td>{PendingTrainee?.name?.first}</td>
                <td>{PendingTrainee?.name?.last}</td>
                <td>{PendingTrainee?.course}</td>
                <td>{PendingTrainee?.OtherInformation}</td>
                <td className="relative">
                  <div className="flex space-x-1 justify-center items-center py-2 hover:cursor-pointer" onClick={handleShowMenu(index)}>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                  </div>
                  {currentRow === index && <div className="relative after:absolute after:border-8 after:border-r-transparent after:border-b-[#F9F9F9] after:border-l-transparent after:-top-3 after:left-[40%] after:border-t-transparent">
                    <div className="absolute top-1 w-44 py-2 bg-[#F9F9F9] -right-1 z-50 rounded-lg pl-3 text-[#307D0B] font-[300] text-[14px] shadow-xl">
                      <p className="flex items-center my-2 space-x-2 hover:cursor-pointer" ><span className="text-xl"><BsEye /></span><span>View Application</span></p>
                      <p className="flex items-center space-x-2 mb-2 hover:cursor-pointer"><span className="text-xl"><IoCheckmarkCircle /></span><span>Approve Application</span></p>
                    </div>
                  </div>
                  }
                </td>
              </tr>
            ))
          }
        </table>

                {/* {viewApplicationModal && <div className="fixed top-0 bottom-0 left-0 right-0 bg-transparentBlack overflow-y-scroll">
            {!loading && <div className="flex items-center justify-center">
                <ViewApplicationModal application={newMember} user={userData} approveApplication={handleApproveApplication} closeModal={handleCloseModal} />
              </div>
            }
            {loading && <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex justify-center items-center"><Loader /></div>
            </div>
            }
          </div>
        } */}
      </div>
      {/* LOADER */}
      {
        status === "loading" && !viewApplicationModal && <PageLoader />
    
      }
      {/* </div> */}
    </div>
  )
}
export default PendingTrainee