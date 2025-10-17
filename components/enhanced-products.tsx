"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Eye, Heart, Zap, Shield, Award, ArrowRight } from "lucide-react"
import Image from "next/image"

const categories = ["All", "Heat Press Machine", "textile conveyor Dryer", "Industrial Washing Machine", "Dryer Machine,Hydro Extractor", "Others Finishing Machine Supplier"]

export function EnhancedProducts({ onViewDetails }: { onViewDetails: (id: string) => void }) {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [likedProducts, setLikedProducts] = useState<string[]>([])

  useEffect(() => {
    setLoading(true)
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filteredProducts =
    selectedCategory === "All" ? products : products.filter((product) => product.category === selectedCategory)

  const toggleLike = (productId: string) => {
    setLikedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center h-40">
            <span className="text-orange-600 text-lg font-semibold">Loading products...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-red-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-medium">
            🔧 Premium Industrial Solutions
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Product Range
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive collection of cutting-edge industrial machinery designed to revolutionize your
            manufacturing processes
          </p>
        </div>

        {/* Category Filter */}
              <div className="relative w-full mb-12">
                <div
                  className="flex gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent pb-2 px-4"
                  style={{ scrollSnapType: "x mandatory" }}
                >
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className={`flex-shrink-0 px-6 py-3 font-medium transition-all duration-300 scroll-snap-align-start ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg hover:shadow-orange-500/25 scale-105"
                          : "bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:border-orange-300 hover:scale-105"
                      }`}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card
              key={product._id}
              className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg ${
                product.featured ? "ring-2 ring-orange-500/20" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.images?.[0]?.url || product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                    {product.category}
                  </Badge>
                  {product.featured && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                      <Award className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                  {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                    onClick={() => toggleLike(product._id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        likedProducts.includes(product._id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm border-0 hover:bg-white"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </Button>
                </div>

                {/* Quick Specs */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="text-xs text-gray-600 space-y-1">
                      {(product.specs || []).slice(0, 2).map((spec, i) => (
                        <div key={i} className="flex items-center">
                          <Zap className="h-3 w-3 text-orange-500 mr-1" />
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  {product.inStock && <Shield className="h-5 w-5 text-green-500 flex-shrink-0" title="In Stock" />}
                </div>
                <CardDescription className="text-gray-600 leading-relaxed">{product.description}</CardDescription>
              </CardHeader>

              <CardContent className="pb-3">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(product.tags || []).map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
                  onClick={() => onViewDetails(product._id)}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "View Details" : "Out of Stock"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-semibold bg-white/80 backdrop-blur-sm border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Load More Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
