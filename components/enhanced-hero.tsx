"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, Award, Users, Globe, Zap, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import { useApi } from "@/hooks/use-api"

interface HeroImage {
  _id: string
  title: string
  subtitle: string
  description: string
  image: {
    url: string
    alt: string
  }
  order: number
  active: boolean
}

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

export function EnhancedHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [counters, setCounters] = useState({ years: 15, clients: 540, projects: 1200 })
  const [bubbles, setBubbles] = useState<any[]>([])

  const { data: heroImages, loading, error } = useApi<HeroImage[]>('/api/hero-images')

  const slides = [
  {
    title: "Complete Garments and Textile Finishing Machine Solution.",
    subtitle: "Automation Meets Perfection",
    description: "Automatic Heat Press Machines, Conveyor Dryers, and Finishing Equipment built for high-quality textile production and efficiency.",
    gradient: "from-orange-600 via-red-600 to-pink-600",
  },
  {
    title: "Complete Industrial Washing Project Solution.",
    subtitle: "Performance You Can Trust",
    description: "Explore our range of Industrial Washing Machines, Hydro Extractors, and Dryer Machines engineered for durability and seamless performance.",
    gradient: "from-green-600 via-blue-600 to-purple-600",
  },
];

  // Use hero images from API if available, otherwise use fallback
  const carouselImages = heroImages && heroImages.length > 0 
    ? heroImages.map(img => ({
        src: img.image.url,
        alt: img.image.alt || img.title,
        title: img.title,
      }))
    : [ ]

  // Auto-slide functionality for content
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [slides.length])

  // Auto-slide functionality for images (faster rotation)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [carouselImages.length])

  // Counter animation
  useEffect(() => {
    const animateCounters = () => {
      const targets = { years: 25, clients: 500, countries: 30, projects: 10000 }
      const duration = 2000
      const steps = 60

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setCounters({
          years: Math.floor(targets.years * easeOut),
          clients: Math.floor(targets.clients * easeOut),
          countries: Math.floor(targets.countries * easeOut),
          projects: Math.floor(targets.projects * easeOut),
        })

        if (step >= steps) clearInterval(timer)
      }, duration / steps)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )

    const element = document.getElementById("hero-stats")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Generate random bubbles only on client side
    setBubbles(generateRandomBubbles(50));
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  if (loading) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-800 to-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="h-12 w-12 animate-spin text-orange-400 mx-auto mb-4" />
          <p className="text-xl">Loading...</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-800 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-orange-600/20 animate-pulse" /> */}
        <div className="absolute top-0 left-0 w-full h-full">
          {bubbles.map((bubble, i) => (
            <div
              key={i}
              className="absolute bg-white/10 rounded-full animate-float"
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
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-6">

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-200 to-orange-200 bg-clip-text text-transparent">
                    {slides[currentSlide].title}
                  </span>
                </h1>
                <h2 className="text-2xl lg:text-3xl font-semibold text-orange-300">{slides[currentSlide].subtitle}</h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">{slides[currentSlide].description}</p>
              </div>
            </div>
            {/* Stats Counter */}
            <div id="hero-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Award className="h-6 w-6 text-orange-400 mr-2" />
                </div>
                <div className="text-3xl font-bold text-white">{counters.years}+</div>
                <div className="text-sm text-gray-300">Years Excellence</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-400 mr-2" />
                </div>
                <div className="text-3xl font-bold text-white">{counters.clients}+</div>
                <div className="text-sm text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-purple-400 mr-2" />
                </div>
                <div className="text-3xl font-bold text-white">{counters.projects.toLocaleString()}+</div>
                <div className="text-sm text-gray-300">Projects</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Carousel */}
          <div className="relative">
            <div className="relative group">
              {/* Carousel Container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-blue-500/30 rounded-3xl blur-3xl group-hover:blur-2xl transition-all duration-500 z-0" />

                {/* Images */}
                <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 p-2 shadow-2xl">
                  <div className="relative h-[500px] overflow-hidden rounded-2xl">
                    {carouselImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                          index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                        }`}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-contain rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />

                        {/* Image Title Overlay */}
                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                            <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              {/* <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-2xl animate-bounce">
                <Award className="h-8 w-8" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-2xl shadow-2xl animate-pulse">
                <Zap className="h-8 w-8" />
              </div> */}

              {/* Progress Ring */}
              <div className="absolute top-4 left-4">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-white/20"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-orange-400"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${((currentImageIndex + 1) / carouselImages.length) * 100}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {currentImageIndex + 1}/{carouselImages.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gradient-to-r from-orange-500 to-red-500 w-8"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
