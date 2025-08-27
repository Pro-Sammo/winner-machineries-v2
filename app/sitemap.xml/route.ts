import { NextResponse } from "next/server"
import { getSettings } from "@/lib/settings"
import dbConnect from "@/lib/mongodb"

export async function GET() {
  try {
    const settings = await getSettings()
    await dbConnect()
    
    // Get database connection
    const mongoose = await dbConnect()
    const db = mongoose.connection.db
    
    // Get all products
    const products = await db.collection("products").find({}).toArray()
    
    // Get all videos
    const videos = await db.collection("videos").find({}).toArray()
    
    // Get all gallery images
    const galleryImages = await db.collection("galleryimages").find({}).toArray()
    
    const baseUrl = settings.siteSettings.siteUrl || "https://winnermachineries.com"
    const currentDate = new Date().toISOString()
    
    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Products -->
  <url>
    <loc>${baseUrl}/products</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    
    // Add individual product pages
    products.forEach((product: any) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/products/${product._id}</loc>
    <lastmod>${product.updatedAt || product.createdAt || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    })
    
    // Add videos page
    sitemap += `
  <url>
    <loc>${baseUrl}/videos</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    
    // Add individual video pages
    videos.forEach((video: any) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/videos/${video._id}</loc>
    <lastmod>${video.updatedAt || video.createdAt || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`
    })
    
    // Add gallery page
    sitemap += `
  <url>
    <loc>${baseUrl}/gallery</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    
    // Add contact page
    sitemap += `
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- About page -->
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`
    
    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error("Error generating sitemap:", error)
    
    // Return basic sitemap on error
    const baseUrl = "https://winnermachineries.com"
    const currentDate = new Date().toISOString()
    
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
    
    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
      },
    })
  }
} 