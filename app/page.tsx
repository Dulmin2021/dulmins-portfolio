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
import { Sun, Moon, Github, Linkedin, Mail } from "lucide-react"

/* ─── Apple-style bento tile base ─── */
function Tile({
  children,
  className = "",
  onClick,
  id,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  id?: string
}) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`rounded-3xl overflow-hidden relative ${onClick ? "cursor-pointer active:scale-[0.97] transition-transform duration-150" : ""} ${className}`}
    >
      {children}
    </div>
  )
}

/* ─── Left bento grid ─── */
function LeftBento() {
  return (
    <div className="hidden lg:flex flex-col gap-2.5 w-[210px] xl:w-[230px] flex-shrink-0">

      {/* Hero greeting tile — gradient like Apple's "iOS" banner */}
      <Tile className="bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 p-5 shadow-lg min-h-[110px]">
        <p className="text-blue-100/80 text-[10px] font-semibold uppercase tracking-widest mb-1">Portfolio</p>
        <h2 className="text-white text-2xl font-bold leading-tight">Hey, I'm<br />Dulmin 👋</h2>
        <p className="text-blue-100/80 text-[11px] mt-2 leading-relaxed">DevOps &amp; Full-Stack Developer</p>
        {/* Decorative circles */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
        <div className="absolute -bottom-8 right-8 w-14 h-14 rounded-full bg-white/5" />
      </Tile>

      {/* Social row — two small tiles side by side */}
      <div className="flex gap-2.5">
        <Tile
          className="flex-1 bg-slate-900 dark:bg-slate-700 p-4 shadow-md flex flex-col justify-between min-h-[80px]"
          onClick={() => window.open("https://github.com/Dulmin2021", "_blank")}
        >
          <Github className="w-5 h-5 text-white" />
          <div>
            <p className="text-white font-bold text-sm leading-none">GitHub</p>
            <p className="text-slate-400 text-[10px] mt-0.5">Open source</p>
          </div>
        </Tile>
        <Tile
          className="flex-1 bg-[#0077b5] p-4 shadow-md flex flex-col justify-between min-h-[80px]"
          onClick={() => window.open("https://www.linkedin.com/in/dulmin-wickramage-464b23197/", "_blank")}
        >
          <Linkedin className="w-5 h-5 text-white" />
          <div>
            <p className="text-white font-bold text-sm leading-none">LinkedIn</p>
            <p className="text-blue-200 text-[10px] mt-0.5">Connect</p>
          </div>
        </Tile>
      </div>

      {/* Tech stack tile */}
      <Tile className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-white/10 p-4 shadow-md">
        <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">Built with</p>
        <div className="flex flex-wrap gap-1.5">
          {[
            { label: "Next.js",     bg: "bg-black text-white dark:bg-white dark:text-black" },
            { label: "React 19",    bg: "bg-cyan-500/15 text-cyan-700 dark:text-cyan-400" },
            { label: "TypeScript",  bg: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
            { label: "Tailwind",    bg: "bg-teal-500/15 text-teal-700 dark:text-teal-400" },
            { label: "DevOps",      bg: "bg-orange-500/15 text-orange-700 dark:text-orange-400" },
          ].map(({ label, bg }) => (
            <span
              key={label}
              className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${bg}`}
            >
              {label}
            </span>
          ))}
        </div>
      </Tile>

      {/* Skills row — two small tiles */}
      <div className="flex gap-2.5">
        <Tile className="flex-1 bg-gradient-to-br from-emerald-400 to-green-600 p-4 shadow-md min-h-[72px] flex flex-col justify-between">
          <span className="text-xl">🚀</span>
          <p className="text-white font-bold text-xs leading-tight">CI/CD<br/>Pipelines</p>
        </Tile>
        <Tile className="flex-1 bg-gradient-to-br from-amber-400 to-orange-500 p-4 shadow-md min-h-[72px] flex flex-col justify-between">
          <span className="text-xl">☁️</span>
          <p className="text-white font-bold text-xs leading-tight">Cloud<br/>Native</p>
        </Tile>
      </div>

      {/* Available status tile */}
      <Tile className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-white/10 p-3.5 shadow-md flex items-center gap-3">
        <div className="relative flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
        </div>
        <div>
          <p className="text-foreground font-semibold text-sm leading-tight">Available for Work</p>
          <p className="text-muted-foreground text-[11px]">Open to opportunities</p>
        </div>
      </Tile>

    </div>
  )
}

/* ─── Right bento grid ─── */
function RightBento({
  isDarkMode,
  setIsDarkMode,
}: {
  isDarkMode: boolean
  setIsDarkMode: (v: boolean) => void
}) {
  return (
    <div className="hidden lg:flex flex-col gap-2.5 w-[210px] xl:w-[230px] flex-shrink-0">

      {/* Dark mode feature tile — large, prominent */}
      <Tile
        onClick={() => setIsDarkMode(!isDarkMode)}
        id="theme-toggle"
        className={`p-5 shadow-lg min-h-[110px] flex flex-col justify-between transition-colors duration-500 ${
          isDarkMode
            ? "bg-slate-900 border border-slate-700"
            : "bg-white/70 backdrop-blur-md border border-white/50"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl">{isDarkMode ? "🌙" : "☀️"}</span>
          {/* iOS-style toggle pill */}
          <div className={`w-10 h-6 rounded-full relative transition-colors duration-300 ${isDarkMode ? "bg-indigo-500" : "bg-slate-300"}`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isDarkMode ? "translate-x-5" : "translate-x-1"}`} />
          </div>
        </div>
        <div>
          <p className={`font-bold text-lg leading-tight ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            {isDarkMode ? "Dark Mode" : "Light Mode"}
          </p>
          <p className={`text-[11px] mt-0.5 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            Tap to switch appearance
          </p>
        </div>
      </Tile>

      {/* Interactive tips — two-col mini tiles */}
      <div className="flex gap-2.5">
        <Tile className="flex-1 bg-gradient-to-br from-pink-500 to-rose-600 p-4 shadow-md min-h-[80px] flex flex-col justify-between">
          <span className="text-xl">🔓</span>
          <p className="text-white font-bold text-[11px] leading-tight">Swipe up to unlock</p>
        </Tile>
        <Tile className="flex-1 bg-gradient-to-br from-violet-500 to-purple-700 p-4 shadow-md min-h-[80px] flex flex-col justify-between">
          <span className="text-xl">🎮</span>
          <p className="text-white font-bold text-[11px] leading-tight">Konami code easter egg</p>
        </Tile>
      </div>

      {/* Projects tile */}
      <Tile className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 p-4 shadow-lg">
        <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest mb-2">Featured Projects</p>
        <div className="space-y-2">
          {[
            { name: "Tubefetch",  tag: "React · TypeScript",  dot: "bg-cyan-400" },
            { name: "BidFlare",   tag: "ASP.NET · SQL",        dot: "bg-orange-400" },
            { name: "Sritop",     tag: "Python · Textual",     dot: "bg-emerald-400" },
          ].map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.dot}`} />
              <div>
                <p className="text-white text-xs font-semibold leading-none">{p.name}</p>
                <p className="text-slate-500 text-[10px]">{p.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </Tile>

      {/* Download CV + Contact row */}
      <div className="flex gap-2.5">
        <Tile
          className="flex-1 bg-gradient-to-br from-blue-600 to-cyan-500 p-4 shadow-md min-h-[76px] flex flex-col justify-between"
          onClick={() => {
            const a = document.createElement("a")
            a.href = "/Dulmin_Wickramage_DevOps.pdf"
            a.download = "Dulmin_Wickramage_Resume.pdf"
            a.click()
          }}
        >
          <span className="text-xl">📄</span>
          <p className="text-white font-bold text-[11px] leading-tight">Download CV</p>
        </Tile>
        <Tile
          className="flex-1 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-white/10 p-4 shadow-md min-h-[76px] flex flex-col justify-between"
          onClick={() => { window.location.href = "mailto:dulmin.edu@gmail.com" }}
        >
          <Mail className="w-5 h-5 text-primary" />
          <p className="text-foreground font-bold text-[11px] leading-tight">dulmin.edu<br/>@gmail.com</p>
        </Tile>
      </div>

      {/* iPortfolio brand tile */}
      <Tile className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-white/10 p-4 shadow-md flex items-center justify-between">
        <div>
          <p className="text-foreground font-bold text-sm">iPortfolio</p>
          <p className="text-muted-foreground text-[11px]">v1.0 · Next.js 16</p>
        </div>
        <div className="flex gap-1.5">
          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
            <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
          ))}
        </div>
      </Tile>

    </div>
  )
}

/* ─── Main page ─── */
export default function Portfolio() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeApp, setActiveApp] = useState<string | null>(null)
  const [konamiCode, setKonamiCode] = useState<string[]>([])
  const { toast } = useToast()

  const konamiSequence = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
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
        console.log("%c🚀 Welcome to Developer Mode!", "font-size: 24px; font-weight: bold; color: #4CAF50;")
        console.log("%c✨ Easter Egg Found! You're a true explorer.", "font-size: 16px; color: #2196F3; font-style: italic;")
        console.log("%cBuilt with: Next.js 16, React 19, TypeScript, Tailwind CSS", "font-weight: bold;")
        setKonamiCode([])
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [konamiCode, toast])

  useEffect(() => {
    let lastX = 0, lastY = 0, lastZ = 0
    const shakeThreshold = 15
    const handleMotion = (e: DeviceMotionEvent) => {
      if (!e.accelerationIncludingGravity) return
      const { x = 0, y = 0, z = 0 } = e.accelerationIncludingGravity
      const deltaX = Math.abs((x ?? 0) - lastX)
      const deltaY = Math.abs((y ?? 0) - lastY)
      const deltaZ = Math.abs((z ?? 0) - lastZ)
      if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
        toast({ title: "📱 Shake Detected!", description: "Would you like to send feedback? (This is a demo feature)" })
      }
      lastX = x ?? 0; lastY = y ?? 0; lastZ = z ?? 0
    }
    if (typeof window !== "undefined" && "DeviceMotionEvent" in window) {
      window.addEventListener("devicemotion", handleMotion as any)
      return () => window.removeEventListener("devicemotion", handleMotion as any)
    }
  }, [toast])

  useEffect(() => {
    if (isUnlocked) {
      setTimeout(() => {
        toast({
          title: "👋 Welcome to my Portfolio!",
          description: "Explore the apps to learn more about me.",
        })
      }, 500)
    }
  }, [isUnlocked, toast])

  const closeApp = () => setActiveApp(null)

  const renderApp = () => {
    switch (activeApp) {
      case "photos":   return <PhotosApp   onClose={closeApp} isDarkMode={isDarkMode} />
      case "phone":    return <PhoneApp    onClose={closeApp} isDarkMode={isDarkMode} />
      case "messages": return <MessagesApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "safari":   return <SafariApp   onClose={closeApp} isDarkMode={isDarkMode} />
      case "appstore": return <AppStoreApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "notes":    return <NotesApp    onClose={closeApp} isDarkMode={isDarkMode} />
      case "music":    return <MusicApp    onClose={closeApp} isDarkMode={isDarkMode} />
      case "settings": return <SettingsApp onClose={closeApp} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      default:         return <HomeScreen  isDarkMode={isDarkMode} onAppClick={setActiveApp} />
    }
  }

  const particles = useMemo(
    () => Array.from({ length: 16 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 6 + Math.random() * 10,
    })),
    []
  )

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="h-screen w-screen bg-[#f0f0f5] dark:bg-slate-950 flex items-center justify-center transition-colors duration-500 overflow-hidden">

        {/* Subtle radial gradient backdrop */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(99,102,241,0.15),transparent)]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 bg-indigo-400/20 dark:bg-indigo-400/10 rounded-full animate-float"
              style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
            />
          ))}
        </div>

        {/* ── Bento + iPhone layout ── */}
        <div className="relative z-10 flex items-center justify-center gap-5 xl:gap-7 w-full max-w-[1100px] px-4">

          {/* LEFT bento grid */}
          <LeftBento />

          {/* CENTER — iPhone simulator */}
          <div className="flex-shrink-0">
            <IPhoneFrame isDarkMode={isDarkMode}>
              {!isUnlocked
                ? <LockScreen onUnlock={() => setIsUnlocked(true)} isDarkMode={isDarkMode} />
                : renderApp()
              }
            </IPhoneFrame>
          </div>

          {/* RIGHT bento grid */}
          <RightBento isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>

        {/* ── MOBILE bottom bar (hidden on lg+) ── */}
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-white/50 dark:border-white/10 shadow-xl">
            <button
              id="theme-toggle-mobile"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isDarkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {isDarkMode ? "Light" : "Dark"}
            </button>
            <div className="w-px h-4 bg-slate-200 dark:bg-slate-600" />
            <a href="https://github.com/Dulmin2021" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-slate-900 dark:bg-slate-700 flex items-center justify-center hover:opacity-80 transition-opacity">
              <Github className="w-4 h-4 text-white" />
            </a>
            <a href="https://www.linkedin.com/in/dulmin-wickramage-464b23197/" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl bg-[#0077b5] flex items-center justify-center hover:opacity-80 transition-opacity">
              <Linkedin className="w-4 h-4 text-white" />
            </a>
            <a href="mailto:dulmin.edu@gmail.com"
              className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center hover:opacity-80 transition-opacity">
              <Mail className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        <Toaster />
      </main>
    </div>
  )
}
