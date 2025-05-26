"use client"

import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "This platform revolutionized how we approach design. The AI optimization is truly a game-changer!",
    author: "Chandan P",
    title: "Lead Designer",
  },
  {
    quote: "Collaboration has never been easier. We now work together seamlessly across different time zones.",
    author: "Sushant C",
    title: "Project Manager",
  },
  {
    quote: "It is very unique Project, May include some error but it is very understanding.",
    author: "Tejass bhau",
    title: "System Manager",
  },
]

export default function Testimonials() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="testimonials" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
            >
              <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
              <p className="font-bold">{testimonial.author}</p>
              <p className="text-gray-400">{testimonial.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

