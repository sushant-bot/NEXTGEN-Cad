"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function FloatingShapes() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const colors = ["#3b82f630", "#60a5fa30", "#2563eb30"]
    const shapes: HTMLDivElement[] = []

    for (let i = 0; i < 8; i++) {
      const shape = document.createElement("div")
      const size = Math.random() * 200 + 100
      const color = colors[Math.floor(Math.random() * colors.length)]

      Object.assign(shape.style, {
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        borderRadius: "50%",
        transition: "all 0.5s ease-in-out",
      })

      shapes.push(shape)
      container.appendChild(shape)
    }

    const animateShapes = () => {
      shapes.forEach((shape) => {
        const newX = Math.random() * 100
        const newY = Math.random() * 100
        const newScale = 0.8 + Math.random() * 0.4
        const newRotation = Math.random() * 360

        shape.style.transform = `translate(${newX}%, ${newY}%) scale(${newScale}) rotate(${newRotation}deg)`
      })
    }

    const intervalId = setInterval(animateShapes, 5000)
    animateShapes() // Initial animation

    return () => {
      clearInterval(intervalId)
      shapes.forEach((shape) => shape.remove())
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
}

