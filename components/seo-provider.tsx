"use client"

import { useEffect, useState } from "react"
import Script from "next/script"

interface SEOSettings {
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  googleAnalytics: string
  googleTagManager: string
  facebookPixel: string
}

interface SEOProviderProps {
  children: React.ReactNode
}

export default function SEOProvider({ children }: SEOProviderProps) {
  const [seoSettings, setSeoSettings] = useState<SEOSettings>({
    metaTitle: "Winner Machineries - Industrial Machinery Manufacturer",
    metaDescription: "Leading manufacturer of high-quality industrial machinery and equipment. CNC machines, lathes, presses, and more.",
    metaKeywords: "industrial machinery, CNC machines, lathes, presses, manufacturing equipment",
    googleAnalytics: "",
    googleTagManager: "",
    facebookPixel: ""
  })

  useEffect(() => {
    // Fetch SEO settings from the API
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        if (data.seoSettings) {
          setSeoSettings(data.seoSettings)
          
          // Update document title and meta tags dynamically
          document.title = data.seoSettings.metaTitle
          
          // Update meta description
          let metaDescription = document.querySelector('meta[name="description"]')
          if (!metaDescription) {
            metaDescription = document.createElement('meta')
            metaDescription.setAttribute('name', 'description')
            document.head.appendChild(metaDescription)
          }
          metaDescription.setAttribute('content', data.seoSettings.metaDescription)
          
          // Update meta keywords
          let metaKeywords = document.querySelector('meta[name="keywords"]')
          if (!metaKeywords) {
            metaKeywords = document.createElement('meta')
            metaKeywords.setAttribute('name', 'keywords')
            document.head.appendChild(metaKeywords)
          }
          metaKeywords.setAttribute('content', data.seoSettings.metaKeywords)
          
          // Update Open Graph tags
          let ogTitle = document.querySelector('meta[property="og:title"]')
          if (!ogTitle) {
            ogTitle = document.createElement('meta')
            ogTitle.setAttribute('property', 'og:title')
            document.head.appendChild(ogTitle)
          }
          ogTitle.setAttribute('content', data.seoSettings.metaTitle)
          
          let ogDescription = document.querySelector('meta[property="og:description"]')
          if (!ogDescription) {
            ogDescription = document.createElement('meta')
            ogDescription.setAttribute('property', 'og:description')
            document.head.appendChild(ogDescription)
          }
          ogDescription.setAttribute('content', data.seoSettings.metaDescription)
          
          // Update Twitter tags
          let twitterTitle = document.querySelector('meta[name="twitter:title"]')
          if (!twitterTitle) {
            twitterTitle = document.createElement('meta')
            twitterTitle.setAttribute('name', 'twitter:title')
            document.head.appendChild(twitterTitle)
          }
          twitterTitle.setAttribute('content', data.seoSettings.metaTitle)
          
          let twitterDescription = document.querySelector('meta[name="twitter:description"]')
          if (!twitterDescription) {
            twitterDescription = document.createElement('meta')
            twitterDescription.setAttribute('name', 'twitter:description')
            document.head.appendChild(twitterDescription)
          }
          twitterDescription.setAttribute('content', data.seoSettings.metaDescription)
        }
      })
      .catch(error => {
        console.error("Failed to fetch SEO settings:", error)
      })
  }, [])

  return (
    <>
      {/* Google Analytics */}
      {seoSettings.googleAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${seoSettings.googleAnalytics}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${seoSettings.googleAnalytics}');
            `}
          </Script>
        </>
      )}
      
      {/* Google Tag Manager */}
      {seoSettings.googleTagManager && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${seoSettings.googleTagManager}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${seoSettings.googleTagManager}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}
      
      {/* Facebook Pixel */}
      {seoSettings.facebookPixel && (
        <>
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${seoSettings.facebookPixel}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${seoSettings.facebookPixel}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
      
      {children}
    </>
  )
} 