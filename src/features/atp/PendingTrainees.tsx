import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
//import { IoCheckmarkCircle } from "react-icons/io5"
import { FaUserEdit } from "react-icons/fa";
import { ImUserMinus } from "react-icons/im";
import TableActionMenu from "../../components/TableActionMenu";
import { getPendingTrainees, traineesCertificatePayment } from "./atpSlice";
import PageLoader from "../../components/PageLoader";
import classNames from "classnames";
import { setAlert } from "../user/userSlice";
import PaymentModalCertificate from "../../components/PaymentModalCertificate";


const PendingTrainees = () => {
  const dispatch = useAppDispatch();
  const pendingTrainees = useAppSelector(state => state.atp.trainees);
  const atpData = useAppSelector(state => state.atp.data);
  const status = useAppSelector(state => state.atp.status);
  const [currentRow, setCurrentRow] = useState(-1);
  const [traineesForPayment, setTraineesForPayment] = useState([]);
  const [paymentModal, setModal] = useState(false);
  const handleShowMenu = (index: number) => (evt: React.MouseEvent) => {
    evt.stopPropagation();
    if (currentRow === index) setCurrentRow(-1);
    else setCurrentRow(index);
  };
  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    if (evt.target.checked) {
      const currTrainee = pendingTrainees.find(pendingTrainee => pendingTrainee._id === evt.target.value);
      const newTrainee = {
        ...currTrainee,
        amount: 50,
        date: new Date(),
      }
      setTraineesForPayment([...traineesForPayment, newTrainee]);
    } else {
      const trainees = traineesForPayment.filter(trainee => trainee._id !== evt.target.value);
      setTraineesForPayment(trainees);
    }
  };
  const handlePaymentModal = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setModal(true);
  }
  const handleMakePayment = async () => {
    dispatch(setAlert({show: false, status: "failed", message: ""}))
    await dispatch(traineesCertificatePayment({atpId: atpData._id, trainees: traineesForPayment})).unwrap()
    .then(async data => {
      if (!data?.status) {
        dispatch(setAlert({show: true, status: "failed", message: "action failed. try again."}))
      } else {
        await dispatch(getPendingTrainees(atpData._id)).unwrap();
        dispatch(setAlert({show: true, status: "completed", message: "action successful!."}))
      }
    })
  };
  useEffect(() => {
    dispatch(setAlert({show: false, status: "failed", message: ""}));

    (
      async () => {
        if (!atpData?._id) {
          dispatch(setAlert({show: true, status: "failed", message: "Please login to perform your action"}));
          return;
        }
        
        await dispatch(getPendingTrainees(atpData?._id)).unwrap();
      }
    )()

    window.onclick = function() {
      setCurrentRow(-1);
    }
  }, [])
  return (
    <div>
      {pendingTrainees.length?<div className="border-2 mt-5 mx-5 rounded-md pb-5">
        <div className="flex justify-between px-8 my-4">
          <h1 className="text-2xl text-[#73D942]">Trainee Certificate Payment</h1>
          <div ><button className={classNames("py-2 bg-qmaiButton px-6 text-white rounded-xl disabled:opacity-50 disabled:hover:cursor-not-allowed")} disabled={!traineesForPayment.length?true:status==="loading"?true:false} onClick={handlePaymentModal}>Make Payment</button></div>
        </div>
        <table className="table-auto border-collapse border-spacing-x-9 w-full">
          <thead>
            <tr className="text-[#828282] font-[300] text-[14px] text-left">
              <th className="pl-8">First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Score</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {
            pendingTrainees.map((pendingTrainee, index) => (
              <tr className="odd:bg-[#F5F5F5] even:bg-[#FEFEFE] text-left text-[#828282] font-[5s00] text-[18px] pl-9" key={++index}>
                <td className="pl-8">{pendingTrainee?.name?.first}</td>
                <td>{pendingTrainee?.name?.last}</td>
                <td>{pendingTrainee?.email}</td>
                <td>{pendingTrainee?.course}</td>
                <td>{pendingTrainee?.score}</td>
                <td className="pl-2">
                  <input type="checkbox" value={pendingTrainee._id} className="w-4 h-4 checked:bg-green4 checked:appearance-none hover:cursor-pointer" onChange={onChange} />
                </td>
                {/* <td className="relative">
                  <div className="flex space-x-1 items-center py-2 pl-2 hover:cursor-pointer" onClick={handleShowMenu(index)}>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                    <span className="w-1 h-1 rounded-full bg-black1"></span>
                  </div>
                  {currentRow === index && <TableActionMenu>
                      <p className="flex items-center space-x-2 mb-2 hover:cursor-pointer"><span className="text-xl"><FaUserEdit /></span><span>Add Trainee Score</span></p>
                      <p className="flex items-center space-x-2 mb-2 hover:cursor-pointer"><span className="text-xl"><ImUserMinus /></span><span>Delete Trainee</span></p>
                  </TableActionMenu>
                  }
                </td> */}
              </tr>
            ))
          }
          </tbody>
        </table>
        { status === "loading" && <PageLoader />}
        {
          paymentModal && <PaymentModalCertificate showModal={paymentModal} setModal={setModal} handleMakePayment={handleMakePayment} />
        }
      </div>:<div className="text-center text-lg mt-5">
        <p>No Pending Trainee Now. Check Again</p>
      </div>
      }
    </div>
  )
}

export default PendingTrainees;