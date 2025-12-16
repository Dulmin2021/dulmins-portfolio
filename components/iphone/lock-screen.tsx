"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

interface LockScreenProps {
  onUnlock: () => void
  isDarkMode: boolean
  signalStrength?: number
}

export default function LockScreen({ onUnlock, isDarkMode, signalStrength = 4 }: LockScreenProps) {
  const [time, setTime] = useState<Date | null>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [swipeProgress, setSwipeProgress] = useState(0)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientY)
    const progress = Math.max(0, Math.min(100, ((touchStart - e.touches[0].clientY) / 200) * 100))
    setSwipeProgress(progress)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      onUnlock()
    }
    setSwipeProgress(0)
  }

  const handleClick = () => {
    onUnlock()
  }

  const formatTime = (date: Date | null) => {
    if (!date) return "00:00"
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Loading..."
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col items-center justify-between px-6 py-12 cursor-pointer transition-all duration-500 animate-fade-in"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      style={{
        opacity: 1 - swipeProgress / 100,
      }}
    >
      {/* Wallpaper layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/wallpaper.jpeg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/45 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between">
      {/* Status Bar */}
      <div className="w-full flex justify-between items-center text-white text-xs font-medium px-2">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {(["h-2", "h-3", "h-3.5", "h-4"] as const).map((h, i) => (
              <div
                key={i}
                className={`w-0.5 ${h} rounded-full ${i < signalStrength ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
          <span className="ml-1">100%</span>
        </div>
      </div>

      {/* Time and Date */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-7xl font-light tracking-tight mb-2 animate-fade-in">{formatTime(time)}</h1>
          <p className="text-lg font-medium animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {formatDate(time)}
          </p>
        </div>
      </div>

      {/* Unlock Indicator */}
      <div className="flex flex-col items-center gap-2 animate-bounce">
        <div
          className="w-12 h-1 bg-white/70 rounded-full transition-all"
          style={{
            width: `${48 + swipeProgress / 2}px`,
            backgroundColor: `rgba(255, 255, 255, ${0.7 + swipeProgress / 200})`,
          }}
        />
        <div className="flex items-center gap-2 text-white text-sm font-medium">
          <ChevronUp className="w-5 h-5" />
          <span>Swipe up to unlock</span>
        </div>
      </div>
      </div>
    </div>
  )
}
