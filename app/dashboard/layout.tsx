"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Users, Settings, Menu, X, LayoutDashboard, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeProvider } from "next-themes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: FileText, label: "Projects", href: "/dashboard/projects" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex h-screen bg-background text-foreground">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-64 bg-card text-card-foreground shadow-xl"
            >
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
                  <X size={24} />
                </button>
              </div>
              <nav className="mt-6">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <span
                      className={`flex items-center px-4 py-3 hover:bg-accent hover:text-accent-foreground transition-colors ${
                        pathname === item.href ? "bg-accent text-accent-foreground" : ""
                      }`}
                    >
                      <item.icon className="mr-3" size={20} />
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          )}
        </AnimatePresence>
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-background border-b border-border">
            <div className="flex items-center justify-between p-4">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-foreground focus:outline-none">
                <Menu size={24} />
              </button>
              <div className="flex-1 mx-4">
                <Input type="search" placeholder="Search projects, team members, or tasks..." className="max-w-sm" />
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon">
                  <Bell size={20} />
                </Button>
                <span className="text-foreground">John Doe</span>
                <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/40" alt="User avatar" />
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}

