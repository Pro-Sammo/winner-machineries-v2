import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import GalleryImage from "@/models/GalleryImage"

export async function GET() {
  try {
    await dbConnect()
    const galleryImages = await GalleryImage.find().sort({ order: 1, createdAt: -1 })
    return NextResponse.json(galleryImages)
  } catch (error) {
    console.error("Gallery images fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    const galleryImage = new GalleryImage(data)
    await galleryImage.save()

    return NextResponse.json(galleryImage, { status: 201 })
  } catch (error) {
    console.error("Gallery image creation error:", error)
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 })
  }
}
