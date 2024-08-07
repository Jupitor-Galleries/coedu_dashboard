import React, { useEffect, useState } from 'react';
import './DashboardPage.css'
import SideNav from './components/sidenav/SideNav';
import MainPage from './components/mainpage/MainPage';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../api/auth';
import { getRecentData } from '../../api/recent';

const DashboardPage = () => {

  // const organization = useParams().organization;
  const classId = useParams().classId;
  const [recent, setRecent] = useState({});

  const [currentUser, setCurrentUser] = useState(null);

  const getCurrentUs = async() => {
    const res = await getCurrentUser();
    if(res.status) {
      console.log(res.data);
      setCurrentUser(res.data)
    }
  }

  useEffect(() => {
    getCurrentUs();
    localStorage.setItem('lastClass', classId)
  }, [])

  const allRecent = async() => {
    const res = await getRecentData(classId)
    console.log(res);
    
    if(res?.status) {
        setRecent(res.data)
    }
}

useEffect(() => {
    allRecent()
},[])
  

  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} classId={classId} currentUser={currentUser} />
        <MainPage classs={classId} currentUser={currentUser} recent={recent} />
    </div>
  )
}

export default DashboardPage