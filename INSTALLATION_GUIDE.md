# iPhone Simulator Portfolio - Complete Installation Guide

Follow these steps to create this iPhone simulator portfolio from scratch on your local machine.

## Step 1: Initial Setup

### 1.1 Install Node.js
Make sure you have Node.js 18+ installed:
\`\`\`bash
node --version
# Should show v18.0.0 or higher
\`\`\`

### 1.2 Create Next.js Project
\`\`\`bash
npx create-next-app@latest iphone-portfolio
\`\`\`

When prompted, choose:
- TypeScript: **Yes**
- ESLint: **Yes**
- Tailwind CSS: **Yes**
- `src/` directory: **No**
- App Router: **Yes**
- Import alias: **Yes** (use `@/*`)

### 1.3 Navigate to Project
\`\`\`bash
cd iphone-portfolio
\`\`\`

---

## Step 2: Install Dependencies

### 2.1 Install shadcn/ui
\`\`\`bash
npx shadcn@latest init
\`\`\`

Choose:
- Style: **New York**
- Base color: **Slate**
- CSS variables: **Yes**

### 2.2 Install Required shadcn Components
\`\`\`bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add avatar
npx shadcn@latest add dialog
npx shadcn@latest add scroll-area
npx shadcn@latest add separator
npx shadcn@latest add tabs
npx shadcn@latest add badge
npx shadcn@latest add switch
npx shadcn@latest add slider
npx shadcn@latest add toast
\`\`\`

### 2.3 Install Additional Packages
\`\`\`bash
npm install lucide-react
npm install @vercel/analytics
npm install tw-animate-css
\`\`\`

---

## Step 3: Configure Tailwind CSS v4

### 3.1 Update `app/globals.css`
Replace the entire contents with the iOS-themed design tokens (see the globals.css in the project).

### 3.2 Verify tailwind.config.ts
Make sure Tailwind is configured to scan all component files:
\`\`\`ts
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
\`\`\`

---

## Step 4: Project Structure

Create the following folder structure:
\`\`\`
iphone-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── iphone/
│   │   ├── iphone-frame.tsx
│   │   ├── lock-screen.tsx
│   │   ├── home-screen.tsx
│   │   ├── status-bar.tsx
│   │   └── app-icon.tsx
│   ├── apps/
│   │   ├── photos-app.tsx
│   │   ├── phone-app.tsx
│   │   ├── messages-app.tsx
│   │   ├── safari-app.tsx
│   │   ├── appstore-app.tsx
│   │   ├── notes-app.tsx
│   │   ├── music-app.tsx
│   │   └── settings-app.tsx
│   └── ui/
│       └── (shadcn components)
├── hooks/
│   └── use-toast.ts
├── lib/
│   └── utils.ts
└── public/
    └── (images will go here)
\`\`\`

---

## Step 5: Build Components (In Order)

### Phase 1: iPhone Shell (15 minutes)
1. **Create `components/iphone/status-bar.tsx`**
   - Displays time, signal, WiFi, battery
   - Uses `useEffect` with `setInterval` for live clock

2. **Create `components/iphone/iphone-frame.tsx`**
   - iPhone 15 Pro frame with Dynamic Island
   - Rounded corners and black bezel
   - Wraps all content

3. **Test**: Update `app/page.tsx` to render the frame

### Phase 2: Lock Screen (20 minutes)
4. **Create `components/iphone/lock-screen.tsx`**
   - Large time display
   - Date below time
   - Swipe-up gesture to unlock
   - Beautiful gradient background

5. **Test**: Add lock screen inside iPhone frame

### Phase 3: Home Screen (30 minutes)
6. **Create `components/iphone/app-icon.tsx`**
   - 60x60px rounded square
   - Icon prop (Lucide React icons)
   - Label below
   - Notification badge support
   - Click handler

7. **Create `components/iphone/home-screen.tsx`**
   - 4-column grid layout
   - Multiple pages support (optional)
   - Dock at bottom
   - Time-based greeting widget

8. **Test**: Add navigation between lock and home screen

### Phase 4: Individual Apps (2-3 hours)

#### Photos App (30 min)
9. **Create `components/apps/photos-app.tsx`**
   - Album view with thumbnails
   - Grid layout for photos
   - Back button to home

#### Phone App (20 min)
10. **Create `components/apps/phone-app.tsx`**
    - Tabs: Favorites, Recents, Contacts
    - Contact card with avatar
    - Call/message/video buttons

#### Messages App (30 min)
11. **Create `components/apps/messages-app.tsx`**
    - Chat bubble interface
    - Simulated conversation about your skills
    - Timestamps

#### Safari App (25 min)
12. **Create `components/apps/safari-app.tsx`**
    - URL bar
    - Bookmarks section
    - Display your portfolio page content

#### App Store (40 min)
13. **Create `components/apps/appstore-app.tsx`**
    - Featured projects grid
    - Detail view with screenshots carousel
    - Ratings, reviews, tech stack

#### Notes App (20 min)
14. **Create `components/apps/notes-app.tsx`**
    - List of notes (Skills, Education, Goals)
    - Simple text display

#### Music App (30 min)
15. **Create `components/apps/music-app.tsx`**
    - Now playing screen
    - Album art
    - Play/pause, previous/next buttons
    - Progress slider

#### Settings App (25 min)
16. **Create `components/apps/settings-app.tsx`**
    - Dark mode toggle
    - Resume download link
    - About section

### Phase 5: Polish & Features (1 hour)
17. **Add App Navigation System**
    - State management in `app/page.tsx`
    - Switch between apps
    - Back to home screen

18. **Add Animations**
    - Slide transitions
    - Fade effects
    - Icon bounce on tap

19. **Add Easter Eggs**
    - Konami code listener
    - Shake detection
    - Console messages

20. **Add Images**
    - Create or generate placeholder images
    - Place in `/public` folder
    - Update image paths in components

---

## Step 6: Add Images

### 6.1 Required Images
Place these in the `/public` folder:
- `professional-portrait.png` - Your photo
- `web-development-coding-screen.png` - Project screenshot
- `beautiful-mountain-landscape.png` - Sample photo
- `ui-ux-design-mockup.png` - Design work
- `task-management-dashboard.png` - Project 1
- `ecommerce-product-grid.png` - Project 2
- `ai-chat-interface.png` - Project 3
- `coding-music-cover.png` - Music album art

### 6.2 Image Generation Options
- Use AI image generators (Midjourney, DALL-E, Stable Diffusion)
- Take screenshots of your actual projects
- Use stock photos from Unsplash/Pexels

---

## Step 7: Update Content

### 7.1 Personalize Data
Edit each app component to include YOUR information:

**Phone App:**
- Your name
- Your email
- Your phone (or placeholder)
- Your location

**Messages App:**
- Write your actual skills as chat messages
- Add your real experience

**Safari Bookmarks:**
- Your GitHub URL
- Your LinkedIn URL
- Your personal website

**App Store Projects:**
- Your actual project names
- Real descriptions
- Actual tech stacks
- Live demo links

**Notes App:**
- Your skills list
- Your education
- Your career goals

**Music App:**
- Your favorite coding music/playlists
- Genre preferences

---

## Step 8: Run & Test

### 8.1 Start Development Server
\`\`\`bash
npm run dev
\`\`\`

### 8.2 Open Browser
Navigate to `http://localhost:3000`

### 8.3 Test All Features
- [ ] Lock screen unlocks with swipe
- [ ] All apps open correctly
- [ ] Back navigation works
- [ ] Dark mode toggle works
- [ ] Animations are smooth
- [ ] Images load correctly
- [ ] Easter eggs work (Konami code: ↑↑↓↓←→←→BA)
- [ ] Responsive on mobile

---

## Step 9: Deploy to Vercel

### 9.1 Push to GitHub
\`\`\`bash
git init
git add .
git commit -m "Initial iPhone portfolio"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
\`\`\`

### 9.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"

### 9.3 Custom Domain (Optional)
- Add your custom domain in Vercel settings
- Update DNS records

---

## Step 10: Optimization

### 10.1 Image Optimization
Use Next.js Image component:
\`\`\`tsx
import Image from 'next/image'

<Image 
  src="/professional-portrait.png" 
  alt="Profile" 
  width={500} 
  height={500}
  priority
/>
\`\`\`

### 10.2 Performance
- Lazy load apps not currently visible
- Use React.memo for heavy components
- Optimize images (WebP format, compress)

### 10.3 SEO
Update `app/layout.tsx` metadata:
\`\`\`tsx
export const metadata = {
  title: "Your Name - Interactive Portfolio",
  description: "An immersive portfolio experience...",
  openGraph: {
    title: "Your Name - Portfolio",
    description: "...",
    images: ["/og-image.png"],
  },
}
\`\`\`

---

## Troubleshooting

### Issue: "Module not found"
**Solution:** Make sure all imports use `@/` alias and files exist

### Issue: Animations not working
**Solution:** Check `tw-animate-css` is installed and imported in globals.css

### Issue: Dark mode not toggling
**Solution:** Verify `.dark` class is being added to parent element

### Issue: Swipe gesture not working
**Solution:** Test on actual mobile device, not just browser

### Issue: Images not loading
**Solution:** Check images are in `/public` and paths don't include `/public` prefix

---

## Time Estimate

- **Total Time**: 6-8 hours for first-time build
- **Phases**:
  - Setup & Config: 30 minutes
  - iPhone Shell: 45 minutes
  - Home/Lock Screens: 1 hour
  - Building 8 Apps: 3-4 hours
  - Polish & Features: 1-2 hours
  - Testing & Deploy: 30 minutes

---

## Next Steps After Completion

1. **Add More Apps**: Calendar, Calculator, Weather
2. **Add Notifications**: Toast messages for interactions
3. **Add Multitasking**: Swipe between apps
4. **Add Siri**: Voice command easter egg
5. **Add Camera**: Capture screenshots
6. **Add Animations**: Page transitions, app open/close animations
7. **Blog Integration**: Connect to your blog API
8. **Contact Form**: Add functional contact submission

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [iOS Design Guidelines](https://developer.apple.com/design)

---

## Support

If you get stuck:
1. Check the browser console for errors
2. Verify all dependencies are installed
3. Make sure file paths match exactly
4. Test on different browsers
5. Use React DevTools to inspect component state

---

**Happy Coding!** 🚀📱
