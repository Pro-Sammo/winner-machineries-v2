"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import GetQuoteModal from "@/components/get-quote-modal"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <Button variant="outline" size="icon" className="lg:hidden bg-transparent" onClick={toggleMenu}>
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={toggleMenu} />

          {/* Menu Panel */}
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Image src="/logo.png" alt="Winner Machineries Logo" width={40} height={40} className="h-8 w-auto" />
                  <span className="ml-2 text-lg font-bold text-primary">Winner Machineries</span>
                </div>
                <Button variant="outline" size="icon" onClick={toggleMenu} className="bg-transparent">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 px-4 py-6">
                <div className="space-y-4">
                  <Link
                    href="#home"
                    className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-gray-100"
                    onClick={handleLinkClick}
                  >
                    Home
                  </Link>
                  <Link
                    href="#products"
                    className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-gray-100"
                    onClick={handleLinkClick}
                  >
                    Products
                  </Link>
                  <Link
                    href="#about"
                    className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-gray-100"
                    onClick={handleLinkClick}
                  >
                    About Us
                  </Link>
                  <Link
                    href="#videos"
                    className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-gray-100"
                    onClick={handleLinkClick}
                  >
                    Videos
                  </Link>
                  <Link
                    href="#gallery"
                    className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-gray-100"
                    onClick={handleLinkClick}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="#contact"
                    className="block text-lg font-medium text-gray-700 hover:text-orange-600 transition-colors py-3 border-b border-gray-100"
                    onClick={handleLinkClick}
                  >
                    Contact
                  </Link>
                </div>

                {/* Contact Information */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-600">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-orange-600" />
                      <span className="text-gray-600">info@winnermachineries.com</span>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-6">
                  <GetQuoteModal trigger={<Button className="w-full bg-primary hover:bg-secondary">Get Quote</Button>} />
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
