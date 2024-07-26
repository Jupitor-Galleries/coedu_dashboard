import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Students.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';

const Students = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([
        {
            fullName: "Justine Imasiku",
            whatsappNumber: "+260779293183",
        }
    ])

    const broadcast = () => {

    }
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
                                <h3>{clas.fullName}</h3>
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