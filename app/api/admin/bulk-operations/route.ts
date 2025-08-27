import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Video from "@/models/Video"
import GalleryImage from "@/models/GalleryImage"

export async function POST(request: Request) {
  try {
    await dbConnect()

    const { action, type, ids, data } = await request.json()

    if (!action || !type || !ids || !Array.isArray(ids)) {
      return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
    }

    let Model
    switch (type) {
      case "products":
        Model = Product
        break
      case "videos":
        Model = Video
        break
      case "gallery":
        Model = GalleryImage
        break
      default:
        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    }

    let result
    switch (action) {
      case "delete":
        result = await Model.deleteMany({ _id: { $in: ids } })
        break
      case "update":
        if (!data) {
          return NextResponse.json({ error: "Update data is required" }, { status: 400 })
        }
        result = await Model.updateMany({ _id: { $in: ids } }, { ...data, updatedAt: new Date() })
        break
      case "toggle-featured":
        // Toggle featured status for each item
        const items = await Model.find({ _id: { $in: ids } })
        const updatePromises = items.map((item) =>
          Model.findByIdAndUpdate(item._id, { featured: !item.featured, updatedAt: new Date() }),
        )
        await Promise.all(updatePromises)
        result = { modifiedCount: items.length }
        break
      case "toggle-active":
        // Toggle active status for gallery items
        if (type !== "gallery") {
          return NextResponse.json({ error: "Active toggle only available for gallery" }, { status: 400 })
        }
        const galleryItems = await Model.find({ _id: { $in: ids } })
        const togglePromises = galleryItems.map((item) =>
          Model.findByIdAndUpdate(item._id, { active: !item.active, updatedAt: new Date() }),
        )
        await Promise.all(togglePromises)
        result = { modifiedCount: galleryItems.length }
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json({
      message: `Bulk ${action} completed successfully`,
      affected: result.modifiedCount || result.deletedCount || 0,
    })
  } catch (error) {
    console.error("Bulk operation error:", error)
    return NextResponse.json({ error: "Bulk operation failed" }, { status: 500 })
  }
}
