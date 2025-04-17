"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FiArrowLeft } from "react-icons/fi";
import { ClassForm } from "@/components/ui/class-form";
import Modal from "@/components/ui/modal";
import { Class } from "@/types/class";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function ClassesComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const organizationId = searchParams.get("organizationId");
  const { isAuthenticated, loading } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);
  const [organizationName, setOrganizationName] = useState("");

  const fetchOrganizationDetails = async () => {
    try {
      const token = localStorage.getItem("coEdu_jwt");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organization/${organizationId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrganizationName(data.name);
      }
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  };

  const fetchClasses = async () => {
    const token = localStorage.getItem("coEdu_jwt");
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/user?organizationId=${organizationId}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setClasses(data);
    } else {
      console.error("Failed to fetch classes");
    }
  };

  useEffect(() => {
    if (isAuthenticated && organizationId) {
      fetchOrganizationDetails();
      fetchClasses();
    }
  }, [isAuthenticated, organizationId]);

  const handleClassClick = (cls: Class) => {
    console.log(cls)
    router.push(`/dashboard?organizationId=${cls.organization}&classId=${cls._id}`);
  };

  const handleFormClose = () => {
    setShowDialog(false);
    fetchClasses(); // Reload classes after closing the form
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="w-full sm:w-auto flex items-center justify-center gap-2"
          >
            <FiArrowLeft />
            <span>Back to Organizations</span>
          </Button>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button 
              className="w-full sm:w-auto text-white"
              onClick={() => setShowDialog(true)}
            >
              Add New Class +
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

        <div className="text-center mb-12">
          <p className="text-blue-600 text-lg mb-2">Organization</p>
          <h1 className="text-3xl font-bold mb-2">{organizationName}</h1>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-8"></div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Manage Your Classes
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto">
            View and manage all classes under {organizationName}. Add new classes or click on existing ones to access their dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes && classes.length > 0 ? (
            classes.map((cls) => (
              <Card 
                key={cls._id} 
                className="w-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-t-4 border-t-blue-500" 
                onClick={() => handleClassClick(cls)}
              >
                <CardHeader className="p-6">
                  <CardTitle className="text-xl mb-2">{cls.name}</CardTitle>
                  <p className="text-sm text-gray-500">Click to view dashboard</p>
                </CardHeader>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 mb-4">No classes found</p>
              <Button onClick={() => setShowDialog(true)}>Create Your First Class</Button>
            </div>
          )}
        </div>
      </div>

      {showDialog && (
        <Modal onClose={handleFormClose}>
          <ClassForm organizationId={organizationId || ""} />
        </Modal>
      )}
    </div>
  );
}

export default function ClassesPage() {
  return (
    <AuthProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <ClassesComponent />
      </Suspense>
    </AuthProvider>
  );
}
