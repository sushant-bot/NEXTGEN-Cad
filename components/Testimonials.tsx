"use client"

import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"

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

export default function Testimonials() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="testimonials" className="relative py-32 bg-gradient-to-b from-gray-900 via-purple-950/20 to-gray-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-purple-600/25 rounded-full mix-blend-normal filter blur-[140px] animate-pulse"></div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-blue-600/30 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/20 rounded-full mix-blend-normal filter blur-[120px] animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Dot pattern overlay */}
        {/* eslint-disable-next-line react/no-unknown-property */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(rgba(139, 92, 246, 0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              Testimonials
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied designers and engineers who trust Next-Gen CAD for their projects
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.04] backdrop-blur-lg p-8 rounded-3xl border border-white/[0.18] hover:border-purple-400/60 transition-all duration-500 hover:bg-gradient-to-br hover:from-white/[0.14] hover:to-white/[0.08] hover:shadow-2xl hover:shadow-purple-500/25 hover:-translate-y-2 flex flex-col"
            >
              {/* Quote Icon with enhanced effect */}
              <div className="absolute top-6 right-6 opacity-[0.08] group-hover:opacity-20 transition-all duration-500 group-hover:scale-110">
                <Quote className="w-16 h-16 text-purple-400 group-hover:text-blue-400 transition-colors duration-500" />
              </div>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-blue-400/10 to-pink-400/10 rounded-3xl animate-pulse"></div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 leading-relaxed mb-6 flex-grow italic">
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
                  <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                  <p className="text-xs text-gray-500">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10">
            <p className="text-gray-300 mb-4">
              Join our community of <span className="font-bold text-blue-400">10,000+</span> satisfied users
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
            >
              Start Your Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

