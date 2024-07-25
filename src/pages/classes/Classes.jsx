import React, { useState } from 'react';
import "./Classes.css";
import { NavLink } from 'react-router-dom';
import ClassModal from './modal/ClassModal';

const Classes = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([
        {
            className: "Tech",
            schoolName: "nicetyfarm",
        }
    ])
  return (
    <div className='classes-container'>
         <div className="classes-data">
            <button className='create-btn' onClick={() => setModalOpened(true)}>Create New Class</button>
            <div className="classes">
                {
                    classes.map((clas) => {
                        return (
                            <div className="class">
                                <p>{clas.className}</p>
                                <NavLink to={`/${clas.schoolName}/${clas.className}`}>Manage</NavLink>
                            </div>
                        )
                    })
                }
            </div>
         </div>
         <ClassModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} />
    </div>
  )
}

export default Classes