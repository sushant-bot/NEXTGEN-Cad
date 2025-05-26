"use client"

import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"

export default function About() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="about" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
          <p className="text-center text-gray-300 text-lg max-w-2xl mx-auto">
            Our platform redefines CAD design by integrating cutting-edge AI features and real-time collaboration tools.
            Experience the future of design today.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

