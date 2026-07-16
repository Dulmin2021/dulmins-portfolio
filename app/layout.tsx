import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist     = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dancing",
  display: "swap",
})


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
    <html lang="en" className={dancingScript.variable}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
