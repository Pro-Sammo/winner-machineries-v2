"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import { ImageUpload } from "@/components/image-upload"

interface HeroImage {
  _id: string
  title: string
  subtitle: string
  description: string
  image: {
    url: string
    alt: string
    publicId?: string
  }
  order: number
  active: boolean
}

export default function EditHeroImagePage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: {
      url: "",
      alt: "",
      publicId: ""
    },
    order: 0,
    active: true
  })

  // Fetch hero image data on component mount
  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await fetch(`/api/admin/hero-images/${params.id}`)
        if (response.ok) {
          const heroImage: HeroImage = await response.json()
          setFormData({
            title: heroImage.title,
            subtitle: heroImage.subtitle || "",
            description: heroImage.description || "",
            image: {
              url: heroImage.image?.url || "",
              alt: heroImage.image?.alt || "",
              publicId: heroImage.image?.publicId || ""
            },
            order: heroImage.order,
            active: heroImage.active
          })
        } else {
          throw new Error("Failed to fetch hero image")
        }
      } catch (error) {
        console.error("Error fetching hero image:", error)
        alert("Failed to fetch hero image data. Please try again.")
      } finally {
        setFetching(false)
      }
    }

    if (params.id) {
      fetchHeroImage()
    }
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.image.url) {
      alert("Please upload an image")
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/hero-images/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/hero-images")
      } else {
        throw new Error("Failed to update hero image")
      }
    } catch (error) {
      console.error("Error updating hero image:", error)
      alert("Failed to update hero image. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleImageChange = (imageData: { url: string; alt: string; publicId?: string }) => {
    setFormData(prev => ({
      ...prev,
      image: {
        url: imageData.url,
        alt: imageData.alt,
        publicId: imageData.publicId || ""
      }
    }))
  }

  if (fetching) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Edit Hero Image</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Hero Image Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>

            <ImageUpload
              value={formData.image}
              onChange={handleImageChange}
              disabled={loading}
              label="Hero Image *"
            />

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => handleInputChange("order", parseInt(e.target.value) || 0)}
                min="0"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => handleInputChange("active", checked)}
              />
              <Label htmlFor="active">Active</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading} className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {loading ? "Updating..." : "Update Hero Image"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 