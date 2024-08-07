import React, { useState} from "react";
import './Modal.css';
import { uploadImages } from "../../../../api/uploadFiles";
import { sendAnnouncement } from "../../../../api/announcement";
import { IoMdClose } from "react-icons/io";

const AnnouncementModal = ({modalOpened, onClose, classId}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [filesUrl, setFilesUrl] = useState([]);

    const handleChange = (e) => {
      if (e.target.files) {
        setFile(Array.from(e.target.files));
      }
    };

    const saveFiles = async() => {
      const res = await uploadImages(file, "announcements" )
      if(res) {
        setFilesUrl(res.url)
        return res[0].url
      }
    }
    
    const shareResources = async() => {
      const filelink = await saveFiles()
        const res = await sendAnnouncement(title, description, filelink, classId)
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
        <div className="modal-close">
          <button className="close" onClick={onClose}>
           
          <IoMdClose />
          </button>
        </div>
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
        <div className="form-group">
          <label htmlFor="files">Attachments</label>
          <input type="file" multiple onChange={handleChange} />
        </div>

        <button className="c-btn" onClick={() => shareResources()}>Announce</button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;