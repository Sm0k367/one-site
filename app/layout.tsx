import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'S.I.N. | SOVEREIGN INTELLIGENCE NEXUS — @SM0KEN420',
  description: 'The Sovereign Intelligence Nexus - Advanced AI Chat Interface',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black text-white font-mono">
        {children}
      </body>
    </html>
  )
}
