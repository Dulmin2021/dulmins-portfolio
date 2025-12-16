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
    preview: "Frontend: React, Next.js, TypeScript, Tailwind CSS\nBackend: Node.js, ...",
    date: "12/14/2024",
    category: "Career",
  },
  {
    id: 2,
    title: "Education & Certifications",
    preview: "B.Sc. Computer Science - NSBM Green University, Elements of AI - University of Helsinki...",
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
    preview: "Working on: Mind blowing 3d fun site using threeJS\nLearning: Python and WebAssembly\nExploring: Blockchain tech...",
    date: "12/01/2024",
    category: "Work",
  },
  {
    id: 5,
    title: "Career Goals",
    preview:
      "Build impactful products that solve real problems\nContribute to open source\nMentor...",
    date: "11/28/2024",
    category: "Career",
  },
]

const noteContent = {
  1: `Professional Skills
  
Frontend Development:
• React.js & Next.js
• TypeScript & JavaScript
• Tailwind CSS, Styled Components
• Responsive & Mobile-First Design

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
• UI UX (Figma, Adobe XD)
• Agile/Scrum Methodologies`,

  2: `Education & Certifications

B.Sc. Computer Science
NSBM Green University, 2022-2026


Certifications:
✓ Google IT Support 
✓ Google UI UX
✓ Cyber Security Foundation Professional Certificate - CSFPC™

Courses & Learning:
• DevOps Specialization on Coursera
• AWS on Amazon Skill builder
• Crash course on Python
`,

  3: `This is Me!

• ♟️checkmate with respect🙇‍♂️.

• 📖Reading 20 pages of a novel instead of taking a siesta😴➡️📚.

• 🌍🗣️Speaking multiple languages :
“Hello”, “¡Hola!”, “Hallo”, “Bonjour”, “Ciao”

• 👨‍🍳✨Cooking new recipes with the confidence of a Michelin-star chef⭐.

• 🧪🍸 Mixing up a great cocktail (or a safe mocktail).

• 🧠☕ Believing most problems can be solved after coffee
`,

  4: `Current Projects

🚀 Active Development:
1. Tubefetch Youtube Downloader
   - Built with Next.js 15 and Supabase
   - Status: Beta testing

2.  Interactive web experiments with data visualizations
   - Open source Next.js template
   - Dark mode, animations, 3D environments, SEO optimized
   - Status: still working

📚 Learning & Exploring:
• Python
• DevOps and AIOps
• Intergrating Advanced Automation

🎯 Upcoming Ideas:
- AI security product
- Component library
- Tech blog/newsletter`,

  5: `Career Goals

Short-term (1 year):
✓ Master DevOps Skills
✓ Contribute to 3+ open source projects
✓ Build and launch 2 SaaS products
✓ Grow professional network

Mid-term (2-3 years):
• Lead a development team
• Speak at tech conferences
• Publish technical articles

Long-term (5+ years):
 ******************
You don't need to know them.
 ******************

Core Values:
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
