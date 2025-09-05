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

  // Determine if we should show the global header and sidebar
  // For the home page, we'll use its own header, but still show sidebar
  const isHomePage = pathname === '/'
  const showGlobalHeader = !isHomePage

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Global Sidebar */}
      <GlobalSidebar isOpen={isOpen} onClose={closeSidebar} />
      
      {/* Main Content Area */}
      <div>
        {/* Global Header - only show on non-home pages */}
        {showGlobalHeader && (
          <GlobalHeader 
            onMenuClick={toggleSidebar} 
            title="VoIP"
            showCompanyInfo={pathname === '/dashboard'}
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