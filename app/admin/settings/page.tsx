"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Share2, 
  Palette, 
  Shield, 
  Database,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SiteSettings {
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

interface ContactSettings {
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

interface SocialSettings {
  facebook: string
  twitter: string
  linkedin: string
  instagram: string
  youtube: string
  whatsapp: string
}

interface SEOSettings {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  googleAnalytics: string
  googleTagManager: string
  facebookPixel: string
  robotsTxt: string
}

interface NotificationSettings {
  emailNotifications: boolean
  newOrderNotification: boolean
  contactFormNotification: boolean
  newsletterSubscription: boolean
  adminEmailNotifications: boolean
}

export default function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Site Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
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
  })

  // Contact Settings
  const [contactSettings, setContactSettings] = useState<ContactSettings>({
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
  })

  // Social Settings
  const [socialSettings, setSocialSettings] = useState<SocialSettings>({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    whatsapp: ""
  })

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    metaTitle: "Winner Machineries - Industrial Machinery Manufacturer",
    metaDescription: "Leading manufacturer of high-quality industrial machinery and equipment. CNC machines, lathes, presses, and more.",
    metaKeywords: "industrial machinery, CNC machines, lathes, presses, manufacturing equipment",
    googleAnalytics: "",
    googleTagManager: "",
    facebookPixel: "",
    robotsTxt: "User-agent: *\nAllow: /"
  })

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    emailNotifications: true,
    newOrderNotification: true,
    contactFormNotification: true,
    newsletterSubscription: true,
    adminEmailNotifications: true
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        if (data.siteSettings) setSiteSettings(data.siteSettings)
        if (data.contactSettings) setContactSettings(data.contactSettings)
        if (data.socialSettings) setSocialSettings(data.socialSettings)
        if (data.seoSettings) setSeoSettings(data.seoSettings)
        if (data.notificationSettings) setNotificationSettings(data.notificationSettings)
      }
    } catch (error) {
      console.error("Failed to load settings:", error)
      toast({
        title: "Error",
        description: "Failed to load settings. Using default values.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      // Validate required fields
      if (!siteSettings.siteName.trim()) {
        toast({
          title: "Validation Error",
          description: "Site name is required",
          variant: "destructive"
        })
        return
      }

      if (!siteSettings.siteUrl.trim()) {
        toast({
          title: "Validation Error",
          description: "Site URL is required",
          variant: "destructive"
        })
        return
      }

      // Validate email formats
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (contactSettings.email && !emailRegex.test(contactSettings.email)) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid primary email address",
          variant: "destructive"
        })
        return
      }

      if (contactSettings.supportEmail && !emailRegex.test(contactSettings.supportEmail)) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid support email address",
          variant: "destructive"
        })
        return
      }

      if (contactSettings.salesEmail && !emailRegex.test(contactSettings.salesEmail)) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid sales email address",
          variant: "destructive"
        })
        return
      }

      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteSettings,
          contactSettings,
          socialSettings,
          seoSettings,
          notificationSettings
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Settings saved successfully!",
        })
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save settings")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save settings. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  const exportSettings = () => {
    const settingsData = {
      siteSettings,
      contactSettings,
      socialSettings,
      seoSettings,
      notificationSettings,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(settingsData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `winner-machineries-settings-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast({
      title: "Export Complete",
      description: "Settings have been exported successfully",
    })
  }

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string)
        
        if (importedSettings.siteSettings) setSiteSettings(importedSettings.siteSettings)
        if (importedSettings.contactSettings) setContactSettings(importedSettings.contactSettings)
        if (importedSettings.socialSettings) setSocialSettings(importedSettings.socialSettings)
        if (importedSettings.seoSettings) setSeoSettings(importedSettings.seoSettings)
        if (importedSettings.notificationSettings) setNotificationSettings(importedSettings.notificationSettings)
        
        toast({
          title: "Import Complete",
          description: "Settings have been imported successfully. Don't forget to save!",
        })
      } catch (error) {
        toast({
          title: "Import Error",
          description: "Invalid settings file format",
          variant: "destructive"
        })
      }
    }
    reader.readAsText(file)
    
    // Reset file input
    event.target.value = ''
  }

  const resetToDefaults = () => {
    if (confirm("Are you sure you want to reset all settings to default values?")) {
      loadSettings()
      toast({
        title: "Reset Complete",
        description: "Settings have been reset to default values.",
      })
    }
  }

  const handleInputChange = (section: string, field: string, value: any) => {
    switch (section) {
      case "site":
        setSiteSettings(prev => ({ ...prev, [field]: value }))
        break
      case "contact":
        setContactSettings(prev => ({ ...prev, [field]: value }))
        break
      case "social":
        setSocialSettings(prev => ({ ...prev, [field]: value }))
        break
      case "seo":
        setSeoSettings(prev => ({ ...prev, [field]: value }))
        break
      case "notifications":
        setNotificationSettings(prev => ({ ...prev, [field]: value }))
        break
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Configure your website settings and preferences</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
            <Button variant="outline" onClick={exportSettings}>
              Export Settings
            </Button>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="hidden"
              />
              <Button variant="outline" asChild>
                <span>Import Settings</span>
              </Button>
            </label>
            <Button onClick={saveSettings} disabled={saving} className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white">
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-white" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2 text-white" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Site Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name *</Label>
                  <Input
                    id="siteName"
                    value={siteSettings.siteName}
                    onChange={(e) => handleInputChange("site", "siteName", e.target.value)}
                    placeholder="Your Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="siteUrl">Site URL *</Label>
                  <Input
                    id="siteUrl"
                    value={siteSettings.siteUrl}
                    onChange={(e) => handleInputChange("site", "siteUrl", e.target.value)}
                    placeholder="https://yourdomain.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={siteSettings.siteDescription}
                  onChange={(e) => handleInputChange("site", "siteDescription", e.target.value)}
                  placeholder="Brief description of your website"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select value={siteSettings.defaultLanguage} onValueChange={(value) => handleInputChange("site", "defaultLanguage", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={siteSettings.timezone} onValueChange={(value) => handleInputChange("site", "timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select value={siteSettings.dateFormat} onValueChange={(value) => handleInputChange("site", "dateFormat", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={siteSettings.currency} onValueChange={(value) => handleInputChange("site", "currency", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                      <SelectItem value="BDT">BDT (৳)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                System Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-gray-600">Enable maintenance mode to restrict access</p>
                </div>
                <Switch
                  id="maintenanceMode"
                  checked={siteSettings.maintenanceMode}
                  onCheckedChange={(checked) => handleInputChange("site", "maintenanceMode", checked)}
                />
              </div>
              <Separator />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={contactSettings.companyName}
                    onChange={(e) => handleInputChange("contact", "companyName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Primary Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactSettings.email}
                    onChange={(e) => handleInputChange("contact", "email", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={contactSettings.phone}
                    onChange={(e) => handleInputChange("contact", "phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessHours">Business Hours</Label>
                  <Input
                    id="businessHours"
                    value={contactSettings.businessHours}
                    onChange={(e) => handleInputChange("contact", "businessHours", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={contactSettings.address}
                  onChange={(e) => handleInputChange("contact", "address", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={contactSettings.city}
                    onChange={(e) => handleInputChange("contact", "city", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={contactSettings.state}
                    onChange={(e) => handleInputChange("contact", "state", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={contactSettings.zipCode}
                    onChange={(e) => handleInputChange("contact", "zipCode", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={contactSettings.country}
                    onChange={(e) => handleInputChange("contact", "country", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Addresses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={contactSettings.supportEmail}
                    onChange={(e) => handleInputChange("contact", "supportEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salesEmail">Sales Email</Label>
                  <Input
                    id="salesEmail"
                    type="email"
                    value={contactSettings.salesEmail}
                    onChange={(e) => handleInputChange("contact", "salesEmail", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Social Media Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input
                    id="facebook"
                    value={socialSettings.facebook}
                    onChange={(e) => handleInputChange("social", "facebook", e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    value={socialSettings.twitter}
                    onChange={(e) => handleInputChange("social", "twitter", e.target.value)}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={socialSettings.linkedin}
                    onChange={(e) => handleInputChange("social", "linkedin", e.target.value)}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input
                    id="instagram"
                    value={socialSettings.instagram}
                    onChange={(e) => handleInputChange("social", "instagram", e.target.value)}
                    placeholder="https://instagram.com/yourhandle"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube URL</Label>
                  <Input
                    id="youtube"
                    value={socialSettings.youtube}
                    onChange={(e) => handleInputChange("social", "youtube", e.target.value)}
                    placeholder="https://youtube.com/yourchannel"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    value={socialSettings.whatsapp}
                    onChange={(e) => handleInputChange("social", "whatsapp", e.target.value)}
                    placeholder="+1234567890"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                SEO Meta Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metaTitle">Meta Title</Label>
                <Input
                  id="metaTitle"
                  value={seoSettings.metaTitle}
                  onChange={(e) => handleInputChange("seo", "metaTitle", e.target.value)}
                  placeholder="Your website title for search engines"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaDescription">Meta Description</Label>
                <Textarea
                  id="metaDescription"
                  value={seoSettings.metaDescription}
                  onChange={(e) => handleInputChange("seo", "metaDescription", e.target.value)}
                  placeholder="Brief description of your website for search engines"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={seoSettings.metaKeywords}
                  onChange={(e) => handleInputChange("seo", "metaKeywords", e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Analytics & Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                <Input
                  id="googleAnalytics"
                  value={seoSettings.googleAnalytics}
                  onChange={(e) => handleInputChange("seo", "googleAnalytics", e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="googleTagManager">Google Tag Manager ID</Label>
                <Input
                  id="googleTagManager"
                  value={seoSettings.googleTagManager}
                  onChange={(e) => handleInputChange("seo", "googleTagManager", e.target.value)}
                  placeholder="GTM-XXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixel"
                  value={seoSettings.facebookPixel}
                  onChange={(e) => handleInputChange("seo", "facebookPixel", e.target.value)}
                  placeholder="XXXXXXXXXX"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">Enable Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleInputChange("notifications", "emailNotifications", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newOrderNotification">New Order Notifications</Label>
                  <p className="text-sm text-gray-600">Get notified when new orders are placed</p>
                </div>
                <Switch
                  id="newOrderNotification"
                  checked={notificationSettings.newOrderNotification}
                  onCheckedChange={(checked) => handleInputChange("notifications", "newOrderNotification", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="contactFormNotification">Contact Form Notifications</Label>
                  <p className="text-sm text-gray-600">Get notified when contact forms are submitted</p>
                </div>
                <Switch
                  id="contactFormNotification"
                  checked={notificationSettings.contactFormNotification}
                  onCheckedChange={(checked) => handleInputChange("notifications", "contactFormNotification", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletterSubscription">Newsletter Subscription Notifications</Label>
                  <p className="text-sm text-gray-600">Get notified when users subscribe to newsletter</p>
                </div>
                <Switch
                  id="newsletterSubscription"
                  checked={notificationSettings.newsletterSubscription}
                  onCheckedChange={(checked) => handleInputChange("notifications", "newsletterSubscription", checked)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="adminEmailNotifications">Admin Email Notifications</Label>
                  <p className="text-sm text-gray-600">Send notifications to admin email addresses</p>
                </div>
                <Switch
                  id="adminEmailNotifications"
                  checked={notificationSettings.adminEmailNotifications}
                  onCheckedChange={(checked) => handleInputChange("notifications", "adminEmailNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 