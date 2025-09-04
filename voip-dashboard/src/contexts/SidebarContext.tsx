"use client"

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'

interface SidebarContextType {
  isOpen: boolean
  toggleSidebar: () => void
  openSidebar: () => void
  closeSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { readonly children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  // Handle escape key to close sidebar and body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    // Prevent body scroll when sidebar is open
    if (isOpen) {
      document.body.classList.add('sidebar-open')
    } else {
      document.body.classList.remove('sidebar-open')
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.classList.remove('sidebar-open')
    }
  }, [isOpen])

  const toggleSidebar = () => setIsOpen(prev => !prev)
  const openSidebar = () => setIsOpen(true)
  const closeSidebar = () => setIsOpen(false)

  const contextValue = useMemo(() => ({
    isOpen,
    toggleSidebar,
    openSidebar,
    closeSidebar
  }), [isOpen])

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}