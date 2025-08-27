import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Video from "@/models/Video"
import HeroImage from "@/models/HeroImage"
import GalleryImage from "@/models/GalleryImage"

export async function GET() {
  try {
    await dbConnect()

    const [products, videos, heroImages, galleryImages] = await Promise.all([
      Product.countDocuments(),
      Video.countDocuments(),
      HeroImage.countDocuments(),
      GalleryImage.countDocuments(),
    ])

    return NextResponse.json({
      products,
      videos,
      heroImages,
      galleryImages,
    })
  } catch (error) {
    console.error("Stats fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
