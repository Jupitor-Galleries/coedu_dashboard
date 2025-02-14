"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FiArrowLeft } from "react-icons/fi";
import { ClassForm } from "@/components/ui/class-form";
import Modal from "@/components/ui/modal";
import { Class } from "@/types/class";

export default function ClassesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const organizationId = searchParams.get("organizationId");
  const [showDialog, setShowDialog] = useState(false);
  const [classes, setClasses] = useState<Class[]>([]);

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
    fetchClasses();
  }, [organizationId]);

  const handleClassClick = (cls: Class) => {
    router.push(`/dashboard?organizationId=${cls.organizationId}&classId=${cls.id}`);
  };

  const handleFormClose = () => {
    setShowDialog(false);
    fetchClasses(); // Reload classes after closing the form
  };

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
      <div className="flex justify-between items-center mb-4 w-full max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()}>
          <FiArrowLeft className="mr-2" />
        </Button>
        <div className="text-[24px] text-gray-300 bg-transparent">
          Add New Class <Button className="text-white" onClick={() => setShowDialog(true)}>+</Button>
        </div>
      </div>
      <div className="w-full md:w-[872px] mb-8 text-center">
        <h1 className="text-[40px] md:text-[70px] font-bold mb-4">All Your Classes Are Here.</h1>
        <p className="text-gray-300 text-[16px] md:text-[24px]">Here are the classes you’ve created. You can add more by clicking the ‘+’ on the top right corner.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {classes && classes.map((cls) => (
          <Card key={cls.id} className="w-full sm:w-64 cursor-pointer" onClick={() => handleClassClick(cls)}>
            <CardHeader>
              <CardTitle>{cls.name}</CardTitle>
            </CardHeader>
            {/* <CardContent>
              <p>{`Start Date: ${new Date(cls.startDate).toLocaleDateString()}`}</p>
              <p>{`End Date: ${new Date(cls.endDate).toLocaleDateString()}`}</p>
              <p>{`Languages: ${cls.languages.join(", ")}`}</p>
            </CardContent> */}
          </Card>
        ))}
      </div>
      {showDialog && (
        <Modal onClose={handleFormClose}>
          <ClassForm organizationId={organizationId || ""} />
        </Modal>
      )}
    </div>
  );
}
