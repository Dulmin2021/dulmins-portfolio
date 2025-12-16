"use client"

import { ChevronLeft, ChevronRight, Moon, Sun, Download, Info, User, Smartphone, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarImage,AvatarFallback } from "@/components/ui/avatar"

interface SettingsAppProps {
  onClose: () => void
  isDarkMode: boolean
  setIsDarkMode: (value: boolean) => void
}

export default function SettingsApp({ onClose, isDarkMode, setIsDarkMode }: SettingsAppProps) {
  const handleDownloadResume = () => {
    const resumePath = "/Dulmin_Wickramage_DevOps.pdf"
    const link = document.createElement("a")
    link.href = resumePath
    link.download = "Dulmin_Wickramage_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
          <ChevronLeft className="w-5 h-5" />
          <span>Home</span>
        </Button>
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        <div className="w-16" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <button className="w-full p-6 border-b border-border hover:bg-accent transition-colors flex items-center gap-4">
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src="/professional-portrait.jpg" alt="My pic" />
            <AvatarFallback className="text-3xl font-semibold bg-primary text-primary-foreground">DW</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <h2 className="text-xl font-bold text-foreground">Dulmin wickramage</h2>
            <p className="text-sm text-muted-foreground">DevOps enthusiast</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Appearance */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Appearance</h3>
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border border-border">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div>
                <p className="font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">Toggle dark/light theme</p>
              </div>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
          </div>
        </div>

        {/* Portfolio Settings */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Portfolio</h3>
          <div className="space-y-3">
            <button
              onClick={handleDownloadResume}
              className="w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Download Resume</p>
                  <p className="text-xs text-muted-foreground">Get PDF version</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Notifications</p>
                  <p className="text-xs text-muted-foreground">Manage alerts</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* About */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">About</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium text-foreground">Professional Info</p>
                  <p className="text-xs text-muted-foreground">Skills, experience, education</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>

            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Smartphone className="w-5 h-5" />
                <p className="font-medium text-foreground">Device Info</p>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Model: iPhone 15 Pro Simulator</p>
                <p>Version: iPortfolio 1.0.0</p>
                <p>Built with: Next.js 16 & React 19</p>
              </div>
            </div>

            <div className="p-4 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-3 mb-3">
                <Info className="w-5 h-5" />
                <p className="font-medium text-foreground">Software Update</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Your iPhone is up to date</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium">Recent Updates:</p>
                  <p>• Added new project showcases</p>
                  <p>• Improved dark mode</p>
                  <p>• Enhanced animations</p>
                  <p>• Bug fixes and performance improvements</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 text-center text-sm text-muted-foreground">
          <p>iPortfolio v1.0.0</p>
          <p className="mt-1">Created with Next.js & React</p>
          <p className="mt-4">© 2025 Dulmin wickramage</p>
        </div>
      </div>
    </div>
  )
}
