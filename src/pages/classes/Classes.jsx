import React, { useState, useEffect } from 'react';
import "./Classes.css";
import { NavLink } from 'react-router-dom';
import ClassModal from './modal/ClassModal';
import { getUserClasses } from '../../api/class'

const Classes = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [classes, setClasses] = useState([])
    
    const fetchUserClasses = async () => {
            const res = await getUserClasses()
            if(res.status) {
                setClasses(res.data.classes)
            }
    }


    useEffect(() => {
        fetchUserClasses()
    },[])


  return (
    <div className='classes-container'>
         <div className="classes-data">
            <button className='create-btn' onClick={() => setModalOpened(true)}>Create New Class</button>
            <div className="classes">
                {
                    classes.map((clas) => {
                        return (
                            <div className="class">
                                <p>{clas.name}</p>
                                <NavLink to={`/class/${clas._id}`}>Manage</NavLink>
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