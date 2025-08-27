import { NextRequest, NextResponse } from "next/server"
import Settings from "@/models/Settings"
import dbConnect from "@/lib/mongodb"

export async function GET() {
  try {
    await dbConnect()
    
    // Get settings from database
    const settings = await Settings.findOne({})
    
    if (settings) {
      return NextResponse.json({
        siteSettings: settings.siteSettings,
        contactSettings: settings.contactSettings,
        socialSettings: settings.socialSettings,
        seoSettings: settings.seoSettings,
        notificationSettings: settings.notificationSettings
      })
    } else {
      // Create default settings if none exist
      const defaultSettings = new Settings()
      await defaultSettings.save()
      
      return NextResponse.json({
        siteSettings: defaultSettings.siteSettings,
        contactSettings: defaultSettings.contactSettings,
        socialSettings: defaultSettings.socialSettings,
        seoSettings: defaultSettings.seoSettings,
        notificationSettings: defaultSettings.notificationSettings
      })
    }
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()
    
    const {
      siteSettings,
      contactSettings,
      socialSettings,
      seoSettings,
      notificationSettings
    } = body

    // Validate required fields
    if (!siteSettings?.siteName || !siteSettings?.siteUrl) {
      return NextResponse.json(
        { error: "Site name and URL are required" },
        { status: 400 }
      )
    }

    // Find existing settings or create new ones
    let settings = await Settings.findOne({})
    
    if (!settings) {
      settings = new Settings()
    }

    // Update settings
    settings.siteSettings = { ...settings.siteSettings, ...siteSettings }
    settings.contactSettings = { ...settings.contactSettings, ...contactSettings }
    settings.socialSettings = { ...settings.socialSettings, ...socialSettings }
    settings.seoSettings = { ...settings.seoSettings, ...seoSettings }
    settings.notificationSettings = { ...settings.notificationSettings, ...notificationSettings }
    settings.updatedAt = new Date()

    await settings.save()

    return NextResponse.json({ 
      message: "Settings saved successfully",
      settings: {
        siteSettings: settings.siteSettings,
        contactSettings: settings.contactSettings,
        socialSettings: settings.socialSettings,
        seoSettings: settings.seoSettings,
        notificationSettings: settings.notificationSettings
      }
    })
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    )
  }
} 