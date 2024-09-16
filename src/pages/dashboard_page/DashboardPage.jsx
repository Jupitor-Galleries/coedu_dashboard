import React, { useEffect, useState } from 'react';
import './DashboardPage.css'
import SideNav from './components/sidenav/SideNav';
import MainPage from './components/mainpage/MainPage';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../api/auth';
import { getRecentData } from '../../api/recent';
import { getUserClasses } from '../../api/class'
import { getQuerries } from '../../api/querries';

const DashboardPage = () => {

  // const organization = useParams().organization;
  const classId = useParams().classId;
  const [recent, setRecent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const active2 = "dashboard"

  const getCurrentUs = async() => {
    const res = await getCurrentUser();
    if(res.status) {
      console.log(res.data);
      setCurrentUser(res.data)
    }
  }

  const fetchUserClasses = async () => {
    const res = await getUserClasses()
    console.log(res)
    if(res?.status) {
        setClasses(res.data.classes)
    }
}


  useEffect(() => {
    getCurrentUs();
    fetchUserClasses();
    localStorage.setItem('lastClass', classId)
  }, [])

  const allRecent = async() => {
    const res = await getRecentData(classId)
    console.log(res);
    
    if(res?.status) {
        setRecent(res.data)
    }
}

const [querries, setQuerries] = useState([]);

const fetchQuerries = async() => {
  const res = await getQuerries(classId)
  console.log(res);
  
  if(res?.status) {
      setQuerries(res.data)
  }
}

useEffect(() => {
    allRecent();
    fetchQuerries();
},[])
  

  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} classId={classId} currentUser={currentUser} active={active2} />
        <MainPage classs={classId} currentUser={currentUser} recent={recent} classes={classes} setClasses={setClasses} querries={querries} />
    </div>
  )
}

export default DashboardPage