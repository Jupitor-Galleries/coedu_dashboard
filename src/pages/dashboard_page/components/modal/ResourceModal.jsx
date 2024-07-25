import React, { useState, useEffect } from "react";
import './Modal.css';

const ResouceModal = ({modalOpened, onClose}) => {

    const [title, setTitle] = useState("");
    const [file, setFile] = useState("");

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
               Add New resources
            </div>
        <hr />
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="files">Files</label>
          <input type="file" multiple value={file} onChange={(e) => setFile(e.target.value)} />
        </div>

        <button className="c-btn">Share</button>
        </div>
      </div>
    </div>
  );
};

export default ResouceModal;