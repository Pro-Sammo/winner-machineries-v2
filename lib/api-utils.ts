// API utility functions for the frontend

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function postApi<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    ...options,
  })
}

export async function putApi<T>(endpoint: string, data: any, options?: RequestInit): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
    ...options,
  })
}

export async function deleteApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return fetchApi<T>(endpoint, {
    method: 'DELETE',
    ...options,
  })
}

// Sample data for seeding (if needed)
export const sampleVideos = [
  {
    title: "CNC Machine Operation Tutorial",
    description: "Learn how to operate our latest CNC milling machine with step-by-step instructions",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: {
      url: "/placeholder.svg?height=200&width=350",
      alt: "CNC Machine Tutorial Thumbnail"
    },
    category: "Tutorial",
    duration: "12:45",
    views: "15.2K",
    featured: true
  },
  {
    title: "Factory Tour - Manufacturing Excellence",
    description: "Take a virtual tour of our state-of-the-art manufacturing facility",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: {
      url: "/placeholder.svg?height=200&width=350",
      alt: "Factory Tour Thumbnail"
    },
    category: "Factory Tour",
    duration: "8:30",
    views: "23.1K",
    featured: false
  },
  {
    title: "Product Showcase - Hydraulic Press Series",
    description: "Discover the capabilities of our powerful hydraulic press machines",
    youtubeId: "dQw4w9WgXcQ",
    thumbnail: {
      url: "/placeholder.svg?height=200&width=350",
      alt: "Hydraulic Press Thumbnail"
    },
    category: "Product Demo",
    duration: "6:15",
    views: "9.8K",
    featured: false
  }
]

export const sampleHeroImages = [
  {
    title: "Advanced CNC Manufacturing",
    subtitle: "Precision Engineering",
    description: "State-of-the-art CNC manufacturing facility showcasing precision engineering excellence",
    image: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Advanced CNC Manufacturing Facility"
    },
    order: 1,
    active: true
  },
  {
    title: "Precision Machining Excellence",
    subtitle: "Quality Craftsmanship",
    description: "Precision industrial lathe in operation demonstrating quality craftsmanship",
    image: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Precision Industrial Lathe in Operation"
    },
    order: 2,
    active: true
  },
  {
    title: "Automated Welding Solutions",
    subtitle: "Smart Technology",
    description: "Robotic welding system at work showcasing smart manufacturing technology",
    image: {
      url: "/placeholder.svg?height=800&width=1200",
      alt: "Robotic Welding System at Work"
    },
    order: 3,
    active: true
  }
]

export const sampleGalleryImages = [
  {
    title: "Precision CNC Machining",
    category: "Manufacturing",
    image: {
      url: "/placeholder.svg?height=400&width=600",
      alt: "CNC Machine in Operation"
    },
    order: 1,
    active: true
  },
  {
    title: "State-of-the-Art Facility",
    category: "Facilities",
    image: {
      url: "/placeholder.svg?height=400&width=600",
      alt: "Industrial Facility"
    },
    order: 2,
    active: true
  },
  {
    title: "Quality Assurance Testing",
    category: "Quality",
    image: {
      url: "/placeholder.svg?height=400&width=600",
      alt: "Quality Control Process"
    },
    order: 3,
    active: true
  },
  {
    title: "Engineering Team Collaboration",
    category: "Team",
    image: {
      url: "/placeholder.svg?height=400&width=600",
      alt: "Team Meeting"
    },
    order: 4,
    active: true
  },
  {
    title: "Heavy-Duty Hydraulic Press",
    category: "Products",
    image: {
      url: "/placeholder.svg?height=400&width=600",
      alt: "Hydraulic Press"
    },
    order: 5,
    active: true
  },
  {
    title: "R&D Laboratory",
    category: "Innovation",
    image: {
      url: "/placeholder.svg?height=400&width=600",
      alt: "Research Lab"
    },
    order: 6,
    active: true
  }
] 