import React, { useState} from "react";
import './Modal.css';
import { sendAnnouncement } from '../../../../api/class'

const AnnouncementModal = ({modalOpened, onClose, classId}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState("");
    
    const shareResources = async() => {
      const content = `Title: ${title}\nDescription: ${description}`;
      const type = "text"
        const res = await sendAnnouncement(classId, content, type)
        if(res?.status){
          alert("Announcement sent successfully!")
        }else{
          alert("failed to send announcement")
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
               Make Announcement
            </div>
        <hr />
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Details</label>
          <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {/* <div className="form-group">
          <label htmlFor="files">Attachments</label>
          <input type="file" multiple value={file} onChange={(e) => setFile(e.target.value)} />
        </div> */}

        <button className="c-btn" onClick={() => shareResources()}>Announce</button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;