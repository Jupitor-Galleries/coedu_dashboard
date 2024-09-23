import React, { useEffect, useState } from 'react';
import './RightNav.css';
import { IoMdText } from 'react-icons/io';
import { FaBell } from 'react-icons/fa';
import { NavLink } from 'react-router-dom/dist';
import RespondMessageModal from './RespondMessageModal';


const RightNav = ({ querries }) => {
    const [unresolved, setUnresolved] = useState([]);
    const [resolved, setResolved] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageModalOpen, setMessageModalOpen] = useState(false);
    const [openedMessage, setOpenedMessage] = useState(null);

    const getUnresolved = () => {
        setUnresolved(querries.filter(query => query.resolved === false));
        setResolved(querries.filter(query => query.resolved === true));
    }


    const [reminders, setReminders] = useState([

    ]);

    useEffect(() => {
        getUnresolved();
    }, [querries])
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
                    <NavLink>Total ({querries?.length})</NavLink> <hr />
                    <NavLink>Handled by bot ({resolved.length})</NavLink> <hr />
                    <NavLink>Escalated ({unresolved.length})</NavLink>
                </div>
                {
                    unresolved.length < 1 ? <p>You have no messages at the moment</p> : <>
                        {
                            unresolved.map((message) => {
                                return (
                                    <div className="message">
                                        <small><i>{message.timestamp}</i></small>
                                        <p>{message.queryText}</p>
                                        <div className="flex-row-space">
                                            <small><i>by {message.phoneNumber}</i></small>
                                            <button onClick={() => {setOpenedMessage(message); setMessageModalOpen(true)}}>Reply</button>
                                        </div>
                                    </div>
                                )
                            })
                        }</>
                }

                {/* <hr />
                <div className="flex-row-space">
                    <div className="flex-row">
                        <FaBell />
                        <p>Reminders</p>
                    </div>
                    <p>Clear</p>
                </div> */}
                {/* {
                    reminders.length < 1 ? <p>You have no no active reminders at the moment</p> : <>
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
                } */}

            </div>

            <RespondMessageModal modalOpened={messageModalOpen} onClose={() => setMessageModalOpen(false)} message={openedMessage} />
        </div>
    )
}

export default RightNav