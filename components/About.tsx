"use client"

import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"
import { Box, Zap, Users, Globe, Target, Sparkles } from "lucide-react"

const features = [
  {
    icon: Box,
    title: "3D Modeling Excellence",
    description: "Advanced 3D modeling tools with precision engineering capabilities"
  },
  {
    icon: Zap,
    title: "AI-Powered Optimization",
    description: "Intelligent design suggestions and automated optimization algorithms"
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Work seamlessly with your team across different time zones"
  },
  {
    icon: Globe,
    title: "Cloud Integration",
    description: "Access your projects anywhere, anytime with cloud storage"
  },
  {
    icon: Target,
    title: "Precision Tools",
    description: "Industry-leading precision measurement and annotation tools"
  },
  {
    icon: Sparkles,
    title: "Innovation First",
    description: "Cutting-edge features that push the boundaries of CAD design"
  }
]

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Projects Created" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
]

export default function About() {
  const [ref, isVisible] = useScrollAnimation()
  const [statsRef, statsVisible] = useScrollAnimation()

  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-gray-900 via-blue-950/20 to-gray-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse"></div>
        <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-purple-600/25 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-cyan-500/20 rounded-full mix-blend-normal filter blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              About Next-Gen CAD
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            Redefining Design Innovation
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform revolutionizes CAD design by integrating cutting-edge AI features, 
            real-time collaboration tools, and precision engineering capabilities.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/10"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-md p-8 rounded-3xl border border-white/[0.15] hover:border-blue-400/50 transition-all duration-500 hover:bg-gradient-to-br hover:from-white/[0.12] hover:to-white/[0.06] hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-400/10 via-transparent to-purple-400/10 animate-pulse"></div>
              </div>                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-blue-500/40 group-hover:shadow-2xl group-hover:shadow-blue-400/60">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl border border-white/10">
            <h3 className="text-3xl font-bold mb-4 text-white">
              Ready to Transform Your Design Process?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Join thousands of designers and engineers who are already experiencing the future of CAD.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

