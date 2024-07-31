import React from 'react'
import { CiCircleCheck } from 'react-icons/ci';
import './Pricing.css';

const Pricing = () => {

    const freeTrier = [
        "Basic content management",
        "Limited storage (1 GB)",
        "Limited number of active students (50 students)"
    ];
    const basicTier = [
        "Expanded content management tools",
        "Increased storage (5GB)",
        "Basic analytics and reporting",
        "Deliver Content in upto 3 languages",
        "Community support forums",
        "Self assistant for students",
        "Up to 150 students",
    ];
    const standardTier = [
        "Comprehensive content management and scheduling",
        "Increased storage (20GB)",
        "Advanced analytics and reporting",
        "Deliver Content in upto 8 languages",
        "Community support forums",
        "Self assistant for students",
        "Up to 500 students",
    ]

  return (
    <div className='pricing-container'>
        <h2>Pick A Plan That Suits You</h2>
        <div className="plans">
            <div className="plan">
                <div className="plan-data">
                    <h4 className="plan-name">Free Tier</h4>
                    <div className="price">
                        <h3 className="figure">0</h3>
                        <small className="duration">/month</small>
                       
                        
                    </div>
                    <hr />
                    <div className="benefits">
                            {
                                freeTrier.map((benefit) => {
                                    return (
                                        <div className="benefit">
                                        <div className="tick-icon">
                                        <CiCircleCheck />
                                        </div>
                                        <p>{benefit}</p>
                                    </div>
                                    )
                                })
                            }
                           
                        </div>
                </div>
                <button>Choose</button>
            </div>
            <div className="plan active-plan">
                <div className="plan-data">
                    <h4 className="plan-name">Basic Tier</h4>
                    <div className="price">
                        <h3 className="figure">$25</h3>
                        <small className="duration">/month</small>
                       
                        
                    </div>
                    <hr />
                    <div className="benefits">
                            {
                                basicTier.map((benefit) => {
                                    return (
                                        <div className="benefit">
                                        <div className="tick-icon">
                                        <CiCircleCheck />
                                        </div>
                                        <p>{benefit}</p>
                                    </div>
                                    )
                                })
                            }
                           
                        </div>
                </div>
                <button>Choose</button>
            </div>
            <div className="plan">
                <div className="plan-data">
                    <h4 className="plan-name">Standard Tier</h4>
                    <div className="price">
                        <h3 className="figure">$50</h3>
                        <small className="duration">/month</small>
                       
                        
                    </div>
                    <hr />
                    <div className="benefits">
                            {
                                standardTier.map((benefit) => {
                                    return (
                                        <div className="benefit">
                                        <div className="tick-icon">
                                        <CiCircleCheck />
                                        </div>
                                        <p>{benefit}</p>
                                    </div>
                                    )
                                })
                            }
                           
                        </div>
                </div>
                <button>Choose</button>
            </div>
        </div>
    </div>
  )
}

export default Pricing