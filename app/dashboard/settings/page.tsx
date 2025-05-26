"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button className="w-full">Update Account</Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["Email Notifications", "Push Notifications", "Weekly Digest", "Project Updates"].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Label htmlFor={item.toLowerCase().replace(" ", "-")}>{item}</Label>
                  <Switch id={item.toLowerCase().replace(" ", "-")} />
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Theme Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch id="dark-mode" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <select id="color-scheme" className="w-full p-2 border rounded">
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                </select>
              </div>
              <Button className="w-full">Save Preferences</Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

