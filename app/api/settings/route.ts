import { NextResponse } from "next/server"
import { getSettings } from "@/lib/settings"

export async function GET() {
  try {
    const settings = await getSettings()
    
    // Only return public settings (exclude sensitive information)
    return NextResponse.json({
      siteSettings: {
        siteName: settings.siteSettings.siteName,
        siteDescription: settings.siteSettings.siteDescription,
        siteUrl: settings.siteSettings.siteUrl,
        siteLogo: settings.siteSettings.siteLogo,
        favicon: settings.siteSettings.favicon,
        maintenanceMode: settings.siteSettings.maintenanceMode,
        defaultLanguage: settings.siteSettings.defaultLanguage,
        timezone: settings.siteSettings.timezone,
        dateFormat: settings.siteSettings.dateFormat,
        currency: settings.siteSettings.currency
      },
      contactSettings: {
        companyName: settings.contactSettings.companyName,
        email: settings.contactSettings.email,
        phone: settings.contactSettings.phone,
        address: settings.contactSettings.address,
        city: settings.contactSettings.city,
        state: settings.contactSettings.state,
        zipCode: settings.contactSettings.zipCode,
        country: settings.contactSettings.country,
        businessHours: settings.contactSettings.businessHours,
        supportEmail: settings.contactSettings.supportEmail,
        salesEmail: settings.contactSettings.salesEmail
      },
      socialSettings: settings.socialSettings,
      seoSettings: {
        metaTitle: settings.seoSettings.metaTitle,
        metaDescription: settings.seoSettings.metaDescription,
        metaKeywords: settings.seoSettings.metaKeywords,
        googleAnalytics: settings.seoSettings.googleAnalytics,
        googleTagManager: settings.seoSettings.googleTagManager,
        facebookPixel: settings.seoSettings.facebookPixel
      }
    })
  } catch (error) {
    console.error("Error fetching public settings:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
} 