"use client";

import { AudioWaveform, Command, LogOut, Settings2 } from "lucide-react";
import { useClass } from "@/context/ClassContext";

import { NavMain } from "@/components/ui/nav-main";
import { NavSecondary } from "@/components/ui/nav-secondary";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { GoHome, GoMegaphone } from "react-icons/go";
import { LuGraduationCap } from "react-icons/lu";
import { NavClasses } from "./nav-classes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
    // {
    //   title: "Assignments",
    //   url: "/dashboard/assignments",
    //   icon: GoBook,
    // },
    // {
    //   title: "Resources",
    //   url: "/dashboard/resources",
    //   icon: GoBookmark,
    // },
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
  const { classId } = useClass();
  const [classes, setClasses] = useState([]);
  const [organizationId, setOrganizationId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchClasses() {
      try {
        const token = localStorage.getItem("coEdu_jwt");
        if (!token) throw new Error("No access token found");

        const classResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/${classId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("the response from classes", classResponse)
        if (!classResponse.ok) throw new Error("Failed to fetch class details");

        const classData = await (classResponse.json());
        const organizationId = classData.class.organization;
        setOrganizationId(organizationId)

        console.log("the organization id is", organizationId)
        const userClassesResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/classes/user?organizationId=${organizationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response from fetching all classes for user", userClassesResponse)
        if (!userClassesResponse.ok) throw new Error("Failed to fetch user classes");

        const userClassesData = await userClassesResponse.json();
        setClasses(userClassesData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    }

    if (classId) {
      fetchClasses();
    }
  }, [classId]);

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
        <NavClasses classes={classes} organizationId={organizationId || ''} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
