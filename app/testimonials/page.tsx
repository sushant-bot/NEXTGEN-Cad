"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Lightbulb, Target, ChevronRight, Github, Linkedin } from "lucide-react"

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const teamMembers = [
    { name: "John Smith", role: "CEO & Founder" },
    { name: "Sarah Johnson", role: "Lead Engineer" },
    { name: "Mike Chen", role: "AI Specialist" },
    { name: "Emma Wilson", role: "UX Director" }
  ]

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
              About Next-Gen CAD
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Revolutionizing design with AI-powered innovation
            </p>
          </motion.div>

          {/* Mission & Story Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Target className="mr-3 h-8 w-8 text-blue-500" />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    At Next-Gen CAD, we're revolutionizing the world of computer-aided design. Our mission is to empower
                    designers and engineers with cutting-edge AI-driven tools that streamline the design process and unlock
                    new realms of creativity.
                  </p>
                  <Button className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Learn More 
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-500">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Lightbulb className="mr-3 h-8 w-8 text-yellow-500" />
                    Our Story
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Founded in 2023, Next-Gen CAD emerged from a vision to transform traditional CAD software. Our team of
                    passionate engineers and designers came together with a shared goal: to create a platform that combines
                    the power of artificial intelligence with intuitive design tools.
                  </p>
                  <Button className="group bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                    Our Journey
                    <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Users className="mr-3 h-8 w-8 text-green-500" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
                  We're a diverse group of innovators, bringing together expertise in software engineering, AI, UX design,
                  and various engineering disciplines. Our collective experience and passion drive us to continuously push
                  the boundaries of what's possible in CAD software.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, i) => (
                    <motion.div
                      key={i}
                      className="text-center group"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-75 transition-opacity" />
                        <img
                         
                          alt={member.name}
                          className="rounded-full mx-auto shadow-lg w-48 h-48 object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-xl mb-2">{member.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">{member.role}</p>
                      <div className="flex justify-center space-x-3">
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Linkedin className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full">
                          <Github className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Join Us Section */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
            <p className="text-gray-100 text-lg mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our mission. If you're passionate about revolutionizing
              CAD design, we want to hear from you!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700 text-lg px-8 py-6 h-auto">
              View Open Positions
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}