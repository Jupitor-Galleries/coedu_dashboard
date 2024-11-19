"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SideBarInsetHeader from "@/components/ui/sidebar-inset-header";
import { SidebarLeft } from "@/components/ui/sidebar-left";
import { SidebarRight } from "@/components/ui/sidebar-right";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
}
