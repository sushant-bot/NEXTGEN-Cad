"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Loader2, 
  ChevronDown, 
  Clock,
  Globe,
  Building,
  Check
} from "lucide-react"

const offices = [
  {
    id: 1,
    city: "San Francisco",
    address: "123 Market Street, CA 94105",
    coordinates: { lat: 37.7899, lng: -122.3990 },
    phone: "+1 (415) 555-0123",
    email: "sf@nextgencad.com",
    hours: "9:00 AM - 6:00 PM PST",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0673758240166!2d-122.39901368441547!3d37.78996977975585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807abad77a61%3A0x1f35f6fa23d7a8c6!2sSan%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1625687970531!5m2!1sen!2sus"
  },
  {
    id: 2,
    city: "Pune",
    address: "42 Dhanori Road, Pune 411015",
    coordinates: { lat: 18.5793, lng: 73.8143 },
    phone: "+91 9529642803",
    email: "pune@nextgencad.com",
    hours: "10:00 AM - 7:00 PM IST",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.14199917082!2d73.72287827306045!3d18.524564857810876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sPune%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1697774697749!5m2!1sen!2sus"
  }
]

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    office: "San Francisco"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeField, setActiveField] = useState("")
  const [selectedOffice, setSelectedOffice] = useState(offices[0])
  const [showSuccess, setShowSuccess] = useState(false)
  const [isMapExpanded, setIsMapExpanded] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Form submitted:", formState)
    setFormState({ name: "", email: "", message: "", office: "San Francisco" })
    setIsSubmitting(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
    if (e.target.name === 'office') {
      setSelectedOffice(offices.find(office => office.city === e.target.value) || offices[0])
    }
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            We'd love to hear from you. Our team is always here to help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="h-full"
          >
            <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div variants={fadeInUp}>
                    <Label htmlFor="office" className="text-sm font-medium">
                      Select Office
                    </Label>
                    <select
                      id="office"
                      name="office"
                      value={formState.office}
                      onChange={handleChange}
                      className="w-full mt-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {offices.map(office => (
                        <option key={office.id} value={office.city}>
                          {office.city}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField("")}
                      className={`mt-1 transition-all duration-300 ${
                        activeField === "name" ? "ring-2 ring-blue-500" : ""
                      }`}
                      required
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField("")}
                      className={`mt-1 transition-all duration-300 ${
                        activeField === "email" ? "ring-2 ring-blue-500" : ""
                      }`}
                      required
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField("")}
                      className={`mt-1 min-h-[150px] transition-all duration-300 ${
                        activeField === "message" ? "ring-2 ring-blue-500" : ""
                      }`}
                      required
                    />
                  </motion.div>
                  <motion.div variants={fadeInUp}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
                <AnimatePresence>
                  {showSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-100 rounded-lg flex items-center"
                    >
                      <Check className="h-5 w-5 mr-2" />
                      Message sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>

          <div className="space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center justify-between">
                  <span>Office Details</span>
                  <Building className="h-6 w-6 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid gap-4"
                >
                  <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <MapPin className="h-6 w-6 text-blue-500" />
                    <span className="ml-4 text-lg">{selectedOffice.address}</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Phone className="h-6 w-6 text-blue-500" />
                    <span className="ml-4 text-lg">{selectedOffice.phone}</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Mail className="h-6 w-6 text-blue-500" />
                    <span className="ml-4 text-lg">{selectedOffice.email}</span>
                  </div>
                  <div className="flex items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <span className="ml-4 text-lg">{selectedOffice.hours}</span>
                  </div>
                </motion.div>
              </CardContent>
            </Card>

            <motion.div
              layout
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-2xl flex items-center">
                    <Globe className="h-6 w-6 mr-2 text-blue-500" />
                    Find Us
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                    className="text-blue-500"
                  >
                    <motion.div
                      animate={{ rotate: isMapExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </CardHeader>
                <CardContent>
                  <motion.div
                    layout
                    className="rounded-lg overflow-hidden"
                    animate={{
                      height: isMapExpanded ? "600px" : "300px"
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <iframe
                      src={selectedOffice.mapUrl}
                      width="100%"
                      height={isMapExpanded ? "600" : "300"}
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      className="rounded-lg w-full h-full transition-all duration-300"
                    ></iframe>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}