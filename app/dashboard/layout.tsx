"use client";

import { useEffect, ReactNode, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import { useClass } from "@/context/ClassContext";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarInsetHeader from "@/components/ui/sidebar-inset-header";
import { SidebarLeft } from "@/components/ui/sidebar-left";
import { SidebarRight } from "@/components/ui/sidebar-right";
import { ClassProvider } from "@/context/ClassContext";

interface DashboardLayoutProps {
  children: ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const urlClassId = searchParams.get('classId') || '';
  const { classId, setClassId } = useClass();

  useEffect(() => {
    // Only update context if classId is not set or different
    if (urlClassId && urlClassId !== classId) {
      setClassId(urlClassId);
    }
  }, [urlClassId, classId, setClassId]);

  return (
    <SidebarProvider>
      <SidebarLeft variant="floating" />
      <SidebarInset className="bg-[#F1F5FF]">
        <SideBarInsetHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  );
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClassProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardLayout>{children}</DashboardLayout>
      </Suspense>
    </ClassProvider>
  );
}
