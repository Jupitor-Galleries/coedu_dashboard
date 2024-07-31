import React, { useState, useEffect, useRef } from 'react';
import "./Classes.css";
import { NavLink } from 'react-router-dom';
import ClassModal from './modal/ClassModal';
import { getUserClasses } from '../../api/class'
import { getCurrentUser } from '../../api/auth'
import SideNav from '../dashboard_page/components/sidenav/SideNav';
// import NoClasses from './components/NoClasses';

const Classes = () => {

    const [modalOpened, setModalOpened] = useState(false);
    const [user,setUser] = useState({})
    const [classes, setClasses] = useState([])
    const ref1 = useRef(null);
    
    const getUserDetails = async ()=>{
        const res = await getCurrentUser()
        if(res?.status){
            setUser(res.data)
        }
    }
    const fetchUserClasses = async () => {
            const res = await getUserClasses()
            console.log(res)
            if(res?.status) {
                setClasses(res.data.classes)
            }
    }


    useEffect(() => {
        fetchUserClasses()
        getUserDetails()
    },[])


  return (
    <div className='class-container'>
        <p className='welcome-note'>Welcome to CoEdu,<br/>Courtney</p>
        {/* <NoClasses/> */}
        <ClassModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} fetchUserClasses={fetchUserClasses} />
    </div>
  )
}

export default Classes