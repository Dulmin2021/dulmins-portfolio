"use client"

import { useState } from "react"
import { ChevronLeft, Plus, Search, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NotesAppProps {
  onClose: () => void
  isDarkMode: boolean
}

const notesList = [
  {
    id: 1,
    title: "Professional Skills",
    preview: "Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, Express, PostgreSQL...",
    date: "12/14/2024",
    category: "Career",
  },
  {
    id: 2,
    title: "Education & Certifications",
    preview: "B.S. Computer Science - University Name (2019)\nAWS Certified Developer\nGoogle Cloud Professional...",
    date: "12/10/2024",
    category: "Career",
  },
  {
    id: 3,
    title: "Fun Facts About Me",
    preview:
      "Coffee enthusiast ☕\nLove hiking and photography\nBuilt my first website at age 14\nSpeak 3 languages...",
    date: "12/05/2024",
    category: "Personal",
  },
  {
    id: 4,
    title: "Current Projects",
    preview: "Working on: AI-powered task manager\nLearning: Rust and WebAssembly\nExploring: Blockchain tech...",
    date: "12/01/2024",
    category: "Work",
  },
  {
    id: 5,
    title: "Career Goals",
    preview:
      "Build impactful products that solve real problems\nContribute to open source\nMentor junior developers...",
    date: "11/28/2024",
    category: "Career",
  },
]

const noteContent = {
  1: `Professional Skills
  
Frontend Development:
• React.js & Next.js (5+ years)
• TypeScript & JavaScript (ES6+)
• Tailwind CSS, SCSS, Styled Components
• Responsive & Mobile-First Design
• Performance Optimization

Backend Development:
• Node.js & Express
• PostgreSQL, MongoDB, Supabase
• RESTful APIs & GraphQL
• Authentication & Authorization
• Cloud Services (AWS, Vercel)

Tools & Technologies:
• Git & GitHub
• Docker & CI/CD
• Testing (Jest, Cypress)
• Figma & Design Systems
• Agile/Scrum Methodologies`,

  2: `Education & Certifications

B.S. Computer Science
University Name, 2015-2019
GPA: 3.8/4.0

Certifications:
✓ AWS Certified Developer - Associate
✓ Google Cloud Professional Architect
✓ Meta Front-End Developer
✓ MongoDB Certified Developer

Courses & Learning:
• Advanced React Patterns
• System Design & Architecture
• Machine Learning Fundamentals
• Web Performance Optimization`,

  3: `This is Me

☕ Coffee Enthusiast
I start every morning with a pour-over coffee. Favorite roast: Ethiopian Yirgacheffe

📸 Photography Hobbyist
Love capturing landscapes and urban architecture. Check out my Instagram!

🥾 Outdoor Adventurer
Hiking, camping, and exploring nature trails on weekends

🎮 Gaming
Enjoy strategy games and indie titles. Currently playing: Hollow Knight

🌍 Languages
Sinhala (native), English, learning Spanish & German

💻 First Code
Built my first website at age 14 - a fan site for my favorite band`,

  4: `Current Projects

🚀 Active Development:
1. AI Task Manager
   - Using OpenAI API for smart task suggestions
   - Built with Next.js 15 and Supabase
   - Status: Beta testing

2. Developer Portfolio Template
   - Open source Next.js template
   - Dark mode, animations, SEO optimized
   - Status: Ready to launch

📚 Learning & Exploring:
• Rust programming language
• WebAssembly for performance
• Blockchain & Web3 technologies
• Advanced TypeScript patterns

🎯 Upcoming Ideas:
- SaaS boilerplate
- Component library
- Tech blog/newsletter`,

  5: `Career Goals

Short-term (1 year):
✓ Master Next.js 15 and React 19
✓ Contribute to 3+ open source projects
✓ Build and launch 2 SaaS products
✓ Grow professional network

Mid-term (2-3 years):
• Lead a development team
• Speak at tech conferences
• Publish technical articles
• Mentor junior developers

Long-term (5+ years):
• Start own tech company
• Create educational content
• Build products that impact millions
• Give back to the community

Core Values:
• Write clean, maintainable code
• Prioritize user experience
• Embrace continuous learning
• Collaborate and share knowledge`,
}

export default function NotesApp({ onClose, isDarkMode }: NotesAppProps) {
  const [selectedNote, setSelectedNote] = useState<number | null>(null)

  if (selectedNote) {
    const note = notesList.find((n) => n.id === selectedNote)
    const content = noteContent[selectedNote as keyof typeof noteContent]

    return (
      <div className="w-full h-full bg-background flex flex-col animate-zoom-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <Button variant="ghost" size="sm" onClick={() => setSelectedNote(null)} className="gap-1">
            <ChevronLeft className="w-5 h-5" />
            <span>Notes</span>
          </Button>
          <Button variant="ghost" size="sm">
            Done
          </Button>
        </div>

        {/* Note Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-bold mb-1">{note?.title}</h1>
          <p className="text-sm text-muted-foreground mb-6">{note?.date}</p>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{content}</pre>
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
        <h1 className="text-lg font-semibold">Notes</h1>
        <Button variant="ghost" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Folders */}
      <div className="px-4 py-3 border-b border-border">
        <div className="flex gap-3 overflow-x-auto">
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium whitespace-nowrap">
            <FolderOpen className="w-4 h-4" />
            All Notes
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium whitespace-nowrap">
            Career
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium whitespace-nowrap">
            Personal
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {notesList.map((note) => (
          <button
            key={note.id}
            onClick={() => setSelectedNote(note.id)}
            className="w-full p-4 border-b border-border hover:bg-accent transition-colors text-left"
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-semibold">{note.title}</h3>
              <span className="text-xs text-muted-foreground">{note.date}</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{note.preview}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
