import React, { useState } from 'react';
import './RightNav.css';
import { IoMdText } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom/dist';

const RightNav = () => {
    const [messages, setMessages] = useState(
       [

       ]
    );
    const [reminders, setReminders] = useState([
        
    ]);
  return (
    <div className='rightnav-container'>
        <div className="messages">
            <div className="flex-row-space">
                <div className="flex-row">
                    <IoMdText />
                    <p>Messages</p>
                </div>
                <p>Clear</p>
            </div>
            <div className="msg-nav">
                <NavLink>Total (0)</NavLink> <hr />
                <NavLink>Handled by bot (0)</NavLink> <hr />
                <NavLink>Escalated (0)</NavLink>
            </div>
            {
                messages.length<1? <p>You have no messages at the moment</p> : <>
                {
                messages.map((message) => {
                    return (
                        <div className="message">
                            <small><i>{message.time}</i></small>
                            <p>{message.text}</p>
                            <div className="flex-row-space">
                                <small><i>by {message.by}</i></small>
                                <button>Reply</button>
                            </div>
                        </div>
                    )
                })
            }</>
            }
            
            <hr />
            <div className="flex-row-space">
                <div className="flex-row">
                    <FaBell />
                    <p>Reminders</p>
                </div>
                <p>Clear</p>
            </div>
            {
                reminders.length<1? <p>You have no no active reminders at the moment</p> : <>
                {
                reminders.map((reminder) => {
                    return (
                        <div className={`reminder ${reminder.color}`}>
                            <p>{reminder.type} - {reminder.when}</p>
                            <small><i>02-08-2024</i></small>
                        </div>
                    )
                })
            }</>
            }
            
        </div>
    </div>
  )
}

export default RightNav