import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenGov Compliance Center',
  description: 'Your complete guide to local government compliance across all 50 states',
  keywords: 'government compliance, GASB, state regulations, financial management',
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
