# Component Architecture Guide

## Understanding the Component Structure

### 1. Main App (`app/page.tsx`)
The orchestrator component that manages:
- **State**: `isUnlocked`, `activeApp`, `isDarkMode`
- **Rendering Logic**: Decides which screen/app to show
- **Easter Eggs**: Konami code, shake detection

**Key Pattern:**
\`\`\`tsx
const renderApp = () => {
  switch (activeApp) {
    case 'photos': return <PhotosApp />
    case 'phone': return <PhoneApp />
    default: return <HomeScreen />
  }
}
\`\`\`

### 2. iPhone Frame (`components/iphone/iphone-frame.tsx`)
The visual container that looks like an iPhone.

**Responsibilities:**
- Physical iPhone appearance (bezel, corners, Dynamic Island)
- Theme toggle button
- Wraps all content with proper dimensions

**Key CSS:**
- `width: 390px` (iPhone 15 Pro width)
- `aspect-ratio: 19.5/9` (iPhone proportions)
- Rounded corners with `border-radius`

### 3. Status Bar (`components/iphone/status-bar.tsx`)
Always-visible top bar.

**Features:**
- Live clock using `setInterval`
- Static icons (signal, WiFi, battery)
- Adapts to dark mode

**Pattern:**
\`\`\`tsx
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date().toLocaleTimeString())
  }, 1000)
  return () => clearInterval(timer)
}, [])
\`\`\`

### 4. Lock Screen (`components/iphone/lock-screen.tsx`)
First screen users see.

**Gesture Handling:**
\`\`\`tsx
const handleTouchStart = (e: TouchEvent) => {
  setStartY(e.touches[0].clientY)
}

const handleTouchMove = (e: TouchEvent) => {
  const currentY = e.touches[0].clientY
  const diff = startY - currentY
  if (diff > 100) onUnlock() // Swipe threshold
}
\`\`\`

### 5. Home Screen (`components/iphone/home-screen.tsx`)
Grid of app icons.

**Layout:**
- CSS Grid: 4 columns
- Multiple rows
- Special dock section at bottom

**Dynamic Content:**
- Time-based greeting widget
- Notification badges on icons
- Page dots (if multi-page)

### 6. App Icon (`components/iphone/app-icon.tsx`)
Reusable icon component.

**Props:**
\`\`\`tsx
interface AppIconProps {
  icon: LucideIcon
  label: string
  color: string
  onClick: () => void
  badge?: number
}
\`\`\`

**Features:**
- Long-press for wiggle mode
- Tap animation
- Gradient backgrounds

### 7. Individual Apps
Each app follows this structure:

\`\`\`tsx
interface AppProps {
  onClose: () => void
  isDarkMode: boolean
}

export default function SomeApp({ onClose, isDarkMode }) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header>
        <button onClick={onClose}>← Back</button>
        <h1>App Name</h1>
      </header>
      
      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {/* App-specific content */}
      </main>
    </div>
  )
}
\`\`\`

### 8. App-Specific Patterns

#### Photos App
- Album grid → Photo grid → Full image view
- Uses state: `selectedAlbum`, `selectedPhoto`

#### Messages App
- Chat bubble layout
- Different styles for sent/received
- Timestamp formatting

#### Safari App
- Tabbed interface
- URL bar (non-functional for demo)
- Bookmark quick links

#### App Store
- Card grid → Detail view
- Screenshot carousel
- Star ratings component

#### Music App
- Now playing full-screen
- Progress slider with `<Slider />` component
- Playback controls (demo only)

#### Settings App
- Grouped list items
- Toggle switches
- Navigation to sub-menus

---

## State Flow Diagram

\`\`\`
App (page.tsx)
├── isUnlocked: boolean
├── activeApp: string | null
└── isDarkMode: boolean

When isUnlocked = false:
  → Render LockScreen
     └── onUnlock() → setIsUnlocked(true)

When isUnlocked = true & activeApp = null:
  → Render HomeScreen
     └── onAppClick(appName) → setActiveApp(appName)

When activeApp is set:
  → Render specific app component
     └── onClose() → setActiveApp(null)
\`\`\`

---

## Styling Patterns

### Glass Morphism
\`\`\`css
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
\`\`\`

### iOS-Style Transitions
\`\`\`css
.smooth-transition {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
\`\`\`

### Animations
- **Slide Up**: For apps opening
- **Fade In**: For subtle appearances
- **Wiggle**: For long-press icon mode
- **Float**: For background particles

---

## Data Management

### Static Data Locations

**Contact Info** (`phone-app.tsx`):
\`\`\`tsx
const contact = {
  name: "Your Name",
  email: "you@email.com",
  phone: "+1 234 567 890",
  location: "City, State"
}
\`\`\`

**Projects** (`appstore-app.tsx`):
\`\`\`tsx
const projects = [
  {
    id: 1,
    name: "Project Name",
    category: "Category",
    description: "...",
    techStack: ["React", "Next.js"],
    screenshots: ["/path/to/image.png"]
  }
]
\`\`\`

**Skills** (`messages-app.tsx` or `notes-app.tsx`):
\`\`\`tsx
const skills = [
  "JavaScript/TypeScript",
  "React & Next.js",
  // ...
]
\`\`\`

---

## Adding New Apps

### Step-by-Step:

1. **Create App Component**
\`\`\`tsx
// components/apps/your-app.tsx
export default function YourApp({ onClose, isDarkMode }) {
  return (
    <div className="flex flex-col h-full">
      <header>
        <button onClick={onClose}>Back</button>
        <h1>Your App</h1>
      </header>
      <main>{/* Your content */}</main>
    </div>
  )
}
\`\`\`

2. **Add to Home Screen**
\`\`\`tsx
// components/iphone/home-screen.tsx
<AppIcon
  icon={YourIcon}
  label="Your App"
  color="from-blue-500 to-purple-500"
  onClick={() => onAppClick('yourapp')}
/>
\`\`\`

3. **Add to Render Function**
\`\`\`tsx
// app/page.tsx
const renderApp = () => {
  switch (activeApp) {
    case 'yourapp':
      return <YourApp onClose={closeApp} isDarkMode={isDarkMode} />
    // ... other cases
  }
}
\`\`\`

---

## Performance Tips

1. **Lazy Load Apps**
\`\`\`tsx
const PhotosApp = dynamic(() => import('@/components/apps/photos-app'))
\`\`\`

2. **Memoize Heavy Components**
\`\`\`tsx
const AppIcon = React.memo(({ icon, label, onClick }) => {
  // Component code
})
\`\`\`

3. **Optimize Images**
\`\`\`tsx
import Image from 'next/image'

<Image
  src="/image.png"
  width={500}
  height={500}
  alt="Description"
  quality={85}
/>
\`\`\`

4. **Debounce Gestures**
\`\`\`tsx
const debouncedGesture = useMemo(
  () => debounce(handleGesture, 100),
  []
)
\`\`\`

---

## Testing Checklist

- [ ] Lock screen swipe works
- [ ] All app icons open correct apps
- [ ] Back button returns to home
- [ ] Dark mode toggles properly
- [ ] All images load
- [ ] Smooth animations
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Easter eggs function
- [ ] Links open correctly

---

This architecture is modular, scalable, and follows React best practices!
