import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Announcements.css'
import StudentModal from "../dashboard_page/components/modal/StudentModal";
import { useParams } from "react-router-dom";
import { getAssignmentsByClass } from "../../api/class";
import SideNav from "../dashboard_page/components/sidenav/SideNav";
import AssignmentsModal from "../dashboard_page/components/modal/AssignmentsModal";
import { FaBell } from "react-icons/fa";
import AnnouncementModal from "../dashboard_page/components/modal/AnnouncementsModal";
import { getAnnouncements } from "../../api/announcement";
import RightNav from "../dashboard_page/components/rightnav/RightNav";

const Announcements = () => {
  const classId = useParams().classId;
  const [modalOpened, setModalOpened] = useState(false);
  const [announcements, setAnnouncements] = useState([]);

  const broadcast = () => {};
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const allAnnouncements = async () => {
    const res = await getAnnouncements(classId);
    console.log(res);
    if (res?.status) {
      setAnnouncements(res.data);
    }
  };
  useEffect(() => {
    allAnnouncements();
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
                Schedule Session
              </button> */}
              <button
                className="create-btn"
                onClick={() => setModalOpened(true)}
              >
                Make Announcement
              </button>
            </div>
          </div>
          <h4>Recent Announcements</h4>
          <div className="announcements">
            {
              announcements.map((ann) => {
                return (
                  <div className="ann" key={ann.id}>
                    <p>{ann.title}</p> {ann.description}
                  </div>
                )
              })
            }
          </div>
        </div>
        <RightNav />
        <AnnouncementModal
          modalOpened={modalOpened}
          onClose={() => setModalOpened(false)}
          allAssignments={allAnnouncements}
          classId={classId}
        />
      </div>
    </div>
  );
};

export default Announcements;
