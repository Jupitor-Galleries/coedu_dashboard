import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import StudentModal from "../dashboard_page/components/modal/StudentModal";
import { useParams } from "react-router-dom";
import { getAssignmentsByClass } from "../../api/class";
import SideNav from "../dashboard_page/components/sidenav/SideNav";
import AssignmentsModal from "../dashboard_page/components/modal/AssignmentsModal";
import { FaBell } from "react-icons/fa";
import ResouceModal from "../dashboard_page/components/modal/ResourceModal";
import RightNav from "../dashboard_page/components/rightnav/RightNav";
import { getResources } from "../../api/resources";
import { getCurrentUser } from "../../api/auth";
import { getQuerries } from "../../api/querries";

const Resources = () => {
  const classId = useParams().classId;
  const [modalOpened, setModalOpened] = useState(false);
  const [resources, setResources] = useState([]);

  const [querries, setQuerries] = useState([]);

const fetchQuerries = async() => {
  const res = await getQuerries(classId)
  console.log(res);
  
  if(res?.status) {
      setQuerries(res.data)
  }
}

  const broadcast = () => {};
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  const allResources = async () => {
    const res = await getResources(classId);
    console.log(res);
    if (res?.status) {
      setResources(res.data);
    }
  };
  useEffect(() => {
    allResources();
    fetchQuerries();
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
                Share Resources
              </button>
            </div>
          </div>
          <h4>Resources Shared</h4>
          <div className="announcements">
            {
              resources.map((ann) => {
                return (
                  <div className="ann" key={ann.id}>
                    <p>{ann.title}</p>
                    <h4>{ann.description} ({ann.attachmentType})</h4> 
                  </div>
                )
              })
            }
          </div>
        </div>
        <RightNav querries={querries} />
        <ResouceModal
          modalOpened={modalOpened}
          onClose={() => setModalOpened(false)}
          allAssignments={allResources}
          classId={classId}
        />
      </div>
    </div>
  );
};

export default Resources;
