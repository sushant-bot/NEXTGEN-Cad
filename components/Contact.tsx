"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useScrollAnimation } from "@/utils/useScrollAnimation"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, isVisible] = useScrollAnimation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }, 2000)
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
        <motion.form
          ref={ref}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-300 mb-2">
              Name
            </label>
            <input type="text" id="name" className="w-full bg-gray-700 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <input type="email" id="email" className="w-full bg-gray-700 rounded-lg px-4 py-2" required />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-300 mb-2">
              Message
            </label>
            <textarea id="message" rows={4} className="w-full bg-gray-700 rounded-lg px-4 py-2" required></textarea>
          </div>
          <AnimatePresence>
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-green-500 text-white p-3 rounded-lg mb-4"
              >
                Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 transform hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </motion.form>
      </div>
    </section>
  )
}

