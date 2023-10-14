import React,{useState} from 'react'
import TableActionMenu from '../../components/TableActionMenu'

function CourseList() {
    const [showTableMenu, setShowTableMenu] = useState(false)
    const [courseList, setCourseList] = useState([
        {
            name: "Basic IOS Auditing",
            course: "Basic IOS Auditing",
            status: "Approved",

        },

        {
            name: "Basic IOS Auditing",
            course: "Basic IOS Auditing",
            status: "Approved",

        },
        {
            name: "Basic IOS Auditing",
            course: "Basic IOS Auditing",
            status: "Approved",

        },
       
       
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
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Course Details</th>
              <th>Status</th>
              <th>Action</th>
          </tr>
          {
             courseList.map((course, index) => (
              <tr className='text-[#828282] even:bg-[#F5F5F5] text-center'>
                  <td>{++index}</td>
                  <td>{course.name}</td>
                  <td>{course.course}</td>
                  <td>{course.status}</td>
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

export default CourseList