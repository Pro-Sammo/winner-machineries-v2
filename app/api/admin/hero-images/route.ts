import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import HeroImage from "@/models/HeroImage"

export async function GET() {
  try {
    await dbConnect()
    const heroImages = await HeroImage.find().sort({ order: 1, createdAt: -1 })
    return NextResponse.json(heroImages)
  } catch (error) {
    console.error("Hero images fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch hero images" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    const heroImage = new HeroImage(data)
    await heroImage.save()

    return NextResponse.json(heroImage, { status: 201 })
  } catch (error) {
    console.error("Hero image creation error:", error)
    return NextResponse.json({ error: "Failed to create hero image" }, { status: 500 })
  }
}
