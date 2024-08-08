import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";
import { NavLink } from "react-router-dom";
import Header from "../header/Header";
import ellipse from '../../assets/ellipse.png'
import WaitlistModal from "../modal/WaitlistModal";
import { sendWaitList } from '../../../../api/waitList'



const Hero = () => {
 
const [modalOpen, setmodalOpen] = useState(false)
const [email, setEmail] = useState("");

const joinList = async ()=>{
   const res = await sendWaitList(email)
   alert(res.message)
}

  return (
    <div className="hero-container">
      <Header />
      <div className="hero-content">
        <h2>Reach students with Learning content on their preferred platforms
        </h2>
        <p>Coedu leverages the power of WhatsApp and Telegram to deliver engaging learning materials from learning institutions directly to students' fingertips.</p>
        <div className="waitlist">
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email here" />
          <button onClick={joinList}>Join Waitlist</button>
        </div>
      </div>
      <img className='ellipse' src={ellipse} alt="" />
      {/* <WaitlistModal modalOpened={modalOpen} onClose={() => setmodalOpen(false)} /> */}
    </div>
  );
};

export default Hero;