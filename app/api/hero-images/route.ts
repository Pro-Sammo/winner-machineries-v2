import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import HeroImage from "@/models/HeroImage"

export async function GET() {
  try {
    await dbConnect()
    const heroImages = await HeroImage.find({ active: true }).sort({ order: 1, createdAt: -1 })
    return NextResponse.json(heroImages)
  } catch (error) {
    console.error("Hero images fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch hero images" }, { status: 500 })
  }
} 