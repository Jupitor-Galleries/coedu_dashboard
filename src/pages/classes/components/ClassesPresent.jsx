import React from 'react';
import { NavLink } from 'react-router-dom';

const ClassesPresent = ({addClass, classes}) => {
  return (
    <div className='classes-cont'>
        <p>Here are the classes you’ve created you can add more by clicking the ‘+’ </p>
        <div className="classes">
          {
            classes.map((classs) => {
              return (
                <NavLink to={`/class/${classs._id}`} className="class">
                  {classs.name}
                </NavLink>
              )
            })
          }
        <button onClick={addClass} className='plusButton'>+</button>
        </div>
    </div>
  )
}

export default ClassesPresent