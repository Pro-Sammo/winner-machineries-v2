"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "CNC Milling Machine X500",
    description: "High-precision 5-axis CNC milling machine for complex manufacturing tasks",
    rating: 4.8,
    reviews: 24,
    image: "/placeholder.svg?height=300&width=400",
    category: "CNC Machines",
    inStock: true,
  },
  {
    id: 2,
    name: "Industrial Lathe Pro 2000",
    description: "Heavy-duty lathe machine with advanced digital controls and precision tooling",
    rating: 4.9,
    reviews: 18,
    image: "/placeholder.svg?height=300&width=400",
    category: "Lathes",
    inStock: true,
  },
  {
    id: 3,
    name: "Hydraulic Press HP-300",
    description: "Powerful 300-ton hydraulic press for metal forming and stamping operations",
    rating: 4.7,
    reviews: 31,
    image: "/placeholder.svg?height=300&width=400",
    category: "Presses",
    inStock: false,
  },
  {
    id: 4,
    name: "Welding Robot WR-450",
    description: "Automated welding robot with 6-axis movement and precision control",
    rating: 4.9,
    reviews: 12,
    image: "/placeholder.svg?height=300&width=400",
    category: "Robotics",
    inStock: true,
  },
  {
    id: 5,
    name: "Grinding Machine GM-800",
    description: "Surface grinding machine with magnetic chuck and automatic feed",
    rating: 4.6,
    reviews: 27,
    image: "/placeholder.svg?height=300&width=400",
    category: "Grinding",
    inStock: true,
  },
  {
    id: 6,
    name: "Plasma Cutting System PC-1200",
    description: "High-definition plasma cutting system for thick metal plates",
    rating: 4.8,
    reviews: 19,
    image: "/placeholder.svg?height=300&width=400",
    category: "Cutting",
    inStock: true,
  },
]

export function ProductsSection({ onViewDetails }: { onViewDetails: (id: number) => void }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of industrial machinery and equipment designed for maximum efficiency and
            reliability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-blue-600">{product.category}</Badge>
                {!product.inStock && (
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    Out of Stock
                  </Badge>
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription className="text-sm">{product.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex items-center space-x-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => onViewDetails(product.id)}>
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
