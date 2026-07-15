"use client"

import type { ReactNode } from "react"

interface IPhoneFrameProps {
  children: ReactNode
  isDarkMode: boolean
}

export default function IPhoneFrame({ children, isDarkMode }: IPhoneFrameProps) {
  return (
    <div className="relative flex items-center justify-center">
      {/* iPhone 15 Pro Frame */}
      <div className="relative w-[353px] h-[762px] bg-[#1d1d1f] rounded-[55px] p-3 shadow-2xl scale-[0.78] sm:scale-[0.85] md:scale-90 lg:scale-100">
        {/* Dynamic Island */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[120px] h-[37px] bg-black rounded-full z-50" />

        {/* Screen */}
        <div className="relative w-full h-full bg-white dark:bg-black rounded-[45px] overflow-hidden">{children}</div>

        {/* Side Buttons — mute */}
        <div className="absolute -left-[5px] top-[160px] w-[5px] h-8 bg-[#3a3a3c] rounded-l-md shadow-md" />
        {/* volume up */}
        <div className="absolute -left-[5px] top-[205px] w-[5px] h-14 bg-[#3a3a3c] rounded-l-md shadow-md" />
        {/* volume down */}
        <div className="absolute -left-[5px] top-[270px] w-[5px] h-14 bg-[#3a3a3c] rounded-l-md shadow-md" />
        {/* power */}
        <div className="absolute -right-[5px] top-[210px] w-[5px] h-20 bg-[#3a3a3c] rounded-r-md shadow-md" />
      </div>
    </div>
  )
}
