
import {Providers} from "./providers";

//import AppNavbar from "@/components/Navbar/Navbar"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body>
          <Providers>

            <main className="max-w-screen-xl mx-auto">
              {children}
            </main>
          </Providers>
      </body>
    </html>
  )
}
