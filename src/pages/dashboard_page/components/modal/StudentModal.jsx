import React, { useEffect, useState } from "react";
import { addStudent } from "../../../../api/class";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import * as XLSX from 'xlsx';

const StudentModal = ({ modalOpened, onClose, classId, fetchStudents }) => {
  const [classes, setClasses] = useState([
    "Business",
    "Communications",
    "Technology",
  ]);
  const [fullName, setFullName] = useState("");
  const [classs, setClass] = useState("Business");
  const [whatsappNumber, setWhatsappNumber] = useState([]);
  const [data, setData] = useState([]);

  const submitAddStudent = async () => {
    const res = await addStudent(classId, fullName, whatsappNumber);
    if (res.status) {
      // onClose()
      alert("student add successfully");
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
      console.log(rows);
      setData(rows);
    };
    reader.readAsArrayBuffer(file);
  }

  console.log(data);
  

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
        <div className="modal-form">
          <input
            type="file"
            accept=".xlsx, .xls"
            name="excel"
            id="excel"
            onChange={handleFileUpload}
          />
          <div className="user-profile-stats">
            Add New Student
          </div>
          <hr />
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

          <button className="c-btn" onClick={submitAddStudent}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
