"use client";

import * as React from "react";
import { AudioWaveform, Command, LogOut, Settings2 } from "lucide-react";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GoHome, GoMegaphone, GoBook, GoBookmark } from "react-icons/go";
import { LuGraduationCap } from "react-icons/lu";
import { NavClasses } from "./nav-classes";
import Image from "next/image";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: GoHome,
    },
    {
      title: "Students",
      url: "/dashboard/students",
      icon: LuGraduationCap,
      badge: "10",
    },
    {
      title: "Announcements",
      url: "/dashboard/announcements",
      icon: GoMegaphone,
    },
    {
      title: "Assignments",
      url: "/dashboard/assignments",
      icon: GoBook,
    },
    {
      title: "Resources",
      url: "/dashboard/resources",
      icon: GoBookmark,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Logout",
      url: "/login",
      icon: LogOut,
    },
  ],
  classes: [
    {
      name: "Class 1",
      url: "#",
      number: 23,
    },
    {
      name: "Class 2",
      url: "#",
      number: 30,
    },
    {
      name: "Class 3",
      url: "#",
      number: 42,
    },
  ],
};

export function SidebarLeft({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const navMainWithActiveState = data.navMain.map((item) => ({
    ...item,
    isActive:
      pathname === item.url ||
      (item.url !== "/dashboard" && pathname.startsWith(item.url)),
  }));
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <Image
          src="/images/logo.svg"
          alt="co edu logo"
          width={100}
          height={100}
          className="mx-auto my-5"
        />
        <NavMain items={navMainWithActiveState} />
      </SidebarHeader>
      <SidebarContent>
        <NavClasses classes={data.classes} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
