"use client"

import { CheckCircle, Zap, Users } from "lucide-react"
import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"

const features = [
  {
    icon: CheckCircle,
    title: "AI Optimization",
    description: "Harness the power of AI to streamline and perfect your CAD designs effortlessly.",
  },
  {
    icon: Zap,
    title: "Real-Time Collaboration",
    description: "Work seamlessly with your team in real-time from anywhere in the world.",
  },
  {
    icon: Users,
    title: "3D Printing Ready",
    description: "Export your designs directly for 3D printing with optimized settings.",
  },
]

export default function Features() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="features" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
            >
              <feature.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

