"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-gray-900/95 backdrop-blur-md shadow-lg" : ""}`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-white">
            Next-Gen CAD
          </Link>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.path}
                  className={`text-white hover:text-blue-400 transition-colors ${pathname === item.path ? "text-blue-400" : ""}`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </header>
  )
}

