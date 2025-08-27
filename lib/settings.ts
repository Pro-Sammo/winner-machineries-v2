import Settings from "@/models/Settings"
import dbConnect from "@/lib/mongodb"

let cachedSettings: any = null
let cacheExpiry: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export async function getSettings() {
  const now = Date.now()
  
  // Return cached settings if still valid
  if (cachedSettings && now < cacheExpiry) {
    return cachedSettings
  }

  // Check if MongoDB URI is available
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI not found, using default settings")
    return getDefaultSettings()
  }

  try {
    await dbConnect()
    
    const settings = await Settings.findOne({})
    
    if (settings) {
      cachedSettings = {
        siteSettings: settings.siteSettings,
        contactSettings: settings.contactSettings,
        socialSettings: settings.socialSettings,
        seoSettings: settings.seoSettings,
        notificationSettings: settings.notificationSettings
      }
    } else {
      // Create default settings if none exist
      const defaultSettings = new Settings()
      await defaultSettings.save()
      
      cachedSettings = {
        siteSettings: defaultSettings.siteSettings,
        contactSettings: defaultSettings.contactSettings,
        socialSettings: defaultSettings.socialSettings,
        seoSettings: defaultSettings.seoSettings,
        notificationSettings: defaultSettings.notificationSettings
      }
    }
    
    cacheExpiry = now + CACHE_DURATION
    return cachedSettings
  } catch (error) {
    console.error("Error fetching settings:", error)
    
    // Return default settings on error
    return getDefaultSettings()
  }
}

function getDefaultSettings() {
  return {
    siteSettings: {
      siteName: "Winner Machineries",
      siteDescription: "Leading manufacturer of industrial machinery and equipment",
      siteUrl: "https://winnermachineries.com",
      siteLogo: "",
      favicon: "",
      maintenanceMode: false,
      defaultLanguage: "en",
      timezone: "UTC",
      dateFormat: "MM/DD/YYYY",
      currency: "USD"
    },
    contactSettings: {
      companyName: "Winner Machineries",
      email: "info@winnermachineries.com",
      phone: "+1 (555) 123-4567",
      address: "123 Industrial Blvd",
      city: "Manufacturing City",
      state: "CA",
      zipCode: "90210",
      country: "United States",
      businessHours: "Monday - Friday: 8:00 AM - 6:00 PM",
      supportEmail: "support@winnermachineries.com",
      salesEmail: "sales@winnermachineries.com"
    },
    socialSettings: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      youtube: "",
      whatsapp: ""
    },
    seoSettings: {
      metaTitle: "Winner Machineries - Industrial Machinery Manufacturer",
      metaDescription: "Leading manufacturer of high-quality industrial machinery and equipment. CNC machines, lathes, presses, and more.",
      metaKeywords: "industrial machinery, CNC machines, lathes, presses, manufacturing equipment",
      googleAnalytics: "",
      googleTagManager: "",
      facebookPixel: "",
      robotsTxt: "User-agent: *\nAllow: /"
    },
    notificationSettings: {
      emailNotifications: true,
      newOrderNotification: true,
      contactFormNotification: true,
      newsletterSubscription: true,
      adminEmailNotifications: true
    }
  }
}

export function clearSettingsCache() {
  cachedSettings = null
  cacheExpiry = 0
}

export async function updateSettings(newSettings: any) {
  try {
    await dbConnect()
    
    let settings = await Settings.findOne({})
    
    if (!settings) {
      settings = new Settings()
    }

    // Update settings
    settings.siteSettings = { ...settings.siteSettings, ...newSettings.siteSettings }
    settings.contactSettings = { ...settings.contactSettings, ...newSettings.contactSettings }
    settings.socialSettings = { ...settings.socialSettings, ...newSettings.socialSettings }
    settings.seoSettings = { ...settings.seoSettings, ...newSettings.seoSettings }
    settings.notificationSettings = { ...settings.notificationSettings, ...newSettings.notificationSettings }
    settings.updatedAt = new Date()

    await settings.save()
    
    // Clear cache to force refresh
    clearSettingsCache()
    
    return true
  } catch (error) {
    console.error("Error updating settings:", error)
    return false
  }
} 