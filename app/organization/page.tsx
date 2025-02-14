"use client";

// import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FiArrowLeft } from "react-icons/fi";
import { OrganizationForm } from "@/components/ui/organization-form";
import Modal from "@/components/ui/modal";
import { Organization } from "@/types/organization";

export default function OrganizationPage() {
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
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

    fetchOrganizations();
  }, []);

  const handleOrganizationClick = (org: Organization) => {
    if (org.active) {
      router.push(`/classes?organizationId=${org._id}`);
    } else {
      setShowInactiveModal(true);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
      <div className="flex justify-between items-center mb-4 w-full max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()}>
          <FiArrowLeft className="mr-2" />
        </Button>
        <div className="text-[24px] text-gray-300 bg-transparent">
          Add New Organization <Button className="text-white" onClick={() => setShowDialog(true)}>+</Button>
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
        <Modal onClose={() => setShowDialog(false)}>
          <OrganizationForm />
        </Modal>
      )}
      {showInactiveModal && (
        <Modal onClose={() => setShowInactiveModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Organization is not yet active</h2>
            <p>Please contact support at +263783857780 to get your organization activated.</p>
            <Button onClick={() => setShowInactiveModal(false)} className="mt-4">
              Close
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
}
