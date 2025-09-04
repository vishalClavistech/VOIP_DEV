import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { GlobalLayout } from '@/components/GlobalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VoIP Dashboard',
  description: 'Sample VoIP dashboard with Next.js, Tailwind, and Zod',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </SidebarProvider>
      </body>
    </html>
  )
}