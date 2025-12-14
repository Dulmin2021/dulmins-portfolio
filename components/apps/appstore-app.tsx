"use client"

import { useState } from "react"
import { ChevronLeft, Star, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AppStoreAppProps {
  onClose: () => void
  isDarkMode: boolean
}

const projects = [
  {
    id: 1,
    name: "TaskFlow Pro",
    subtitle: "Project Management",
    icon: "📋",
    rating: 4.8,
    reviews: 1250,
    category: "Productivity",
    description:
      "A comprehensive task management and collaboration platform built with Next.js and Supabase. Features real-time updates, team collaboration, and advanced analytics.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    highlights: ["Real-time collaboration", "Advanced analytics", "Team management", "Custom workflows"],
    screenshots: ["/task-management-dashboard.png", "/project-kanban-board.jpg", "/team-analytics-chart.jpg"],
  },
  {
    id: 2,
    name: "ShopHub",
    subtitle: "E-Commerce Platform",
    icon: "🛍️",
    rating: 4.9,
    reviews: 2100,
    category: "Shopping",
    description:
      "Full-featured e-commerce platform with Stripe integration, inventory management, and order tracking. Built for scalability and performance.",
    techStack: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
    highlights: ["Payment integration", "Inventory system", "Order tracking", "Admin dashboard"],
    screenshots: ["/ecommerce-product-grid.png", "/shopping-cart-checkout.jpg", "/order-dashboard.jpg"],
  },
  {
    id: 3,
    name: "AI Companion",
    subtitle: "Chat Assistant",
    icon: "🤖",
    rating: 4.7,
    reviews: 890,
    category: "AI & ML",
    description:
      "Intelligent chat application powered by OpenAI with context-aware responses, conversation history, and custom personality settings.",
    techStack: ["React", "OpenAI API", "Node.js", "WebSocket"],
    highlights: ["AI-powered responses", "Context awareness", "Custom personalities", "Real-time chat"],
    screenshots: ["/ai-chat-interface.png", "/chatbot-conversation.jpg", "/ai-settings-panel.jpg"],
  },
]

export default function AppStoreApp({ onClose, isDarkMode }: AppStoreAppProps) {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null)

  if (selectedProject) {
    return (
      <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setSelectedProject(null)} className="gap-1">
            <ChevronLeft className="w-5 h-5" />
            <span>Apps</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-primary font-semibold">
            <Download className="w-4 h-4 mr-1" />
            View Live
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* App Header */}
          <div className="p-6 border-b border-border">
            <div className="flex gap-4 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-4xl shadow-lg">
                {selectedProject.icon}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-1">{selectedProject.name}</h1>
                <p className="text-muted-foreground mb-2">{selectedProject.subtitle}</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{selectedProject.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {selectedProject.reviews.toLocaleString()} reviews
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full" size="lg">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Project
            </Button>
          </div>

          {/* Screenshots */}
          <div className="p-6 border-b border-border">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {selectedProject.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot || "/placeholder.svg"}
                  alt={`Screenshot ${index + 1}`}
                  className="h-64 rounded-xl shadow-md flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold mb-3">About</h2>
            <p className="text-sm leading-relaxed text-foreground mb-4">{selectedProject.description}</p>

            <h3 className="font-semibold mb-2">Key Features</h3>
            <ul className="space-y-2">
              {selectedProject.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-bold mb-3">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className="p-6">
            <h2 className="text-lg font-bold mb-3">Ratings & Reviews</h2>
            <div className="space-y-4">
              <div className="p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">Amazing work!</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Incredible attention to detail and great user experience. Highly recommended!"
                </p>
                <p className="text-xs text-muted-foreground mt-2">- Tech Recruiter, 2 weeks ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
          <ChevronLeft className="w-5 h-5" />
          <span>Home</span>
        </Button>
        <h1 className="text-lg font-semibold">Projects</h1>
        <div className="w-16" />
      </div>

      {/* Featured Projects */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>

          <div className="space-y-4">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="w-full p-4 bg-card rounded-xl border border-border hover:bg-accent transition-colors text-left"
              >
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-3xl shadow-md flex-shrink-0">
                    {project.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg mb-0.5">{project.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.subtitle}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-xs font-semibold">{project.rating}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
