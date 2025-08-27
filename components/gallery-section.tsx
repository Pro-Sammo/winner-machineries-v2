"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ZoomIn, Loader2 } from "lucide-react"
import Image from "next/image"
import { useApi } from "@/hooks/use-api"

interface GalleryImage {
  _id: string
  title: string
  category: string
  image: {
    url: string
    alt: string
  }
  order: number
  active: boolean
}

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  
  const { data: galleryImages, loading, error } = useApi<GalleryImage[]>('/api/gallery')

  // Get unique categories from the data
  const categories = ["All", ...Array.from(new Set(galleryImages?.map(img => img.category) || []))]

  const filteredImages =
    selectedCategory === "All" 
      ? galleryImages 
      : galleryImages?.filter((img) => img.category === selectedCategory) || []

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our facilities, products, and team through our comprehensive image gallery
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our facilities, products, and team through our comprehensive image gallery
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load gallery. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  if (!galleryImages || galleryImages.length === 0) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our facilities, products, and team through our comprehensive image gallery
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No gallery images available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our facilities, products, and team through our comprehensive image gallery
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-orange-600 hover:bg-orange-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card
              key={image._id}
              className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative">
                <Image
                  src={image.image.url || "/placeholder.svg"}
                  alt={image.image.alt || image.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white" />
                </div>
                <Badge className="absolute top-2 left-2 bg-blue-600">{image.category}</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{image.title}</h3>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <Button
                variant="outline"
                size="icon"
                className="absolute -top-12 right-0 bg-white/20 border-white/30 text-white hover:bg-white/30"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <Image
                src={selectedImage.image.url || "/placeholder.svg"}
                alt={selectedImage.image.alt || selectedImage.title}
                width={800}
                height={600}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <Badge className="mt-2 bg-blue-600">{selectedImage.category}</Badge>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
