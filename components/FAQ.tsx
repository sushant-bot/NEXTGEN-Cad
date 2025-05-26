"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useScrollAnimation } from "@/utils/useScrollAnimation"
import { motion, AnimatePresence } from "framer-motion"

const faqs = [
  {
    question: "How does AI optimize my CAD designs?",
    answer:
      "Our AI analyzes your designs based on industry best practices, material efficiency, and structural integrity. It suggests improvements to enhance performance and reduce material waste.",
  },
  {
    question: "Can I collaborate with my team in real-time?",
    answer:
      "Yes, our platform supports real-time collaboration. Multiple team members can work on the same project simultaneously, with changes synced instantly across all devices.",
  },
  {
    question: "Is my data secure on your platform?",
    answer:
      "Absolutely. We use industry-standard encryption and security protocols to ensure your designs and data are protected. We also offer on-premise deployment for enterprise clients with specific security requirements.",
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a 14-day free trial on our Pro plan. This gives you full access to all features so you can experience the power of our platform before committing.",
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [ref, isVisible] = useScrollAnimation()

  return (
    <section id="faq" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold">{faq.question}</span>
                {openIndex === index ? <ChevronUp /> : <ChevronDown />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white bg-opacity-5 rounded-b-lg"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

