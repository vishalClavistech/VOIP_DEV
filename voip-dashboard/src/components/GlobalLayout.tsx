"use client"

import { usePathname } from 'next/navigation'
import { useSidebar } from '@/contexts/SidebarContext'
import { GlobalHeader } from './GlobalHeader'
import { GlobalSidebar } from './GlobalSidebar'

interface GlobalLayoutProps {
  readonly children: React.ReactNode
}

export function GlobalLayout({ children }: GlobalLayoutProps) {
  const pathname = usePathname()
  const { isOpen, toggleSidebar, closeSidebar } = useSidebar()

  // Show global header and sidebar on all pages except home landing page
  const isHomeLandingPage = pathname === '/home'
  const showGlobalHeader = !isHomeLandingPage

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Global Sidebar */}
      <GlobalSidebar isOpen={isOpen} onClose={closeSidebar} />
      
      {/* Main Content Area */}
      <div>
        {/* Global Header - show on all pages except home landing */}
        {showGlobalHeader && (
          <GlobalHeader 
            onMenuClick={toggleSidebar} 
            title="VoIP"
            showCompanyInfo={pathname === '/'}
          />
        )}
        
        {/* Page Content */}
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}