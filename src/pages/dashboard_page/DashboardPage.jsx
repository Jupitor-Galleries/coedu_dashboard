import React, { useEffect, useState } from 'react';
import './DashboardPage.css'
import SideNav from './components/sidenav/SideNav';
import MainPage from './components/mainpage/MainPage';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../api/auth';

const DashboardPage = () => {

  // const organization = useParams().organization;
  const classId = useParams().classId;

  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUs = async() => {
    const res = await getCurrentUser();
    if(res.status) {
      console.log(res.data);
      setCurrentUser(res.data)
    }
  }

  useEffect(() => {
    getCurrentUs()
  }, [])
  

  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} classId={classId} currentUser={currentUser} />
        <MainPage classs={classId} currentUser={currentUser} />
    </div>
  )
}

export default DashboardPage