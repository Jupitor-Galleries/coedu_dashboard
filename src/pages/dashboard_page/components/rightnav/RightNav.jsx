import React, { useState } from 'react';
import './RightNav.css';
import { IoMdText } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom/dist';

const RightNav = () => {
    const [messages, setMessages] = useState([
        {
            text: "I've been trying to submit an assignemt...",
            by: "Francois Mavunila",
            time: "1 hour ago",
        },
        {
            text: "The Dashboard I am building is not showing...",
            by: "Justine Imasiku",
            time: "3 hour ago",
        },
    ]);
    const [reminders, setReminders] = useState([
        {
            type: "Meeting",
            when: "Today, 14:00",
            color: "skysh-blue"
        },
        {
            type: "Share Resources",
            when: "Today, 15:30",
            color: "cloudy-blue"
        },
        {
            type: "End of Week Feedback",
            when: "Today, 16:00",
            color: "navy-blue"
        },
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
                <NavLink>Total (44)</NavLink> <hr />
                <NavLink>Handled by bot (42)</NavLink> <hr />
                <NavLink>Escalated (2)</NavLink>
            </div>
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
                reminders.map((reminder) => {
                    return (
                        <div className={`reminder ${reminder.color}`}>
                            <p>{reminder.type} - {reminder.when}</p>
                            <small><i>02-08-2024</i></small>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default RightNav