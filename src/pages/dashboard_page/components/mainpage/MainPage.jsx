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
import Loader from "../../../../components/loader/Loader";
import CanvasJSReact from '@canvasjs/react-charts';

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

  const options = {
    title: {
      text: "Daily Engagement Hours"
    },
    data: [{
      type: "column",
      dataPoints: [
        { label: "6am",  y: 10  },
        { label: "7am", y: 15  },
        { label: "8am", y: 25  },
        { label: "9am",  y: 30  },
        { label: "10am",  y: 28  },
        { label: "11am",  y: 10  },
        { label: "12pm", y: 15  },
        { label: "2pm", y: 25  },
        { label: "3pm",  y: 30  },
        { label: "4pm",  y: 28  },
        { label: "15pm",  y: 10  },
        { label: "6pm", y: 15  },
        { label: "7pm", y: 25  },
        { label: "8pm",  y: 30  },
        { label: "9pmm",  y: 28  },
      ]
    }]
  }

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
          {/* <div className="notif-cont">
            <div className="ico">
              <FaBell />
            </div>
          </div> */}
          <div className="h">
            {/* <h3>{currentUser?.organization.name}</h3> */}
            <select name="class" id="class" defaultValue={currentClass} value={currentClass?.name} onChange={(e) => setCurrentClass(e.target.value)}>
            <option value={currentUser?.organization.name}>
                {currentUser?.organization.name}
              </option>
              {
                classes.map((classs) => {
                  return (
                    <option value={classs._id}><NavLink to={`/class/${classs._id}`}>{classs.name}</NavLink></option>
                  )
                })
              }
              <option value="new">
                Create New
              </option>
            </select>
            <div className="flex-row">
              {/* <button
                className="create-btn3"
                onClick={() => setAnnouncementModalOpened(true)}
              >
                Make Announcement
              </button> */}
              <button
                className="create-btn"
                onClick={() => setAnnouncementModalOpened(true)}
              >
                Make Announcement
              </button>
            </div>
          </div>
          <hr />
          {/* <div className="engage-hour">
            <div className="flex-column">
            <p>Peak Engagement Hours</p>
            <h2>6-9pm</h2>
            </div>
            <hr />
            <div className="flex-column">
            <p>Average Engagement Time</p>
            <h2>47 minutes</h2>
            </div>
          </div> */}

<CanvasJSChart options = {options}
        /* onRef = {ref => this.chart = ref} */
      />

          <h3>Recent Activities</h3>

          {/* { */}
            {/* recent.map((rec) => {
              return ( */}
                <NavLink className={`rec cloudy-blue`}>
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
                </NavLink>
                <NavLink className={`rec cloudy-blue`}>
                <div className="flex-row-space">
                <h4>Resource - {recent?.resource?.name || "Introduction To React"}</h4>
                
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
                    {/* <hr />
                    <div className="flex-column-center">
                      <p>Submitted</p>
                      <h3>{recent?.assignment?.submitted}</h3>
                    </div> */}
                  </div>
                </NavLink>

                <NavLink className={`rec cloudy-blue`}>
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
                    {/* <hr />
                    <div className="flex-column-center">
                      <p>Submitted</p>
                      <h3>{recent?.announcement?.submitted}</h3>
                    </div> */}
                  </div>
                </NavLink>
          
          

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
        <Loader loading={loading}/>
    </div>
  );
};

export default MainPage;
