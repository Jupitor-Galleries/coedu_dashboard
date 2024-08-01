import React from 'react'
import './NoClasses.css'

const NoClasses = ({addClass}) => {
  return (
    <div className='noClasses-container'>
        <button onClick={addClass} className='plusButton'>+</button>
        <div className='add-class'>
            <h2>Add your first class </h2>
            <p>Create rich course content and coaching products for your students.<br/>
            When you give them a pricing plan, they’ll appear on your site!</p>
        </div>
    </div>
  )
}

export default NoClasses