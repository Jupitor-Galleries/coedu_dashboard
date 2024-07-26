import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Students.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getClassStudents } from '../../api/class'

const Students = () => {
    const classId = useParams().classId;
    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([])

    const broadcast = () => {

    }
    const allStudents = async() => {
        const res = await getClassStudents(classId)
        if(res?.status) {
            setClasses(res.data.students)
        }
    }
    useEffect(() => {
        allStudents()
    },[])
  return (
    <div className='classes-container'>
         <div className="classes-data">
            <button className='create-btn' onClick={() => setModalOpened(true)}>Add New Student</button>
            <button className='create-btn' onClick={() => broadcast()}>Broadcast Onboarding</button>
            <div className="classes">
                {
                    classes.map((clas) => {
                        return (
                            <div className="class">
                                <div className="flex-row">
                                <h3>{clas.name}</h3>
                                <p>{clas.whatsappNumber}</p>
                                </div>
                                <div className="flex-row">
                                    <button className='delete-btn'>Remove</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
         </div>
         <StudentModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} />
    </div>
  )
}

export default Students