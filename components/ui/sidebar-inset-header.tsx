'use client';

import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./sidebar";
import { LucidePlus } from "lucide-react";
import AddStudentModal from "@/components/ui/add-student-modal";
import AddStudentFileModal from "@/components/ui/add-student-file-modal";
import { useClass } from "@/context/ClassContext";

interface ClassDetails {
  name: string;
  // Add other properties as needed
}

export default function SideBarInsetHeader() {
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddStudentFileModal, setShowAddStudentFileModal] = useState(false);

  const [classDetails, setClassDetails] = useState<ClassDetails | null>(null);

  const { classId } = useClass() || '';

  const getClassDetails = async () => {
    try {
      const token = localStorage.getItem("coEdu_jwt");
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/${classId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setClassDetails(data.class);
      } else {
        console.error("Failed to fetch class details");
      }
    } catch (error) {
      console.error("An error occurred while fetching class details:", error);
    }
  };

  useEffect(() => {
    console.log("the class id is", classId);
    if (classId) {
      getClassDetails();
    }
  }, [classId]);

  const handleStudentsAdded = () => {
    // Refresh the students list or page
    getClassDetails();
  };

  return (
    <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                {classDetails?.name || "Class Name"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex ms-auto gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-sm">Add Students</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setShowAddStudentModal(true)}>Add Student from Form</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowAddStudentFileModal(true)}>Add Students from File</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="rounded-sm border border-black" variant="ghost">
            Create <LucidePlus />
          </Button>
        </div>
      </div>
      {showAddStudentModal && (
        <AddStudentModal classId={classId || ''} onClose={() => setShowAddStudentModal(false)} onStudentsAdded={handleStudentsAdded} />
      )}
      {showAddStudentFileModal && (
        <AddStudentFileModal classId={classId || ''} onClose={() => setShowAddStudentFileModal(false)} onStudentsAdded={handleStudentsAdded} />
      )}
    </header>
  );
}
