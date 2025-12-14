"use client"

import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppIconProps {
  name: string
  icon: LucideIcon
  color: string
  onClick?: () => void
  showLabel?: boolean
  badge?: number
}

export default function AppIcon({ name, icon: Icon, color, onClick, showLabel = true, badge }: AppIconProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [isWiggling, setIsWiggling] = useState(false)

  const handleLongPress = () => {
    setIsWiggling(true)
    // Haptic feedback simulation
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(50)
    }
  }

  const handleClick = () => {
    if (!isWiggling) {
      onClick?.()
    } else {
      setIsWiggling(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onContextMenu={(e) => {
        e.preventDefault()
        handleLongPress()
      }}
      className="flex flex-col items-center gap-1 group"
    >
      <div
        className={cn(
          "relative w-14 h-14 rounded-2xl shadow-md flex items-center justify-center text-white transition-all duration-200",
          color,
          isPressed && "scale-90",
          !isPressed && "hover:scale-110",
          isWiggling && "animate-wiggle",
        )}
      >
        <Icon className="w-8 h-8" strokeWidth={1.5} />

        {badge && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-black animate-pulse">
            {badge}
          </div>
        )}

        {isWiggling && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xl animate-bounce">
            ×
          </div>
        )}
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-foreground text-center leading-tight max-w-[60px] truncate">
          {name}
        </span>
      )}
    </button>
  )
}
