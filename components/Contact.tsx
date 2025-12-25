"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, CheckCircle2 } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "support@nextgencad.com",
    link: "mailto:support@nextgencad.com"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Tech Street, San Francisco, CA 94105",
    link: "https://maps.google.com"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon-Fri: 9AM - 6PM PST",
    link: null
  }
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [formRef, formVisible] = useScrollAnimation()
  const [infoRef, infoVisible] = useScrollAnimation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setIsSubmitted(false), 5000)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-gray-900 via-cyan-950/20 to-gray-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-cyan-600/25 rounded-full mix-blend-normal filter blur-[130px] animate-pulse"></div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] bg-blue-600/30 rounded-full mix-blend-normal filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-purple-500/20 rounded-full mix-blend-normal filter blur-[110px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Hexagon pattern overlay */}
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%233b82f6' stroke-width='0.5' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              Get In Touch
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, x: -50 }}
            animate={infoVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-white/[0.09] to-white/[0.04] backdrop-blur-xl p-10 rounded-3xl border border-white/[0.2] shadow-2xl shadow-cyan-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/40">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white">Let's Talk</h3>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Whether you have a question about features, pricing, need a demo, or anything else, 
                our team is ready to answer all your questions.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={infoVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group"
                    >
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="flex items-start gap-4 p-5 rounded-2xl hover:bg-white/[0.08] transition-all duration-300 hover:translate-x-1"
                        >
                          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/20">
                            <Icon className="w-7 h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                          </div>
                          <div>
                            <p className="font-semibold text-white mb-1">{info.title}</p>
                            <p className="text-gray-400 group-hover:text-blue-400 transition-colors">
                              {info.details}
                            </p>
                          </div>
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 p-5">
                          <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/20">
                            <Icon className="w-7 h-7 text-cyan-400" />
                          </div>
                          <div>
                            <p className="font-semibold text-white mb-1">{info.title}</p>
                            <p className="text-gray-400">{info.details}</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={infoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative overflow-hidden bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15 backdrop-blur-md p-8 rounded-3xl border border-white/[0.2] shadow-xl shadow-cyan-500/10"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/20 rounded-full filter blur-3xl"></div>
              <div className="relative z-10">
                <h4 className="font-bold text-white mb-3 text-lg">⚡ Quick Response Time</h4>
                <p className="text-gray-200">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: 50 }}
            animate={formVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-gradient-to-br from-white/[0.09] to-white/[0.04] backdrop-blur-xl p-10 rounded-3xl border border-white/[0.2] space-y-6 shadow-2xl shadow-cyan-500/10"
            >
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/[0.15] rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/[0.15] rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white font-medium mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white/[0.06] border border-white/[0.15] rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300"
                  placeholder="How can we help?"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white font-medium mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-white/[0.06] border border-white/[0.15] rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.1] focus:ring-2 focus:ring-cyan-500/30 transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm text-green-300">We'll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 via-blue-600 to-blue-500 hover:from-cyan-500 hover:via-blue-500 hover:to-blue-400 text-white font-bold py-7 rounded-xl shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-400/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </Button>

              <p className="text-gray-400 text-sm text-center">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacy Policy
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

