import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import HeroImage from "@/models/HeroImage"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const heroImage = await HeroImage.findById(id)

    if (!heroImage) {
      return NextResponse.json({ error: "Hero image not found" }, { status: 404 })
    }

    return NextResponse.json(heroImage)
  } catch (error) {
    console.error("Hero image fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch hero image" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const data = await request.json()

    const heroImage = await HeroImage.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true },
    )

    if (!heroImage) {
      return NextResponse.json({ error: "Hero image not found" }, { status: 404 })
    }

    return NextResponse.json(heroImage)
  } catch (error) {
    console.error("Hero image update error:", error)
    return NextResponse.json({ error: "Failed to update hero image" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect()
    const { id } = await params
    const heroImage = await HeroImage.findByIdAndDelete(id)

    if (!heroImage) {
      return NextResponse.json({ error: "Hero image not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Hero image deleted successfully" })
  } catch (error) {
    console.error("Hero image delete error:", error)
    return NextResponse.json({ error: "Failed to delete hero image" }, { status: 500 })
  }
}
