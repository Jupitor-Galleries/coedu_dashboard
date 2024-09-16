import React from 'react';
import './SideNav.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { BiLogOut } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { TbReport } from "react-icons/tb";
import { IoMdTime } from 'react-icons/io';
import { BsFuelPumpDiesel } from "react-icons/bs";
import { LiaRouteSolid } from "react-icons/lia";
import { FaRegBuilding } from "react-icons/fa";
import userImg from '../../assets/user.png';

const SideNav = ({organization, classId, currentUser, active}) => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwt');
        navigate("/")
    }
    return (
        <div className='sidenav-container desktop'>
            <div className="prof-dat">
            <div className="logo">
                <img src={userImg} alt="" />
            </div>
            <h4>{currentUser?.name}</h4>
            </div>
            
            <hr />
            <div className="sidenav-content">
                <div className="sidenav-data">
                    {/* <NavLink>Home</NavLink> */}
                    <ul className="sidenav-links">
                        <li>
                            <NavLink to={`/class/${classId}`} className={`sidenav-link ${active === "dashboard"? "active2": null}`}>
                                <GoHomeFill />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/students/${classId}`} className={`sidenav-link ${active === "students"? "active2": null}`}>
                                <FaRegBuilding />
                                Students
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/announcements/${classId}`} className={`sidenav-link ${active === "announcements"? "active2": null}`}>
                                <TbReport />
                                Announcements
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/assignments/${classId}`} className={`sidenav-link ${active === "assignments"? "active2": null}`}>
                                <IoMdTime />
                               Assignments
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/resources/${classId}`} className={`sidenav-link ${active === "resources"? "active2": null}`}>
                                <LiaRouteSolid />
                                Resources
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/events/${classId}`} className={`sidenav-link ${active === "events"? "active2": null}`}>
                                <LiaRouteSolid />
                                Events
                            </NavLink>
                        </li>
                        
                    </ul>
                </div>
                {/* <div className="sidenav-data">
                    <NavLink>General</NavLink>
                </div> */}
                <ul className="sidenav-links">
                        {/* <li>
                            <NavLink className="sidenav-link">
                                <IoSettingsOutline />
                                Settings
                            </NavLink>
                        </li> */}
                        {/* <li>
                            <NavLink to='/help' className="sidenav-link">
                                <IoMdHelpCircleOutline />
                                Help Center
                            </NavLink>
                        </li> */}
                        <li>
                            <button className="sidenav-link" onClick={logout}>
                                <BiLogOut />
                                Logout
                            </button>
                        </li>
                    </ul>
            </div>
        </div>
    )
}

export default SideNav