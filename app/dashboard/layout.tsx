"use client";

import { useEffect, ReactNode, Suspense, useState } from "react";
import { usePathname, useSearchParams } from 'next/navigation';
import { useClass } from "@/context/ClassContext";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarInsetHeader from "@/components/ui/sidebar-inset-header";
import { SidebarLeft } from "@/components/ui/sidebar-left";
import { SidebarRight } from "@/components/ui/sidebar-right";
import { ClassProvider } from "@/context/ClassContext";
import React from "react";

// --- Context for Modal State --- 
interface ModalContextProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleAnnouncementCreated: () => void;
}
const ModalContext = React.createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const urlClassId = searchParams.get('classId') || '';
  const { classId, setClassId } = useClass();
  const modal = useModal(); // Get the full modal context

  useEffect(() => {
    if (urlClassId && urlClassId !== classId) {
      setClassId(urlClassId);
    }
  }, [urlClassId, classId, setClassId]);

  const showAnnouncementsButton = pathname === '/dashboard/announcements';

  return (
    <SidebarProvider>
      <SidebarLeft variant="floating" />
      <SidebarInset className="bg-[#F1F5FF]">
        <SideBarInsetHeader 
          showAnnouncementsButton={showAnnouncementsButton} 
          onNewAnnouncementClick={() => modal.setIsModalOpen(true)}
        />
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};

const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAnnouncementCreated = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, handleAnnouncementCreated }}>
      {children}
    </ModalContext.Provider>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClassProvider>
      <ModalProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardLayout>{children}</DashboardLayout>
        </Suspense>
      </ModalProvider>
    </ClassProvider>
  );
}
