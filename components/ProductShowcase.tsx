"use client"

import Image from "next/image"
import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button" // Import the Button component

export default function ProductShowcase() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="showcase" className="py-20 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Product Showcase</h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-[600px] rounded-xl overflow-hidden"
        >
          <Image
            src="/placeholder.svg"
            alt="CAD Software Interface"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-4">Next-Gen CAD Interface</h3>
              <p className="text-xl mb-8">Experience the future of CAD design</p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
                Watch Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

