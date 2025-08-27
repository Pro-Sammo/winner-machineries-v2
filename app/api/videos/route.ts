import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Video from "@/models/Video"

export async function GET() {
  try {
    await dbConnect()
    const videos = await Video.find().sort({ featured: -1, createdAt: -1 })
    return NextResponse.json(videos)
  } catch (error) {
    console.error("Videos fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
} 