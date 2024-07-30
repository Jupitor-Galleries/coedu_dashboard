import React, { useState, useEffect, useRef } from 'react';
import "./Classes.css";
import { NavLink } from 'react-router-dom';
import ClassModal from './modal/ClassModal';
import { getUserClasses } from '../../api/class'
import { getCurrentUser } from '../../api/auth'
import SideNav from '../dashboard_page/components/sidenav/SideNav';

const Classes = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [user,setUser] = useState({})
    const [classes, setClasses] = useState([])
    const ref1 = useRef(null);
    
    const getUserDetails = async ()=>{
        const res = await getCurrentUser()
        if(res?.status){
            setUser(res.data)
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
        fetchUserClasses()
        getUserDetails()
    },[])


  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} />
        <div className="mainpage-container">
            <div className="students-container">
                <div className="h">
                    <h4>{user.organization}</h4>
                    <button className='create-btn' onClick={() => setModalOpened(true)}>Create New Class</button>
                </div>
            <table className="students">
                {/* <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr> */}
                {
                    classes.map((student) => {
                        return (
                            <tr>
                                <td>
                                    {student.name}
                                </td>
                                <td>
                                <NavLink className='create-bt' to={`/students/${student._id}`}>Manage Students</NavLink>
                                </td>
                                <td>
                                <NavLink className='create-bt' to={`/assignments/${student._id}`}>Manage Assignments</NavLink>
                                </td>
                                
                                <td className='fc'>
                                <NavLink className='create-bt' to='/resources'>Manage Resources</NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <ClassModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} fetchUserClasses={fetchUserClasses} />
        </div>
    </div>
  )
}

export default Classes