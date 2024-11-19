import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "./sidebar";
import { LucidePlus } from "lucide-react";

export default function SideBarInsetHeader() {
  return (
    <header className="sticky top-0 flex h-14 shrink-0 items-center gap-2">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="line-clamp-1">
                Soronko Rotary Coding Girls Cohort 8
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex ms-auto gap-4">
          <Button className="rounded-sm">Add Students</Button>
          <Button className="rounded-sm border border-black" variant="ghost">
            Create <LucidePlus />
          </Button>
        </div>
      </div>
    </header>
  );
}
