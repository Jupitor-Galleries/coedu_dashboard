import React from 'react';
import './Features.css';
import feat1 from '../../assets/feat1.png';
import feat2 from '../../assets/feat2.png';
import feat3 from '../../assets/feat3.png';

const Features = () => {
  return (
    <div className='features-container'>
        <h2>Key Features</h2>
        <div className="features">
            <div className="feature">
                <div className="feature-icon">
                    <img src={feat1} alt="" />
                </div>
                <div className="feature-info">
                    <p>Organize and manage all your educational content in one place, ensuring easy access and seamless updates.</p>
                </div>
            </div>
            <hr />
            <div className="feature">
                <div className="feature-icon">
                    <img src={feat2} alt="" />
                </div>
                <div className="feature-info">
                    <p>Effortlessly distribute your content across various social media platforms to reach your audience wherever they are.</p>
                </div>
            </div>
            <hr />
            <div className="feature">
                <div className="feature-icon">
                    <img src={feat3} alt="" />
                </div>
                <div className="feature-info">
                    <p>Gain insights into your content's performance with comprehensive analytics, helping you understand engagement and optimize future deliveries.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features