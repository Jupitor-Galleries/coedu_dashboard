import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AssignmentWork.css";
import { useParams } from "react-router-dom";
import { getAssignmentsByClass } from "../../api/class";
import SideNav from "../dashboard_page/components/sidenav/SideNav";
import AssignmentsModal from "../dashboard_page/components/modal/AssignmentsModal";
import { FaBell } from "react-icons/fa";
import { getQuerries } from "../../api/querries";

const AssignmentWork = () => {
  const classId = useParams().classId;
  const [modalOpened, setModalOpened] = useState(false);
  const [assignements, setAssignments] = useState([]);

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
  const allAssignments = async () => {
    const res = await getAssignmentsByClass(classId);
    console.log(res);
    if (res?.status) {
      setAssignments(res.data);
    }
  };
  useEffect(() => {
    allAssignments();
    fetchQuerries();
  }, []);
  return (
    <div className="dashboard-container">
      <SideNav organization={"organization"} classId={classId} />
      <div className="mainpage-container2">
        <div className="students-container2">
          {/* <div className="notif-cont">
            <div className="ico">
              <FaBell />
            </div>
          </div> */}
          <div className="h">
            <div className="flex-column">
            <h3>Student Name</h3> <br />
            <h2>Score: Not Graded Yet</h2>
            </div>
            
            
          </div>
          <div className="ass-work">
            <div className="doc">
            </div>
            <div className="grading">
            <div className="flex-row">
              <p>Assignment 1</p>
            </div>
                <div className="form-group">
                    <label htmlFor="grade">Grade</label>
                    <input type="text" name="grade" id="grade" />
                </div>
                <div className="form-group">
                    <label htmlFor="grade">Comment</label>
                    <textarea type="text" name="comment" id="comment" />
                </div>
                <div className="form-group">
                    <button className="c-btn">Submit</button>
                </div>
                <hr />
                <p>Recent Comments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentWork;
