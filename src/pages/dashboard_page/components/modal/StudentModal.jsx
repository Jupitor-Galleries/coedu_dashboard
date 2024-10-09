import React, { useEffect, useState } from "react";
import { addStudent } from "../../../../api/class";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import * as XLSX from "xlsx";
import { addStudents } from "../../../../api/students";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentModal = ({ modalOpened, onClose, classId, fetchStudents }) => {
  const [classes, setClasses] = useState([
    "Business",
    "Communications",
    "Technology",
  ]);
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("Female")
  const [classs, setClass] = useState("Business");
  const [whatsappNumber, setWhatsappNumber] = useState([]);
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("upload");

  const submitAddStudent = async () => {
    const notify = () => toast("student add successfully");
    const res = await addStudent(classId, fullName, whatsappNumber, gender);
    if (res.status) {
      notify()
      onClose()
      // alert("student add successfully");
      fetchStudents();
    } else {
      alert("failed to add student");
    }
  };

  const submitAddStudents = async () => {
    const notify = () => toast("students add successfully");
    const res = await addStudents(students, classId);
    if (res.status) {
      notify();
      onClose()
      // alert("students add successfully");
      fetchStudents();
    } else {
      alert("failed to add student");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      setData(rows);
      const studs = [];
      rows.forEach((row) => {
        const student = {
          name: row.Name,
          number: row.Number,
          gender: row.Gender,
        };
        studs.push(student);
      });
      setStudents(studs);
    };
    reader.readAsArrayBuffer(file);
  };


  if (!modalOpened) {
    return null;
  }

  return (
    <div className="gallery-details-modal">
      <div className="gallery-modal-data">
        <div className="modal-close">
          <button className="close" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        {students.length > 0
          ? (
            <>
              {students.map((student) => {
                return (
                  <table>
                    <tr>
                      <td>
                        {student.name}
                      </td>
                      <td>
                        {student.number}
                      </td>
                      <td>
                        {student.gender}
                      </td>
                    </tr>
                  </table>
                );
              })}
              <button className="c-btn" onClick={submitAddStudents}>
                Add
              </button>
            </>
          )
          : (
            <>
              <div className="modal-form">
                <h4>Import from Excel</h4>

                <p>
                  Tips 💡 </p>
                  <p><b>Column Headers</b>: Ensure your Excel file has columns titled
                  '<b>Name</b>' (Required), '<b>Number</b>' (Required), '<b>Gender</b>' (Required),
                  'Age'(Optional), and 'Level of Education'(Optional)</p>
                  <p><b>Number
                  Format</b>: Please include the country code before the student's
                  number (e.g., +233541234567) Data Consistency: Maintain
                  consistent data entry throughout the file</p>
                {/* </p> */}
                <div className="form-group">
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    name="excel"
                    id="excel"
                    onChange={handleFileUpload}
                  />
                </div>
                <h4>Or Add Single Student</h4>
                <div className="modal-form">
                  <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="appnumber">Whatsapp number</label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)} value={gender}>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                  <button className="c-btn" onClick={submitAddStudent}>
                    Add
                  </button>
                </div>
              </div>
            </>
          )}

        {
          /* <div className="form-group">
            <label htmlFor="class">Class</label>
          <select name="class" id="class" value={classs} onChange={(e) => setClass(e.target.value)}>
            {
                classes.map((clas, index) => {
                    return (
                        <option value={clas}>{clas}</option>
                    )
                })
            }
          </select>
        </div> */
        }
      </div>
    </div>
  );
};

export default StudentModal;
