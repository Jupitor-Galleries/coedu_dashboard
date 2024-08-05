import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Events.css';
import StudentModal from "../dashboard_page/components/modal/StudentModal";
import { useParams } from "react-router-dom";
import { getAssignmentsByClass } from "../../api/class";
import SideNav from "../dashboard_page/components/sidenav/SideNav";
import AssignmentsModal from "../dashboard_page/components/modal/AssignmentsModal";
import { FaBell } from "react-icons/fa";
import RightNav from "../dashboard_page/components/rightnav/RightNav";
import EventModal from "../dashboard_page/components/modal/EventModal";
import { getEvents } from "../../api/events";
import { getCurrentUser } from "../../api/auth";

const Events = () => {
  const classId = useParams().classId;
  const [modalOpened, setModalOpened] = useState(false);
  const [events, setEvents] = useState([]);

  const broadcast = () => {};
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const allEvents = async () => {
    const res = await getEvents(classId);
    console.log(res);
    if (res?.status) {
      setEvents(res.data);
    }
  };
  useEffect(() => {
    allEvents();
  }, []);

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
    <div className="dashboard-container">
      <SideNav organization={"organization"} classId={classId} currentUser={currentUser} />
      <div className="dashboard-page-data2">
        <div className="students-container">
          {/* <div className="notif-cont">
            <div className="ico">
              <FaBell />
            </div>
          </div> */}
          <div className="h">
            <h3>{currentUser?.organization.name}</h3>
            <div className="flex-row">
              
              <button
                className="create-btn"
                onClick={() => setModalOpened(true)}
              >
               Schedule Event
              </button>
            </div>
          </div>
          <h4>Events</h4>
          <div className="announcements">
            {
              events.map((ann) => {
                return (
                  <div className="ann" key={ann.id}>
                    <p>{ann.title}</p>
                    <h4>{ann.description} <a className="b-btn" href={ann.eventLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></h4> 
                  </div>
                )
              })
            }
          </div>
        </div>
        <RightNav />
        <EventModal
          modalOpened={modalOpened}
          onClose={() => setModalOpened(false)}
          classId={classId}
        />
      </div>
    </div>
  );
};

export default Events;
