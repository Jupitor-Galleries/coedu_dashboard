import React, { useState, useEffect } from "react";
import { addClass } from "../../../api/class"

const ClassModal = ({modalOpened, onClose}) => {

    const [className, setClassName] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const createClass = async() => {
       
       const res = await addClass(className, startDate, endDate)
       if (res.status) {
           alert("Class created successfully");
           onClose()
       }else{
            alert("failed to create class")
       }
    }
    

  if(!modalOpened) {
    return null
  }
  
  return (
    <div
      className="gallery-details-modal">
        
     
      
      <div className="gallery-modal-data">
      <button className="close" onClick={onClose}>Close</button>
      <div className="modal-form">
        <div className='user-profile-stats'>
               Create New Class
            </div>
        <hr />
        <div className="form-group">
          <label htmlFor="classname">Class Name</label>
          <input type="text" value={className} onChange={(e) => setClassName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="startdate">Start date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="enddate">End Date</label>
          <input type="date"  value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <button className="c-btn" onClick={() => createClass()}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;