"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Video, ImageIcon, TrendingUp, Loader2 } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  products: number
  videos: number
  heroImages: number
  galleryImages: number
}

interface Product {
  _id: string
  name: string
  inStock: boolean
  createdAt: string
}

interface Video {
  _id: string
  title: string
  views: string
  category: string
  createdAt: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    videos: 0,
    heroImages: 0,
    galleryImages: 0,
  })
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [recentVideos, setRecentVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [productsLoading, setProductsLoading] = useState(true)
  const [videosLoading, setVideosLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchRecentProducts()
    fetchRecentVideos()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentProducts = async () => {
    try {
      const response = await fetch("/api/admin/products?limit=3&sort=createdAt")
      if (response.ok) {
        const data = await response.json()
        setRecentProducts(data.products || [])
      }
    } catch (error) {
      console.error("Failed to fetch recent products:", error)
    } finally {
      setProductsLoading(false)
    }
  }

  const fetchRecentVideos = async () => {
    try {
      const response = await fetch("/api/admin/videos?limit=3&sort=createdAt")
      if (response.ok) {
        const data = await response.json()
        setRecentVideos(data.videos || [])
      }
    } catch (error) {
      console.error("Failed to fetch recent videos:", error)
    } finally {
      setVideosLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return "Added today"
    if (diffDays === 2) return "Added yesterday"
    if (diffDays < 7) return `Added ${diffDays} days ago`
    if (diffDays < 30) return `Added ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
    return `Added ${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
  }

  const dashboardCards = [
    {
      title: "Products",
      value: stats.products,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      href: "/admin/products",
    },
    {
      title: "Videos",
      value: stats.videos,
      icon: Video,
      color: "from-purple-500 to-purple-600",
      href: "/admin/videos",
    },
    {
      title: "Hero Images",
      value: stats.heroImages,
      icon: ImageIcon,
      color: "from-orange-500 to-orange-600",
      href: "/admin/hero-images",
    },
    {
      title: "Gallery Images",
      value: stats.galleryImages,
      icon: ImageIcon,
      color: "from-green-500 to-green-600",
      href: "/admin/gallery",
    },
  ]

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new product listing",
      icon: Package,
      href: "/admin/products/new",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Upload Video",
      description: "Add a new YouTube video",
      icon: Video,
      href: "/admin/videos/new",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Manage Hero Images",
      description: "Update carousel images",
      icon: ImageIcon,
      href: "/admin/hero-images",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Gallery Management",
      description: "Organize gallery images",
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "from-green-500 to-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your website content and settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardCards.map((card, index) => (
            <Link key={index} href={card.href}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{card.title}</p>
                      <div className="text-3xl font-bold text-gray-900">
                        {loading ? <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" /> : card.value}
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-r ${card.color}`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                  <CardContent className="p-6">
                    <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} w-fit mb-4`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recent Products</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {productsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="w-16 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : recentProducts.length > 0 ? (
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <Link key={product._id} href={`/admin/products/${product._id}/edit`}>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{formatDate(product.createdAt)}</p>
                        </div>
                        <Badge className={product.inStock ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No products found</p>
                  <Link href="/admin/products/new" className="text-blue-600 hover:underline">
                    Add your first product
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Video className="h-5 w-5" />
                <span>Recent Videos</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {videosLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="space-y-2">
                        <div className="w-40 h-4 bg-gray-200 rounded animate-pulse" />
                        <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
                      </div>
                      <div className="w-20 h-6 bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : recentVideos.length > 0 ? (
                <div className="space-y-4">
                  {recentVideos.map((video) => (
                    <Link key={video._id} href={`/admin/videos/${video._id}/edit`}>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div>
                          <p className="font-medium text-gray-900">{video.title}</p>
                          <p className="text-sm text-gray-600">{video.views} views</p>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">{video.category}</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Video className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No videos found</p>
                  <Link href="/admin/videos/new" className="text-blue-600 hover:underline">
                    Add your first video
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
