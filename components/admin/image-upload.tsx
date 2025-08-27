"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  onUpload: (imageData: { url: string; publicId: string }) => void
  currentImage?: string
  className?: string
}

export function ImageUpload({ onUpload, currentImage, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(currentImage || null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setUploading(true)
      setPreview(URL.createObjectURL(file))

      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        )

        const data = await response.json()

        if (data.secure_url) {
          onUpload({
            url: data.secure_url,
            publicId: data.public_id,
          })
        }
      } catch (error) {
        console.error("Upload failed:", error)
      } finally {
        setUploading(false)
      }
    },
    [onUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: false,
  })

  const removeImage = () => {
    setPreview(null)
    onUpload({ url: "", publicId: "" })
  }

  return (
    <div className={className}>
      {preview ? (
        <Card className="relative">
          <CardContent className="p-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={removeImage}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          {...getRootProps()}
          className={`border-2 border-dashed cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
          }`}
        >
          <CardContent className="p-8 text-center">
            <input {...getInputProps()} />
            {uploading ? (
              <div className="space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-gray-600">Uploading...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  {isDragActive ? (
                    <Upload className="h-6 w-6 text-primary" />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <p className="text-gray-600 mb-2">
                    {isDragActive ? "Drop the image here" : "Drag & drop an image here"}
                  </p>
                  <Button variant="gradient" size="sm">
                    Choose File
                  </Button>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
