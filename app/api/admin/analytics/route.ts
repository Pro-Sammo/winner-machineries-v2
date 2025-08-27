import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Video from "@/models/Video"
import Contact from "@/models/Contact"
import Newsletter from "@/models/Newsletter"

export async function GET() {
  try {
    await dbConnect()

    const [
      totalProducts,
      featuredProducts,
      inStockProducts,
      totalVideos,
      featuredVideos,
      totalContacts,
      newContacts,
      totalSubscribers,
      activeSubscribers,
    ] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ featured: true }),
      Product.countDocuments({ inStock: true }),
      Video.countDocuments(),
      Video.countDocuments({ featured: true }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Newsletter.countDocuments(),
      Newsletter.countDocuments({ status: "active" }),
    ])

    // Get recent activity
    const [recentProducts, recentVideos, recentContacts] = await Promise.all([
      Product.find().sort({ createdAt: -1 }).limit(5).select("name createdAt"),
      Video.find().sort({ createdAt: -1 }).limit(5).select("title createdAt"),
      Contact.find().sort({ createdAt: -1 }).limit(5).select("name email subject createdAt status"),
    ])

    // Get category distribution
    const categoryStats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Get monthly stats for the last 6 months
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

    const monthlyStats = await Contact.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    return NextResponse.json({
      overview: {
        totalProducts,
        featuredProducts,
        inStockProducts,
        totalVideos,
        featuredVideos,
        totalContacts,
        newContacts,
        totalSubscribers,
        activeSubscribers,
      },
      recentActivity: {
        products: recentProducts,
        videos: recentVideos,
        contacts: recentContacts,
      },
      categoryStats,
      monthlyStats,
    })
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
