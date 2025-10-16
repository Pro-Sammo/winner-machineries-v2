"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

import { EnhancedHero } from "@/components/enhanced-hero"
import { TrustedBrands } from "@/components/trusted-brands"
import { EnhancedProducts } from "@/components/enhanced-products"
import { WhoWeAre } from "@/components/who-we-are"
import { VideosSection } from "@/components/videos-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { ProductDetails } from "@/components/product-details"
import { MobileMenu } from "@/components/mobile-menu"
import { TestimonialsSection } from "@/components/testimonials-section"
import GetQuoteModal from "@/components/get-quote-modal"

function generateRandomBubbles(count: number) {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    width: Math.random() * 4 + 1,
    height: Math.random() * 4 + 1,
    animationDelay: Math.random() * 5,
    animationDuration: Math.random() * 3 + 2,
  }));
}

export default function HomePage() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [footerBubbles, setFooterBubbles] = useState<any[]>([])

  useEffect(() => {
    // Generate random bubbles only on client side
    setFooterBubbles(generateRandomBubbles(20));
  }, []);

  const handleViewDetails = (productId: string) => {
    setSelectedProductId(productId)
  }

  const handleBackToProducts = () => {
    setSelectedProductId(null)
  }

  return (
    <div className="min-h-screen">
      {selectedProductId ? (
        <ProductDetails productId={selectedProductId} onBack={handleBackToProducts} />
      ) : (
        <>
          {/* Enhanced Header */}
          <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-sm border-b border-white/20">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                  <Image 
                    src="/logo.png" 
                    alt="Winner Machineries Logo" 
                    width={48} 
                    height={48} 
                    className="h-12 w-auto"
                  />
                  <span className="ml-2 text-2xl font-bold text-primary">Winner Machineries</span>
                </div>

                {/* Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                  <Link
                    href="#home"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Home
                  </Link>
                  <Link
                    href="#products"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Products
                  </Link>
                  <Link
                    href="#about"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    About Us
                  </Link>
                  <Link
                    href="#videos"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Videos
                  </Link>
                  <Link
                    href="#gallery"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Gallery
                  </Link>
                  <Link
                    href="#contact"
                    className="text-gray-700 hover:text-orange-600 font-medium transition-all duration-300 hover:scale-105"
                  >
                    Contact
                  </Link>
                </nav>

                {/* Contact Info & CTA */}
                <div className="hidden md:flex items-center space-x-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>+8801818-261224</span>
                  </div>
                  <GetQuoteModal />
                </div>

                {/* Mobile Menu Button */}
                <MobileMenu />
              </div>
            </div>
          </header>

          {/* Enhanced Hero Section with Carousel */}
          <section id="home">
            <EnhancedHero />
          </section>

          {/* Trusted Brands */}
          <TrustedBrands />

          {/* Enhanced Products Section */}
          <div id="products">
            <EnhancedProducts onViewDetails={handleViewDetails} />
          </div>

          {/* Testimonials Section */}
          {/* <TestimonialsSection /> */}

          {/* Who We Are Section */}
          <div id="about">
            <WhoWeAre />
          </div>

          {/* Videos Section */}
          <div id="videos">
            <VideosSection />
          </div>

          {/* Gallery Section */}
          <div id="gallery">
            <GallerySection />
          </div>

          {/* Contact Section */}
          <div id="contact">
            <ContactSection />
          </div>

          {/* Enhanced Footer */}
          <footer className="bg-black text-white py-16 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              {footerBubbles.map((bubble, i) => (
                <div
                  key={i}
                  className="absolute bg-white/5 rounded-full animate-float"
                  style={{
                    left: `${bubble.left}%`,
                    top: `${bubble.top}%`,
                    width: `${bubble.width}px`,
                    height: `${bubble.height}px`,
                    animationDelay: `${bubble.animationDelay}s`,
                    animationDuration: `${bubble.animationDuration}s`,
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="grid md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Image 
                      src="/logo.png" 
                      alt="Winner Machineries Logo" 
                      width={40} 
                      height={40} 
                      className="h-10 w-auto"
                    />
                    <span className="ml-2 text-xl font-bold text-primary">Winner Machineries</span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Leading provider of industrial machinery and equipment solutions with over 12 years of excellence in
                    precision engineering and manufacturing innovation.
                  </p>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                      <span className="text-sm font-bold">f</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                      <span className="text-sm font-bold">in</span>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                      <span className="text-sm font-bold">@</span>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-semibold text-lg mb-6 text-white">Quick Links</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        href="#home"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#products"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#about"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#videos"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Videos
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#gallery"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Gallery
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Products */}
                {/* <div>
                  <h3 className="font-semibold text-lg mb-6 text-white">Products</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        CNC Machines
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Industrial Lathes
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Hydraulic Presses
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Welding Robots
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-gray-300 hover:text-orange-400 transition-colors hover:translate-x-1 inline-block"
                      >
                        Grinding Machines
                      </Link>
                    </li>
                  </ul>
                </div> */}

                {/* Contact Info */}
                <div>
                  <h3 className="font-semibold text-lg mb-6 text-white">Contact Info</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">
                        Shop no. 104. Misco Super
                        <br />
                        Market, 4 Darussalam
                        <br />
                        Road,Mirpur-1 , Dhaka-1216,
                       <br/>
                        Bangladesh
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300">+8801818-261224</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                      <span className="text-gray-300">winnermachineries@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 mt-12 pt-8 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} Winner Machineries. All rights reserved. | Privacy Policy | Terms of Service</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  )
}
