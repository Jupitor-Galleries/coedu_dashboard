"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiArrowLeft } from "react-icons/fi";
import { OrganizationForm } from "@/components/ui/organization-form";
import { Organization } from "@/types/organization";
import WhatsAppNumberModal from "@/components/ui/whatsapp-number-modal";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function OrganizationPage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const fetchOrganizations = async () => {
    const token = localStorage.getItem("coEdu_jwt");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization/user-organizations`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setOrganizations(data);
    } else {
      console.error("Failed to fetch organizations");
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleOrganizationClick = (org: Organization) => {
    if (org.active) {
      router.push(`/classes?organizationId=${org._id}`);
    } else {
      setShowInactiveModal(true);
    }
  };

  const handleFormClose = () => {
    setShowDialog(false);
    fetchOrganizations(); // Reload organizations after closing the form
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
      <div className="flex justify-between items-center mb-4 w-full max-w-4xl">
        <div className="flex-grow"></div>
        <div className="flex items-center">
          <div className="text-[24px] text-gray-300 bg-transparent mr-2">
            Create Organization
          </div>
          <Button className="text-white" onClick={() => setShowDialog(true)}>+</Button>
        </div>
      </div>
      <div className="w-full md:w-[872px] mb-8 text-center">
        <h1 className="text-[40px] md:text-[70px] font-bold mb-4">All Your Organizations Are Here.</h1>
        <p className="text-gray-300 text-[16px] md:text-[24px]">Here are the organizations you’ve created. You can add more by clicking the ‘+’ on the top right corner.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {organizations && organizations.map((org) => (
          <Card key={org._id} className={`w-full sm:w-64 cursor-pointer ${org.active ? 'bg-green-100' : 'bg-red-100'}`} onClick={() => handleOrganizationClick(org)}>
            <CardHeader>
              <CardTitle>{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Additional organization details can go here */}
              <p>{org.active ? 'Active' : 'Inactive'}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {showDialog && (
        <Modal onClose={handleFormClose}>
          <OrganizationForm />
        </Modal>
      )}
      {showInactiveModal && (
        <WhatsAppNumberModal onClose={() => setShowInactiveModal(false)} />
      )}
    </div>
  );
}
