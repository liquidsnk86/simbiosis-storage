import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Simbiosis Geo',
  description: 'Semillas de cannabis para Colección',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
