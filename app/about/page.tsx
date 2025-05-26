"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Lightbulb, Target, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-24">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Next-Gen CAD
          </h1>
          <p className="text-lg text-gray-600">
            Revolutionizing design through AI-powered innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center text-2xl">
                  <Target className="mr-3 h-8 w-8 text-blue-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  At Next-Gen CAD, we're revolutionizing the world of computer-aided design. Our mission is to empower
                  designers and engineers with cutting-edge AI-driven tools that streamline the design process and unlock
                  new realms of creativity.
                </p>
                <Button variant="outline" className="group">
                  Learn More 
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="space-y-1">
                <CardTitle className="flex items-center text-2xl">
                  <Lightbulb className="mr-3 h-8 w-8 text-yellow-500" />
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Founded in 2025, Next-Gen CAD emerged from a vision to transform traditional CAD software. Our team of
                  passionate engineers and designers came together with a shared goal: to create a platform that combines
                  the power of artificial intelligence with intuitive design tools.
                </p>
                <Button variant="outline" className="group">
                  Our Journey
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl mb-4">
                <Users className="mr-3 h-8 w-8 text-green-500" />
                Our Team
              </CardTitle>
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                We're a diverse group of innovators, bringing together expertise in software engineering, AI, UX design,
                and various engineering disciplines. Our collective experience and passion drive us to continuously push
                the boundaries of what's possible in CAD software.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="text-center group"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative mb-4">
                      <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                      <Image
                        src={`/api/placeholder/200/200`}
                        alt={`Team member ${i}`}
                        width={200}
                        height={200}
                        className="rounded-full mx-auto shadow-md"
                      />
                    </div>
                    <h3 className="font-semibold text-lg mb-1">John Doe {i}</h3>
                    <p className="text-gray-500">Engineering Lead</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-gray-600 mb-8 text-lg">
            We're always looking for talented individuals to join our mission. If you're passionate about revolutionizing
            CAD design, we want to hear from you!
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            View Open Positions
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}