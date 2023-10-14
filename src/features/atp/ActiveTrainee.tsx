import React,{useState} from 'react';
import TableActionMenu from '../../components/TableActionMenu'


function ActiveTrainee() {
  const [showTableMenu, setShowTableMenu] = useState(false)
  const [activeTrainee, setActiveTrainee] = useState([
      {
          name: {
              first: "Endaline",
              last: "Inmotion"
          },
          course: "Front End",
          score: 0
      },
      {
          name: {
              first: "Seyi",
              last: "Inmotion"
          },
          course: "UI/UX",
          score: 0
      },
      {
          name: {
              first: "Chibueze",
              last: "Inmotion"
          },
          course: "Graphics",
          score: 0
      }
  ])
  const handleTableMenu = ()=>{
      setShowTableMenu(!showTableMenu)
  }
  return (
    <div className='border w-[80%] m-auto h-[600px] rounded-lg my-8'>
      <div>
        <div className='my-4 text-2xl text-[#73D942]  pl-8'>
        <h2>New Trainess</h2>
        </div>
        <table className='w-[100%]  '>
            <tr className='text-[#828282] '>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Course Type</th>
                <th>Student Score</th>
                <th>Action</th>
            </tr>
            {
               activeTrainee.map((trainee, index) => (
                <tr className='text-[#828282] even:bg-[#F5F5F5] text-center'>
                    <td>{++index}</td>
                    <td>{trainee.name.first}</td>
                    <td>{trainee.name.last}</td>
                    <td>{trainee.course}</td>
                    <td>{trainee.score}</td>
                    <td className='relative'>
                        <div className="flex space-x-1 justify-center items-center py-2 hover:cursor-pointer" onClick={handleTableMenu}>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                        </div>
                        {
                            showTableMenu && <TableActionMenu>
                                <p>nfgngnng</p>
                                <p>hghghhgh</p>
                            </TableActionMenu>
                        }
                    </td>
                </tr>
               )) 
            }
        </table>
      </div>
    </div>
  )
}

export default ActiveTrainee
