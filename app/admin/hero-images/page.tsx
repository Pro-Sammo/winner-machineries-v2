"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useApi } from "@/hooks/use-api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"

interface HeroImage {
  _id: string
  title: string
  subtitle: string
  description: string
  image: {
    url: string
    alt: string
  }
  order: number
  active: boolean
}

export default function AdminHeroImagesPage() {
  const router = useRouter()
  const { data: heroImages, loading, error, refetch } = useApi<HeroImage[]>("/api/hero-images")

  // Handlers for add/edit/delete
  const handleAdd = () => router.push("/admin/hero-images/new")
  const handleEdit = (img: HeroImage) => router.push(`/admin/hero-images/${img._id}/edit`)
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hero image?")) return
    await fetch(`/api/admin/hero-images/${id}`, { method: "DELETE" })
    refetch()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Hero Images</h1>
        <Button onClick={handleAdd} variant="gradient" className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Hero Image
        </Button>
      </div>
      <Card className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtitle</th>
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
                <td colSpan={6} className="text-center py-8 text-red-600">Failed to load hero images.</td>
              </tr>
            )}
            {heroImages && heroImages.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">No hero images found.</td>
              </tr>
            )}
            {heroImages && heroImages.map((img) => (
              <tr key={img._id}>
                <td className="px-4 py-2">
                  <Image src={img.image?.url || "/placeholder.svg"} alt={img.image?.alt || img.title} width={80} height={45} className="rounded" />
                </td>
                <td className="px-4 py-2 font-medium">{img.title}</td>
                <td className="px-4 py-2">{img.subtitle}</td>
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