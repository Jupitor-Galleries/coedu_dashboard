import React, { useState, useEffect } from "react";
import { addClass } from "../../../api/class"
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ClassModal = ({modalOpened, onClose, fetchUserClasses}) => {

    const [className, setClassName] = useState("");
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('Not Required');
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const createClass = async() => {
      const notify = () => toast("Class created successfully");
       
       const res = await addClass(className, startDate, startDate)
       if (res.status) {
           notify();
           fetchUserClasses()
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
      <div className="modal-close">
          <button className="close" onClick={onClose}>
           
          <IoMdClose />
          </button>
        </div>
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
        {/* <div className="form-group">
          <label htmlFor="enddate">End Date</label>
          <input type="date"  value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div> */}
         <ToastContainer />

        <button className="c-btn" onClick={() => createClass()}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default ClassModal;