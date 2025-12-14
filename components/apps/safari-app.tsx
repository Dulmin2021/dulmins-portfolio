"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, RotateCw, Share2, BookOpen, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SafariAppProps {
  onClose: () => void
  isDarkMode: boolean
}

const bookmarks = [
  { name: "GitHub", url: "github.com/johndeveloper", icon: "🐙" },
  { name: "LinkedIn", url: "linkedin.com/in/johndeveloper", icon: "💼" },
  { name: "Blog", url: "blog.johndeveloper.com", icon: "📝" },
  { name: "Resume", url: "resume.johndeveloper.com", icon: "📄" },
]

const projectLinks = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack Next.js e-commerce with Stripe integration",
    tech: "Next.js • TypeScript • Stripe",
    url: "github.com/project1",
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat app with AI-powered responses",
    tech: "React • Node.js • OpenAI",
    url: "github.com/project2",
  },
  {
    title: "Task Management SaaS",
    description: "Collaborative project management tool",
    tech: "Next.js • Supabase • Tailwind",
    url: "github.com/project3",
  },
]

export default function SafariApp({ onClose, isDarkMode }: SafariAppProps) {
  const [currentUrl, setCurrentUrl] = useState("portfolio.johndeveloper.com")
  const [view, setView] = useState<"bookmarks" | "projects">("bookmarks")

  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
      {/* Top Bar */}
      <div className="px-4 py-2 border-b border-border space-y-2">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronRight className="w-5 h-5 opacity-50" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <BookOpen className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} className="ml-auto gap-1">
            <ArrowLeft className="w-4 h-4" />
            Done
          </Button>
        </div>

        {/* URL Bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
          <span className="text-xs">🔒</span>
          <Input
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            className="border-0 bg-transparent text-sm h-6 p-0 focus-visible:ring-0"
          />
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <RotateCw className="w-3 h-3" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={view} onValueChange={(v) => setView(v as "bookmarks" | "projects")} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="bookmarks" className="flex-1">
              Bookmarks
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex-1">
              Projects
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {view === "bookmarks" ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold mb-3">Favorites</h2>
              <div className="grid grid-cols-4 gap-4">
                {bookmarks.map((bookmark) => (
                  <button key={bookmark.name} className="flex flex-col items-center gap-2 group">
                    <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {bookmark.icon}
                    </div>
                    <span className="text-xs text-center">{bookmark.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-bold">Quick Links</h2>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-card rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">🐙</div>
                  <div>
                    <h3 className="font-semibold">GitHub Profile</h3>
                    <p className="text-xs text-muted-foreground">View my open source contributions</p>
                  </div>
                </div>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-card rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💼</div>
                  <div>
                    <h3 className="font-semibold">LinkedIn</h3>
                    <p className="text-xs text-muted-foreground">Connect with me professionally</p>
                  </div>
                </div>
              </a>

              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📄</div>
                  <div>
                    <h3 className="font-semibold">Resume / CV</h3>
                    <p className="text-xs text-muted-foreground">Download my latest resume</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <h2 className="text-lg font-bold mb-4">Featured Projects</h2>
            {projectLinks.map((project) => (
              <div
                key={project.title}
                className="p-4 bg-card rounded-lg border border-border hover:bg-accent transition-colors"
              >
                <h3 className="font-semibold mb-1">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{project.tech}</span>
                  <a href={`https://${project.url}`} className="text-xs text-primary font-medium">
                    View Code →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
