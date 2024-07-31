import React, { useState} from "react";

const WaitlistModal = ({modalOpened, onClose}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

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
               Be the first to use the product
            </div>
        <hr />
        <div className="form-group">
          <label htmlFor="title">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button className="c-btn" >Join</button>
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;