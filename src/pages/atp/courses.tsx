import React,{useEffect} from 'react'
import ATPMembership from '../../features/atp/ATPMembership'
import ATPApplication from '../../features/atp/ATPApplication';
import { NextPageWithLayout } from '../_app';
import ATPDashboardLayout from '../../components/layout/atp/ATPDashbaordLayout';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAlert, setLayoutSubTitle } from '../../features/user/userSlice';
import CourseApplication from '../../features/atp/CourseApplication';
import CourseList from '../../features/atp/CourseList';
import Head from 'next/head';
import classNames from 'classnames';

const Courses: NextPageWithLayout = () => {
    const title = useAppSelector(state => state.user.layoutTitle);
    const subTitle = useAppSelector(state => state.user.subTitle);
    const alert = useAppSelector(state => state.user.alert);
    const dispatch = useAppDispatch()
    const handleClick = (text:string) => (evt:React.MouseEvent) => {
       dispatch(setLayoutSubTitle(text))
    } 

  useEffect(() => {
    dispatch(setAlert({show: false, status: "completed", message: ""}))
  }, [])

  return (
      <div>
        <Head>
        <title>QMSAI | ATP Courses</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        alert.show && <div className={classNames("text-center fixed top-0 left-0 right-0 py-1 text-lg",{
          "bg-green-100 text-green2 fade": (alert?.status === "completed"),
          "bg-red-100 text-red-500 fade": (alert?.status === "failed")
        })}>{alert?.message}</div>
      }
      
          <div>
              {title && !subTitle && <ATPMembership handleClick={handleClick} />}
              {title && subTitle === "Course Application" && <div> <CourseApplication/> </div>}
              {title && subTitle === "Course List" && <div><CourseList/> </div>}
              
          </div>
      </div>
  )
}

Courses.getLayout = ATPDashboardLayout;
export default Courses