"use client"

import type * as React from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  FileText,
  LayoutDashboard,
  ShoppingBag,
  Timer,
  Ticket,
  Gamepad2,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const sidebarNavItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Product",
        href: "/admin/product",
        icon: ShoppingBag,
      },
      {
        title: "Customer",
        href: "/admin/customer",
        icon: Users,
      },
      {
        title: "Transaction",
        href: "/admin/transaction",
        icon: FileText,
      },
    ],
  },
  {
    title: "Charts",
    items: [
      {
        title: "Bar",
        href: "/admin/chart/bar",
        icon: BarChart3,
      },
      {
        title: "Pie",
        href: "/admin/chart/pie",
        icon: PieChart,
      },
      {
        title: "Line",
        href: "/admin/chart/line",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Apps",
    items: [
      {
        title: "Stopwatch",
        href: "/admin/app/stopwatch",
        icon: Timer,
      },
      {
        title: "Coupon",
        href: "/admin/app/coupon",
        icon: Ticket,
      },
      {
        title: "Toss",
        href: "/admin/app/toss",
        icon: Gamepad2,
      },
    ],
  },
]

export default function AdminSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <Sidebar variant={"sidebar"} className="bg-primary">
      <SidebarHeader>
        <div className="flex h-12 items-center px-4">
          <Link to="/admin" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-sidebar-foreground">Logo.</span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto max-h-[calc(100vh-3rem)]">
        {sidebarNavItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.href}>
                          <Icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}

export function AdminSidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
