import { useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import Papa from "papaparse"; // CSV parsing library
import "react-toastify/dist/ReactToastify.css";

interface AddStudentFileModalProps {
  classId: string;
  onClose: () => void;
  onStudentsAdded: () => void;
}

interface CSVRow {
  Name: string;
  WhatsAppNumber: string;
  Gender: string;
}

const AddStudentFileModal: React.FC<AddStudentFileModalProps> = ({ classId, onClose, onStudentsAdded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const validateCSV = (data: CSVRow[]) => {
    const errors: string[] = [];
    const validGenders = ["Male", "Female", "Other", "", "male", "female", "other"];

    if (data.length === 0) {
      errors.push("The CSV file is empty.");
    }

    data.forEach((row: CSVRow, index) => {
      const rowNumber = index + 2; // To match Excel row numbers (header is row 1)

      if (!row.Name || row.Name.trim() === "") {
        errors.push(`Row ${rowNumber}: Name cannot be empty.`);
      }

      if (!row.WhatsAppNumber || row.WhatsAppNumber.trim() === "") {
        errors.push(`Row ${rowNumber}: WhatsApp Number cannot be empty.`);
      } else {
        let sanitizedNumber = row.WhatsAppNumber.trim();
      
        if (!sanitizedNumber.startsWith("+")) {
          // Reject numbers that start with 0 (local numbers)
          if (/^0/.test(sanitizedNumber)) {
            errors.push(`Row ${rowNumber}: Invalid WhatsApp Number. Must include a valid country code.`);
          } else {
            // If it's a valid number missing "+", assume it should have one
            sanitizedNumber = "+" + sanitizedNumber;
          }
        }
      
        // Validate country code format: + followed by 1-3 digits
        if (!/^\+\d{1,3}/.test(sanitizedNumber)) {
          errors.push(`Row ${rowNumber}: Invalid WhatsApp Number. Must include a valid country code.`);
        }
      }
      

      if (!validGenders.includes(row.Gender)) {
        errors.push(`Row ${rowNumber}: Gender must be 'Male', 'Female', 'Other', or empty.`);
      }
    });

    return errors;
  };

  const handleAddStudentsFromFile = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setLoading(true);

    Papa.parse<CSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async function (results: Papa.ParseResult<CSVRow>) {
        const requiredColumns = ["Name", "WhatsAppNumber", "Gender"];
        const fileColumns = Object.keys(results.data[0] || {});

        // Check if all required columns are present
        const missingColumns = requiredColumns.filter((col) => !fileColumns.includes(col));
        if (missingColumns.length > 0) {
          toast.error(`Missing columns: ${missingColumns.join(", ")}`);
          setLoading(false);
          return;
        }

        const errors = validateCSV(results.data);
        if (errors.length > 0) {
          toast.error(errors.join("\n"), { autoClose: false });
          setLoading(false);
          return;
        }

        const token = localStorage.getItem("coEdu_jwt");
        const students = results.data.map((row: CSVRow) => ({
          name: row.Name.trim(),
          whatsappNumber: row.WhatsAppNumber.trim(),
          gender: row.Gender.trim(),
        }));

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/students/bulk-add/${classId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ students }),
          }
        );

        setLoading(false);

        if (response.ok) {
          toast.success("Students added successfully, refresh page!!");
          onStudentsAdded();
          onClose();
        } else {
          toast.error("Failed to upload students.");
        }
      },
    });
  };

  return (
    <Modal onClose={onClose}>
      <ToastContainer style={{ zIndex: 9999, position: "fixed", top: 0, right: 400 }} />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Students via CSV</h2>
        <p className="text-gray-600 mb-2">
          Please upload a CSV file formatted as follows:
        </p>
        <ul className="list-disc ml-5 text-gray-500 text-sm">
          <li>Accepted file type: <strong>.csv</strong></li>
          <li>Columns must be: <strong>Name, WhatsAppNumber, Gender</strong></li>
          <li>Names cannot be empty.</li>
          <li>WhatsApp numbers must start with a country code (e.g., +233...)</li>
          <li>Gender must be <strong>Male, Female, Other</strong>, or left empty.</li>
        </ul>
        <input type="file" accept=".csv" onChange={handleFileChange} className="mb-4 w-full" />
        <Button onClick={handleAddStudentsFromFile} disabled={loading} className="w-full">
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </Modal>
  );
};

export default AddStudentFileModal;
