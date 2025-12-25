"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
  MessageSquare,
  Check,
  CheckCircle2
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-cyan-950/20 to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-cyan-600/25 rounded-full mix-blend-normal filter blur-[130px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-blue-600/30 rounded-full mix-blend-normal filter blur-[120px] animate-pulse [animation-delay:2s]"></div>
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-500/20 rounded-full mix-blend-normal filter blur-[110px] animate-pulse [animation-delay:1s]"></div>
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%233b82f6' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-5 py-2.5 bg-cyan-500/15 border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-semibold tracking-wide backdrop-blur-sm shadow-lg shadow-cyan-500/20">
              💬 Get In Touch
            </span>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-cyan-100 to-blue-100 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mb-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative group"
          >
            <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/[0.15] backdrop-blur-xl shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500">
              {/* Decorative Icon */}
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-[5deg] transition-transform duration-300">
                <MessageSquare className="w-9 h-9 text-white" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 mt-4">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Office Selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label htmlFor="office" className="block text-sm font-semibold text-gray-300 mb-2">
                    Select Office
                  </label>
                  <div className="relative">
                    <select
                      id="office"
                      name="office"
                      value={formState.office}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-gray-800/60 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 backdrop-blur-sm transition-all duration-300 appearance-none cursor-pointer"
                    >
                      {offices.map(office => (
                        <option key={office.id} value={office.city} className="bg-gray-900">
                          {office.city}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </motion.div>

                {/* Name Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField("name")}
                    onBlur={() => setActiveField("")}
                    className={`w-full px-4 py-3.5 bg-gray-800/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 ${
                      activeField === "name" 
                        ? "border-cyan-400/50 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20" 
                        : "border-gray-700/50"
                    }`}
                    placeholder="Your name"
                    required
                  />
                </motion.div>

                {/* Email Input */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField("")}
                    className={`w-full px-4 py-3.5 bg-gray-800/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 ${
                      activeField === "email" 
                        ? "border-cyan-400/50 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20" 
                        : "border-gray-700/50"
                    }`}
                    placeholder="your.email@example.com"
                    required
                  />
                </motion.div>

                {/* Message Textarea */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField("")}
                    rows={5}
                    className={`w-full px-4 py-3.5 bg-gray-800/60 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-300 resize-none ${
                      activeField === "message" 
                        ? "border-cyan-400/50 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-500/20" 
                        : "border-gray-700/50"
                    }`}
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-6 p-5 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-400/30 rounded-xl backdrop-blur-sm"
                  >
                    <div className="flex items-center text-emerald-300">
                      <CheckCircle2 className="h-6 w-6 mr-3 flex-shrink-0" />
                      <span className="font-semibold text-lg">Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Office Details & Map */}
          <div className="space-y-8">
            {/* Office Details Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative group"
            >
              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/[0.15] backdrop-blur-xl shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-500">
                {/* Decorative Icon */}
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-[5deg] transition-transform duration-300">
                  <MapPin className="w-9 h-9 text-white" />
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Office Details</h2>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="space-y-5"
                >
                  {/* Address */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-colors duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-1">Address</p>
                      <p className="text-white font-medium text-lg leading-relaxed">{selectedOffice.address}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 backdrop-blur-sm hover:border-blue-400/40 transition-colors duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-1">Phone</p>
                      <p className="text-white font-medium text-lg">{selectedOffice.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/20 backdrop-blur-sm hover:border-purple-400/40 transition-colors duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-1">Email</p>
                      <p className="text-white font-medium text-lg break-all">{selectedOffice.email}</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-400/20 backdrop-blur-sm hover:border-cyan-400/40 transition-colors duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-400 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-400 mb-1">Business Hours</p>
                      <p className="text-white font-medium text-lg">{selectedOffice.hours}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Map Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative group"
            >
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/[0.15] backdrop-blur-xl shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-500">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <Globe className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Find Us</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMapExpanded(!isMapExpanded)}
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 rounded-xl transition-colors"
                  >
                    <motion.div
                      animate={{ rotate: isMapExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-6 w-6" />
                    </motion.div>
                  </Button>
                </div>

                {/* Map */}
                <motion.div
                  layout
                  className="rounded-2xl overflow-hidden border border-gray-700/50"
                  animate={{
                    height: isMapExpanded ? "600px" : "300px"
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <iframe
                    src={selectedOffice.mapUrl}
                    width="100%"
                    height={isMapExpanded ? "600" : "300"}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full"
                  ></iframe>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}