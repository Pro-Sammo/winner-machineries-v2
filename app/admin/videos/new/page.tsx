"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

const categories = ["Tutorial", "Factory Tour", "Product Demo", "Case Study", "Maintenance", "Innovation"]

export default function NewVideoPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    youtubeId: "",
    thumbnail: {
      url: "",
      alt: ""
    },
    category: "",
    duration: "",
    views: "0",
    featured: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/admin/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/videos")
      } else {
        throw new Error("Failed to create video")
      }
    } catch (error) {
      console.error("Error creating video:", error)
      alert("Failed to create video. Please try again.")
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

  // Auto-generate thumbnail when YouTube ID changes
  const handleYoutubeIdChange = (youtubeId: string) => {
    setFormData(prev => ({
      ...prev,
      youtubeId,
      thumbnail: {
        url: youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "",
        alt: prev.thumbnail.alt || `Thumbnail for ${prev.title}`
      }
    }))
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Add New Video</h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Video Information</CardTitle>
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
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="youtubeId">YouTube Video ID *</Label>
              <Input
                id="youtubeId"
                value={formData.youtubeId}
                onChange={(e) => handleYoutubeIdChange(e.target.value)}
                placeholder="e.g., dQw4w9WgXcQ"
                required
              />
              <p className="text-sm text-gray-500">
                Enter the YouTube video ID (the part after v= in the URL). 
                Thumbnail will be automatically generated.
              </p>
            </div>

            {formData.thumbnail.url && (
              <div className="space-y-2">
                <Label>Generated Thumbnail</Label>
                <div className="border rounded p-2">
                  <img 
                    src={formData.thumbnail.url} 
                    alt={formData.thumbnail.alt}
                    className="w-48 h-27 object-cover rounded"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange("duration", e.target.value)}
                  placeholder="e.g., 12:45"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="views">Views</Label>
              <Input
                id="views"
                value={formData.views}
                onChange={(e) => handleInputChange("views", e.target.value)}
                placeholder="e.g., 15.2K"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
              <Input
                id="thumbnailUrl"
                value={formData.thumbnail.url}
                onChange={(e) => handleInputChange("thumbnail.url", e.target.value)}
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnailAlt">Thumbnail Alt Text</Label>
              <Input
                id="thumbnailAlt"
                value={formData.thumbnail.alt}
                onChange={(e) => handleInputChange("thumbnail.alt", e.target.value)}
                placeholder="Video thumbnail description"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleInputChange("featured", checked)}
              />
              <Label htmlFor="featured">Featured Video</Label>
            </div>

            <div className="flex gap-4">
              <Button type="submit" variant="gradient" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Add Video
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