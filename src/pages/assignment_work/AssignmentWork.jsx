import React, { useState, useEffect } from "react";
import PDFViewer from 'pdf-viewer-reactjs'
import { NavLink } from "react-router-dom";
import "./AssignmentWork.css";
import { useParams } from "react-router-dom";
import { getAssignmentsByClass } from "../../api/class";
import SideNav from "../dashboard_page/components/sidenav/SideNav";
import AssignmentsModal from "../dashboard_page/components/modal/AssignmentsModal";
import { FaBell } from "react-icons/fa";

const AssignmentWork = () => {
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
      <div className="mainpage-container">
        <div className="students-container">
          <div className="notif-cont">
            <div className="ico">
              <FaBell />
            </div>
          </div>
          <div className="h">
            <h3>Student Name</h3>
            <div className="flex-row">
              <p>Assignment 1</p>
            </div>
          </div>
          <div className="ass-work">
            <div className="doc">
            <PDFViewer
            document={{
                url: 'https://firebasestorage.googleapis.com/v0/b/jupitor-galleries.appspot.com/o/USAPCS-Appl-2025-Final.pdf?alt=media&token=b59a2eb4-f4e9-48fe-889a-a9d84729b61e',
            }}
        />
            </div>
            <div className="grading">
                <div className="form-group">
                    <label htmlFor="grade">Grade</label>
                    <input type="text" name="grade" id="grade" />
                </div>
                <div className="form-group">
                    <label htmlFor="grade">Comment</label>
                    <textarea type="text" name="comment" id="comment" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentWork;
