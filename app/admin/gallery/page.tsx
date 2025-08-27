"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

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

export default function AdminGalleryPage() {
  const router = useRouter()
  const { data: galleryImages, loading, error, refetch } = useApi<GalleryImage[]>("/api/gallery")

  // Handlers for add/edit/delete
  const handleAdd = () => router.push("/admin/gallery/new")
  const handleEdit = (img: GalleryImage) => router.push(`/admin/gallery/${img._id}/edit`)
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery image?")) return
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" })
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Gallery Images</h1>
        <Button onClick={handleAdd} variant="gradient" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Gallery Image
        </Button>
      </div>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan={6} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-orange-600" />
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-red-600">Failed to load gallery images.</td>
              </tr>
            )}
            {galleryImages && galleryImages.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">No gallery images found.</td>
              </tr>
            )}
            {galleryImages && galleryImages.map((img) => (
              <tr key={img._id}>
                <td className="px-4 py-2">
                  <Image src={img.image?.url || "/placeholder.svg"} alt={img.image?.alt || img.title} width={80} height={45} className="rounded" />
                </td>
                <td className="px-4 py-2 font-medium">{img.title}</td>
                <td className="px-4 py-2">{img.category}</td>
                <td className="px-4 py-2">{img.order}</td>
                <td className="px-4 py-2">{img.active ? "Yes" : "No"}</td>
                <td className="px-4 py-2 flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleEdit(img)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(img._id)}><Trash2 className="w-4 h-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
} 