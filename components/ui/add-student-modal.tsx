import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddStudentModalProps {
  classId: string;
  onClose: () => void;
  onStudentsAdded: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ classId, onClose, onStudentsAdded }) => {
  const [name, setName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("coEdu_jwt");
    const student = {
      name,
      whatsappNumber,
      gender,
      classId,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(student),
    });

    if (response.ok) {
      toast.success("Student added successfully, refresh page!");
      onStudentsAdded();
      // onClose();
    } else {
      const errorData = await response.json();
      console.log(errorData);
      toast.error(errorData.error);
    }
  };

  return (
    <Modal onClose={onClose}>
      <ToastContainer style={{ zIndex: 9999, position: "fixed", top: 0, right: 400 }} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">WhatsApp Number</label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <Button type="submit" className="w-full">Add Student</Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddStudentModal;
