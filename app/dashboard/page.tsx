"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { Responsive, WidthProvider } from "react-grid-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CalendarDays,
  FileText,
  Users,
  Zap,
  Plus,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  Moon,
  Sun,
  Bell,
  CalendarIcon,
  Search,
  Filter,
  LayoutDashboard,
  Briefcase,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { format } from "date-fns"


// Import the CSS for react-grid-layout
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

const ResponsiveGridLayout = WidthProvider(Responsive)

const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 200 },
  { name: "Apr", value: 278 },
  { name: "May", value: 189 },
  { name: "Jun", value: 239 },
]

const projectData = [
  { name: "Project Alpha", progress: 70, status: "In Progress", dueDate: "2023-07-15" },
  { name: "Project Beta", progress: 45, status: "In Progress", dueDate: "2023-08-01" },
  { name: "Project Gamma", progress: 90, status: "Near Completion", dueDate: "2023-06-30" },
  { name: "Project Delta", progress: 20, status: "Just Started", dueDate: "2023-09-15" },
]

const teamMembers = [
  { name: "John Doe", role: "Lead Designer", email: "john@example.com", avatar: "JD" },
  { name: "Jane Smith", role: "3D Modeler", email: "jane@example.com", avatar: "JS" },
  { name: "Mike Johnson", role: "Project Manager", email: "mike@example.com", avatar: "MJ" },
]

const recentActivity = [
  { action: "commented on", project: "Project Alpha", user: "John Doe", time: "2 hours ago" },
  { action: "updated", project: "Project Beta", user: "Jane Smith", time: "4 hours ago" },
  { action: "completed AI Optimization for", project: "Project Gamma", user: "System", time: "1 day ago" },
  { action: "added to", project: "Project Delta", user: "Mike Johnson", time: "2 days ago" },
  { action: "updated deadline for", project: "Project Epsilon", user: "Sarah Lee", time: "3 days ago" },
]

const pieChartData = [
  { name: "Design", value: 400 },
  { name: "Development", value: 300 },
  { name: "Testing", value: 200 },
  { name: "Deployment", value: 100 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function DashboardPage() {
  const { theme, setTheme } = useTheme()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    dueDate: "",
    assignedTo: "",
  })
  const [activeTab, setActiveTab] = useState("dashboard")

  // Filter projects based on search query
  const filteredProjects = projectData.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the new project data to your backend
    console.log("New project:", newProject)
    setIsCreateProjectOpen(false)
    setNewProject({ name: "", description: "", dueDate: "", assignedTo: "" })
  }

  // Define your layout
  const layout = [
    { i: "tabs", x: 0, y: 0, w: 12, h: 1 },
    { i: "search", x: 0, y: 1, w: 12, h: 1 },
    { i: "stats", x: 0, y: 2, w: 12, h: 2 },
    { i: "projects", x: 0, y: 4, w: 6, h: 4 },
    { i: "activity", x: 6, y: 4, w: 6, h: 4 },
    { i: "chart", x: 0, y: 8, w: 6, h: 4 },
    { i: "pieChart", x: 6, y: 8, w: 6, h: 4 },
    { i: "team", x: 0, y: 12, w: 4, h: 4 },
    { i: "actions", x: 4, y: 12, w: 4, h: 4 },
    { i: "status", x: 8, y: 12, w: 4, h: 4 },
    { i: "calendar", x: 0, y: 16, w: 6, h: 4 },
  ]

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Notifications</h4>
                  <p className="text-sm text-muted-foreground">You have 3 unread messages.</p>
                </div>
                <div className="grid gap-2">
                  {recentActivity.slice(0, 3).map((activity, index) => (
                    <div key={index} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${activity.user}`} />
                        <AvatarFallback>
                          {activity.user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.user}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action} {activity.project}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} />
          {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Fill in the details to create a new project.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="projectDescription">Description</Label>
                  <Textarea
                    id="projectDescription"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="projectDueDate">Due Date</Label>
                  <Input
                    id="projectDueDate"
                    type="date"
                    value={newProject.dueDate}
                    onChange={(e) => setNewProject({ ...newProject, dueDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="projectAssignedTo">Assigned To</Label>
                  <Select
                    value={newProject.assignedTo}
                    onValueChange={(value) => setNewProject({ ...newProject, assignedTo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamMembers.map((member) => (
                        <SelectItem key={member.email} value={member.name}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">Create Project</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="workspace">
            <Briefcase className="mr-2 h-4 w-4" />
            Workspace
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={100}
          >
            <div key="search">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow"
                />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div key="stats">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { title: "Total Projects", icon: FileText, value: "24", change: "+2 from last month", trend: "up" },
                  { title: "Active Users", icon: Users, value: "573", change: "+18 from last week", trend: "up" },
                  {
                    title: "AI Optimizations",
                    icon: Zap,
                    value: "129",
                    change: "+10% efficiency increase",
                    trend: "up",
                  },
                  {
                    title: "Upcoming Deadlines",
                    icon: CalendarDays,
                    value: "3",
                    change: "In the next 7 days",
                    trend: "neutral",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{item.value}</div>
                        <p className="text-xs text-muted-foreground flex items-center">
                          {item.trend === "up" && <ChevronUp className="mr-1 h-4 w-4 text-green-500" />}
                          {item.trend === "down" && <ChevronDown className="mr-1 h-4 w-4 text-red-500" />}
                          {item.change}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            <div key="projects">
              <Card className="h-full overflow-hidden">
                <CardHeader>
                  <CardTitle>Project Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-8 p-6 overflow-auto max-h-[400px]">
                    {filteredProjects.map((project, index) => (
                      <div key={index} className="flex items-center">
                        <div className="ml-4 space-y-1 flex-1">
                          <p className="text-sm font-medium leading-none">{project.name}</p>
                          <p className="text-sm text-muted-foreground">Due: {project.dueDate}</p>
                          <Progress value={project.progress} className="w-full mt-2" />
                        </div>
                        <div className="ml-auto font-medium">
                          <Badge
                            variant={
                              project.status === "In Progress"
                                ? "default"
                                : project.status === "Near Completion"
                                  ? "success"
                                  : "secondary"
                            }
                          >
                            {project.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div key="activity">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${activity.user}`}
                            alt={activity.user}
                          />
                          <AvatarFallback>
                            {activity.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{activity.user}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.action} <span className="font-medium text-foreground">{activity.project}</span>
                          </p>
                        </div>
                        <div className="ml-auto font-medium text-xs text-muted-foreground">{activity.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div key="chart">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Project Completion Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <div key="pieChart">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <div key="team">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.avatar}`}
                            alt={member.name}
                          />
                          <AvatarFallback>{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div key="actions">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      New Project
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Invite Team
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Zap className="mr-2 h-4 w-4" />
                      Run AI Optimization
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div key="status">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">Server Uptime</p>
                        <Progress value={98} className="w-full mt-2" />
                      </div>
                      <div className="ml-auto font-medium">98%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">Database Health</p>
                        <Progress value={95} className="w-full mt-2" />
                      </div>
                      <div className="ml-auto font-medium">95%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium leading-none">API Response Time</p>
                        <Progress value={92} className="w-full mt-2" />
                      </div>
                      <div className="ml-auto font-medium">92%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div key="calendar">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={`w-[280px] justify-start text-left font-normal ${!date && "text-muted-foreground"}`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ResponsiveGridLayout>
        </TabsContent>
        <TabsContent value="workspace">
          
        </TabsContent>
      </Tabs>
    </div>
  )
}

