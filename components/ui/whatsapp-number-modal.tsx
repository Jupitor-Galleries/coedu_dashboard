import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock } from "lucide-react";

interface WhatsAppNumberModalProps {
  onClose: () => void;
}

const WhatsAppNumberModal: React.FC<WhatsAppNumberModalProps> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/whatsapp.png"
            alt="WhatsApp Icon"
            className="w-12 h-12"
          />
        </div>
        <h2 className="text-2xl font-bold mb-2">WhatsApp Number Coming Soon!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for creating an account with CoEdu.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="flex items-center text-gray-700 mb-2">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            We’ll assign you a WhatsApp number within 24 hours.
          </p>
          <p className="flex items-center text-gray-700">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            You’ll receive an email notification once it’s ready.
          </p>
        </div>
        <Button onClick={onClose} className="mt-6 w-full">
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default WhatsAppNumberModal;
