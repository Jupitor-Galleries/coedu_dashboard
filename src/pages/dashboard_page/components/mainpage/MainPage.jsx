import React, { useEffect, useRef, useState } from "react";
import "./MainPage.css";
import StudentModal from "../modal/StudentModal";
import AnnouncementModal from "../modal/AnnouncementsModal";
import { NavLink, useParams } from "react-router-dom";
import { getClassDetails, getClassStudents } from "../../../../api/class";
import { getCurrentUser } from "../../../../api/auth";
import RightNav from "../rightnav/RightNav";
import Loader from "../../../../components/loader/Loader";
import CanvasJSReact from '@canvasjs/react-charts';
import { LineChart } from '@mui/x-charts/LineChart';
import { FaArrowCircleDown, FaPlus } from "react-icons/fa";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const MainPage = ({ classs, currentUser, recent, classes, setClasses, querries }) => {
  const classId = useParams().classId;

  const [resourceModalOpened, setResourceModalOpened] = useState(false);
  const [studentModalOpened, setStudentModalOpened] = useState(false);
  const [assignmentModalOpened, setAssignmentModalOpened] = useState(false);
  const [announcementModalOpened, setAnnouncementModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classDetails, setClassDetails] = useState({});
  const [currentClass, setCurrentClass] = useState(currentUser?.organization.name);
  const [students, setStudents] = useState([]);
  const [userDetails, setUserDetails] = useState({
    _id: "",
    name: "username",
    email: "email@gmail.com",
    role: "teacher",
    __v: 0,
  });

  const [engagementData, setEngagementData] = useState(null);

  const getUserDetails = async () => {
    const res = await getCurrentUser();
    if (res?.status) {
      setUserDetails(res.data);
    }
  };
  const fetchClassDetails = async () => {
    setLoading(true);
    const res = await getClassDetails(classs);
    if (res?.status) {
      setClassDetails(res.data.class);
    }
    setLoading(false);
  };

  const allStudents = async () => {
    const res = await getClassStudents(classId);
    if (res?.status) {
      setStudents(res.data.students);
    }
  };

  const classesRef = useRef(null);
  const toggleRef = useRef(null);

  const toggleClasses = () => {
    if(classesRef.classList.contains("none")) {
      classesRef.classList.remove("none");
      toggleRef.classList.add("none");
    }
      
    }

  useEffect(() => {
    fetchClassDetails();
    getUserDetails();
  }, []);

  useEffect(() => {
    // allStudents();
  }, []);

  return (
    <div className="mainpage-container">
      <div className="mainpage-data2">
        <div className="dashboard-page-data">
          <div className="h">
            <div className="classes-toggle" >
              <div className="class-in-toggle" ref={toggleRef} onClick={toggleClasses}>
                {currentUser?.organization.name}
                <FaArrowCircleDown />
              </div>
              {/* <h3>{currentClass?.name}</h3> */}
              <div className="other-classes-toggle none" ref={classesRef}>
              {
                classes.map((classs) => {
                  return (
                    <NavLink to={`/class/${classs._id}`}>{classs.name}</NavLink>
                  )
                })
              }
              <div value="class-in-toggle">
                Create New
                <FaPlus />
              </div>
              </div>
              
            </div>
            <div className="flex-row">
              <button
                className="create-btn"
                onClick={() => setAnnouncementModalOpened(true)}
              >
                Make Announcement
              </button>
            </div>
          </div>
          <hr />

          {
            engagementData ?
              <div className="gra">

                <p>Engangement Time</p>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10, 18, 24] }]}
                  series={[
                    {
                      data: [2, 5.5, 2, 8.5, 1.5, 5, 7, 1],
                    },
                  ]}
                  width={700}
                  height={300}
                />
                <p style={{ textAlign: "center" }}>Time in hours</p>
              </div> : null
          }


          {
            recent ?
              <>
                <h3>Recent Activities</h3>

              {
                recent?.assignment.name?<NavLink className={`rec cloudy-blue`}>
                <div className="flex-row-space">
                  <h4>Assignment - {recent?.assignment?.name}</h4>

                </div>

                <div className="flex-row-space">
                  <div className="flex-column-center">
                    <p>Sent</p>
                    <h3>{recent?.assignment?.sent}</h3>
                  </div>
                  <hr />
                  <div className="flex-column-center">
                    <p>Delivered</p>
                    <h3>{recent?.assignment?.delivered}</h3>
                  </div>
                  <hr />
                  <div className="flex-column-center">
                    <p>Opened</p>
                    <h3>{recent?.assignment?.read}</h3>
                  </div>
                  <hr />
                  <div className="flex-column-center">
                    <p>Submitted</p>
                    <h3>{recent?.assignment?.submitted}</h3>
                  </div>
                </div>
              </NavLink> : null
              }

              {
                recent?.resource?.name?  <NavLink className={`rec cloudy-blue`}>
                <div className="flex-row-space">
                  <h4>Resource - {recent?.resource?.name}</h4>

                </div>

                <div className="flex-row-space">
                  <div className="flex-column-center">
                    <p>Sent</p>
                    <h3>{recent?.resource?.sent}</h3>
                  </div>
                  <hr />
                  <div className="flex-column-center">
                    <p>Delivered</p>
                    <h3>{recent?.resource?.delivered}</h3>
                  </div>
                  <hr />
                  <div className="flex-column-center">
                    <p>Opened</p>
                    <h3>{recent?.resource?.read}</h3>
                  </div>
                </div>
              </NavLink> : null
              }
                
               {
                recent?.announcement?.name? <NavLink className={`rec cloudy-blue`}>
                <div className="flex-row-space">
                  <h4>Announcement - {recent?.announcement?.name || "Class today at 6pm"}</h4>

                </div>

                <div className="flex-row-space">
                  <div className="flex-column-center">
                    <p>Sent</p>
                    <h3>{recent?.announcement?.sent}</h3>
                  </div>
                  <hr />
                  <div className="flex-column-center">
                    <p>Delivered</p>
                    <h3>{recent?.announcement?.delivered}</h3>
                  </div>
                  <hr />
                  <div className="flex-column-center">
                    <p>Opened</p>
                    <h3>{recent?.announcement?.read}</h3>
                  </div>
                </div>
              </NavLink> : null
               }

                

              </> : <p style={{ textAlign: "center", marginTop: "100px", fontSize: "30px" }}>Congratulations on Creating a new class, you can now share manage and distribute resources to students</p>
          }




        </div>
        <RightNav querries={querries} />
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
      <Loader loading={loading} />
    </div>
  );
};

export default MainPage;
