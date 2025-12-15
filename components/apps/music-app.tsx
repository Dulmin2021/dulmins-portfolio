"use client"

import { useState } from "react"
import { ChevronLeft, Play, Pause, SkipBack, SkipForward, Heart, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface MusicAppProps {
  onClose: () => void
  isDarkMode: boolean
}

const playlists = [
  {
    id: 1,
    name: "Coding Focus",
    description: "Deep focus music for programming sessions",
    cover: "/coding-music-cover.png",
    tracks: 42,
  },
  {
    id: 2,
    name: "Creative Flow",
    description: "Inspirational tracks for design work",
    cover: "/creative-music-cover.jpg",
    tracks: 35,
  },
  {
    id: 3,
    name: "Conference Talks",
    description: "Tech talks and podcasts",
    cover: "/podcast-cover.jpg",
    tracks: 18,
  },
]

const currentTrack = {
  title: "Synthwave Coding",
  artist: "Electronic Dreams",
  album: "Developer Vibes",
  duration: 245,
  cover: "/music-album-art.png",
}

export default function MusicApp({ onClose, isDarkMode }: MusicAppProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(67)
  const [view, setView] = useState<"library" | "player">("library")

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (view === "player") {
    return (
      <div className="w-full h-full bg-gradient-to-b from-purple-900 via-pink-800 to-slate-900 flex flex-col animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="sm" onClick={() => setView("library")} className="gap-1 text-white hover:text-white/80">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="text-sm font-medium text-white">Now Playing</span>
          <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
            <MoreHorizontal className="w-5 h-5" />
          </Button>
        </div>

        {/* Album Art */}
        <div className="flex-1 flex flex-col items-center justify-center px-8">
          <div className="w-72 h-72 rounded-2xl shadow-2xl mb-8 overflow-hidden">
            <img
              src={currentTrack.cover || "/placeholder.svg"}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Track Info */}
          <div className="w-full text-center mb-2">
            <h2 className="text-2xl font-bold mb-2 text-white">{currentTrack.title}</h2>
            <p className="text-white/80">{currentTrack.artist}</p>
          </div>

          <Button variant="ghost" size="icon" className="text-white hover:text-white/80 mb-6">
            <Heart className="w-6 h-6" />
          </Button>

          {/* Progress Bar */}
          <div className="w-full space-y-2 mb-6">
            <Slider
              value={[currentTime]}
              max={currentTrack.duration}
              onValueChange={(value) => setCurrentTime(value[0])}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-8">
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
              <SkipBack className="w-8 h-8" />
            </Button>
            <Button
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-white text-slate-900 hover:bg-white/90"
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:text-white/80">
              <SkipForward className="w-8 h-8" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
          <ChevronLeft className="w-5 h-5" />
          <span>Home</span>
        </Button>
        <h1 className="text-lg font-semibold">Music</h1>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <h2 className="text-2xl font-bold mb-4">My Playlists</h2>

        <div className="space-y-4">
          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              onClick={() => setView("player")}
              className="w-full flex gap-4 p-4 bg-card rounded-xl border border-border hover:bg-accent transition-colors"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-purple-500 to-pink-500">
                <img
                  src={playlist.cover || "/placeholder.svg"}
                  alt={playlist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-bold text-lg mb-1">{playlist.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
                <p className="text-xs text-muted-foreground">{playlist.tracks} tracks</p>
              </div>
            </button>
          ))}
        </div>

        {/* Recently Played */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Recently Played</h2>
          <button
            onClick={() => setView("player")}
            className="w-full flex gap-4 p-4 bg-card rounded-xl border border-border hover:bg-accent transition-colors"
          >
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={currentTrack.cover || "/placeholder.svg"}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">{currentTrack.title}</h3>
              <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <Play className="w-5 h-5" />
            </Button>
          </button>
        </div>
      </div>
    </div>
  )
}
