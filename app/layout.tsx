import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AnimatePresence } from "framer-motion"
import type React from "react" // Added import for React
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next-Gen CAD Design Platform",
  description: "Revolutionize your design process with AI-powered optimization and real-time collaboration.",
    generator: 'Next.js',
    applicationName: 'Next-Gen CAD Design Platform',
    keywords: ['CAD', 'Design', 'AI', 'Collaboration', '3D Modeling', 'Engineering'],
    colorScheme: 'light dark',  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <AnimatePresence>{children}</AnimatePresence>
        </body>
      </html>
    </ClerkProvider>
  )
}



import './globals.css'