import React,{useState} from 'react';
import { NextPageWithLayout } from '../_app';
import AdminDashboardLayout from '../../components/layout/admin/AdminDashboardLayout';
import AdminCourse from '../../features/admin/Courses/AdminCourses';
import AddNewCourse from '../../features/admin/Courses/AddNewCourse';
import CourseApplication from '../../features/admin/Courses/CourseApplication';
import Head from 'next/head';

const Courses: NextPageWithLayout = () => {
  const [currentView, setCurrentView] = useState("")
  
  const handleClick = (text: string) => (evet: React.MouseEvent) => {
  setCurrentView(text)

}
  return (
    <div>
      <Head>
        <title>QMSAI | Admin Courses</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

      <div className=''>
      {currentView === "" && <AdminCourse handleClick={handleClick} />}
      {currentView === "Add New Course" && <AddNewCourse/>}
      {currentView === "Course Application" && <CourseApplication/> }
      </div>
      
    </div>
  )
}
Courses.getLayout = AdminDashboardLayout;
export default Courses
