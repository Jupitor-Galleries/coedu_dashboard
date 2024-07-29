import React, { useState, useEffect } from 'react';
import "./Classes.css";
import { NavLink } from 'react-router-dom';
import ClassModal from './modal/ClassModal';
import { getUserClasses } from '../../api/class'
import SideNav from '../dashboard_page/components/sidenav/SideNav';

const Classes = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([
        {
            name: "Tech Nomads",
            date: "22-05-2024",
            sdate: "22-05-2024",
            time: "12:35"
        },
        {
            name: "Asikana Network",
            date: "22-05-2024",
            sdate: "22-05-2024",
            time: "12:35"
        },
    ])
    
    const fetchUserClasses = async () => {
            const res = await getUserClasses()
            if(res.status) {
                setClasses(res.data.classes)
            }
    }


    useEffect(() => {
        fetchUserClasses()
    },[])


  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} />
        <div className="mainpage-container">
            <div className="students-container">
                <div className="h">
                    <h4>School Name</h4>
                    <button className='create-btn' onClick={() => setModalOpened(true)}>Create New Class</button>
                </div>
            <table className="students">
                <tr>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th>Start Date</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>
                {
                    classes.map((student) => {
                        return (
                            <tr>
                                <td>
                                    {student.name}
                                </td>
                                <td>
                                    {student.date}
                                </td>
                                <td>
                                    {student.sdate}
                                </td>
                                <td>
                                    {student.time}
                                </td>
                                <td>
                                    <button className='create-btn'>Manage Class</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <ClassModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} />
        </div>
    </div>
  )
}

export default Classes