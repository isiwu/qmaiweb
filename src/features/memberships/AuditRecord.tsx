import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import TableActionMenu from "../../components/TableActionMenu";
import { getAuditRecord } from "./membershipSlice";
import ViewAuditModal from "./ViewAuditModal";

const AuditRecord = () => {
  const auditRecord = useAppSelector(state => state.membership.auditRecord);
  const user = useAppSelector(state => state.user.data);
  const dispatch = useAppDispatch();
  const [currRow, setCurrRow] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [viewAudit, setViewAudit] = useState(false);
  const [currAudit, setAudit] = useState({
    _id: "",
    name: "",
    info: "",
    doc: "",
    status: "",
  })
  const handleTableMenu = (index: number) =>  (evt: React.MouseEvent) => {
    evt.stopPropagation();
    if (currRow === index) setCurrRow(-1)
    else setCurrRow(index)
  };
  const handleViewAudit = (id: string) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setViewAudit(true);
    setCurrRow(-1);

    const audit = auditRecord.find(audit => audit._id === id);
    setAudit(audit);
  }

  useEffect(() => {
    (
      async () => {
        setLoading(true);
        await dispatch(getAuditRecord(user._id)).unwrap();
        setLoading(true);
        console.log(auditRecord);
      }
    )()
  }, [])

  return (
    <div>
      {auditRecord.length?<div className='border w-[100%] py-4 rounded-lg my-8'>
        <div>
          <div className='mt-2 text-2xl text-green2  pl-8'>
            <h2>Auditing Record</h2>
          </div>
          <hr />
          <table className='w-[100%]  mt-4'>
              <tr className='text-[#828282] text-left'>
                  <th className="pl-10">S/N</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th >Action</th>
              </tr>
              {
                auditRecord.map((audit, index) => (
                  <tr className='text-[#828282] even:bg-[#F5F5F5] text-left'>
                      <td className="pl-10">{++index}</td>
                      <td>{audit.name}</td>
                      <td>{audit.info}</td>
                      <td>{audit.status.charAt(0).toUpperCase() + audit.status.slice(1).toLowerCase()}</td>
                      {/* <td>{audit.OtherInformation}</td> */}
                      <td className='relative'>
                        <div className="pl-2 flex space-x-1 items-center py-2 hover:cursor-pointer" onClick={handleTableMenu(index)}>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                        </div>
                        {
                            (currRow === index) && <TableActionMenu>
                                <div onClick={handleViewAudit(audit._id)}>
                                  <p className="flex items-center space-x-2 my-2 hover:cursor-pointer"><span className="text-xl"><FaEye /></span><span>Add Trainee Score</span></p>
                                </div>
                                {/* <div onClick={handleDelete}>
                                  <p className="flex items-center space-x-2 mb-2 hover:cursor-pointer"><span className="text-xl"><ImUserMinus /></span><span>Delete Trainee</span></p>
                                </div> */}
                            </TableActionMenu>
                        }
                    </td>
                  </tr>
                )) 
              }
          </table>
        </div>
      </div>:<div className="text-center mt-10 font-[600] text-[20px]">No Record Yet!</div>
      }
      {
        viewAudit && <ViewAuditModal audit={currAudit} closeModal={setViewAudit} />
      }
    </div>
  )
}

export default AuditRecord;