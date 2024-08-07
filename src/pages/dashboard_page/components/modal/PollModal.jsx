import React, { useState, useEffect } from "react";
import './Modal.css';
import { IoMdClose } from "react-icons/io";

const ResouceModal = ({modalOpened, onClose}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");

    const shareResources = () => {

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
               Create Poll
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

        <button className="c-btn" onClick={() => shareResources()}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default ResouceModal;