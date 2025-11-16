"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Quote, TrendingUp, Award, Users } from "lucide-react"

export default function TestimonialsPage() {
  const testimonials = [
    {
      quote: "This platform revolutionized how we approach design. The AI optimization is truly a game-changer! Our team's productivity has increased by 40% since we started using Next-Gen CAD.",
      author: "Chandan P",
      title: "Lead Designer",
      company: "TechCorp Industries",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      quote: "Collaboration has never been easier. We now work together seamlessly across different time zones. The real-time features are absolutely incredible and have transformed our workflow.",
      author: "Sushant C",
      title: "Project Manager",
      company: "Design Solutions Inc",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    },
    {
      quote: "It is a very unique project with innovative features. The precision tools and intuitive interface make complex designs simple. Highly recommended for engineering teams!",
      author: "Tejass Bhau",
      title: "System Manager",
      company: "Engineering Dynamics",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
    },
    {
      quote: "The cloud integration and 3D modeling capabilities are outstanding. We can access our projects from anywhere and the rendering quality is professional-grade.",
      author: "Sarah Johnson",
      title: "Chief Architect",
      company: "Studio Design Co",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      quote: "Best CAD platform I've used in my 15-year career. The learning curve is minimal and the support team is responsive and helpful. A true game-changer!",
      author: "Michael Chen",
      title: "Senior Engineer",
      company: "Innovate Labs",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
    },
    {
      quote: "The AI-powered features have saved us countless hours. The automatic optimization suggestions are incredibly accurate and have improved our design quality significantly.",
      author: "Emily Rodriguez",
      title: "Design Director",
      company: "Creative Engineering",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    }
  ]

  const stats = [
    { value: "10K+", label: "Happy Users", icon: Users },
    { value: "50K+", label: "Projects Created", icon: TrendingUp },
    { value: "99.9%", label: "Satisfaction Rate", icon: Award }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-950/30 to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-purple-600/25 rounded-full mix-blend-normal filter blur-[140px] animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 rounded-full mix-blend-normal filter blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto mb-20"
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="px-5 py-2.5 bg-purple-500/15 border border-purple-400/30 rounded-full text-purple-300 text-sm font-semibold tracking-wide backdrop-blur-sm shadow-lg shadow-purple-500/20">
              ⭐ Testimonials
            </span>
          </motion.div>
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            What Our Users Say
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Join thousands of satisfied designers and engineers who trust Next-Gen CAD
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-xl p-8 rounded-3xl border border-white/[0.15] hover:border-purple-400/50 transition-all duration-500 hover:-translate-y-2 text-center">
                  <Icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-all duration-500"></div>
              
              <div className="relative h-full bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-gray-800/80 backdrop-blur-lg p-8 rounded-3xl border border-white/[0.18] hover:border-purple-400/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-500/25 flex flex-col">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-[0.08] group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                  <Quote className="w-16 h-16 text-purple-400 group-hover:text-pink-400 transition-colors duration-500" />
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-purple-400/10 rounded-3xl animate-pulse"></div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 text-base leading-relaxed mb-6 flex-grow italic relative z-10">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.15] relative z-10">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-purple-500/40 group-hover:ring-purple-400/80 group-hover:ring-4 transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-gray-900 shadow-lg shadow-green-500/50"></div>
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg group-hover:text-purple-300 transition-colors">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
            
            <div className="relative p-12 md:p-16 bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              
              <div className="relative z-10">
                <p className="text-gray-300 mb-6 text-lg">
                  Join our community of <span className="font-bold text-purple-400">10,000+</span> satisfied users
                </p>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-200 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                  Experience the future of CAD design. Start your free trial today and see why thousands of professionals trust Next-Gen CAD.
                </p>
                
                <Button 
                  size="lg" 
                  className="group bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 hover:from-purple-500 hover:via-pink-500 hover:to-purple-500 text-white font-bold px-10 py-7 text-lg rounded-2xl shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/70 transition-all duration-300 hover:scale-105"
                >
                  Start Your Free Trial
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}