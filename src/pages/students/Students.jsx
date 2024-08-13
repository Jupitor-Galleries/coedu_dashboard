import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { NavLink } from 'react-router-dom';
import './Students.css'
import StudentModal from '../dashboard_page/components/modal/StudentModal';
import { useParams } from 'react-router-dom';
import { getClassStudents, getClassDetails } from '../../api/class'
import SideNav from '../dashboard_page/components/sidenav/SideNav';
import { FaDotCircle } from 'react-icons/fa';
import { IoMdMore } from 'react-icons/io';
import RightNav from '../dashboard_page/components/rightnav/RightNav';
import { getCurrentUser } from '../../api/auth';
import { getQuerries } from '../../api/querries';
import * as XLSX from 'xlsx';

const Students = () => {
    const classId = useParams().classId;
    const [modalOpened, setModalOpened] = useState(false);
    const [clas, setClas] = useState()
    const [students, setStudents] = useState([]);
    const [data, setData] = useState([]);
    const [textToCopy, setTextToCopy] = useState(`Hi students,

To streamline student enquiries, resource sharing, assignments, quizzes, surveys, etc we are exploring an AI-based enrichment tool to facilitate this. You will need to click on [this WhatsApp link] and send a text 'I want to join a class' to rejoin the class and begin the journey with our chatbot.`);

    const [querries, setQuerries] = useState([]);

const fetchQuerries = async() => {
  const res = await getQuerries(classId)
  console.log(res);
  
  if(res?.status) {
      setQuerries(res.data)
  }
}


const handleCopyClick = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        alert('Text copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };
    const classDetails = async()=>{
        const res = await getClassDetails(classId)
        console.log("class details", res)
        if(res?.status){
            setClas(res.data.class)
        }
    }
    const allStudents = async() => {
        const res = await getClassStudents(classId)
        if(res?.status) {
            setStudents(res.data.students)
        }
    }
    useEffect(() => {
        allStudents()
        classDetails()
    },[])

    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUs = async() => {
      const res = await getCurrentUser();
      if(res.status) {
        console.log(res.data);
        setCurrentUser(res.data)
      }
    }
  
    useEffect(() => {
      getCurrentUs();
      fetchQuerries();
    }, [])
  return (
    <div className='dashboard-container'>
        <SideNav organization={"organization"} classId={classId} currentUser={currentUser} />
        <div className="dashboard-page-data2">
            <div className="students-container">
                <div className="h">
                    <h4>{currentUser?.organization.name}</h4>
                    <button className='create-btn' onClick={() => setModalOpened(true)}>Add New Students</button>
                </div>

                <div className="flex-row">
                    <p>Copy this student onboarding message and send it to them to complete onboarding</p>
                    <button onClick={handleCopyClick}>Copy Message</button>
                </div>
            <table className="students">
                <tr>
                    <th>Name</th>
                    <th>Whatsapp Number</th>
                    {/* <th>Class Code</th> */}
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                {
                    students.map((student) => {
                        return (
                            <tr>
                                <td>
                                    {student.name}
                                </td>
                                <td>
                                    {student.whatsappNumber}
                                </td>
                                {/* <td>
                                    {clas?.name}
                                </td> */}
                                <td>
                                    {student.accepted == true? "joined" : "pending"}
                                </td>
                                <td>
                                    <div className="ico">
                                    <IoMdMore />
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>
            </div>
            <RightNav querries={querries} />
            <StudentModal modalOpened={modalOpened} onClose={() => setModalOpened(false)} classId={classId} fetchStudents={allStudents} />
        </div>
    </div>
  )
}

export default Students