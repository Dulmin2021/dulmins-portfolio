"use client"

import { useState, useEffect, useMemo } from "react"
import LockScreen from "@/components/iphone/lock-screen"
import HomeScreen from "@/components/iphone/home-screen"
import IPhoneFrame from "@/components/iphone/iphone-frame"
import PhotosApp from "@/components/apps/photos-app"
import PhoneApp from "@/components/apps/phone-app"
import MessagesApp from "@/components/apps/messages-app"
import SafariApp from "@/components/apps/safari-app"
import AppStoreApp from "@/components/apps/appstore-app"
import NotesApp from "@/components/apps/notes-app"
import MusicApp from "@/components/apps/music-app"
import SettingsApp from "@/components/apps/settings-app"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Portfolio() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const [shakeCount, setShakeCount] = useState(0)
  const { toast } = useToast()

  // Konami Code Easter Egg: ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a
  const konamiSequence = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newCode = [...konamiCode, e.key]
      setKonamiCode(newCode.slice(-10))

      if (JSON.stringify(newCode.slice(-10)) === JSON.stringify(konamiSequence)) {
        toast({
          title: "🎮 Developer Mode Activated!",
          description: "You've unlocked the secret developer console. Check the browser console for a surprise!",
        })
        console.log(
          "%c🚀 Welcome to Developer Mode!",
          "font-size: 24px; font-weight: bold; color: #4CAF50; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);",
        )
        console.log(
          "%c✨ Easter Egg Found! You're a true explorer.",
          "font-size: 16px; color: #2196F3; font-style: italic;",
        )
        console.log("%cThis portfolio was built with:", "font-weight: bold; font-size: 14px;")
        console.log("• Next.js 16")
        console.log("• React 19")
        console.log("• TypeScript")
        console.log("• Tailwind CSS")
        console.log("• Framer Motion")
        console.log("\n%cWant to build something awesome together? Let's connect!", "font-size: 14px; color: #FF9800;")
        setKonamiCode([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiCode, toast])

  // Shake Detection Easter Egg
  useEffect(() => {
    let lastX = 0,
      lastY = 0,
      lastZ = 0
    const shakeThreshold = 15

    const handleMotion = (e: DeviceMotionEvent) => {
      if (!e.accelerationIncludingGravity) return

      const { x = 0, y = 0, z = 0 } = e.accelerationIncludingGravity
      const deltaX = Math.abs((x ?? 0) - lastX)
      const deltaY = Math.abs((y ?? 0) - lastY)
      const deltaZ = Math.abs((z ?? 0) - lastZ)

      if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
        setShakeCount((prev) => {
          const newCount = prev + 1
          if (newCount === 3) {
            toast({
              title: "📱 Shake Detected!",
              description: "Would you like to send feedback? (This is a demo feature)",
            })
            return 0
          }
          return newCount
        })
      }

      lastX = x ?? 0
      lastY = y ?? 0
      lastZ = z ?? 0
    }

    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion as any)
      return () => window.removeEventListener("devicemotion", handleMotion as any)
    }
  }, [toast])

  // Welcome Toast
  useEffect(() => {
    if (isUnlocked) {
      setTimeout(() => {
        toast({
          title: "👋 Welcome to my Portfolio!",
          description: "Explore the apps to learn more about me",
        })
      }, 500)
    }
  }, [isUnlocked, toast])

  const closeApp = () => {
    setActiveApp(null)
  }

  const renderApp = () => {
    switch (activeApp) {
      case "photos":
        return <PhotosApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "phone":
        return <PhoneApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "messages":
        return <MessagesApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "safari":
        return <SafariApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "appstore":
        return <AppStoreApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "notes":
        return <NotesApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "music":
        return <MusicApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "settings":
        return <SettingsApp onClose={closeApp} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      default:
        return <HomeScreen isDarkMode={isDarkMode} onAppClick={setActiveApp} />
    }
  }

  // Memoize particle positions to prevent hydration mismatch
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 5 + Math.random() * 10,
      })),
    []
  )

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="h-screen w-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center transition-colors duration-500 overflow-hidden">
        {/* Floating particles background effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/10 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        <IPhoneFrame isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
          {!isUnlocked ? <LockScreen onUnlock={() => setIsUnlocked(true)} isDarkMode={isDarkMode} /> : renderApp()}
        </IPhoneFrame>

        <Toaster />
      </main>
    </div>
  )
}
