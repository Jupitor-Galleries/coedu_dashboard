import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SidebarLeft } from "@/components/ui/sidebar-left"
import { SidebarRight } from "@/components/ui/sidebar-right"
import { LucidePlus } from "lucide-react"

export default function Dashboard() {
  return (
    <SidebarProvider>
      <SidebarLeft variant="floating"/>
      <SidebarInset className="bg-[#F1F5FF]">
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
                <Button className="rounded-sm border border-black" variant="ghost">Create <LucidePlus/></Button>
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="mx-auto h-24 w-full max-w-3xl rounded-xl bg-white/50" />
          <div className="mx-auto h-[100vh] w-full max-w-3xl rounded-xl bg-white/50" />
        </div>
      </SidebarInset>
      <SidebarRight />
    </SidebarProvider>
  )
}
