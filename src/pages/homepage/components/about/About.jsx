import React from 'react';
import './About.css';
import img from '../../assets/about.png';

const About = () => {
  return (
    <div className='about-container'>
        <div className="about-content">
            <div className="about-data">
                <h2>What is CoEdu?</h2>
                <p>CoEdu is a powerful content management and distribution platform designed to streamline the delivery of educational materials. Ideal for EdTech companies, NGOs, and institutions serving remote learners, CoEdu makes it easy to manage, distribute, and track educational content across multiple social media platforms..</p>
            </div>
            <div className="about-img">
                <img src={img} alt="" />
            </div>
        </div>
    </div>
  )
}

export default About