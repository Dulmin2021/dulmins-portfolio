"use client"

import { useState, useEffect } from "react"
import StatusBar from "./status-bar"
import AppIcon from "./app-icon"
import {
  Camera,
  ImageIcon,
  Phone,
  MessageCircle,
  Chrome,
  ShoppingBag,
  FileText,
  Music,
  Settings,
  Mail,
  Calendar,
  Map,
} from "lucide-react"

interface HomeScreenProps {
  isDarkMode: boolean
  onAppClick?: (appId: string) => void
}

export default function HomeScreen({ isDarkMode, onAppClick }: HomeScreenProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const apps = [
    { id: "photos", name: "Photos", icon: ImageIcon, color: "bg-gradient-to-br from-red-400 to-yellow-400" },
    { id: "camera", name: "Camera", icon: Camera, color: "bg-gradient-to-br from-slate-600 to-slate-800" },
    { id: "phone", name: "Phone", icon: Phone, color: "bg-gradient-to-br from-green-400 to-green-600" },
    {
      id: "messages",
      name: "Messages",
      icon: MessageCircle,
      color: "bg-gradient-to-br from-green-400 to-green-600",
      badge: 3,
    },

    { id: "mail", name: "Mail", icon: Mail, color: "bg-gradient-to-br from-blue-500 to-blue-600", badge: 12 },
    { id: "safari", name: "Safari", icon: Chrome, color: "bg-gradient-to-br from-blue-400 to-cyan-500" },
    { id: "maps", name: "Maps", icon: Map, color: "bg-gradient-to-br from-green-400 to-green-600" },
    { id: "calendar", name: "Calendar", icon: Calendar, color: "bg-white dark:bg-slate-800" },

    { id: "notes", name: "Notes", icon: FileText, color: "bg-gradient-to-br from-yellow-300 to-yellow-500" },
    { id: "music", name: "Music", icon: Music, color: "bg-gradient-to-br from-pink-500 to-red-500" },
    {
      id: "appstore",
      name: "App Store",
      icon: ShoppingBag,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      badge: 1,
    },
    { id: "settings", name: "Settings", icon: Settings, color: "bg-gradient-to-br from-slate-600 to-slate-700" },
  ]

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-950 transition-colors duration-500 animate-fade-in">
      <StatusBar isDarkMode={isDarkMode} />

      <div className="px-6 pt-16 pb-2">
        <div className="glass-effect rounded-2xl p-4 mb-4 border border-white/20 dark:border-white/10 hover-lift">
          <h2 className="text-2xl font-bold mb-1">{getGreeting()}</h2>
          <p className="text-sm text-muted-foreground">Welcome to my interactive portfolio</p>
        </div>
      </div>

      {/* App Grid */}
      <div className="px-6 pb-24">
        <div className="grid grid-cols-4 gap-6">
          {apps.map((app, index) => (
            <div
              key={app.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <AppIcon
                name={app.name}
                icon={app.icon}
                color={app.color}
                onClick={() => onAppClick?.(app.id)}
                badge={app.badge}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="glass-effect rounded-3xl p-4 shadow-lg border border-white/20 dark:border-white/10 animate-slide-up">
          <div className="grid grid-cols-4 gap-4">
            <AppIcon
              name="Phone"
              icon={Phone}
              color="bg-gradient-to-br from-green-400 to-green-600"
              showLabel={false}
              onClick={() => onAppClick?.("phone")}
            />
            <AppIcon
              name="Safari"
              icon={Chrome}
              color="bg-gradient-to-br from-blue-400 to-cyan-500"
              showLabel={false}
              onClick={() => onAppClick?.("safari")}
            />
            <AppIcon
              name="Messages"
              icon={MessageCircle}
              color="bg-gradient-to-br from-green-400 to-green-600"
              showLabel={false}
              onClick={() => onAppClick?.("messages")}
              badge={3}
            />
            <AppIcon
              name="Music"
              icon={Music}
              color="bg-gradient-to-br from-pink-500 to-red-500"
              showLabel={false}
              onClick={() => onAppClick?.("music")}
            />
          </div>
        </div>
      </div>

      {/* Page Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-foreground" />
        <div className="w-2 h-2 rounded-full bg-foreground/30" />
      </div>
    </div>
  )
}
