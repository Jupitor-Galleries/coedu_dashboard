import React, { useEffect, useState, useRef } from "react";
import "./Hero.css";
import { NavLink } from "react-router-dom";
import Header from "../header/Header";
import ellipse from '../../assets/ellipse.png'
import WaitlistModal from "../modal/WaitlistModal";



const Hero = () => {
 
const [modalOpen, setmodalOpen] = useState(false)


  return (
    <div className="hero-container">
      <Header />
      <div className="hero-content">
        <h2>Simplify Your Educational Content Delivery</h2>
        <p>Empower Your Remote Learners with Seamless Content Management and Distribution.</p>
        <button onClick={() => setmodalOpen(true)}>Join Waitlist</button>
      </div>
      <img className='ellipse' src={ellipse} alt="" />
      <WaitlistModal modalOpened={modalOpen} onClose={() => setmodalOpen(false)} />
    </div>
  );
};

export default Hero;