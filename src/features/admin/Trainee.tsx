import React from 'react'
// import { useAppSelector } from '../../../app/hooks';
// import PageLoader from '../../../components/PageLoader';
// import {BsEye} from "react-icons/bs";
// import {IoCheckmarkCircle} from "react-icons/io5"
// import TableActionMenu from '../../../components/TableActionMenu'
import { TraineeData } from '../atp/atpSlice';

type AppProps = {
  trainees?: TraineeData[]
}

function Trainee({trainees}: AppProps) {
    // const status = useAppSelector(state => state.admin.status);
    // const [viewApplicationModal, setViewApplicationModal] = useState(false);
    // const [showTableMenu, setShowTableMenu] = useState(false)
    // const [inActiveTrainee, setInActiveTrainee] = useState([
    //     {
    //         name: {
    //             first: "Endaline",
    //             last: "Inmotion"
    //         },
    //         course: "Front End",
    //         OtherInformation:"Information"
    //     },
    //     {
    //         name: {
    //             first: "Seyi",
    //             last: "Inmotion"
    //         },
    //         course: "UI/UX",
    //         OtherInformation: "Information",
    //     },
    //     {
    //         name: {
    //             first: "Chibueze",
    //             last: "Inmotion"
    //         },
    //         course: "Graphics",
    //         OtherInformation:"Information"
    //     }
    // ])

  return (
    <div className='border w-[100%] py-8 rounded-lg my-8'>
      <div>
        <div className='my-4 text-2xl text-[#73D942]  pl-8'>
        <h2>Inactive ATP Trainess</h2>
        </div>
        <table className='w-[100%]  '>
            <tr className='text-[#828282] '>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Course Type</th>
                <th>Score</th>
            </tr>
            {
            trainees?.map((trainee, index) => (
              <tr className="even:bg-[#F5F5F5] odd:bg-[#FEFEFE] text-center text-[#828282] font-[5s00] text-[18px]" key={++index}>
                <td>{++index}</td>
                <td>{trainee?.name?.first}</td>
                <td>{trainee?.name?.last}</td>
                <td>{trainee?.email}</td>
                <td>{trainee?.course}</td>
                <td>{trainee?.score}</td>
                {/* <td className="relative">
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
                </td> */}
              </tr>
            ))
          }
        </table>
      </div>
    </div>
  )
}

export default Trainee
  