import React, { useEffect, useState } from "react";
import "./MainPage.css";
import { IoMdMenu } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import analytic1 from "../../assets/analytic1.png";
import ResouceModal from "../modal/ResourceModal";
import StudentModal from "../modal/StudentModal";
import AssignmentsModal from "../modal/AssignmentsModal";
import AnnouncementModal from "../modal/AnnouncementsModal";
import { NavLink, useParams } from "react-router-dom";
import { getClassDetails, getClassStudents } from "../../../../api/class";
import { getCurrentUser } from "../../../../api/auth";
import { FaBell, FaUser } from "react-icons/fa";

const MainPage = ({ classs }) => {
  const classId = useParams().classId;

  const [resourceModalOpened, setResourceModalOpened] = useState(false);
  const [studentModalOpened, setStudentModalOpened] = useState(false);
  const [assignmentModalOpened, setAssignmentModalOpened] = useState(false);
  const [announcementModalOpened, setAnnouncementModalOpened] = useState(false);
  const [classDetails, setClassDetails] = useState({});
  const [students, setStudents] = useState([]);
  const [userDetails, setUserDetails] = useState({
    _id: "",
    name: "username",
    email: "email@gmail.com",
    role: "teacher",
    __v: 0,
  });
  const getUserDetails = async () => {
    const res = await getCurrentUser();
    if (res?.status) {
      setUserDetails(res.data);
    }
  };
  const fetchClassDetails = async () => {
    const res = await getClassDetails(classs);
    if (res?.status) {
      setClassDetails(res.data.class);
    }
  };

  const allStudents = async () => {
    const res = await getClassStudents(classId);
    if (res?.status) {
      setStudents(res.data.students);
    }
  };

  useEffect(() => {
    fetchClassDetails();
    getUserDetails();
  }, []);

  return (
    <div className="mainpage-container">
      <div className="mainpage-data">
        <div className="dashboard-page-data">
          <div className="notif-cont">
            <div className="ico">
              <FaBell />
            </div>
          </div>
          <div className="h">
            <h3>Asikana Network</h3>
            <div className="flex-row">
              <button
                className="create-btn3"
                onClick={() => setAnnouncementModalOpened(true)}
              >
                Create Announcement
              </button>
              <button
                className="create-btn"
                onClick={() => setStudentModalOpened(true)}
              >
                Add Student
              </button>
            </div>
          </div>
          <hr />

          <div className="d-overview">
            <NavLink className="nav-card cloudy-blue">
              <h4>Class Students</h4>
              <h4>0</h4>
            </NavLink>
            <NavLink className="nav-card black">
              <h4>Active Assignments</h4>
              <h4>0</h4>
            </NavLink>
            <NavLink className="nav-card blue">
              <h4>Escalated Questions</h4>
              <h4>0</h4>
            </NavLink>
            <NavLink className="nav-card navy-blue">
              <h4>Class Students</h4>
              <h4>0</h4>
            </NavLink>
          </div>
          <h3>Upcoming Sessions</h3>
          <div className="session">
            <h4>Introduction To React Hooks</h4>
            <p>13-08-2024 - 2pm</p>
            <p>Venue: Google Meet</p>
            <button className="create-btn">Join</button>
          </div>
        </div>
      </div>
      <AnnouncementModal
        modalOpened={announcementModalOpened}
        onClose={() => setAnnouncementModalOpened(false)}
        classId={classId}
        fetchStudents={allStudents}
      />
      <StudentModal
        modalOpened={studentModalOpened}
        onClose={() => setStudentModalOpened(false)}
        classId={classId}
        fetchStudents={allStudents}
      />
    </div>
  );
};

export default MainPage;
