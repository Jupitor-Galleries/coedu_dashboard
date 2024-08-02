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
import RightNav from "../rightnav/RightNav";

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

  const [recent, setRecent] = useState([
    {
      type: "Created Assignment",
      title: "React Sate Management",
      delivered: "24",
      read: "23",
      submitted: "11",
      graded: "11",
      due: "04-08-2024",
      color: "cloudy-blue",
      status1: "",
      status2: "",
    },
    {
      type: "Shared Resource",
      title: "Introduction To React Hooks",
      delivered: "24",
      read: "18",
      submitted: "6",
      graded: "75%",
      due: "",
      color: "pink",
      status1: "Completed",
      status2: "Completion Rate",
    },
  ])
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
      <div className="mainpage-data2">
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
                Make Announcement
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

          <div className="engage-hour">
            <div className="flex-column">
            <p>Peak Engagement Hours</p>
            <h1>20:00 - 22:00</h1>
            </div>
            <hr />
            <div className="flex-column">
            <p>Average Engagement Time</p>
            <h1>56 Minutes</h1>
            </div>
          </div>

          <h3>Recent Activities</h3>

          {
            recent.map((rec) => {
              return (
                <NavLink className={`rec ${rec.color}`}>
                <div className="flex-row-space">
                <h4>{rec.type} - {rec.title}</h4>
                {
                  rec.due? <p><i>Due: {rec.due}</i></p> : null
                }
                
                </div>
                  
                  <div className="flex-row-space">
                    <div className="flex-column-center">
                      <p>Delivered</p>
                      <h3>{rec.delivered}</h3>
                    </div>
                    <hr />
                    <div className="flex-column-center">
                      <p>Opened</p>
                      <h3>{rec.read}</h3>
                    </div>
                    <hr />
                    <div className="flex-column-center">
                      <p>{rec.status1? rec.status1 : "Submitted"}</p>
                      <h3>{rec.submitted}</h3>
                    </div>
                    <hr />
                    <div className="flex-column-center">
                      <p>{rec.status2? rec.status2 : "Graded"}</p>
                      <h3>{rec.graded}</h3>
                    </div>
                  </div>
                </NavLink>
              )
            })
          }

          {/* <div className="d-overview">
            <NavLink to={`/students/${classId}`} className="nav-card cloudy-blue">
              <h4>Class Students</h4>
              <h4>5</h4>
            </NavLink>
            <NavLink to={`/assignments/${classId}`} className="nav-card black">
              <h4>Active Assignments</h4>
              <h4>3</h4>
            </NavLink>
            <NavLink to={`/questions/${classId}`} className="nav-card blue">
              <h4>Escalated Questions</h4>
              <h4>1</h4>
            </NavLink>
            <NavLink to={`/sessions/${classId}`} className="nav-card navy-blue">
              <h4>Today's Sessions</h4>
              <h4>0</h4>
            </NavLink>
          </div> */}
          {/* <h3>Upcoming Sessions</h3> */}
          {/* <div className="session">
            <h4>Introduction To React Hooks</h4>
            <p>13-08-2024 - 2pm</p>
            <p>Venue: Google Meet</p>
            <button className="create-btn">Join</button>
          </div> */}
        </div>
        <RightNav />
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
