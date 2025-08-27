import { NextResponse } from "next/server"
import { getSettings } from "@/lib/settings"

export async function GET() {
  try {
    const settings = await getSettings()
    const robotsTxt = settings.seoSettings.robotsTxt || "User-agent: *\nAllow: /"
    
    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  } catch (error) {
    console.error("Error generating robots.txt:", error)
    
    // Return default robots.txt on error
    return new NextResponse("User-agent: *\nAllow: /", {
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
} 