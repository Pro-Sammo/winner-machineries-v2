import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import GalleryImage from "@/models/GalleryImage"

export async function GET() {
  try {
    await dbConnect()
    const galleryImages = await GalleryImage.find({ active: true }).sort({ order: 1, createdAt: -1 })
    return NextResponse.json(galleryImages)
  } catch (error) {
    console.error("Gallery images fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 })
  }
} 