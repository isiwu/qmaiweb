import React,{useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PageLoader from '../../components/PageLoader';
import { FaUserEdit } from "react-icons/fa";
import { ImUserMinus } from "react-icons/im";
import TableActionMenu from '../../components/TableActionMenu';
import { addTraineeScore, getNewTrainees, trainee } from './atpSlice';
import TableActionModal from '../../components/TableActionModal';
import Button from '../../components/Button';
import { setAlert, setLayoutSubTitle } from '../user/userSlice';

function NewTrainees() {
    const dispatch = useAppDispatch();
    const newTrainees = useAppSelector(state => state.atp.trainees);
    const atpData = useAppSelector(state => state.atp.data);
    const status = useAppSelector(state => state.atp.status);
    const [currentRow, setCurrentRow] = useState(-1);
    const [currTrainee, setTrainee] = useState(trainee)
    const [actionModal, setActionModal] = useState(false);
    const [score, setScore] = useState("");
    //const [initailLoading, setInitialLoading] = useState(true);
    const handleTableMenu = (index: number) => (evt: React.MouseEvent) => {
        evt.stopPropagation();
        if (currentRow === index) return setCurrentRow(-1);
        setCurrentRow(index)
    };
    const handleAddScore = (id: string) => (evt: React.MouseEvent) => {
        evt.stopPropagation();

        const data = newTrainees.find((trainee => {
            return trainee._id === id
        }))
        setTrainee(data);
        setCurrentRow(-1);
        setActionModal(true);
    };
    const handleDelete = () => {
        console.log("delete trainee")
    }
    const handleScore = async () => {
        dispatch(setAlert({show: false, status: "failed", message: ""}))

        //setInitialLoading(false);
        await dispatch(addTraineeScore({atpId: atpData._id, traineeId: currTrainee._id, score})).unwrap()
        .then(async (data) => {
            if (!data.status) return dispatch(setAlert({show: true, status: "failed", message: "action failed. try again"}));

            await dispatch(getNewTrainees(atpData._id)).unwrap();
            setActionModal(false);
        })
    };
    const handleCancel = () => {
        setActionModal(false);
    };
    const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (isNaN(Number(evt.target.value))) return
        setScore(evt.target.value);
    };
    const handleAddTrainee = () => {
        dispatch(setLayoutSubTitle("Add Trainee"));
    };
    useEffect(() => {
        (
            async () => {
                await dispatch(getNewTrainees(atpData._id)).unwrap()
            }
        )()
        window.onclick = () => {
            setCurrentRow(-1);
        }
    }, [])
  return (
    <div className='border mx-14 rounded-lg my-8 '>
      <div>
        <div className='flex items-center justify-between my-4 pl-8 pr-9'>
          <h2 className='text-2xl text-[#4a9129]'>New Trainees</h2>
          <button className='py-1 px-3 rounded-lg bg-qmaiButton text-white hover:shadow-xl transition-all duration-500' onClick={handleAddTrainee}>Add Trainee</button>
        </div>
        <div className='my-4 text-2xl text-[#73D942]  pl-8'>
        
        </div>
        <table className='w-[100%]'>
            <tr className='text-[#828282] text-left'>
                <th className="pl-12">S/N</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Course</th>
                <th>Score</th>
                <th>Action</th>
            </tr>
            {
               newTrainees.length?newTrainees.map((trainee, index) => (
                <tr className='odd:bg-[#F5F5F5] even:bg-[#FEFEFE] text-left text-[#828282] font-[500] text-[18px]'>
                    <td className='pl-12'>{++index}</td>
                    <td>{trainee.name.first}</td>
                    <td>{trainee.name.last}</td>
                    <td>{trainee.course}</td>
                    <td>{!trainee.score?"nil":trainee.score}</td>
                    <td className='relative'>
                        <div className="pl-2 flex space-x-1 items-center py-2 hover:cursor-pointer" onClick={handleTableMenu(index)}>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                            <span className="w-1 h-1 rounded-full bg-black1"></span>
                        </div>
                        {
                            (currentRow === index) && <TableActionMenu>
                                <div onClick={handleAddScore(trainee._id)}>
                                  <p className="flex items-center space-x-2 my-2 hover:cursor-pointer"><span className="text-xl"><FaUserEdit /></span><span>Add Trainee Score</span></p>
                                </div>
                                <div onClick={handleDelete}>
                                  <p className="flex items-center space-x-2 mb-2 hover:cursor-pointer"><span className="text-xl"><ImUserMinus /></span><span>Delete Trainee</span></p>
                                </div>
                            </TableActionMenu>
                        }
                    </td>
                </tr>
               )): <></>
            }
        </table>
        {
            status==="loading" && <PageLoader />
        }
        {
            actionModal && <TableActionModal>
                <h1 className='text-center'>Add Score For <span className='font-bold'>{currTrainee.name.first.charAt(0).toUpperCase() + currTrainee.name.first.slice(1)} {currTrainee.name.last.charAt(0).toUpperCase() + currTrainee.name.last.slice(1)}</span></h1>
                <div className='mb-6 mt-4 text-center'>
                    <input type="text" value={score} id="score" placeholder='trainee score' className='outline-none border-2 focus:border-2 focus:border-green5 rounded-md' onChange={onChange} />
                </div>
                <div className='flex justify-between'>
                  <button className='border-2 border-green1 rounded-lg px-5 mr-12' onClick={handleCancel}>Cancel</button>
                  <button className='py-3 bg-qmaiButton text-white px-4 rounded-lg' onClick={handleScore}>{status==="loading"?"Adding Score":"Add Score"}</button>
                  {/* <Button text={status==="loading"?"Adding Score":'Add Score'} disabled={status==="loading"?true:false} /> */}
                </div>
            </TableActionModal>
        }
      </div>
    </div>
  )
}

export default NewTrainees
