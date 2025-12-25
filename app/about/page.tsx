"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Lightbulb, Target, Zap, Award, Rocket, TrendingUp, Shield, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-950/30 to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-blue-600/25 rounded-full mix-blend-normal filter blur-[140px] animate-pulse"></div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute top-60 right-0 w-[600px] h-[600px] bg-purple-600/20 rounded-full mix-blend-normal filter blur-[140px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-cyan-500/20 rounded-full mix-blend-normal filter blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.025)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(59,130,246,0.025)_1.5px,transparent_1.5px)] bg-[size:80px_80px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_0%,rgba(0,0,0,0.6)_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
        {/* Hero Section */}
        <motion.div
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-5 py-2.5 bg-blue-500/15 border border-blue-400/30 rounded-full text-blue-300 text-sm font-semibold tracking-wide backdrop-blur-sm shadow-lg shadow-blue-500/20">
              ✨ About Us
            </span>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            About Next-Gen CAD
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Revolutionizing design through AI-powered innovation and cutting-edge technology
          </motion.p>
        </motion.div>

        {/* Mission & Story Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-28 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50 group-hover:opacity-75"></div>
            <div className="relative h-full bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-xl p-10 rounded-3xl border border-white/[0.15] shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-blue-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Target className="h-10 w-10 text-white" />
                </div>
                
                <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-blue-300 transition-colors duration-300">
                  Our Mission
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  At Next-Gen CAD, we're revolutionizing the world of computer-aided design. Our mission is to empower
                  designers and engineers with cutting-edge AI-driven tools that streamline the design process and unlock
                  new realms of creativity.
                </p>
                
                <Button className="group/btn bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-6 py-6 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-50 group-hover:opacity-75"></div>
            <div className="relative h-full bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-xl p-10 rounded-3xl border border-white/[0.15] shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-orange-500/50 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Lightbulb className="h-10 w-10 text-white" />
                </div>
                
                <h2 className="text-4xl font-bold mb-6 text-white group-hover:text-purple-300 transition-colors duration-300">
                  Our Story
                </h2>
                
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Founded in 2025, Next-Gen CAD emerged from a vision to transform traditional CAD software. Our team of
                  passionate engineers and designers came together with a shared goal: to create a platform that combines
                  the power of artificial intelligence with intuitive design tools.
                </p>
                
                <Button className="group/btn bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-6 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300">
                  Our Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          className="mb-28 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="inline-block mb-6"
            >
              <span className="px-5 py-2.5 bg-purple-500/15 border border-purple-400/30 rounded-full text-purple-300 text-sm font-semibold tracking-wide backdrop-blur-sm shadow-lg shadow-purple-500/20">
                💎 Core Values
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">What Drives Us</h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do and shape our culture
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Rocket, 
                title: "Innovation First", 
                desc: "Pushing boundaries and exploring new possibilities in CAD technology with cutting-edge AI", 
                color: "from-blue-500 via-blue-600 to-cyan-500",
                shadowColor: "shadow-blue-500/40"
              },
              { 
                icon: Zap, 
                title: "Speed & Efficiency", 
                desc: "Delivering powerful tools that accelerate your design workflow and boost productivity", 
                color: "from-yellow-500 via-orange-500 to-red-500",
                shadowColor: "shadow-orange-500/40"
              },
              { 
                icon: Award, 
                title: "Quality Excellence", 
                desc: "Maintaining the highest standards in everything we create for unmatched reliability", 
                color: "from-purple-500 via-pink-500 to-purple-600",
                shadowColor: "shadow-purple-500/40"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.color} rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                <div className="relative h-full bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-white/[0.15] hover:border-white/[0.25] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mb-8 shadow-2xl ${value.shadowColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                      <value.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          className="mb-28 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-white/[0.15] shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-500/50">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                    Meet Our Team
                  </h2>
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                    We're a diverse group of innovators, bringing together expertise in software engineering, AI, UX design,
                    and various engineering disciplines. Our collective experience drives us forward.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12">
                {[
                  { name: "Alex Rivera", role: "CEO & Founder", gradient: "from-blue-500 to-cyan-500" },
                  { name: "Sarah Chen", role: "CTO", gradient: "from-purple-500 to-pink-500" },
                  { name: "Marcus Johnson", role: "Head of AI", gradient: "from-orange-500 to-red-500" },
                  { name: "Emma Williams", role: "Lead Designer", gradient: "from-green-500 to-emerald-500" }
                ].map((member, i) => (
                  <motion.div
                    key={i}
                    className="text-center group"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                  >
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-300 blur-2xl`} />
                      <div className={`relative w-28 h-28 md:w-36 md:h-36 mx-auto bg-gradient-to-br ${member.gradient} rounded-full border-4 border-white/20 group-hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-2xl group-hover:shadow-3xl group-hover:rotate-6`}>
                        <Users className="w-12 h-12 md:w-16 md:h-16 text-white" />
                      </div>
                    </div>
                    <h3 className="font-bold text-lg md:text-xl mb-2 text-white group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base font-medium">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            
            <div className="relative p-12 md:p-16 bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              {/* eslint-disable-next-line react/no-unknown-property */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="inline-block mb-8"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/50 animate-pulse">
                    <Heart className="w-12 h-12 text-white" />
                  </div>
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                  Join Our Team
                </h2>
                <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto">
                  We're always looking for talented individuals to join our mission. If you're passionate about revolutionizing
                  CAD design and shaping the future of technology, we want to hear from you!
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg" 
                    className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/70 transition-all duration-300 hover:scale-105"
                  >
                    View Open Positions
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-white/30 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white font-semibold px-10 py-7 text-lg rounded-2xl backdrop-blur-sm transition-all duration-300"
                  >
                    Learn More About Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}