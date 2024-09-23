import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'

const RespondMessageModal = ({ modalOpened, onClose, message }) => {

  const [response, setResponse] = useState("")


  if (!modalOpened) {
    return null
  }


  return (
    <div
      className="gallery-details-modal2">



      <div className="gallery-modal-data2">
        <div className="modal-close">
          <button className="close" onClick={onClose}>

            <IoMdClose />
          </button>
        </div>
        <div className="modal-form">
          <div className='user-profile-stats'>
            Message
          </div>
          <hr />
         <p>{message.querryText}</p>
          <div className="form-group">
            <label htmlFor="response">Response</label>
            <textarea type="text" placeholder='Type your response here'  value={response} onChange={(e) => setResponse(e.target.value)} />
          </div>

          <button className="c-btn" >Send</button>
        </div>
      </div>
    </div>
  )
}

export default RespondMessageModal