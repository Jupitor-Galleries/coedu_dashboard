import React, { useState, useEffect } from "react";
import "./Modal.css";
import { uploadImages } from "../../../../api/uploadFiles";
import { sendResources } from "../../../../api/resources";
import { createEvent } from "../../../../api/events";
import { IoMdClose } from "react-icons/io";

const EventModal = ({ modalOpened, onClose, classId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventLink, setEventLink] = useState("");

  const scheduleEvent = async () => {
    const res = await createEvent(title, description, eventLink, classId);
    if (res?.status) {
      alert("Event has been scheduled");
    } else {
      alert(res.error);
    }
  };

  if (!modalOpened) {
    return null;
  }

  return (
    <div className="gallery-details-modal">
      <div className="gallery-modal-data">
        <div className="modal-close">
          <button className="close" onClick={onClose}>
           
          <IoMdClose />
          </button>
        </div>
        <div className="modal-form">
          <div className="user-profile-stats">Create Event</div>
          <hr />
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="files">Meeting Link</label>
            <input
              type="text"
              value={eventLink}
              onChange={(e) => setEventLink(e.target.value)}
            />
          </div>

          <button className="c-btn" onClick={() => scheduleEvent()}>
            Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
