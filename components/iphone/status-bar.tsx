"use client"

import { useEffect, useState } from "react"
import { Wifi, Signal } from "lucide-react"

interface StatusBarProps {
  isDarkMode: boolean
}

export default function StatusBar({ isDarkMode }: StatusBarProps) {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    setTime(new Date())
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date | null) => {
    if (!date) return "--:--"
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="absolute top-0 left-0 right-0 h-14 flex items-center justify-between px-8 text-xs font-semibold text-foreground z-40">
      <div className="flex items-center gap-1">
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2">{formatTime(time)}</div>

      <div className="flex items-center gap-1">
        <span>100%</span>
        <div className="w-6 h-3 border-2 border-foreground rounded-sm relative">
          <div className="absolute inset-0.5 bg-foreground rounded-[1px]" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1.5 bg-foreground rounded-r-sm" />
        </div>
      </div>
    </div>
  )
}
