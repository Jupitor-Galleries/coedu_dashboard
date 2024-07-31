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
import { FaUser } from 'react-icons/fa';


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
      <div className="dashboard-page-data">
        <h2>Welcome to your dashboard {classDetails.name}</h2>
        <div className="d-actions">
          <div className="action">
            <div className="a-icon">
              <FaUser />
            </div>
            <div className="a--content">
              <h4>Add Other Admins</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni magnam exercitationem quidem odit sequi tenetur sit sed vero quisquam impedit est optio repellat eveniet necessitatibus, tempore nam ipsam ipsum temporibus.</p>
            </div>
          </div>
          <div className="action">
            <div className="a-icon">
              <FaUser />
            </div>
            <div className="a--content">
              <h4>Add Classes</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni magnam exercitationem quidem odit sequi tenetur sit sed vero quisquam impedit est optio repellat eveniet necessitatibus, tempore nam ipsam ipsum temporibus.</p>
            </div>
          </div>
          <div className="action">
            <div className="a-icon">
              <FaUser />
            </div>
            <div className="a--content">
              <h4>Add Students</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni magnam exercitationem quidem odit sequi tenetur sit sed vero quisquam impedit est optio repellat eveniet necessitatibus, tempore nam ipsam ipsum temporibus.</p>
            </div>
          </div>
          <div className="action">
            <div className="a-icon">
              <FaUser />
            </div>
            <div className="a--content">
              <h4>Share Resources</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni magnam exercitationem quidem odit sequi tenetur sit sed vero quisquam impedit est optio repellat eveniet necessitatibus, tempore nam ipsam ipsum temporibus.</p>
            </div>
          </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default MainPage