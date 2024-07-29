import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Assignments.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getClassStudents } from '../../api/class'
import SideNav from '../dashboard_page/components/sidenav/SideNav';
import AssignmentsModal from '../dashboard_page/components/modal/AssignmentsModal';

const Assignments = () => {
    const classId = useParams().classId;
    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([])
    const [assignements, setAssignments] = useState([
        {
            name: "Data Structures",
            date: "22-05-2024",
            time: "25-05-2024",
            id: 1
        },
        {
            name: "Variables",
            date: "22-05-2024",
            time: "25-05-2024",
            id: 2
        },
    ])

    const broadcast = () => {

    }
    const allStudents = async() => {
        const res = await getClassStudents(classId)
        if(res?.status) {
            setAssignments(res.data.students)
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
                    <button className='create-btn' onClick={() => setModalOpened(true)}>Create New Assignment</button>
                </div>
            <table className="students">
                <tr>
                    <th>Title</th>
                    <th>Date Created</th>
                    <th>Due Date</th>
                    <th>Action</th>
                </tr>
                {
                    assignements.map((student) => {
                        return (
                            <tr>
                                <td>
                                    {student.name}
                                </td>
                                <td>
                                    {student.date}
                                </td>
                                <td>
                                    {student.time}
                                </td>
                                <td>
                                    <NavLink to={`/assignments/${student.id}`} className='create-btn2'>View</NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <AssignmentsModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} />
        </div>
    </div>
  )
}

export default Assignments