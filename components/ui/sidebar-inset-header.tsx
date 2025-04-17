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

interface SideBarInsetHeaderProps {
  showAnnouncementsButton?: boolean;
  onNewAnnouncementClick?: () => void;
}

export default function SideBarInsetHeader({
  showAnnouncementsButton,
  onNewAnnouncementClick,
}: SideBarInsetHeaderProps) {
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
    <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-2 border-b bg-white px-3">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                {classDetails?.name || "Select a Class"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex ms-auto gap-4 items-center">
          {classId && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" className="rounded-sm">Add Students</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowAddStudentModal(true)}>Add Single Student</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowAddStudentFileModal(true)}>Upload Student List</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          
          {/* Conditionally render New Announcement button */}
          {showAnnouncementsButton && classId && (
            <Button 
              size="sm" 
              className="rounded-sm inline-flex items-center gap-1"
              onClick={onNewAnnouncementClick}
            >
               <LucidePlus size={16} />
              New Announcement
            </Button>
          )}
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
