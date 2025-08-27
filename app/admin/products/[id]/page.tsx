"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"

interface Product {
  _id: string
  name: string
  description: string
  category: string
  images: Array<{ url: string; alt: string }>
  inStock: boolean
  featured: boolean
  rating: number
  reviews: number
  createdAt: string
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params as { id: string }
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) fetchProduct()
    // eslint-disable-next-line
  }, [id])

  const fetchProduct = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/products/${id}`)
      if (response.ok) {
        const data = await response.json()
        setProduct(data)
      }
    } catch (error) {
      console.error("Failed to fetch product:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!product) {
    return <div className="p-8 text-center text-red-600">Product not found.</div>
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <div className="flex gap-2 mt-2">
            <Badge className="bg-blue-600">{product.category}</Badge>
            {product.featured && <Badge className="bg-orange-600">Featured</Badge>}
            <Badge variant={product.inStock ? "default" : "destructive"} className={product.inStock ? "bg-green-600" : ""}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].alt || product.name}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              ) : (
                <div className="w-[400px] h-[300px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="font-semibold">Description:</div>
                <div className="text-gray-700">{product.description}</div>
              </div>
              <div>
                <span className="font-semibold">Rating:</span> {product.rating} ({product.reviews} reviews)
              </div>
              <div>
                <span className="font-semibold">Created:</span> {new Date(product.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 