import {useState, useEffect} from 'react'
import NewTrainees from '../../features/atp/NewTrainees'
import ATPTrainee from '../../features/atp/ATPTrainee'
import ATPDashboardLayout from '../../components/layout/atp/ATPDashbaordLayout'
import { type NextPageWithLayout } from '../_app'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setAlert, setLayoutSubTitle } from '../../features/user/userSlice'
import PendingTrainees from '../../features/atp/PendingTrainees'
import AddTrainee from '../../features/atp/AddTrainee'
import ActiveTrainee from '../../features/atp/ActiveTrainee'
import Head from 'next/head'
import classNames from 'classnames'

const Trainee: NextPageWithLayout = () => {
  const title = useAppSelector(state => state.user.layoutTitle);
  const subTitle = useAppSelector(state => state.user.subTitle);
  const alert = useAppSelector(state => state.user.alert);
  const dispatch = useAppDispatch();
  const handleClick = (text: string) => (evet: React.MouseEvent)=>{
    dispatch(setLayoutSubTitle(text));
  }

  useEffect(() => {
    dispatch(setAlert({show: false, status: "completed", message: ""}))
  }, [])
  
  return (
    <div>
      <Head>
        <title>QMSAI | ATP Trainee</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        alert.show && <div className={classNames("text-center fixed top-0 left-0 right-0 py-1 text-lg",{
          "bg-green-100 text-green2 fade": (alert?.status === "completed"),
          "bg-red-100 text-red-500 fade": (alert?.status === "failed")
        })}>{alert?.message}</div>
      }

      {title && !subTitle  && <ATPTrainee handleClick={handleClick}/>}
      {title  && subTitle === "Add Trainee" && <div> <AddTrainee/> </div>}
      {title && subTitle === "Add Trainee Score" && <div><NewTrainees/> </div>}
      {title  && subTitle === "Trainee Certificate Payment" && <div><PendingTrainees /></div>}
      {title  && subTitle === "Active/Certified Trainees" && <div><ActiveTrainee/></div>}
      {/* {title && subTitle === "New Trainee" && <div><NewTrainees/> </div>} */}
      {title  && subTitle === "List of Trainee" && <div> please </div>}
      {title  && subTitle === "Inactive/Certified Trainees" && <div> Typescript </div>}
    </div>
  )
}

Trainee.getLayout = ATPDashboardLayout;
export default Trainee