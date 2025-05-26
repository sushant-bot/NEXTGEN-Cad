"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Users, Layers, Cloud, Lock, Smartphone, ArrowRight } from "lucide-react"

const features = [
  {
    title: "AI-Powered Optimization",
    description: "Our advanced AI algorithms analyze and optimize your designs for performance and manufacturability.",
    icon: Zap,
    color: "text-yellow-500",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    title: "Real-Time Collaboration",
    description: "Work seamlessly with your team in real-time, no matter where they are in the world.",
    icon: Users,
    color: "text-blue-500",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    title: "Multi-Layer Editing",
    description: "Easily manage complex designs with our intuitive multi-layer editing system.",
    icon: Layers,
    color: "text-green-500",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    title: "Cloud-Based Storage",
    description: "Access your designs from anywhere with our secure, cloud-based storage solution.",
    icon: Cloud,
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    title: "Advanced Security",
    description: "Your intellectual property is safe with our state-of-the-art encryption and security measures.",
    icon: Lock,
    color: "text-red-500",
    gradient: "from-red-500 to-rose-500"
  },
  {
    title: "Mobile Compatibility",
    description: "View and edit your designs on-the-go with our mobile-friendly interface.",
    icon: Smartphone,
    color: "text-indigo-500",
    gradient: "from-indigo-500 to-violet-500"
  },
]

export default function FeaturesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-16"
        >
          {/* Hero Section */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Powerful Features
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the next generation of CAD design with our innovative features
            </p>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-t-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
                  <div className={`h-1 w-full bg-gradient-to-r ${feature.gradient}`} />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.gradient} bg-opacity-10`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Experience the Future of CAD Design
            </h2>
            <p className="text-gray-100 text-lg mb-8 max-w-2xl mx-auto">
              Our features are designed to streamline your workflow, enhance collaboration, and unlock new possibilities in
              design. Try Next-Gen CAD today and see the difference for yourself.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg px-8 py-6 h-auto"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}