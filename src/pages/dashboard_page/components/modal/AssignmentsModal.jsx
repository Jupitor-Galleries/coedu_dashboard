import React, { useState} from "react";
import './Modal.css';
import {sendass } from '../../../../api/class'
const AssignmentsModal = ({modalOpened, onClose, classId}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    const [dueDate, setDueDate] = useState("");

    const shareResources = async () => {
        const fileLink = "https://docs.google.com/document/d/10BI6TCegR5DAPw2ajmp476Dp9o5P4ko1lbr_mnQ9LqU/edit?usp=sharing"
        const res = await sendass (title, description, fileLink, dueDate, classId)
        if(res?.status){
            alert("sent an assignment")
        }else{
            alert("failed to upload assignment")
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
               Add New Assignment
            </div>
        <hr />
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Info</label>
          <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="files">Attachments</label>
          <input type="file" multiple value={file} onChange={(e) => setFile(e.target.value)} />
        </div>

        <div className="form-group">
            <label htmlFor="duedate">Due date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>

        <button className="c-btn" onClick={() => shareResources()}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsModal;