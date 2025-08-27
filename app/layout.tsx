import type { Metadata } from 'next'
import './globals.css'
import SEOProvider from '@/components/seo-provider'
import MaintenanceMode from '@/components/maintenance-mode'
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider'

export const metadata: Metadata = {
  title: 'Winner Machineries - Industrial Machinery Manufacturer',
  description: 'Leading manufacturer of high-quality industrial machinery and equipment. CNC machines, lathes, presses, and more.',
  keywords: 'industrial machinery, CNC machines, lathes, presses, manufacturing equipment',
  generator: 'Next.js',
  robots: 'index, follow',
  openGraph: {
    title: 'Winner Machineries - Industrial Machinery Manufacturer',
    description: 'Leading manufacturer of high-quality industrial machinery and equipment. CNC machines, lathes, presses, and more.',
    type: 'website',
    siteName: 'Winner Machineries',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Winner Machineries - Industrial Machinery Manufacturer',
    description: 'Leading manufacturer of high-quality industrial machinery and equipment. CNC machines, lathes, presses, and more.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SEOProvider>
          <MaintenanceMode>
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </MaintenanceMode>
        </SEOProvider>
      </body>
    </html>
  )
}
