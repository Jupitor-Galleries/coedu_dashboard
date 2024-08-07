import React, { useState, useEffect } from "react";
import './Modal.css';
import { uploadImages } from "../../../../api/uploadFiles";
import { sendResources } from "../../../../api/resources";
import { IoMdClose } from "react-icons/io";

const ResouceModal = ({modalOpened, onClose, classId}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState("document");
    const [filesUrl, setFilesUrl] = useState([]);

    const handleChange = (e) => {
      if (e.target.files) {
        setFile(Array.from(e.target.files));
      }
    };

    const saveFiles = async() => {
      const res = await uploadImages(file, "resources" )
      if(res) {
        setFilesUrl(res.url)
        return res[0].url
      }
       return "https://docs.google.com/document/d/10BI6TCegR5DAPw2ajmp476Dp9o5P4ko1lbr_mnQ9LqU/edit?usp=sharing" 
    }

    const shareResources = async() => {
      const filelink = await saveFiles()
        
          const res = await sendResources (title, description, fileType, filelink, classId)
          if(res?.status){
              alert("Resources have been sent")
              // allAssignments()
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
        <div className="modal-close">
          <button className="close" onClick={onClose}>
           
          <IoMdClose />
          </button>
        </div>
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
          <label htmlFor="filetype">
            <select name="filetype" id="filetype" value={fileType} onChange={(e) => setFileType(e.target.value)}>
              <option value="PDF">PDF</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="files">File</label>
          <input type="file" multiple onChange={handleChange} />
        </div>

        <button className="c-btn" onClick={() => shareResources()}>Share</button>
        </div>
      </div>
    </div>
  );
};

export default ResouceModal;