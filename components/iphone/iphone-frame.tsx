"use client"

import type { ReactNode } from "react"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IPhoneFrameProps {
  children: ReactNode
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

export default function IPhoneFrame({ children, isDarkMode, setIsDarkMode }: IPhoneFrameProps) {
  return (
    <div className="relative max-h-screen flex items-center justify-center py-4">
      {/* Theme Toggle */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          <span className="text-xs">{isDarkMode ? "Light" : "Dark"}</span>
        </Button>
      </div>

      {/* iPhone 15 Pro Frame */}
      <div className="relative w-[393px] h-[852px] max-h-[95vh] aspect-[393/852] bg-[#1d1d1f] rounded-[55px] p-3 shadow-2xl scale-[0.85] md:scale-100">
        {/* Dynamic Island */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full z-50" />

        {/* Screen */}
        <div className="relative w-full h-full bg-white dark:bg-black rounded-[45px] overflow-hidden">{children}</div>

        {/* Side Buttons */}
        <div className="absolute -left-1 top-[160px] w-1 h-10 bg-[#1d1d1f] rounded-l-sm" />
        <div className="absolute -left-1 top-[210px] w-1 h-16 bg-[#1d1d1f] rounded-l-sm" />
        <div className="absolute -left-1 top-[280px] w-1 h-16 bg-[#1d1d1f] rounded-l-sm" />
        <div className="absolute -right-1 top-[220px] w-1 h-20 bg-[#1d1d1f] rounded-r-sm" />
      </div>
    </div>
  )
}
