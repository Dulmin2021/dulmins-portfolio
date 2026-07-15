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
import { Sun, Moon, Github, Linkedin, Mail, Code2, Terminal, Layers } from "lucide-react"

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
      case "photos":   return <PhotosApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "phone":    return <PhoneApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "messages": return <MessagesApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "safari":   return <SafariApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "appstore": return <AppStoreApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "notes":    return <NotesApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "music":    return <MusicApp onClose={closeApp} isDarkMode={isDarkMode} />
      case "settings": return <SettingsApp onClose={closeApp} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      default:         return <HomeScreen isDarkMode={isDarkMode} onAppClick={setActiveApp} />
    }
  }

  const particles = useMemo(
    () => Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10,
    })),
    []
  )

  const techStack = [
    { icon: <Code2 className="w-3.5 h-3.5" />, label: "Next.js" },
    { icon: <Layers className="w-3.5 h-3.5" />, label: "React 19" },
    { icon: <Terminal className="w-3.5 h-3.5" />, label: "TypeScript" },
  ]

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <main className="h-screen w-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 flex items-center justify-center transition-colors duration-500 overflow-hidden">

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/10 rounded-full animate-float"
              style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
            />
          ))}
        </div>

        {/* ── Three-column layout ── */}
        <div className="relative z-10 flex items-center justify-center gap-6 w-full max-w-5xl px-4">

          {/* LEFT PANEL — lg+ only */}
          <div className="hidden lg:flex flex-col items-start gap-4 w-52 flex-shrink-0">

            {/* Identity card */}
            <div className="w-full rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-white/10 p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0">
                  DW
                </div>
                <div>
                  <p className="font-bold text-sm text-foreground leading-tight">Dulmin</p>
                  <p className="text-xs text-muted-foreground">Wickramage</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                DevOps enthusiast & full-stack developer crafting interactive experiences.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://github.com/Dulmin2021"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-xs font-medium text-foreground"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/dulmin-wickramage-464b23197/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors text-xs font-medium text-blue-600 dark:text-blue-400"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Tech stack */}
            <div className="w-full rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-white/10 p-4 shadow-lg">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Built with</p>
              <div className="flex flex-col gap-2">
                {techStack.map((tech) => (
                  <div
                    key={tech.label}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium"
                  >
                    {tech.icon}
                    {tech.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="w-full rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 backdrop-blur-md border border-blue-200/40 dark:border-blue-500/20 p-4 shadow-lg">
              <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-3">Contact</p>
              <a
                href="mailto:dulmin.edu@gmail.com"
                className="flex items-center gap-2 text-xs font-medium text-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                dulmin.edu@gmail.com
              </a>
            </div>
          </div>

          {/* CENTER — iPhone */}
          <div className="flex-shrink-0">
            <IPhoneFrame isDarkMode={isDarkMode}>
              {!isUnlocked
                ? <LockScreen onUnlock={() => setIsUnlocked(true)} isDarkMode={isDarkMode} />
                : renderApp()
              }
            </IPhoneFrame>
          </div>

          {/* RIGHT PANEL — lg+ only */}
          <div className="hidden lg:flex flex-col items-start gap-4 w-52 flex-shrink-0">

            {/* Dark mode toggle card */}
            <div className="w-full rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-white/10 p-5 shadow-lg">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Appearance</p>
              <button
                id="theme-toggle"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 text-sm font-medium shadow-sm cursor-pointer ${
                  isDarkMode
                    ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {isDarkMode
                    ? <Moon className="w-4 h-4 text-indigo-300" />
                    : <Sun className="w-4 h-4 text-amber-500" />
                  }
                  <span>{isDarkMode ? "Dark Mode" : "Light Mode"}</span>
                </div>
                {/* Toggle pill */}
                <div className={`w-9 h-5 rounded-full transition-colors duration-300 relative flex-shrink-0 ${isDarkMode ? "bg-indigo-500" : "bg-slate-300"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${isDarkMode ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </button>
            </div>

            {/* Tips */}
            <div className="w-full rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-white/10 p-5 shadow-lg">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tips</p>
              <ul className="space-y-2.5 text-xs text-muted-foreground">
                {[
                  { icon: "👆", text: "Tap apps to explore" },
                  { icon: "🔓", text: "Swipe up to unlock" },
                  { icon: "🎮", text: "Try the Konami code" },
                  { icon: "📄", text: "Download CV in Settings" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-start gap-2">
                    <span className="mt-0.5">{icon}</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portfolio label */}
            <div className="w-full rounded-2xl bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/40 dark:border-white/10 p-4 shadow-lg text-center">
              <p className="text-[11px] text-muted-foreground">Interactive Portfolio</p>
              <p className="text-xs font-semibold text-foreground mt-0.5">iPortfolio v1.0</p>
              <div className="mt-3 flex justify-center gap-1.5">
                {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((c) => (
                  <div key={c} className={`w-2.5 h-2.5 rounded-full ${c}`} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE bottom bar (hidden on lg+) ── */}
        <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl">
            <button
              id="theme-toggle-mobile"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-200 cursor-pointer ${
                isDarkMode
                  ? "bg-slate-700 border-slate-600 text-white"
                  : "bg-white border-slate-200 text-slate-800"
              }`}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              {isDarkMode ? "Light" : "Dark"}
            </button>
            <div className="w-px h-4 bg-border" />
            <a href="https://github.com/Dulmin2021" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/dulmin-wickramage-464b23197/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:dulmin.edu@gmail.com" className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        <Toaster />
      </main>
    </div>
  )
}
