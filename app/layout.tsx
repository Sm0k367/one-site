import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'One Site - Sovereign Intelligence Nexus',
  description: 'Advanced AI Chat Interface',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>One Site - Sovereign Intelligence Nexus</title>
      </head>
      <body className="terminal-container">
        <div className="terminal-header">
          <div className="terminal-title">
            <span className="text-yellow-400">EPIC TECH AI</span>
            <span className="text-gray-400">//</span>
            <span className="text-cyan-400">@SMOKEN420</span>
          </div>
          <div className="terminal-status">
            <span className="text-cyan-400">CODESYNTH_ENGINEERS_ONLINE</span>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}
