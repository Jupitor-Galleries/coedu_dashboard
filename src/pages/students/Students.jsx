import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Students.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getClassStudents } from '../../api/class'
import SideNav from '../dashboard_page/components/sidenav/SideNav';

const Students = () => {
    const classId = useParams().classId;
    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([])
    const [students, setStudents] = useState([
        {
            name: "Justine Imasiku",
            wNumber: "0779293183",
            class: "shfskj",
            gender: "Male"
        },
        {
            name: "Justine Imasiku",
            wNumber: "0779293183",
            class: "shfskj",
            gender: "Male"
        },
    ])

    const broadcast = () => {

    }
    const allStudents = async() => {
        const res = await getClassStudents(classId)
        if(res?.status) {
            setStudents(res.data.students)
        }
    }
    useEffect(() => {
        allStudents()
    },[])
  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} />
        <div className="mainpage-container">
            <div className="students-container">
                <div className="h">
                    <h4>School Name</h4>
                    <button className='create-btn' onClick={() => setModalOpened(true)}>Add New Student</button>
                </div>
            <table className="students">
                <tr>
                    <th>Name</th>
                    <th>Whatsapp Number</th>
                    <th>Class</th>
                    <th>Gender</th>
                    <th>Action</th>
                </tr>
                {
                    students.map((student) => {
                        return (
                            <tr>
                                <td>
                                    {student.name}
                                </td>
                                <td>
                                    {student.wNumber}
                                </td>
                                <td>
                                    {student.class}
                                </td>
                                <td>
                                    {student.gender}
                                </td>
                                <td>
                                    <button className='delete-btn'>Remove</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <StudentModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} />
        </div>
    </div>
  )
}

export default Students