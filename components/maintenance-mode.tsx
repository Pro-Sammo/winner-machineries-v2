"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wrench, AlertTriangle, Clock, Mail } from "lucide-react"
import { usePathname } from "next/navigation"

interface MaintenanceModeProps {
  settings?: {
    siteSettings: {
      siteName: string
      maintenanceMode: boolean
    }
    contactSettings: {
      email: string
      phone: string
    }
  }
}

export default function MaintenanceMode({ settings,children }: React.PropsWithChildren<MaintenanceModeProps>) {
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)
  const [siteName, setSiteName] = useState("Winner Machineries")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const pathname = usePathname();

  useEffect(() => {
    if (settings) {
      setIsMaintenanceMode(settings.siteSettings.maintenanceMode)
      setSiteName(settings.siteSettings.siteName)
      setContactEmail(settings.contactSettings.email)
      setContactPhone(settings.contactSettings.phone)
    } else {
      // Fetch settings if not provided
      fetch("/api/settings")
        .then(res => res.json())
        .then(data => {
          setIsMaintenanceMode(data.siteSettings.maintenanceMode)
          setSiteName(data.siteSettings.siteName)
          setContactEmail(data.contactSettings.email)
          setContactPhone(data.contactSettings.phone)
        })
        .catch(error => {
          console.error("Failed to fetch settings:", error)
        })
    }
  }, [settings])


  if (pathname && pathname.startsWith("/admin")) {
    return <>{children}</>;
  }
  if(isMaintenanceMode){
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Wrench className="h-8 w-8 text-orange-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Under Maintenance
            </CardTitle>
            <p className="text-gray-600 mt-2">
              We're currently performing scheduled maintenance to improve your experience.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Estimated Time</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    We expect to be back online within 2-4 hours. Thank you for your patience.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-orange-900">What's Happening?</h4>
                  <p className="text-sm text-orange-700 mt-1">
                    We're updating our systems to provide you with better service and enhanced features.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-gray-900">Need Help?</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    If you have urgent inquiries, please contact us:
                  </p>
                  <div className="mt-2 space-y-1">
                    {contactEmail && (
                      <p className="text-sm text-gray-600">
                        Email: <a href={`mailto:${contactEmail}`} className="text-orange-600 hover:underline">{contactEmail}</a>
                      </p>
                    )}
                    {contactPhone && (
                      <p className="text-sm text-gray-600">
                        Phone: <a href={`tel:${contactPhone}`} className="text-orange-600 hover:underline">{contactPhone}</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                Check Again
              </Button>
            </div>

            <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-200">
              <p>{siteName}</p>
              <p className="mt-1">© {new Date().getFullYear()} All rights reserved</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }
  return  <>{children}</>;
} 