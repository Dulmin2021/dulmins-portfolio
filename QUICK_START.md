# Quick Start Guide (TL;DR)

For developers who want the fastest path to running this project:

## 1. One-Line Setup
\`\`\`bash
npx create-next-app@latest iphone-portfolio --typescript --tailwind --app && cd iphone-portfolio
\`\`\`

## 2. Install Everything
\`\`\`bash
npx shadcn@latest init && \
npx shadcn@latest add button card avatar dialog scroll-area separator tabs badge switch slider toast && \
npm install lucide-react @vercel/analytics tw-animate-css
\`\`\`

## 3. Copy Files
Copy all files from the GitHub repo or v0 export into your project:
- Replace `app/` folder contents
- Copy entire `components/` folder
- Copy `app/globals.css` with iOS theme
- Add images to `/public`

## 4. Run
\`\`\`bash
npm run dev
\`\`\`

## 5. Customize
Edit these files with YOUR information:
- `components/apps/phone-app.tsx` - Your contact info
- `components/apps/messages-app.tsx` - Your skills
- `components/apps/appstore-app.tsx` - Your projects
- `components/apps/safari-app.tsx` - Your links
- `components/apps/notes-app.tsx` - Your education/goals

## 6. Deploy
\`\`\`bash
git init && git add . && git commit -m "Init" && git push
\`\`\`
Then import to Vercel.

**Done in 10 minutes!** ⚡
