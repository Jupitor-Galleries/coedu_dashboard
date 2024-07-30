import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Assignments.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getAssignmentsByClass } from '../../api/class'
import SideNav from '../dashboard_page/components/sidenav/SideNav';
import AssignmentsModal from '../dashboard_page/components/modal/AssignmentsModal';

const Assignments = () => {
    const classId = useParams().classId;
    const [modalOpened, setModalOpened] = useState(false);
    const [assignements, setAssignments] = useState([])

    const broadcast = () => {

    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      };
    const allAssignments = async() => {
        const res = await getAssignmentsByClass(classId)
        console.log(res)
        if(res?.status) {
            setAssignments(res.data)
        }
    }
    useEffect(() => {
        allAssignments()
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
                    assignements.map((assignment) => {
                        return (
                            <tr>
                                <td>
                                    {assignment.title}
                                </td>
                                <td>
                                    {formatDate(assignment.createdAt)}
                                </td>
                                <td>
                                    {formatDate(assignment.dueDate)}
                                </td>
                                <td>
                                    <NavLink to={`/assignment/${assignment._id}`} className='create-btn2'>View</NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <AssignmentsModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} allAssignments={allAssignments} classId={classId}/>
        </div>
    </div>
  )
}

export default Assignments