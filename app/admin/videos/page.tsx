"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

interface Video {
  _id: string
  title: string
  description: string
  youtubeId: string
  thumbnail: {
    url: string
    alt: string
  }
  category: string
  duration: string
  views: string
  featured: boolean
}

export default function AdminVideosPage() {
  const router = useRouter()
  const { data: videos, loading, error, refetch } = useApi<Video[]>("/api/videos")

  // Handlers for add/edit/delete
  const handleAdd = () => router.push("/admin/videos/new")
  const handleEdit = (video: Video) => router.push(`/admin/videos/${video._id}/edit`)
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this video?")) return
    await fetch(`/api/admin/videos/${id}`, { method: "DELETE" })
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Videos</h1>
        <Button onClick={handleAdd} variant="gradient" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Video
        </Button>
      </div>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Thumbnail</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Featured</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-orange-600" />
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-red-600">Failed to load videos.</td>
              </tr>
            )}
            {videos && videos.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">No videos found.</td>
              </tr>
            )}
            {videos && videos.map((video) => (
              <tr key={video._id}>
                <td className="px-4 py-2">
                  <Image src={video.thumbnail?.url || "/placeholder.svg"} alt={video.thumbnail?.alt || video.title} width={80} height={45} className="rounded" />
                </td>
                <td className="px-4 py-2 font-medium">{video.title}</td>
                <td className="px-4 py-2">{video.category}</td>
                <td className="px-4 py-2">{video.duration}</td>
                <td className="px-4 py-2">{video.views}</td>
                <td className="px-4 py-2">{video.featured ? "Yes" : "No"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(video)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(video._id)}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
} 