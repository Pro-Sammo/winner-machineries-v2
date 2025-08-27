"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Upload, X, Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: {
    url: string
    alt: string
    publicId?: string
  }
  onChange: (value: { url: string; alt: string; publicId?: string }) => void
  disabled?: boolean
  label?: string
}

export function ImageUpload({
  value,
  onChange,
  disabled,
  label = "Upload Image"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleImageUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
      )

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const data = await response.json()

      if (data.secure_url) {
        onChange({
          url: data.secure_url,
          alt: value.alt || "Uploaded image",
          publicId: data.public_id
        })
      }
    } catch (error) {
      console.error('Image upload error:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0])
    }
  }, [])

  const handleRemove = () => {
    onChange({
      url: "",
      alt: "",
      publicId: ""
    })
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {!value.url ? (
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? "border-primary bg-primary/10" 
              : "border-gray-300 hover:border-primary"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
            disabled={disabled || isUploading}
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <div className="space-y-4">
              {isUploading ? (
                <div className="flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-400 mx-auto" />
              )}
              <div>
                <p className="text-gray-600">
                  {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP up to 10MB
                </p>
              </div>
            </div>
          </label>
        </div>
      ) : (
        <Card className="p-4">
          <div className="relative group">
            <div className="relative w-full h-48">
              <Image
                src={value.url}
                alt={value.alt}
                fill
                className="object-cover rounded"
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4">
            <Input
              placeholder="Image alt text"
              value={value.alt}
              onChange={(e) => onChange({ ...value, alt: e.target.value })}
              className="text-sm"
            />
          </div>
        </Card>
      )}
    </div>
  )
}
