import React, { useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { replyToQuerry } from '../../../../api/querries';

const RespondMessageModal = ({ modalOpened, onClose, message }) => {

  const [response, setResponse] = useState("");


  if (!modalOpened) {
    return null
  }

  console.log(message);
  
  const respondQuery = async() => {
    // setLoading(true);
      
        const res = await replyToQuerry(message._id, response);
        if(res?.status){
          // setLoading(false);
          onClose();
            alert("Responded")
        }else{
          // setLoading(false);
            alert(res.error)
        }

     
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
         <p>{message.queryText}</p>
          <div className="form-group">
            {/* <label htmlFor="response">Response</label> */}
            <textarea type="text" placeholder='Type your response here'  value={response} onChange={(e) => setResponse(e.target.value)} />
          </div>

          <button className="c-btn" onClick={() => respondQuery()} >Reply</button>
        </div>
      </div>
    </div>
  )
}

export default RespondMessageModal