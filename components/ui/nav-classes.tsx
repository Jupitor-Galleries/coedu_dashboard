"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { GoPlus } from "react-icons/go";
import { Button } from "./button";
import { useRouter } from "next/navigation";

export function NavClasses({
  classes,
  organizationId,
}: {
  classes: {
    name: string;
    _id: string;
    number: number;
  }[];
  organizationId: string;
}) {
  const router = useRouter();

  const handleClassClick = (classId: string) => {
    router.push(`/dashboard?organizationId=${organizationId}&classId=${classId}`);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        CLASSES
        <Button size="icon" className="h-4 w-4 ms-auto rounded-sm bg-[#DFE7FF] hover:bg-[#DFE7FF]">
          <GoPlus color="black"/>
        </Button>
      </SidebarGroupLabel>
      <SidebarMenu>
        {classes.map((item) => (
          <SidebarMenuItem key={item._id} className="">
            <SidebarMenuButton
              className="flex items-center text-sm justify-between hover:bg-transparent cursor-pointer"
              onClick={() => handleClassClick(item._id)}
            >
              <div className="flex items-center gap-1">
                <p>📚</p>
                <p className="ms-2">{item.name}</p>
              </div>
              <p>{item.number}</p>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
