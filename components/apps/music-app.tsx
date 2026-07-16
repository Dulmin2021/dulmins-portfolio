"use client"

import { useState, useEffect, useRef } from "react"
import {
  ChevronLeft, ChevronDown, Play, Pause, SkipBack, SkipForward,
  Heart, Shuffle, Repeat, Volume2, ListMusic, Radio,
  Search, Mic2, MoreHorizontal, MoreVertical,
} from "lucide-react"

interface MusicAppProps {
  onClose: () => void
  isDarkMode: boolean
}

/* ─── Data ─── */
const tracks = [
  {
    id: 1,
    title: "Synthwave Coding",
    artist: "Electronic Dreams",
    album: "Developer Vibes",
    duration: 245,
    color: ["#7c3aed", "#db2777"],   // from → to
    emoji: "🎧",
  },
  {
    id: 2,
    title: "Lo-fi Focus",
    artist: "Study Beats",
    album: "Deep Work Sessions",
    duration: 192,
    color: ["#0ea5e9", "#6366f1"],
    emoji: "☕",
  },
  {
    id: 3,
    title: "Tokyo Drift",
    artist: "Night Owl",
    album: "City Lights",
    duration: 218,
    color: ["#10b981", "#3b82f6"],
    emoji: "🌆",
  },
  {
    id: 4,
    title: "Dark Techno",
    artist: "Midnight Code",
    album: "Binary Rave",
    duration: 307,
    color: ["#f59e0b", "#ef4444"],
    emoji: "⚡",
  },
  {
    id: 5,
    title: "Chillhop Vibes",
    artist: "Mellow Frames",
    album: "Rainy Day",
    duration: 178,
    color: ["#ec4899", "#f97316"],
    emoji: "🌧️",
  },
]

const playlists = [
  { id: 1, name: "Coding Focus",       tracks: 42, color: "#7c3aed", emoji: "💻" },
  { id: 2, name: "Creative Flow",      tracks: 35, color: "#0ea5e9", emoji: "🎨" },
  { id: 3, name: "Conference Talks",   tracks: 18, color: "#10b981", emoji: "🎙️" },
  { id: 4, name: "Late Night Grind",   tracks: 27, color: "#f59e0b", emoji: "🌙" },
]

/* ─── Album Art (gradient + emoji placeholder) ─── */
function AlbumArt({
  track,
  size = 220,
  shadow = true,
}: {
  track: typeof tracks[0]
  size?: number
  shadow?: boolean
}) {
  return (
    <div
      className={`rounded-2xl flex items-center justify-center flex-shrink-0 ${shadow ? "shadow-2xl" : ""}`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${track.color[0]}, ${track.color[1]})`,
      }}
    >
      <span style={{ fontSize: size * 0.38 }}>{track.emoji}</span>
    </div>
  )
}

/* ─── Progress bar ─── */
function ProgressBar({
  value,
  max,
  onChange,
  color,
}: {
  value: number
  max: number
  onChange: (v: number) => void
  color: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const pct = Math.min((value / max) * 100, 100)

  const handleClick = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    onChange(Math.round(ratio * max))
  }

  return (
    <div ref={ref} onClick={handleClick}
      className="relative h-1 rounded-full bg-white/20 cursor-pointer group">
      <div className="absolute inset-y-0 left-0 rounded-full transition-all"
        style={{ width: `${pct}%`, background: color }} />
      <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ left: `calc(${pct}% - 6px)` }} />
    </div>
  )
}

/* ─── Full-screen Player ─── */
function Player({
  track,
  isPlaying,
  currentTime,
  liked,
  shuffled,
  onPlay,
  onPrev,
  onNext,
  onSeek,
  onLike,
  onShuffle,
  onMini,
}: {
  track: typeof tracks[0]
  isPlaying: boolean
  currentTime: number
  liked: boolean
  shuffled: boolean
  onPlay: () => void
  onPrev: () => void
  onNext: () => void
  onSeek: (v: number) => void
  onLike: () => void
  onShuffle: () => void
  onMini: () => void
}) {
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
  const bgGrad = `linear-gradient(160deg, ${track.color[0]}cc, ${track.color[1]}aa, #000000)`

  return (
    <div className="w-full h-full flex flex-col animate-zoom-in relative overflow-hidden" style={{ background: bgGrad }}>
      {/* Blurred background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-40 blur-3xl"
          style={{ background: track.color[0] }} />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-40 blur-3xl"
          style={{ background: track.color[1] }} />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-5 pt-4 pb-2">
        <button onClick={onMini}
          className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
          <ChevronDown className="w-5 h-5 text-white" />
        </button>
        <div className="text-center">
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest">Now Playing</p>
          <p className="text-white text-xs font-medium mt-0.5 truncate max-w-[140px]">{track.album}</p>
        </div>
        <button className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center backdrop-blur-sm">
          <MoreHorizontal className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Album art — animates scale when playing */}
      <div className="relative z-10 flex justify-center my-5">
        <div className={`transition-transform duration-700 ${isPlaying ? "scale-100" : "scale-90"}`}>
          <AlbumArt track={track} size={210} />
        </div>
      </div>

      {/* Track info + like */}
      <div className="relative z-10 flex items-center justify-between px-6 mb-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-white text-xl font-bold leading-tight truncate">{track.title}</h2>
          <p className="text-white/60 text-sm mt-0.5">{track.artist}</p>
        </div>
        <button onClick={onLike}
          className="w-9 h-9 flex items-center justify-center ml-3 flex-shrink-0">
          <Heart className={`w-6 h-6 transition-colors ${liked ? "fill-pink-400 text-pink-400" : "text-white/50"}`} />
        </button>
      </div>

      {/* Progress */}
      <div className="relative z-10 px-6 mb-3">
        <ProgressBar value={currentTime} max={track.duration} onChange={onSeek} color="white" />
        <div className="flex justify-between text-white/50 text-[10px] mt-1.5">
          <span>{fmt(currentTime)}</span>
          <span>-{fmt(track.duration - currentTime)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 flex items-center justify-between px-8 mb-4">
        <button onClick={onShuffle}>
          <Shuffle className={`w-5 h-5 ${shuffled ? "text-white" : "text-white/40"}`} />
        </button>
        <button onClick={onPrev}
          className="w-11 h-11 flex items-center justify-center rounded-full active:bg-white/10 transition-colors">
          <SkipBack className="w-7 h-7 text-white fill-white" />
        </button>
        <button onClick={onPlay}
          className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg active:scale-95 transition-transform">
          {isPlaying
            ? <Pause className="w-8 h-8 text-black fill-black" />
            : <Play  className="w-8 h-8 text-black fill-black ml-1" />}
        </button>
        <button onClick={onNext}
          className="w-11 h-11 flex items-center justify-center rounded-full active:bg-white/10 transition-colors">
          <SkipForward className="w-7 h-7 text-white fill-white" />
        </button>
        <button>
          <Repeat className="w-5 h-5 text-white/40" />
        </button>
      </div>

      {/* Volume */}
      <div className="relative z-10 px-6 flex items-center gap-3 mb-4">
        <Volume2 className="w-4 h-4 text-white/40 flex-shrink-0" />
        <div className="flex-1">
          <ProgressBar value={70} max={100} onChange={() => {}} color="white" />
        </div>
        <Volume2 className="w-5 h-5 text-white/40 flex-shrink-0" />
      </div>

      {/* Bottom actions */}
      <div className="relative z-10 flex items-center justify-around px-6 pb-3">
        <button className="flex flex-col items-center gap-1">
          <Mic2 className="w-5 h-5 text-white/40" />
          <span className="text-white/40 text-[9px]">Lyrics</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <ListMusic className="w-5 h-5 text-white/40" />
          <span className="text-white/40 text-[9px]">Queue</span>
        </button>
        <button className="flex flex-col items-center gap-1">
          <Radio className="w-5 h-5 text-white/40" />
          <span className="text-white/40 text-[9px]">Radio</span>
        </button>
      </div>
    </div>
  )
}

/* ─── Mini player bar ─── */
function MiniPlayer({
  track,
  isPlaying,
  onPlay,
  onExpand,
}: {
  track: typeof tracks[0]
  isPlaying: boolean
  onPlay: () => void
  onExpand: () => void
}) {
  return (
    <div
      onClick={onExpand}
      className="mx-3 mb-2 rounded-2xl flex items-center gap-3 px-4 py-3 cursor-pointer shadow-xl backdrop-blur-md border border-white/10"
      style={{ background: `linear-gradient(90deg, ${track.color[0]}cc, ${track.color[1]}88)` }}
    >
      <AlbumArt track={track} size={40} shadow={false} />
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{track.title}</p>
        <p className="text-white/60 text-xs truncate">{track.artist}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onPlay() }}
        className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
        {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white ml-0.5" />}
      </button>
    </div>
  )
}

/* ─── Main MusicApp ─── */
type Tab = "listen" | "search" | "library"

export default function MusicApp({ onClose, isDarkMode }: MusicAppProps) {
  const [tab, setTab]               = useState<Tab>("listen")
  const [trackIdx, setTrackIdx]     = useState(0)
  const [isPlaying, setIsPlaying]   = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)
  const [liked, setLiked]           = useState<Set<number>>(new Set([1]))
  const [shuffled, setShuffled]     = useState(false)

  const track = tracks[trackIdx]

  /* Simulated playback */
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => {
      setCurrentTime(t => {
        if (t >= track.duration - 1) { nextTrack(); return 0 }
        return t + 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [isPlaying, track.duration])

  const nextTrack = () => {
    const next = shuffled
      ? Math.floor(Math.random() * tracks.length)
      : (trackIdx + 1) % tracks.length
    setTrackIdx(next)
    setCurrentTime(0)
  }
  const prevTrack = () => {
    setTrackIdx((trackIdx - 1 + tracks.length) % tracks.length)
    setCurrentTime(0)
  }

  const toggleLike = () => {
    setLiked(prev => {
      const next = new Set(prev)
      next.has(track.id) ? next.delete(track.id) : next.add(track.id)
      return next
    })
  }

  /* ── Full-screen player overlay ── */
  if (showPlayer) {
    return (
      <Player
        track={track}
        isPlaying={isPlaying}
        currentTime={currentTime}
        liked={liked.has(track.id)}
        shuffled={shuffled}
        onPlay={() => setIsPlaying(p => !p)}
        onPrev={prevTrack}
        onNext={nextTrack}
        onSeek={setCurrentTime}
        onLike={toggleLike}
        onShuffle={() => setShuffled(p => !p)}
        onMini={() => setShowPlayer(false)}
      />
    )
  }

  /* ── Main library view ── */
  return (
    <div className="w-full h-full bg-black flex flex-col animate-zoom-in">

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <button onClick={onClose} className="flex items-center gap-0.5 text-red-400 text-sm font-medium">
          <ChevronLeft className="w-5 h-5" /> Home
        </button>
        <h1 className="text-white text-base font-bold">Music</h1>
        <button className="text-red-400">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 mb-3">
        {(["listen", "search", "library"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
              tab === t ? "bg-white text-black" : "text-white/50 hover:text-white/80"
            }`}
          >
            {t === "listen" ? "Listen Now" : t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4">

        {/* ── LISTEN NOW ── */}
        {tab === "listen" && (
          <div>
            {/* Featured track carousel */}
            <div className="mb-5">
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-3">Featured</p>
              <div className="flex gap-3 overflow-x-auto pb-1 -mx-4 px-4">
                {tracks.map((t, i) => (
                  <button
                    key={t.id}
                    onClick={() => { setTrackIdx(i); setShowPlayer(true) }}
                    className="flex-shrink-0 w-40 rounded-2xl overflow-hidden relative"
                    style={{ background: `linear-gradient(135deg, ${t.color[0]}, ${t.color[1]})` }}
                  >
                    <div className="p-3 h-40 flex flex-col justify-between">
                      <span className="text-4xl">{t.emoji}</span>
                      <div className="text-left">
                        <p className="text-white font-bold text-sm leading-tight">{t.title}</p>
                        <p className="text-white/70 text-xs">{t.artist}</p>
                      </div>
                    </div>
                    {trackIdx === i && isPlaying && (
                      <div className="absolute top-2 right-2 flex gap-0.5 items-end h-4">
                        {[1,2,3].map(b => (
                          <div key={b} className="w-1 bg-white rounded-full animate-bounce"
                            style={{ height: `${40 + b * 20}%`, animationDelay: `${b * 0.1}s` }} />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Recently played */}
            <div className="mb-5">
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-3">Recently Played</p>
              <div className="space-y-0">
                {tracks.map((t, i) => {
                  const fmt = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`
                  return (
                    <button
                      key={t.id}
                      onClick={() => { setTrackIdx(i); setShowPlayer(true) }}
                      className="w-full flex items-center gap-3 py-2.5 border-b border-white/8 active:bg-white/5 transition-colors rounded-lg px-1"
                    >
                      <AlbumArt track={t} size={44} shadow={false} />
                      <div className="flex-1 text-left min-w-0">
                        <p className={`text-sm font-semibold truncate ${trackIdx === i ? "text-red-400" : "text-white"}`}>{t.title}</p>
                        <p className="text-white/50 text-xs truncate">{t.artist} • {t.album}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {liked.has(t.id) && <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />}
                        <span className="text-white/30 text-xs">{fmt(t.duration)}</span>
                        <button onClick={(e) => e.stopPropagation()}
                          className="text-white/30">
                        <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── SEARCH ── */}
        {tab === "search" && (
          <div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2.5 mb-5">
              <Search className="w-4 h-4 text-white/40" />
              <span className="text-white/30 text-sm">Artists, Songs, Lyrics…</span>
            </div>
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-3">Browse Categories</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Electronic",  color: "#7c3aed", emoji: "⚡" },
                { label: "Lo-fi",       color: "#0ea5e9", emoji: "☕" },
                { label: "Ambient",     color: "#10b981", emoji: "🌿" },
                { label: "Synthwave",   color: "#f59e0b", emoji: "🎛️" },
                { label: "Hip-Hop",     color: "#ef4444", emoji: "🎤" },
                { label: "Jazz",        color: "#ec4899", emoji: "🎷" },
              ].map(c => (
                <div key={c.label} className="h-16 rounded-xl flex items-center justify-between px-4 cursor-pointer active:opacity-80 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${c.color}cc, ${c.color}66)`, border: `1px solid ${c.color}44` }}>
                  <span className="text-white font-bold text-sm">{c.label}</span>
                  <span className="text-2xl">{c.emoji}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── LIBRARY ── */}
        {tab === "library" && (
          <div>
            {/* Playlists */}
            <div className="mb-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Playlists</p>
                <button className="text-red-400 text-xs font-medium">See All</button>
              </div>
              <div className="space-y-2">
                {playlists.map(p => (
                  <div key={p.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-white/8 bg-white/5 active:bg-white/10 cursor-pointer">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${p.color}33`, border: `1px solid ${p.color}44` }}>
                      {p.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{p.name}</p>
                      <p className="text-white/40 text-xs">{p.tracks} songs</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} className="text-yellow-400 text-xs">★</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All songs */}
            <div>
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-3">All Songs</p>
              <div className="space-y-0">
                {tracks.map((t, i) => (
                  <button key={t.id}
                    onClick={() => { setTrackIdx(i); setShowPlayer(true) }}
                    className="w-full flex items-center gap-3 py-2.5 border-b border-white/8 active:bg-white/5 rounded-lg px-1">
                    <AlbumArt track={t} size={44} shadow={false} />
                    <div className="flex-1 text-left min-w-0">
                      <p className={`text-sm font-semibold truncate ${trackIdx === i ? "text-red-400" : "text-white"}`}>{t.title}</p>
                      <p className="text-white/50 text-xs">{t.artist}</p>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-white/30 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mini player */}
      <MiniPlayer
        track={track}
        isPlaying={isPlaying}
        onPlay={() => setIsPlaying(p => !p)}
        onExpand={() => setShowPlayer(true)}
      />

      {/* Bottom tab bar */}
      <div className="flex items-center justify-around border-t border-white/10 py-2 bg-black">
        {([
          { id: "listen",  label: "Listen Now", icon: <Play      className="w-4 h-4" /> },
          { id: "search",  label: "Search",      icon: <Search    className="w-4 h-4" /> },
          { id: "library", label: "Library",     icon: <ListMusic className="w-4 h-4" /> },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${tab === t.id ? "text-red-400" : "text-white/30 hover:text-white/60"}`}>
            {t.icon}
            <span className="text-[9px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
