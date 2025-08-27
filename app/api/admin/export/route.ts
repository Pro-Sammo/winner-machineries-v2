import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"
import Video from "@/models/Video"
import Contact from "@/models/Contact"
import Newsletter from "@/models/Newsletter"

export async function GET(request: Request) {
  try {
    await dbConnect()

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const format = searchParams.get("format") || "json"

    if (!type) {
      return NextResponse.json({ error: "Export type is required" }, { status: 400 })
    }

    let data
    let filename

    switch (type) {
      case "products":
        data = await Product.find().lean()
        filename = `products_export_${new Date().toISOString().split("T")[0]}`
        break
      case "videos":
        data = await Video.find().lean()
        filename = `videos_export_${new Date().toISOString().split("T")[0]}`
        break
      case "contacts":
        data = await Contact.find().lean()
        filename = `contacts_export_${new Date().toISOString().split("T")[0]}`
        break
      case "newsletter":
        data = await Newsletter.find().lean()
        filename = `newsletter_export_${new Date().toISOString().split("T")[0]}`
        break
      default:
        return NextResponse.json({ error: "Invalid export type" }, { status: 400 })
    }

    if (format === "csv") {
      // Convert to CSV format
      if (data.length === 0) {
        return NextResponse.json({ error: "No data to export" }, { status: 404 })
      }

      const headers = Object.keys(data[0]).filter((key) => key !== "__v")
      const csvContent = [
        headers.join(","),
        ...data.map((row) =>
          headers
            .map((header) => {
              const value = row[header]
              if (typeof value === "object" && value !== null) {
                return `"${JSON.stringify(value).replace(/"/g, '""')}"`
              }
              return `"${String(value || "").replace(/"/g, '""')}"`
            })
            .join(","),
        ),
      ].join("\n")

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${filename}.csv"`,
        },
      })
    }

    // Default JSON format
    return NextResponse.json(data, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}.json"`,
      },
    })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Export failed" }, { status: 500 })
  }
}
