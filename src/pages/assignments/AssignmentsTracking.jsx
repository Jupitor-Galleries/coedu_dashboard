import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Assignments.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getClassStudents } from '../../api/class'
import { getAssignmentDetails } from '../../api/assignment'
import SideNav from '../dashboard_page/components/sidenav/SideNav';
import AssignmentsModal from '../dashboard_page/components/modal/AssignmentsModal';

const AssignmentsTracking = () => {
    const assignmentId = useParams().assignmentId;
    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([])
    const [assignement, setAssignment] = useState({})

    const broadcast = () => {

    }
    const allStudents = async() => {
        const res = await getAssignmentDetails(assignmentId)
        if(res?.status) {
            setAssignment(res.data)
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
                    <h4>Asikana Network</h4>
                    <button className='create-btn' onClick={() => setModalOpened(true)}>Create New Assignment</button>
                </div>
            <table className="students">
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Date Submitted</th>
                    <th>Time</th>
                    <th>Action</th>
                </tr>
                {
                    assignement?.students?.map((student) => {
                        return (
                            <tr>
                                <td>
                                    {student.studentId.name}
                                </td>
                                <td>
                                    {student.status}
                                </td>
                                <td>
                                    {student?.subDate || "--" }
                                </td>
                                <td>
                                    {student?.subDate || "--"}
                                </td>
                                <td>
                                    <button className='create-btn2'>View Submission</button>
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

export default AssignmentsTracking