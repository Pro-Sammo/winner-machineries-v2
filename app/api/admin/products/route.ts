import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    const sort = searchParams.get('sort')
    
    let query = Product.find()
    
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
    
    const products = await query.exec()
    
    // Return structured response for dashboard queries, array for backward compatibility
    if (limit || sort) {
      return NextResponse.json({
        products,
        total: products.length,
        limit: limit ? parseInt(limit) : undefined
      })
    } else {
      return NextResponse.json(products)
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const data = await request.json()
    console.log("Data => ", data)
    const product = new Product(data)
    await product.save()
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
