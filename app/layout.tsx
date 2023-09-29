'use client'
import './globals.css'
import { SessionProvider } from "next-auth/react"
import Navbar from "@/components/Navbar/Navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <SessionProvider>
        <Navbar />
          {children}</SessionProvider>
      </body>
    </html>
  )
}
