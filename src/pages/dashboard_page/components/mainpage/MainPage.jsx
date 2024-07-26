import React, { useEffect, useState } from 'react';
import './MainPage.css';
import { IoMdMenu } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import userImg from '../../assets/user.png';
import analytic1 from '../../assets/analytic1.png';
import ResouceModal from '../modal/ResourceModal';
import StudentModal from '../modal/StudentModal';
import AssignmentsModal from '../modal/AssignmentsModal';
import AnnouncementModal from '../modal/AnnouncementsModal';
import { NavLink } from 'react-router-dom';
import { getClassDetails } from '../../../../api/class'
import { getCurrentUser } from '../../../../api/auth'


const MainPage = ({classs}) => {

  const [resourceModalOpened, setResourceModalOpened] = useState(false)
  const [studentModalOpened, setStudentModalOpened] = useState(false)
  const [assignmentModalOpened, setAssignmentModalOpened] = useState(false)
  const [announcementModalOpened, setAnnouncementModalOpened] = useState(false)
  const [classDetails, setClassDetails] = useState({})
  const [userDetails, setUserDetails] = useState({
    "_id": "",
    "name": "username",
    "email": "email@gmail.com",
    "role": "teacher",
    "__v": 0
})
  const getUserDetails = async ()=>{
    const res = await getCurrentUser()
    if(res?.status){
      setUserDetails(res.data)
    }
  }
  const fetchClassDetails = async ()=>{
    const res = await getClassDetails(classs)
    if(res?.status){
      setClassDetails(res.data.class)
    }
  }

  useEffect(()=>{
    fetchClassDetails()
    getUserDetails()
  },[])

  return (
    <div className='mainpage-container'>
      <div className="mainpage-data">
      <div className="d-header">      
        <div className="d-header-data">
          <div className="notif-icon">
            <IoMdNotificationsOutline />
          </div>
          <div className="d-profile">
            <div className="prof-img">
              <img src={userImg} alt="" />
            </div>
            <div className="prof-name">
              {userDetails.name}
            </div>
            <div className="more-icon">
              <MdExpandMore />
            </div>
          </div>
        </div>
        <div className="menu mobile">
          <IoMdMenu />
        </div>
      </div>
      <div className="d-welcome">
        <h2>Welcome {userDetails.name}</h2>
        <p>Manage your class in one place</p>
        <div className="welcome-analytics">
          <div className="analytics-data">
            <div className="analytics-img">
              <img src={analytic1} alt="" />
            </div>
            <div className="analytics-dat">
              <p>Students</p>
              <h4>1283</h4>
            </div>
          </div>
          <div className="analytics-data">
            <div className="analytics-img">
              <img src={analytic1} alt="" />
            </div>
            <div className="analytics-dat">
              <p>Resources</p>
              <h4>25</h4>
            </div>
          </div>
          <div className="analytics-data">
            <div className="analytics-img">
              <img src={analytic1} alt="" />
            </div>
            <div className="analytics-dat">
              <p>assignements</p>
              <h4>5</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-page-data">
        <h2>{classDetails.name}</h2>
        <div className="d-first-sect">
        <div className="d-asset-overview">
            <div className="card-header">
              <h4>Students</h4>
              <button className="btn1" onClick={() => setStudentModalOpened(true)}>Add New Student</button>
            </div>

            <div className="card-cont">
              <NavLink to={`/students/${classs}`}>View All Students</NavLink>
            </div>
            
          </div>
          <div className="d-asset-overview">
            <div className="card-header">
              <h4>Resources</h4>
              <button className="btn1" onClick={() => setResourceModalOpened(true)}>Add New Resource</button>
            </div>
            <div className="card-cont">
              <NavLink to='/resources'>View All Resources</NavLink>
            </div>
            
          </div>
          
        </div>
        <div className="d-first-sect">
        <div className="d-asset-overview">
            <div className="card-header">
              <h4>Assignments</h4>
              <button className="btn1" onClick={() => setAssignmentModalOpened(true)}>Create New Assignment</button>
            </div>
            <div className="card-cont">
              <NavLink to='/assignments'>View Previous Assignments</NavLink>
            </div>
          </div>

          <div className="d-asset-overview">
            <div className="card-header">
              <h4>Announcements</h4>
              <button className="btn1" onClick={() => setAnnouncementModalOpened(true)}>Make Announcement</button>
            </div>
            <div className="card-cont">
              <NavLink to='/announcements'>View Previous Announcements</NavLink>
            </div>
          </div>

          
          
        </div>
        {/* <div className="d-asset-overview">
            <div className="card-header">
              <h4>Polls</h4>
              <button className="btn1" onClick={() => setStudentModalOpened(true)}>Share New Poll</button>
            </div>
          </div> */}
      </div>
      </div>

      <ResouceModal modalOpened={resourceModalOpened} onClose={() => setResourceModalOpened(false)} />
      <StudentModal modalOpened={studentModalOpened} onClose={() => setStudentModalOpened(false)} classId={classs}/>
      <AssignmentsModal modalOpened={assignmentModalOpened} onClose={() => setAssignmentModalOpened(false)} classId={classs}/>
      <AnnouncementModal modalOpened={announcementModalOpened} onClose={() => setAnnouncementModalOpened(false)} classId={classs}/>
      
    </div>
  )
}

export default MainPage