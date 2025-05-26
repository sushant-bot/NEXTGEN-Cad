"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, isVisible] = useScrollAnimation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your server
    console.log("Submitted email:", email)
    setIsSubmitted(true)
    setEmail("")
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <section id="newsletter" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter for the latest CAD innovations and exclusive offers.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-lg bg-white bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Subscribe
            </Button>
          </form>
          {isSubmitted && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-green-400">
              Thank you for subscribing!
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

