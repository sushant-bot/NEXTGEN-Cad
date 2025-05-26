"use client"

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const buttonHoverEffect = {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white overflow-hidden"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]">
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0px 0px", "100px 100px"]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64"
          style={{
            background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)",
            borderRadius: "50%"
          }}
          animate={{
            y: [-20, 20],
            x: [-10, 10],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96"
          style={{
            background: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(236,72,153,0) 70%)",
            borderRadius: "50%"
          }}
          animate={{
            y: [20, -20],
            x: [10, -10],
            scale: [1.1, 1, 1.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          className="md:w-3/4 lg:w-2/3 mx-auto"
        >
          <motion.div
            variants={textVariants}
            className="relative"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                Next-Gen CAD Design Platform
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={textVariants}
            className="text-xl md:text-2xl text-blue-100 mt-6 mb-10 leading-relaxed"
          >
            Revolutionize your design process with AI-powered optimization
            <br className="hidden md:block" />
            and real-time collaboration tools.
          </motion.p>

          <motion.div 
            variants={textVariants}
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <motion.div whileHover={buttonHoverEffect}>
              <Button
                size="lg"
                className="relative group px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_rgba(59,130,246,0.8)]"
              >
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
              </Button>
            </motion.div>

            <motion.div whileHover={buttonHoverEffect}>
              <Button
                size="lg"
                variant="outline"
                className="relative group px-8 py-6 text-lg border-2 border-blue-400 text-blue-100 hover:bg-blue-400/10 hover:border-blue-300 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
              >
                <span className="relative z-10">Explore Features</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-blue-300/20 opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </section>
  );
}