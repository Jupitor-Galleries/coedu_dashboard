import React, { useState} from "react";
import './Modal.css';
import {sendass } from '../../../../api/class'
import { uploadImages } from "../../../../api/uploadFiles";

const AssignmentsModal = ({modalOpened, onClose, classId, allAssignments}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [dueDate, setDueDate] = useState(""); 
    const [filesUrl, setFilesUrl] = useState(null);

    const handleChange = (e) => {
      if (e.target.files) {
        setFile(Array.from(e.target.files));
      }
    };

    const saveFiles = async() => {
      const res = await uploadImages(file, "assignments" )
      if(res) {
        setFilesUrl(res.url)
        return res[0].url
      }
       return "https://docs.google.com/document/d/10BI6TCegR5DAPw2ajmp476Dp9o5P4ko1lbr_mnQ9LqU/edit?usp=sharing" 
    }

    const shareResources = async() => {
        const filelink = await saveFiles()
        
          const res = await sendass (title, description, filelink, dueDate, classId)
          if(res?.status){
              alert("sent an assignment")
              allAssignments()
          }else{
              alert(res.error)
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
          <input type="file" multiple onChange={handleChange} />
        </div>

        <div className="form-group">
            <label htmlFor="duedate">Due date</label>
            <input type="datetime-local" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>

        <button className="c-btn" onClick={() => shareResources()}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsModal;