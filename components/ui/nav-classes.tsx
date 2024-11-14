"use client"

import {
  MoreHorizontal,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavClasses({
  classes,
}: {
  classes: {
    name: string
    url: string
    number: number
  }[]
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>CLASSES</SidebarGroupLabel>
      <SidebarMenu>
        {classes.map((item) => (
          <SidebarMenuItem key={item.name} className="flex items-center text-sm me-4">
            <SidebarMenuButton asChild>
              <a href={item.url} title={item.name}>
                <span>📚</span>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
            <p>{item.number}</p>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
