import React, { useState, useEffect } from "react";
import './Modal.css';
import { uploadImages } from "../../../../api/uploadFiles";

const ResouceModal = ({modalOpened, onClose}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const shareResources = async() => {
      const res = await uploadImages(file, "resources" )

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
               Add New resources
            </div>
        <hr />
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="files">Files</label>
          <input type="file" multiple value={file} onChange={(e) => setFile(e.target.value)} />
        </div>

        <button className="c-btn" onClick={() => shareResources()}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default ResouceModal;