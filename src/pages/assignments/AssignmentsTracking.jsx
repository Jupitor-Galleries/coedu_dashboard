import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Assignments.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getClassStudents } from '../../api/class'
import { getAssignmentDetails } from '../../api/assignment'
import SideNav from '../dashboard_page/components/sidenav/SideNav';
import AssignmentsModal from '../dashboard_page/components/modal/AssignmentsModal';
import RightNav from '../dashboard_page/components/rightnav/RightNav';
import Loader from '../../components/loader/Loader'

const AssignmentsTracking = () => {
    const classId = useParams().classId;
    const assignmentId = useParams().assignmentId;
    const navigate = useNavigate();
    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([])
    const [assignement, setAssignment] = useState({});


    const [unreadd, setUnread] = useState(0);
    const [read, setRead] = useState(0);
    const [submitted, setSubmitted] = useState(0);
    const [graded, setGraded] = useState(0);
    const [loading, setLoading] = useState(false);

    const viewWork = (studentId) => {
        navigate(`/assignment/${classId}/${assignmentId}/${studentId}`)
    }
    const allStudents = async() => {
        setLoading(true);
        const res = await getAssignmentDetails(assignmentId)
        if(res?.status) {
            console.log(res.data);
            setAssignment(res.data);
            const unread = res.data?.students.filter((student) => student.status === "failed");
            setUnread(unread.length);
            const read = res.data?.students.filter((student) => student.status === "delivered");
            setRead(read.length);
            const submitted = res.data?.students.filter((student) => student.status === "submitted");
            setSubmitted(submitted.length);
            const graded = res.data?.students.filter((student) => student.status === "graded");
            setGraded(graded.length);
        }
        setLoading(false)
    }
    useEffect(() => {
        allStudents()
    },[])
  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} classId={classId} />
        <div className="dashboard-page-data2">
            <div className="students-container">
                
                {/* <div className="d-overview">
            <NavLink className="nav-card2 red">
              <h4>Undelivered</h4>
              <h4>{unreadd}</h4>
            </NavLink>
            <NavLink className="nav-card2 black">
              <h4>Unread</h4>
              <h4>{read}</h4>
            </NavLink>
            <NavLink className="nav-card2 blue">
              <h4>Submitted</h4>
              <h4>{submitted}</h4>
            </NavLink>
            <NavLink className="nav-card2 navy-blue">
              <h4>Graded</h4>
              <h4>{graded}</h4>
            </NavLink>
          </div> */}

          <h3>{assignement.title}</h3>
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
                                    {
                                        student.status === 'submitted'?<button onClick={() => viewWork(student?.studentId._id)} className='create-btn2'>View Submission</button>: <button disabled className='create-btn4'>Awaiting Submission</button>
                                    }
                                    
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <RightNav />
            <AssignmentsModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} />
            <Loader loading={loading} />
        </div>
    </div>
  )
}

export default AssignmentsTracking