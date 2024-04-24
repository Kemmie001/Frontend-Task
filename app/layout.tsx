import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
// import AppBar from './components/AppBar'
import Navigation from './components/Navigation'
import './globals.css'
// import { Providers } from './providers'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mainstack',
  description: 'Mainstack Revenue Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="" suppressHydrationWarning={true}>
          <Navigation />
          <main>
            {/* <AppBar /> */}
            {children}
          </main>
      </body>
    </html>
  )
}

