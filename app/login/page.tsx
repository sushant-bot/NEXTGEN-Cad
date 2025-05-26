"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Github, Twitter, Loader2, Mail, Lock } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState("")
  const [isHovering, setIsHovering] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    console.log("Login attempted with:", formState)
    setIsLoading(false)
    setFormState({ email: "", password: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
        "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
      ],
      transition: {
        duration: 15,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  }

  const fieldVariants = {
    focused: {
      scale: 1.02,
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.2 },
    },
    unfocused: {
      scale: 1,
      boxShadow: "none",
      transition: { duration: 0.2 },
    },
    hover: {
      scale: 1.01,
      transition: { duration: 0.2 },
    },
  }

  const iconVariants = {
    focused: { scale: 1.1, color: "#3B82F6" },
    unfocused: { scale: 1, color: "#6B7280" },
    hover: { scale: 1.05 },
  }

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-green-50"
      variants={backgroundVariants}
      animate="animate"
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="backdrop-blur-lg bg-white/95 shadow-2xl border-t border-white/50">
          <CardHeader className="space-y-1">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto bg-gradient-to-br from-blue-600 to-green-500 w-16 h-16 rounded-full flex items-center justify-center mb-4"
            >
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </motion.svg>
            </motion.div>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <p className="text-center text-gray-500">Enter your credentials to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence>
                {[
                  { name: "email", icon: Mail },
                  { name: "password", icon: Lock },
                ].map(({ name, icon: Icon }) => (
                  <motion.div
                    key={name}
                    variants={fieldVariants}
                    animate={focusedField === name ? "focused" : "unfocused"}
                    whileHover="hover"
                    className="space-y-2 relative"
                  >
                    <Label htmlFor={name} className="text-sm font-medium flex items-center space-x-2">
                      <motion.span
                        variants={iconVariants}
                        animate={focusedField === name ? "focused" : "unfocused"}
                      >
                        <Icon className="h-4 w-4" />
                      </motion.span>
                      <span>{name.charAt(0).toUpperCase() + name.slice(1)}</span>
                    </Label>
                    <Input
                      id={name}
                      name={name}
                      type={name}
                      value={formState[name as keyof typeof formState]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(name)}
                      onBlur={() => setFocusedField("")}
                      className="pl-10 transition-all duration-200 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 bg-white/50"
                      required
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                className="flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader2 className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <>
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { icon: Github, label: "GitHub", color: "hover:bg-gray-900 hover:text-white" },
                  { icon: Twitter, label: "Twitter", color: "hover:bg-blue-500 hover:text-white" },
                ].map(({ icon: Icon, label, color }) => (
                  <motion.div
                    key={label}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsHovering(label)}
                    onHoverEnd={() => setIsHovering("")}
                  >
                    <Button
                      variant="outline"
                      className={`w-full transition-all duration-200 ${color}`}
                    >
                      <motion.div
                        animate={isHovering === label ? { rotate: [0, -10, 10, -10, 0] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                      </motion.div>
                      {label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.p
              className="mt-8 text-center text-sm text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Not a member?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Sign up now
              </Link>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}