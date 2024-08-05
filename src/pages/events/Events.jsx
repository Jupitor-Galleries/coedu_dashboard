import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import StudentModal from "../dashboard_page/components/modal/StudentModal";
import { useParams } from "react-router-dom";
import { getAssignmentsByClass } from "../../api/class";
import SideNav from "../dashboard_page/components/sidenav/SideNav";
import AssignmentsModal from "../dashboard_page/components/modal/AssignmentsModal";
import { FaBell } from "react-icons/fa";
import RightNav from "../dashboard_page/components/rightnav/RightNav";
import EventModal from "../dashboard_page/components/modal/EventModal";

const Events = () => {
  const classId = useParams().classId;
  const [modalOpened, setModalOpened] = useState(false);
  const [assignements, setAssignments] = useState([]);

  const broadcast = () => {};
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const allAssignments = async () => {
    const res = await getAssignmentsByClass(classId);
    console.log(res);
    if (res?.status) {
      setAssignments(res.data);
    }
  };
  useEffect(() => {
    allAssignments();
  }, []);
  return (
    <div className="dashboard-container">
      <SideNav organization={"organization"} classId={classId} />
      <div className="dashboard-page-data2">
        <div className="students-container">
          <div className="notif-cont">
            <div className="ico">
              <FaBell />
            </div>
          </div>
          <div className="h">
            <h3>Asikana Network</h3>
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
               Schedule Event
              </button>
            </div>
          </div>
          <h4>Events</h4>
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
