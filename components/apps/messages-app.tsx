"use client"

import { useState } from "react"
import { ChevronLeft, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Message {
  id: number
  text: string
  sender: "user" | "me"
  timestamp: string
}

interface MessagesAppProps {
  onClose: () => void
  isDarkMode: boolean
}

const initialMessages: Message[] = [
  { id: 1, text: "Hey! Thanks for checking out my portfolio!", sender: "me", timestamp: "10:30 AM" },
  { id: 2, text: "Tell me about your skills!", sender: "user", timestamp: "10:31 AM" },
  {
    id: 3,
    text: "I'm a full-stack developer with expertise in React, Next.js, TypeScript, and Node.js. I love building interactive and performant web applications!",
    sender: "me",
    timestamp: "10:32 AM",
  },
  { id: 4, text: "What kind of projects have you worked on?", sender: "user", timestamp: "10:33 AM" },
  {
    id: 5,
    text: "I've built e-commerce platforms, SaaS applications, portfolio sites, and AI-powered tools. Check out the App Store app to see my project showcase!",
    sender: "me",
    timestamp: "10:34 AM",
  },
  { id: 6, text: "Impressive! How can I get in touch?", sender: "user", timestamp: "10:35 AM" },
  {
    id: 7,
    text: "You can reach me via email at john@example.com or check my LinkedIn and GitHub in the Phone app!",
    sender: "me",
    timestamp: "10:36 AM",
  },
]

export default function MessagesApp({ onClose, isDarkMode }: MessagesAppProps) {
  const [messages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
          <ChevronLeft className="w-5 h-5" />
          <span>Messages</span>
        </Button>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs bg-blue-500 text-white">RC</AvatarFallback>
          </Avatar>
          <span className="font-semibold">Recruiter</span>
        </div>
        <div className="w-16" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div className={`flex flex-col max-w-[75%] ${message.sender === "me" ? "items-end" : "items-start"}`}>
              <div
                className={`px-4 py-2 rounded-2xl ${
                  message.sender === "me"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-secondary text-secondary-foreground rounded-bl-sm"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              <span className="text-xs text-muted-foreground mt-1">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="iMessage"
            className="flex-1 rounded-full"
          />
          <Button size="icon" className="rounded-full" disabled>
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          This is a simulated conversation showcasing my background
        </p>
      </div>
    </div>
  )
}
