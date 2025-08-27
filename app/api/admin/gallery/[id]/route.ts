import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import GalleryImage from "@/models/GalleryImage"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const galleryImage = await GalleryImage.findById(id)

    if (!galleryImage) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json(galleryImage)
  } catch (error) {
    console.error("Gallery image fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery image" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const data = await request.json()

    const galleryImage = await GalleryImage.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true },
    )

    if (!galleryImage) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json(galleryImage)
  } catch (error) {
    console.error("Gallery image update error:", error)
    return NextResponse.json({ error: "Failed to update gallery image" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const galleryImage = await GalleryImage.findByIdAndDelete(id)

    if (!galleryImage) {
      return NextResponse.json({ error: "Gallery image not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Gallery image deleted successfully" })
  } catch (error) {
    console.error("Gallery image delete error:", error)
    return NextResponse.json({ error: "Failed to delete gallery image" }, { status: 500 })
  }
}
