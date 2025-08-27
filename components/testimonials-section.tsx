"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Manufacturing Director",
    company: "TechCorp Industries",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    content:
      "Winner Machineries transformed our production line with their CNC solutions. The precision and reliability have exceeded our expectations, resulting in 40% increased efficiency.",
    industry: "Aerospace",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Operations Manager",
    company: "AutoParts Pro",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    content:
      "The hydraulic press system we purchased has been running flawlessly for 2 years. Their technical support team is exceptional and always available when needed.",
    industry: "Automotive",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Plant Engineer",
    company: "MedDevice Solutions",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    content:
      "Outstanding quality and precision. The grinding machines have helped us achieve the tight tolerances required for medical device manufacturing.",
    industry: "Medical",
  },
  {
    id: 4,
    name: "David Thompson",
    position: "Production Lead",
    company: "Steel Works Inc",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    content:
      "Winner Machineries doesn't just sell equipment, they provide complete solutions. Their expertise and after-sales service are unmatched in the industry.",
    industry: "Steel",
  },
  {
    id: 5,
    name: "Lisa Wang",
    position: "Quality Manager",
    company: "Precision Parts Ltd",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    content:
      "The robotic welding system has revolutionized our production. Consistent quality, reduced waste, and improved safety - everything we hoped for and more.",
    industry: "Manufacturing",
  },
]

function generateRandomBubbles(count: number) {
  return Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    width: Math.random() * 6 + 2,
    height: Math.random() * 6 + 2,
    animationDelay: Math.random() * 5,
    animationDuration: Math.random() * 4 + 3,
  }));
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [bubbles, setBubbles] = useState<any[]>([])

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  useEffect(() => {
    // Generate random bubbles only on client side
    setBubbles(generateRandomBubbles(30));
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-orange-600/10" />
        {bubbles.map((bubble, i) => (
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
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 text-sm font-medium">
            💬 Client Success Stories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            What Our{" "}
            <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover how Winner Machineries has helped businesses across industries achieve their manufacturing goals
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
                    <CardContent className="p-8 text-center">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="h-12 w-12 text-orange-400 mx-auto" />
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Content */}
                      <blockquote className="text-xl text-white leading-relaxed mb-8 italic">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center justify-center space-x-4">
                        <Avatar className="h-16 w-16 border-2 border-orange-400">
                          <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                          <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-left">
                          <div className="font-semibold text-white text-lg">{testimonial.name}</div>
                          <div className="text-gray-300">{testimonial.position}</div>
                          <div className="text-orange-400 font-medium">{testimonial.company}</div>
                          <Badge className="mt-2 bg-blue-600/20 text-blue-300 border-blue-400/30">
                            {testimonial.industry}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-orange-500 to-red-500 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
