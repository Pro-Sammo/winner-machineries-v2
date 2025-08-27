import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const trustedBrands = [
  { name: "Pakiza Group", logo: "/brands/Pakiza Group.jpg" },
  { name: "Mahmud Group", logo: "/brands/Mahmud Group.jpg" },
  { name: "Karooni Group", logo: "/brands/Karooni.jpg" },
  { name: "IDS Group", logo: "/brands/IDS Group.jpg" },
  { name: "Dekko Isho Group", logo: "/brands/Dekko Isho.jpg" },
  { name: "DFL Group", logo: "/brands/DFL.jpg" },
  { name: "DBL Group", logo: "/brands/DBL-Group.jpg" },
  { name: "Ananta Group", logo: "/brands/Ananta.jpg" },
  { name: "Alif Group", logo: "/brands/Alif Group.jpg" },
]

export function TrustedBrands() {
  const [isPaused, setIsPaused] = useState(false)
  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollStep = 1 // px per tick
  const intervalMs = 30 // ms per tick (slower = smoother)

  useEffect(() => {
    if (!sliderRef.current) return
    let animationFrame: number
    let interval: NodeJS.Timeout | null = null
    const slider = sliderRef.current

    function scroll() {
      if (!slider) return
      if (!isPaused) {
        slider.scrollLeft += scrollStep
        // Loop: if at end, reset to start
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0
        }
      }
      animationFrame = requestAnimationFrame(scroll)
    }
    animationFrame = requestAnimationFrame(scroll)
    return () => {
      if (interval) clearInterval(interval)
      cancelAnimationFrame(animationFrame)
    }
  }, [isPaused])

  // Duplicate brands for seamless loop
  const logos = [...trustedBrands, ...trustedBrands]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're proud to partner with some of the world's most respected companies across various industries
          </p>
        </div>
        <div
          ref={sliderRef}
          className="flex overflow-x-auto no-scrollbar gap-8 items-center group relative"
          style={{ scrollBehavior: "auto" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {logos.map((brand, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              style={{ width: 160, height: 80 }}
            >
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                width={120}
                height={60}
                className="object-contain w-full h-full opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
