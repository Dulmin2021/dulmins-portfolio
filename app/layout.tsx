import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dulmin's iPortfolio",
  description: "An immersive portfolio experience designed like an iPhone with interactive apps",
  icons: {
    icon: [
      {
        url: "/star.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/star.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/star.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/star.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
