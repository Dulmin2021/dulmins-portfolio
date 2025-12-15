"use client"

import { useState } from "react"
import { ChevronLeft, Grid3x3, Heart, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotosAppProps {
  onClose: () => void
  isDarkMode: boolean
}

const photoAlbums = [
  {
    id: "personal",
    name: "Personal",
    count: 12,
    thumbnail: "/professional-portrait.jpg",
  },
  
  {
    id: "projects",
    name: "Projects",
    count: 89,
    thumbnail: "/web-development-coding-screen.png",
  },
  {
    id: "travel",
    name: "Travel",
    count: 234,
    thumbnail: "/beautiful-mountain-landscape.png",
  },
  {
    id: "designs",
    name: "Designs",
    count: 156,
    thumbnail: "/ui-ux-design-mockup.png",
  },
]

// Personal Album Photos
const personalPhotos = [
  { id: 1, url: "/professional-portrait.jpg" },
  { id: 2, url: "/professional-portrait.png" },
  { id: 3, url: "/placeholder-user.jpg" },
  { id: 4, url: "/beautiful-mountain-landscape.png" },
  { id: 5, url: "/web-development-coding-screen.png" },
  { id: 6, url: "/ui-ux-design-mockup.png" },
  { id: 7, url: "/task-management-dashboard.png" },
  { id: 8, url: "/ecommerce-product-grid.png" },
  { id: 9, url: "/ai-chat-interface.png" },
  { id: 10, url: "/team-analytics-chart.jpg" },
  { id: 11, url: "/project-kanban-board.jpg" },
  { id: 12, url: "/ai-settings-panel.jpg" },
]

// Projects Album Photos
const projectsPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  url: [
    "/web-development-coding-screen.png",
    "/ui-ux-design-mockup.png",
    "/task-management-dashboard.png",
    "/ecommerce-product-grid.png",
    "/ai-chat-interface.png",
    "/team-analytics-chart.jpg",
    "/project-kanban-board.jpg",
    "/ai-settings-panel.jpg",
    "/shopping-cart-checkout.jpg",
    "/order-dashboard.jpg",
    "/chatbot-conversation.jpg",
    "/placeholder.jpg",
  ][i] || "/placeholder.svg",
}))

const recentPhotos = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  url: `/placeholder.svg?height=400&width=400&query=${
    [
      "professional+workspace",
      "coding+laptop",
      "design+sketch",
      "team+meeting",
      "coffee+workspace",
      "sunset+city",
      "modern+architecture",
      "creative+tools",
      "nature+hiking",
      "tech+conference",
      "portfolio+work",
      "startup+office",
    ][i]
  }`,
}))

export default function PhotosApp({ onClose, isDarkMode }: PhotosAppProps) {
  const [view, setView] = useState<"albums" | "photos">("albums")
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null)

  const openAlbum = (albumId: string) => {
    setSelectedAlbum(albumId)
    setView("photos")
  }

  const backToAlbums = () => {
    setView("albums")
    setSelectedAlbum(null)
  }

  // Get photos for selected album
  const getAlbumPhotos = () => {
    switch (selectedAlbum) {
      case "Personal":
        return personalPhotos
      case "Projects":
        return projectsPhotos
      default:
        return recentPhotos
    }
  }

  const currentPhotos = view === "photos" ? getAlbumPhotos() : recentPhotos

  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <Button variant="ghost" size="sm" onClick={view === "photos" ? backToAlbums : onClose} className="gap-1">
          <ChevronLeft className="w-5 h-5" />
          <span>{view === "photos" ? "Albums" : "Home"}</span>
        </Button>
        <h1 className="text-lg font-semibold">{view === "albums" ? "Photos" : selectedAlbum}</h1>
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5" />
        </Button>
      </div>

      {view === "albums" ? (
        <div className="flex-1 overflow-y-auto p-4">
          {/* My Albums Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">My Albums</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                See All
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {photoAlbums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => openAlbum(album.name)}
                  className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
                >
                  <img
                    src={album.thumbnail || "/placeholder.svg"}
                    alt={album.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <h3 className="font-semibold text-lg text-white">{album.name}</h3>
                    <p className="text-sm opacity-90">{album.count} photos</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Photos */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">Recent</h2>
              <Button variant="ghost" size="icon">
                <Grid3x3 className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {recentPhotos.map((photo) => (
                <div key={photo.id} className="aspect-square rounded-sm overflow-hidden">
                  <img
                    src={photo.url || "/placeholder.svg"}
                    alt={`Photo ${photo.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* Album View */}
          <div className="grid grid-cols-3 gap-1 p-1">
            {currentPhotos.map((photo) => (
              <button key={photo.id} className="aspect-square relative group">
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Tab Bar */}
      <div className="flex items-center justify-around border-t border-border py-2 bg-background">
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-primary">
          <Grid3x3 className="w-5 h-5" />
          <span className="text-xs">Library</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
          <Search className="w-5 h-5" />
          <span className="text-xs">Search</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
          <Plus className="w-5 h-5" />
          <span className="text-xs">Add</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
          <Heart className="w-5 h-5" />
          <span className="text-xs">Favorites</span>
        </Button>
      </div>
    </div>
  )
}
