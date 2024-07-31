import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Students.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getClassStudents, getClassDetails } from '../../api/class'
import SideNav from '../dashboard_page/components/sidenav/SideNav';

const Students = () => {
    const classId = useParams().classId;
    const [modalOpened, setModalOpened] = useState(false);
    const [clas, setClas] = useState()
    const [students, setStudents] = useState([])

    const broadcast = () => {

    }
    const classDetails = async()=>{
        const res = await getClassDetails(classId)
        console.log("class details", res)
        if(res?.status){
            setClas(res.data.class)
        }
    }
    const allStudents = async() => {
        const res = await getClassStudents(classId)
        if(res?.status) {
            setStudents(res.data.students)
        }
    }
    useEffect(() => {
        allStudents()
        classDetails()
    },[])
  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} />
        <div className="mainpage-container">
            <div className="students-container">
                <div className="h">
                    <h4>Asikana Network</h4>
                    <button className='create-btn' onClick={() => setModalOpened(true)}>Add New Student</button>
                </div>
            <table className="students">
                <tr>
                    <th>Name</th>
                    <th>Whatsapp Number</th>
                    <th>Class Code</th>
                    <th>Status</th>
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
                                    {student.whatsappNumber}
                                </td>
                                <td>
                                    {clas?.name}
                                </td>
                                <td>
                                    {student.accepted == true? "joined" : "pending"}
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
            <StudentModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} classId={classId} fetchStudents={allStudents} />
        </div>
    </div>
  )
}

export default Students