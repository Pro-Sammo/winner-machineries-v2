import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Video from "@/models/Video"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort')
    
    let query = Video.find()
    
    // Apply sorting
    if (sort === 'createdAt') {
      query = query.sort({ createdAt: -1 })
    } else {
      query = query.sort({ createdAt: -1 }) // Default sorting
    }
    
    // Apply limit
    if (limit) {
      query = query.limit(parseInt(limit))
    }
    
    const videos = await query.exec()
    
    // Return structured response for dashboard queries, array for backward compatibility
    if (limit || sort) {
      return NextResponse.json({
        videos,
        total: videos.length,
        limit: limit ? parseInt(limit) : undefined
      })
    } else {
      return NextResponse.json(videos)
    }
  } catch (error) {
    console.error("Videos fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch videos" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const data = await request.json()

    const video = new Video(data)
    await video.save()

    return NextResponse.json(video, { status: 201 })
  } catch (error) {
    console.error("Video creation error:", error)
    return NextResponse.json({ error: "Failed to create video" }, { status: 500 })
  }
}
