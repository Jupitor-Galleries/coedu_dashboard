import React, { useState, useEffect } from "react";
import './Modal.css';

const StudentModal = ({modalOpened, onClose}) => {

    const [classes, setClasses] = useState(["Business", "Communications", 'Technology']);
    const [fullName, setFullName] = useState("");
    const [classs, setClass] = useState("Business");
    const [whatsappNumber, setWhatsappNumber] = useState([]);

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
               Add New Student
            </div>
        <hr />
        <div className="form-group">
            <label htmlFor="fullname">Full Name</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="form-group">
            <label htmlFor="appnumber">Whatsapp number</label>
          <input type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} />
        </div>

        <div className="form-group">
            <label htmlFor="class">Class</label>
          <select name="class" id="class" value={classs} onChange={(e) => setClass(e.target.value)}>
            {
                classes.map((clas, index) => {
                    return (
                        <option value={clas}>{clas}</option>
                    )
                })
            }
          </select>
        </div>

        <button className="c-btn">Add</button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;