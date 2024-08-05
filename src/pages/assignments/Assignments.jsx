import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Assignments.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getAssignmentsByClass } from '../../api/class'
import SideNav from '../dashboard_page/components/sidenav/SideNav';
import AssignmentsModal from '../dashboard_page/components/modal/AssignmentsModal';
import { FaBell } from 'react-icons/fa';
import RightNav from '../dashboard_page/components/rightnav/RightNav';
import { getCurrentUser } from '../../api/auth';

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

    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUs = async() => {
      const res = await getCurrentUser();
      if(res.status) {
        console.log(res.data);
        setCurrentUser(res.data)
      }
    }
  
    useEffect(() => {
      getCurrentUs()
    }, [])
  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} classId={classId} currentUser={currentUser} />
        <div className="dashboard-page-data2">
            <div className="students-container">
            <div className="notif-cont">
            <div className="ico">
              <FaBell />
            </div>
          </div>
          <div className="h">
            <h3>{currentUser?.organization.name}</h3>
            <div className="flex-row">
              {/* <button
                className="create-btn3"
                onClick={() => setModalOpened(true)}
              >
                Make Announcement
              </button> */}
              <button
                className="create-btn"
                onClick={() => setModalOpened(true)}
              >
                Create Assignement
              </button>
            </div>
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
                                    <NavLink to={`/assignment/${classId}/${assignment._id}`} className='create-btn3'>View Assignment</NavLink>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <RightNav />
            <AssignmentsModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} allAssignments={allAssignments} classId={classId}/>
        </div>
    </div>
  )
}

export default Assignments