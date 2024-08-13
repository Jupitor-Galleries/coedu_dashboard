import React, { useEffect, useState } from "react";
import { addStudent } from "../../../../api/class";
import "./Modal.css";
import { IoMdClose } from "react-icons/io";
import * as XLSX from "xlsx";
import { addStudents } from "../../../../api/students";

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
  const [students, setStudents] = useState([]);
  const [status, setStatus] = useState("upload");

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

  const submitAddStudents = async () => {
    const res = await addStudents(students, classId);
    if (res.status) {
      // onClose()
      alert("students add successfully");
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
          name: row.name,
          number: row.number,
          gender: row.gender,
        };
        studs.push(student);
      });
      setStudents(studs);
    };
    reader.readAsArrayBuffer(file);
  };

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
        {
          students? <>
          {
                    students.map((student) => {
                        return (
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
                            
                        )
                    })
                }
          </> : <></>
        }
        <h4>Import from Excel</h4>
        <div className="form-group">
          <input
            type="file"
            accept=".xlsx, .xls"
            name="excel"
            id="excel"
            onChange={handleFileUpload}
          />
        </div>
        <h4>OR</h4>
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

          {/* <div className="form-group">
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
        </div> */}

          <button className="c-btn" onClick={submitAddStudent}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
