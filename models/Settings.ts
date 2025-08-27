import mongoose, { Schema, Document } from "mongoose"

export interface ISettings extends Document {
  siteSettings: {
    siteName: string
    siteDescription: string
    siteUrl: string
    siteLogo: string
    favicon: string
    maintenanceMode: boolean
    defaultLanguage: string
    timezone: string
    dateFormat: string
    currency: string
  }
  contactSettings: {
    companyName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    businessHours: string
    supportEmail: string
    salesEmail: string
  }
  socialSettings: {
    facebook: string
    twitter: string
    linkedin: string
    instagram: string
    youtube: string
    whatsapp: string
  }
  seoSettings: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalytics: string
    googleTagManager: string
    facebookPixel: string
    robotsTxt: string
  }
  notificationSettings: {
    emailNotifications: boolean
    newOrderNotification: boolean
    contactFormNotification: boolean
    newsletterSubscription: boolean
    adminEmailNotifications: boolean
  }
  updatedAt: Date
}

const siteSettingsSchema = new Schema({
  siteName: { type: String, required: true, default: "Winner Machineries" },
  siteDescription: { type: String, default: "Leading manufacturer of industrial machinery and equipment" },
  siteUrl: { type: String, required: true, default: "https://winnermachineries.com" },
  siteLogo: { type: String, default: "" },
  favicon: { type: String, default: "" },
  maintenanceMode: { type: Boolean, default: false },
  defaultLanguage: { type: String, default: "en" },
  timezone: { type: String, default: "UTC" },
  dateFormat: { type: String, default: "MM/DD/YYYY" },
  currency: { type: String, default: "USD" }
})

const contactSettingsSchema = new Schema({
  companyName: { type: String, default: "Winner Machineries" },
  email: { type: String, default: "info@winnermachineries.com" },
  phone: { type: String, default: "+1 (555) 123-4567" },
  address: { type: String, default: "123 Industrial Blvd" },
  city: { type: String, default: "Manufacturing City" },
  state: { type: String, default: "CA" },
  zipCode: { type: String, default: "90210" },
  country: { type: String, default: "United States" },
  businessHours: { type: String, default: "Monday - Friday: 8:00 AM - 6:00 PM" },
  supportEmail: { type: String, default: "support@winnermachineries.com" },
  salesEmail: { type: String, default: "sales@winnermachineries.com" }
})

const socialSettingsSchema = new Schema({
  facebook: { type: String, default: "" },
  twitter: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  instagram: { type: String, default: "" },
  youtube: { type: String, default: "" },
  whatsapp: { type: String, default: "" }
})

const seoSettingsSchema = new Schema({
  metaTitle: { type: String, default: "Winner Machineries - Industrial Machinery Manufacturer" },
  metaDescription: { type: String, default: "Leading manufacturer of high-quality industrial machinery and equipment. CNC machines, lathes, presses, and more." },
  metaKeywords: { type: String, default: "industrial machinery, CNC machines, lathes, presses, manufacturing equipment" },
  googleAnalytics: { type: String, default: "" },
  googleTagManager: { type: String, default: "" },
  facebookPixel: { type: String, default: "" },
  robotsTxt: { type: String, default: "User-agent: *\nAllow: /" }
})

const notificationSettingsSchema = new Schema({
  emailNotifications: { type: Boolean, default: true },
  newOrderNotification: { type: Boolean, default: true },
  contactFormNotification: { type: Boolean, default: true },
  newsletterSubscription: { type: Boolean, default: true },
  adminEmailNotifications: { type: Boolean, default: true }
})

const settingsSchema = new Schema({
  siteSettings: { type: siteSettingsSchema, default: () => ({}) },
  contactSettings: { type: contactSettingsSchema, default: () => ({}) },
  socialSettings: { type: socialSettingsSchema, default: () => ({}) },
  seoSettings: { type: seoSettingsSchema, default: () => ({}) },
  notificationSettings: { type: notificationSettingsSchema, default: () => ({}) },
  updatedAt: { type: Date, default: Date.now }
}, {
  timestamps: true
})

// Ensure only one settings document exists
settingsSchema.index({}, { unique: true })

export default mongoose.models.Settings || mongoose.model<ISettings>("Settings", settingsSchema) 