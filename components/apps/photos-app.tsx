"use client"

import { useState, useCallback } from "react"
import {
  ChevronLeft,
  Grid3x3,
  Heart,
  Search,
  X,
  ChevronRight,
  Download,
  Share2,
  Sparkles,
  Clock,
  ImageIcon,
} from "lucide-react"

interface PhotosAppProps {
  onClose: () => void
  isDarkMode: boolean
}

/* ─────────────── Data ─────────────── */

const photoAlbums = [
  {
    id: "personal",
    name: "Personal",
    count: 12,
    thumbnail: "/professional-portrait.jpg",
    color: "from-rose-400 to-pink-600",
    emoji: "👤",
  },
  {
    id: "projects",
    name: "Projects",
    count: 89,
    thumbnail: "/web-development-coding-screen.png",
    color: "from-blue-400 to-indigo-600",
    emoji: "💻",
  },
  {
    id: "travel",
    name: "Travel",
    count: 234,
    thumbnail: "/beautiful-mountain-landscape.png",
    color: "from-emerald-400 to-teal-600",
    emoji: "🌄",
  },
  {
    id: "designs",
    name: "Designs",
    count: 156,
    thumbnail: "/ui-ux-design-mockup.png",
    color: "from-violet-400 to-purple-600",
    emoji: "🎨",
  },
]

const personalPhotos = [
  { id: 1, url: "/professional-portrait.jpg", label: "Portrait" },
  { id: 2, url: "/photo2.jpg", label: "Me" },
  { id: 3, url: "/placeholder-user.jpg", label: "Profile" },
  { id: 4, url: "/beautiful-mountain-landscape.png", label: "Mountains" },
  { id: 5, url: "/web-development-coding-screen.png", label: "Coding" },
  { id: 6, url: "/ui-ux-design-mockup.png", label: "Design" },
  { id: 7, url: "/task-management-dashboard.png", label: "Dashboard" },
  { id: 8, url: "/ecommerce-product-grid.png", label: "E-commerce" },
  { id: 9, url: "/ai-chat-interface.png", label: "AI Chat" },
  { id: 10, url: "/team-analytics-chart.jpg", label: "Analytics" },
  { id: 11, url: "/project-kanban-board.jpg", label: "Kanban" },
  { id: 12, url: "/ai-settings-panel.jpg", label: "Settings" },
]

const projectsPhotos = [
  { id: 0, url: "/web-development-coding-screen.png", label: "Web Dev" },
  { id: 1, url: "/ui-ux-design-mockup.png", label: "UI/UX" },
  { id: 2, url: "/task-management-dashboard.png", label: "Task App" },
  { id: 3, url: "/ecommerce-product-grid.png", label: "ShopHub" },
  { id: 4, url: "/ai-chat-interface.png", label: "AI Chat" },
  { id: 5, url: "/team-analytics-chart.jpg", label: "Analytics" },
  { id: 6, url: "/project-kanban-board.jpg", label: "Kanban" },
  { id: 7, url: "/ai-settings-panel.jpg", label: "AI Panel" },
  { id: 8, url: "/shopping-cart-checkout.jpg", label: "Cart" },
  { id: 9, url: "/order-dashboard.jpg", label: "Orders" },
  { id: 10, url: "/chatbot-conversation.jpg", label: "Chatbot" },
  { id: 11, url: "/beautiful-mountain-landscape.png", label: "Creative" },
]

const recentPhotos = [
  { id: 0, url: "/professional-portrait.jpg", label: "Portrait" },
  { id: 1, url: "/web-development-coding-screen.png", label: "Coding" },
  { id: 2, url: "/ui-ux-design-mockup.png", label: "Design" },
  { id: 3, url: "/task-management-dashboard.png", label: "Dashboard" },
  { id: 4, url: "/beautiful-mountain-landscape.png", label: "Travel" },
  { id: 5, url: "/ai-chat-interface.png", label: "AI" },
  { id: 6, url: "/ecommerce-product-grid.png", label: "Shop" },
  { id: 7, url: "/team-analytics-chart.jpg", label: "Analytics" },
  { id: 8, url: "/project-kanban-board.jpg", label: "Kanban" },
  { id: 9, url: "/ai-settings-panel.jpg", label: "Settings" },
  { id: 10, url: "/shopping-cart-checkout.jpg", label: "Cart" },
  { id: 11, url: "/order-dashboard.jpg", label: "Orders" },
]

/* ─────────────── Shimmer skeleton ─────────────── */
function ImageSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-shimmer bg-[length:400%_100%]" />
  )
}

/* ─────────────── Lazy image with shimmer ─────────────── */
function LazyPhoto({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  return (
    <div className="w-full h-full relative overflow-hidden">
      {!loaded && !errored && <ImageSkeleton />}
      <img
        src={errored ? "/placeholder.svg" : src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => { setErrored(true); setLoaded(true) }}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  )
}

/* ─────────────── Lightbox ─────────────── */
function Lightbox({
  photos,
  initialIndex,
  onClose,
}: {
  photos: { id: number; url: string; label: string }[]
  initialIndex: number
  onClose: () => void
}) {
  const [index, setIndex] = useState(initialIndex)
  const [liked, setLiked] = useState<Set<number>>(new Set())
  const photo = photos[index]

  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length])

  const toggleLike = () => {
    setLiked((prev) => {
      const next = new Set(prev)
      next.has(photo.id) ? next.delete(photo.id) : next.add(photo.id)
      return next
    })
  }

  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-sm">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4 text-white" />
        </button>
        <span className="text-white text-sm font-medium">
          {index + 1} / {photos.length}
        </span>
        <div className="flex gap-2">
          <button
            onClick={toggleLike}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${liked.has(photo.id) ? "fill-red-500 text-red-500" : "text-white"}`}
            />
          </button>
          <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex-1 relative flex items-center justify-center">
        <img
          key={photo.url}
          src={photo.url}
          alt={photo.label}
          className="max-w-full max-h-full object-contain animate-fade-in"
          loading="eager"
        />

        {/* Prev / Next arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}
      </div>

      {/* Bottom caption + thumbnail strip */}
      <div className="bg-black/60 backdrop-blur-sm px-4 pt-3 pb-5">
        <p className="text-white text-sm font-semibold mb-2">{photo.label}</p>

        {/* Thumbnail strip */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {photos.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`flex-shrink-0 w-10 h-10 rounded-md overflow-hidden border-2 transition-all ${
                i === index ? "border-white scale-105" : "border-transparent opacity-60"
              }`}
            >
              <img src={p.url} alt={p.label} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────── Main Component ─────────────── */
export default function PhotosApp({ onClose, isDarkMode }: PhotosAppProps) {
  const [view, setView] = useState<"albums" | "grid" | "lightbox">("albums")
  const [selectedAlbum, setSelectedAlbum] = useState<(typeof photoAlbums)[0] | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<"library" | "search" | "favorites">("library")
  const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set([0, 4]))

  const openAlbum = (album: (typeof photoAlbums)[0]) => {
    setSelectedAlbum(album)
    setView("grid")
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setView("lightbox")
  }

  const backToAlbums = () => {
    setView("albums")
    setSelectedAlbum(null)
  }

  const getAlbumPhotos = () => {
    switch (selectedAlbum?.id) {
      case "personal":  return personalPhotos
      case "projects":  return projectsPhotos
      default:          return recentPhotos
    }
  }

  const currentPhotos = getAlbumPhotos()

  const toggleLike = (id: number) => {
    setLikedPhotos((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  /* ── LIGHTBOX ── */
  if (view === "lightbox") {
    return (
      <div className="w-full h-full relative">
        <Lightbox
          photos={currentPhotos}
          initialIndex={lightboxIndex}
          onClose={() => setView("grid")}
        />
      </div>
    )
  }

  /* ── ALBUM GRID VIEW ── */
  if (view === "grid" && selectedAlbum) {
    return (
      <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <button
            onClick={backToAlbums}
            className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
            Albums
          </button>
          <div className="text-center">
            <h1 className="text-base font-semibold leading-tight">{selectedAlbum.name}</h1>
            <p className="text-[11px] text-muted-foreground">{selectedAlbum.count} photos</p>
          </div>
          <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
            <Share2 className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Featured hero + grid */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero first photo */}
          <div
            className="relative w-full h-48 cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <LazyPhoto src={currentPhotos[0]?.url} alt={currentPhotos[0]?.label} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <span className="text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {currentPhotos[0]?.label}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <button
                onClick={(e) => { e.stopPropagation(); toggleLike(currentPhotos[0]?.id) }}
                className="w-7 h-7 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart
                  className={`w-3.5 h-3.5 ${likedPhotos.has(currentPhotos[0]?.id) ? "fill-red-500 text-red-500" : "text-white"}`}
                />
              </button>
            </div>
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-3 gap-0.5 p-0.5">
            {currentPhotos.slice(1).map((photo, i) => (
              <button
                key={photo.id}
                onClick={() => openLightbox(i + 1)}
                className="aspect-square relative group overflow-hidden"
              >
                <LazyPhoto src={photo.url} alt={photo.label} />
                <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                {/* Liked indicator */}
                {likedPhotos.has(photo.id) && (
                  <div className="absolute bottom-1 right-1">
                    <Heart className="w-3 h-3 fill-red-500 text-red-500 drop-shadow" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* ── ALBUMS / LIBRARY / SEARCH / FAVORITES VIEW ── */

  const favoritedPhotos = recentPhotos.filter((p) => likedPhotos.has(p.id))

  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
          Home
        </button>
        <h1 className="text-base font-semibold">Photos</h1>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-accent transition-colors">
          <Search className="w-4 h-4 text-foreground" />
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">

        {activeTab === "library" && (
          <>
            {/* ── Memories banner ── */}
            <div className="mx-4 mt-4 mb-5 rounded-2xl overflow-hidden relative h-32 shadow-md">
              <LazyPhoto src="/beautiful-mountain-landscape.png" alt="Memory" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span className="text-yellow-300 text-[11px] font-semibold uppercase tracking-wide">Memories</span>
                </div>
                <h2 className="text-white text-lg font-bold leading-tight">Best of 2024</h2>
                <p className="text-white/70 text-xs mt-0.5">12 photos · Just now</p>
              </div>
              <button className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/30">
                Play
              </button>
            </div>

            {/* ── My Albums ── */}
            <div className="px-4 mb-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-foreground">My Albums</h2>
                <button className="text-xs font-medium text-primary hover:opacity-70 transition-opacity">See All</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {photoAlbums.map((album) => (
                  <button
                    key={album.id}
                    onClick={() => openAlbum(album)}
                    className="group relative rounded-2xl overflow-hidden shadow-md bg-card border border-border hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-square relative">
                      <LazyPhoto src={album.thumbnail} alt={album.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    {/* Label */}
                    <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5">
                      <h3 className="font-semibold text-sm text-white leading-tight">{album.name}</h3>
                      <p className="text-white/70 text-[11px]">{album.count}</p>
                    </div>
                    {/* Top emoji badge */}
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-xs">
                      {album.emoji}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Recent Photos strip ── */}
            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <h2 className="text-base font-bold text-foreground">Recent</h2>
                </div>
                <button className="text-xs font-medium text-primary hover:opacity-70 transition-opacity">See All</button>
              </div>

              {/* Mosaic layout: 1 large + 2 small */}
              <div className="grid grid-cols-3 gap-0.5 rounded-xl overflow-hidden shadow-sm">
                {/* Large left cell spanning 2 rows */}
                <button
                  onClick={() => { setSelectedAlbum(null); openLightbox(0) }}
                  className="col-span-2 row-span-2 aspect-square relative group"
                >
                  <LazyPhoto src={recentPhotos[0].url} alt={recentPhotos[0].label} />
                  <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                </button>
                {/* Two small right cells */}
                {recentPhotos.slice(1, 3).map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => { setSelectedAlbum(null); openLightbox(i + 1) }}
                    className="aspect-square relative group overflow-hidden"
                  >
                    <LazyPhoto src={photo.url} alt={photo.label} />
                    <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                  </button>
                ))}
              </div>

              {/* 3-column grid below */}
              <div className="grid grid-cols-3 gap-0.5 mt-0.5 rounded-b-xl overflow-hidden">
                {recentPhotos.slice(3, 9).map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => { setSelectedAlbum(null); openLightbox(i + 3) }}
                    className="aspect-square relative group overflow-hidden"
                  >
                    <LazyPhoto src={photo.url} alt={photo.label} />
                    <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                    {likedPhotos.has(photo.id) && (
                      <div className="absolute bottom-1 right-1">
                        <Heart className="w-3 h-3 fill-red-500 text-red-500 drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "search" && (
          <div className="px-4 pt-4 pb-6">
            {/* Search bar */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-secondary rounded-xl mb-5 border border-border">
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-sm text-muted-foreground">Search Photos</span>
            </div>

            {/* Categories */}
            <h2 className="text-base font-bold mb-3">Categories</h2>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {[
                { label: "People", emoji: "👤", color: "from-rose-400 to-pink-500" },
                { label: "Places", emoji: "🌍", color: "from-blue-400 to-cyan-500" },
                { label: "Projects", emoji: "💻", color: "from-violet-400 to-purple-500" },
                { label: "Nature", emoji: "🌿", color: "from-green-400 to-emerald-500" },
              ].map((cat) => (
                <div
                  key={cat.label}
                  className={`h-16 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-between px-4 cursor-pointer hover:opacity-90 active:opacity-70 transition-opacity`}
                >
                  <span className="text-white font-semibold text-sm">{cat.label}</span>
                  <span className="text-2xl">{cat.emoji}</span>
                </div>
              ))}
            </div>

            <h2 className="text-base font-bold mb-3">All Photos</h2>
            <div className="grid grid-cols-3 gap-0.5 rounded-xl overflow-hidden">
              {recentPhotos.map((photo, i) => (
                <button
                  key={photo.id}
                  onClick={() => openLightbox(i)}
                  className="aspect-square relative group overflow-hidden"
                >
                  <LazyPhoto src={photo.url} alt={photo.label} />
                  <div className="absolute inset-0 bg-black/0 group-active:bg-black/20 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className="px-4 pt-4 pb-6">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              <h2 className="text-lg font-bold">Favorites</h2>
              <span className="ml-auto text-xs text-muted-foreground font-medium">{favoritedPhotos.length} photos</span>
            </div>

            {favoritedPhotos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">No Favorites Yet</h3>
                <p className="text-xs text-muted-foreground max-w-[160px]">
                  Tap the heart on any photo to save it here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-0.5 rounded-xl overflow-hidden">
                {favoritedPhotos.map((photo, i) => (
                  <button
                    key={photo.id}
                    onClick={() => openLightbox(i)}
                    className="aspect-square relative group overflow-hidden"
                  >
                    <LazyPhoto src={photo.url} alt={photo.label} />
                    <div className="absolute bottom-1 right-1">
                      <Heart className="w-3 h-3 fill-red-500 text-red-500 drop-shadow" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Bottom Tab Bar ── */}
      <div className="flex items-center justify-around border-t border-border py-2 bg-background/95 backdrop-blur-sm">
        {[
          { id: "library" as const, icon: <ImageIcon className="w-5 h-5" />, label: "Library" },
          { id: "search"  as const, icon: <Search className="w-5 h-5" />,    label: "Search" },
          { id: "favorites" as const, icon: <Heart className={`w-5 h-5 ${activeTab === "favorites" ? "fill-red-500 text-red-500" : ""}`} />, label: "Favorites" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors ${
              activeTab === tab.id
                ? tab.id === "favorites"
                  ? "text-red-500"
                  : "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
