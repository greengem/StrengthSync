'use client'
import {Providers} from "./providers";
import { SessionProvider } from "next-auth/react"
import AppNavbar from "@/components/Navbar/Navbar"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body>
        <SessionProvider>
          <Providers>
            <AppNavbar />
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
