"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion } from "framer-motion"

const plans = [
  {
    name: "Basic",
    price: "$29",
    features: ["5 CAD Projects", "Basic AI Optimization", "24/7 Support", "1 Team Member"],
  },
  {
    name: "Pro",
    price: "$99",
    features: [
      "Unlimited CAD Projects",
      "Advanced AI Optimization",
      "24/7 Priority Support",
      "5 Team Members",
      "Real-time Collaboration",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited Everything",
      "Dedicated Account Manager",
      "Custom AI Model Training",
      "On-premise Deployment Option",
      "Advanced Analytics",
    ],
  },
]

export default function Pricing() {
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="pricing" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">
                {plan.price}
                <span className="text-xl font-normal">/month</span>
              </p>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2">
                    <Check className="h-5 w-5 text-green-400 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Choose Plan</Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

