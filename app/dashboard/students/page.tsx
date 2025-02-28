"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useClass } from "@/context/ClassContext";

interface Student {
  _id: string;
  name: string;
  whatsappNumber: string;
  gender: string;
  classes: string[];
  accepted: boolean;
  approved: boolean;
  preferredLanguage: string;
  onboardingStep: string;
  createdAt: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const { classId } = useClass() // Replace with the actual classId

  const fetchStudents = async () => {
    const token = localStorage.getItem("coEdu_jwt");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/${classId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setStudents(data);
    } else {
      toast.error("Failed to fetch students.");
    }
  };

  const handleDelete = async (studentId: string) => {
    const token = localStorage.getItem("coEdu_jwt");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/${studentId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      toast.success("Student deleted successfully!");
      fetchStudents(); // Refresh the list of students
    } else {
      toast.error("Failed to delete student.");
    }
  };

  useEffect(() => {
    if(classId){
      console.log("the class id is", classId);
      fetchStudents();
    }
  }, [classId]);

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
      <ToastContainer style={{ zIndex: 9999, position: "fixed", top: 0, right: 0 }} />
      <div className="w-full md:w-[872px] mb-8 text-center">
        <h1 className="text-[40px] md:text-[70px] font-bold mb-4">All Students</h1>
        <p className="text-gray-300 text-[16px] md:text-[24px]">Here are the students in your class.</p>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">WhatsApp Number</th>
              <th className="py-2 px-4 border-b">Gender</th>
              <th className="py-2 px-4 border-b">Preferred Language</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students && students.map((student) => (
              <tr key={student._id}>
                <td className="py-2 px-4 border-b">{student.name}</td>
                <td className="py-2 px-4 border-b">{student.whatsappNumber}</td>
                <td className="py-2 px-4 border-b">{student.gender}</td>
                <td className="py-2 px-4 border-b">{student.preferredLanguage}</td>
                <td className="py-2 px-4 border-b">
                  <Button variant="destructive" onClick={() => handleDelete(student._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
