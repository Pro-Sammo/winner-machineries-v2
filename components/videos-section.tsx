"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock, Eye, Loader2 } from "lucide-react"
import Image from "next/image"
import { useApi } from "@/hooks/use-api"
import { VideoPlayerModal } from "@/components/video-player-modal"

interface Video {
  _id: string
  title: string
  description: string
  youtubeId: string
  thumbnail: {
    url: string
    alt: string
  }
  category: string
  duration: string
  views: string
  featured: boolean
}

export function VideosSection() {
  const { data: videos, loading, error } = useApi<Video[]>('/api/videos')
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedVideo(null)
  }

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Videos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about our products and services through our comprehensive video library
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
            <span className="ml-2 text-gray-600">Loading videos...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Videos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about our products and services through our comprehensive video library
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-red-600">Failed to load videos. Please try again later.</p>
          </div>
        </div>
      </section>
    )
  }

  if (!videos || videos.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Videos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about our products and services through our comprehensive video library
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-gray-600">No videos available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Educational Videos</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn more about our products and services through our comprehensive video library
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <Card 
                key={video._id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleVideoClick(video)}
              >
                <div className="relative">
                  <Image
                    src={video.thumbnail?.url || "/placeholder.svg"}
                    alt={video.thumbnail?.alt || video.title}
                    width={350}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 rounded-full p-4">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <Badge className="absolute top-2 left-2 bg-orange-600">{video.category}</Badge>
                  {video.featured && (
                    <Badge className="absolute top-2 right-2 bg-red-600">Featured</Badge>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {video.duration}
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="h-4 w-4 mr-1" />
                    {video.views} views
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <VideoPlayerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        video={selectedVideo}
      />
    </>
  )
}
