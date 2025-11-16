import { CADHeader } from "@/components/ui/cad-header"
import HeroWithBackgroundPaths from "@/components/HeroWithBackgroundPaths"
import About from "@/components/About"
import Features from "@/components/Features"
import ProductShowcase from "@/components/ProductShowcase"
import Testimonials from "@/components/Testimonials"
import Pricing from "@/components/Pricing"
import FAQ from "@/components/FAQ"
import Contact from "@/components/Contact"
import Newsletter from "@/components/Newsletter"
import Footer from "@/components/Footer"
import FloatingShapes from "@/components/FloatingShapes"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      <FloatingShapes />
      <CADHeader />
      <HeroWithBackgroundPaths />
      <About />
      <Features />
      <ProductShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Contact />
      <Newsletter />
      <Footer />
    </main>
  )
}

