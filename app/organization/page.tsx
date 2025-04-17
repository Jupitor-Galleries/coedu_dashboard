"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { OrganizationForm } from "@/components/ui/organization-form";
import { Organization } from "@/types/organization";
import WhatsAppNumberModal from "@/components/ui/whatsapp-number-modal";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function OrganizationComponent() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [showInactiveModal, setShowInactiveModal] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const fetchOrganizations = async () => {
    try {
      const token = localStorage.getItem("coEdu_jwt");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization/user-organizations`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Remove duplicates based on _id
        const uniqueOrgs = Array.from(new Map(data.map((org: Organization) => [org._id, org])).values());
        setOrganizations(uniqueOrgs as Organization[]);
      } else {
        console.error("Failed to fetch organizations");
      }
    } catch (error) {
      console.error("An error occurred while fetching organizations:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrganizations();
    }
  }, [isAuthenticated]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <Button 
              className="w-full sm:w-auto text-white"
              onClick={() => setShowDialog(true)}
            >
              Create Organization +
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                localStorage.removeItem("coEdu_jwt");
                localStorage.removeItem("classId");
                router.push("/login");
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <span>Logout</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </Button>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-5xl lg:text-[70px] font-bold mb-4">
            All Your Organizations Are Here.
          </h1>
          <p className="text-gray-300 text-sm sm:text-lg lg:text-[24px]">
            Here are the organizations you&apos;ve created. You can add more by clicking the Create Organization button.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {organizations && organizations.map((org) => (
            <Card 
              key={org._id} 
              className={`w-full cursor-pointer ${org.active ? 'bg-green-50' : 'bg-red-50'}`} 
              onClick={() => handleOrganizationClick(org)}
            >
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">{org.name}</CardTitle>
                <p className={`text-sm ${org.active ? 'text-green-600' : 'text-red-600'}`}>
                  {org.active ? 'Active' : 'Inactive'}
                </p>
              </CardHeader>
            </Card>
          ))}
        </div>
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

export default function OrganizationPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <OrganizationComponent />
      </Suspense>
    </AuthProvider>
  );
}
