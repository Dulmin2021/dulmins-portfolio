"use client"

import { ChevronLeft, PhoneIcon, Video, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PhoneAppProps {
  onClose: () => void
  isDarkMode: boolean
}

export default function PhoneApp({ onClose, isDarkMode }: PhoneAppProps) {
  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
          <ChevronLeft className="w-5 h-5" />
          <span>Home</span>
        </Button>
        <h1 className="text-lg font-semibold">Contact</h1>
        <div className="w-16" />
      </div>

      {/* Contact Card */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center pt-8 pb-6">
          <Avatar className="w-32 h-32 mb-4">
            <AvatarFallback className="text-3xl font-semibold bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-1">John Developer</h2>
          <p className="text-muted-foreground">Portfolio Owner</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-4 gap-4 px-6 py-6 border-y border-border">
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <span className="text-xs">message</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <PhoneIcon className="w-6 h-6" />
            </div>
            <span className="text-xs">call</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Video className="w-6 h-6" />
            </div>
            <span className="text-xs">video</span>
          </button>
          <button className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
            <span className="text-xs">mail</span>
          </button>
        </div>

        {/* Contact Details */}
        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">mobile</p>
              <a href="tel:+1234567890" className="text-primary text-lg">
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">email</p>
              <a href="mailto:john@example.com" className="text-primary text-lg">
                john@example.com
              </a>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">LinkedIn</p>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-primary text-lg">
                linkedin.com/in/johndeveloper
              </a>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">GitHub</p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-primary text-lg">
                github.com/johndeveloper
              </a>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="px-6 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Notes</p>
          <p className="text-sm leading-relaxed">
            Passionate full-stack developer with 5+ years of experience building web applications. Specializing in
            React, Next.js, and Node.js. Always excited to work on innovative projects!
          </p>
        </div>
      </div>
    </div>
  )
}
