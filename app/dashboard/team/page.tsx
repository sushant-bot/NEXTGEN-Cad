"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const teamMembers = [
  { name: "John Doe", role: "Lead Designer", email: "john@example.com", avatar: "JD" },
  { name: "Jane Smith", role: "3D Modeler", email: "jane@example.com", avatar: "JS" },
  { name: "Mike Johnson", role: "Project Manager", email: "mike@example.com", avatar: "MJ" },
  { name: "Emily Brown", role: "UI/UX Designer", email: "emily@example.com", avatar: "EB" },
  { name: "Chris Lee", role: "Software Engineer", email: "chris@example.com", avatar: "CL" },
  { name: "Sarah Wilson", role: "Quality Assurance", email: "sarah@example.com", avatar: "SW" },
]

export default function TeamPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Team</h2>
        <Button>Invite Member</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.email}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.avatar}`}
                    alt={member.name}
                  />
                  <AvatarFallback>{member.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{member.email}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

