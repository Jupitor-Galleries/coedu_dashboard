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

export function NavClasses({
  classes,
}: {
  classes: {
    name: string;
    url: string;
    number: number;
  }[];
}) {
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
          <SidebarMenuItem key={item.name} className="">
            <SidebarMenuButton className="flex items-center text-sm justify-between hover:bg-transparent cursor-default">
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
