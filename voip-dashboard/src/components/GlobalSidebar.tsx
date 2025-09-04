"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  XMarkIcon,
  HomeIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PhoneIcon,
  UserGroupIcon,
  DocumentTextIcon,
  BellIcon
} from '@heroicons/react/24/outline'

interface GlobalSidebarProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

export function GlobalSidebar({ isOpen, onClose }: GlobalSidebarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const navigationItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Call Center', href: '/dashboard', icon: PhoneIcon },
    { name: 'Team', href: '#', icon: UserGroupIcon },
    { name: 'Reports', href: '#', icon: DocumentTextIcon },
    { name: 'Notifications', href: '#', icon: BellIcon },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black bg-opacity-50 sidebar-overlay"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onClose()
            }
          }}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-figma-white shadow-strong sidebar-container transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-figma-blue to-figma-green rounded-xl flex items-center justify-center">
              <PhoneIcon className="h-6 w-6 text-white" />
            </div>
            <div className="font-bold text-xl text-figma-dark">Zyra VoIP</div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-figma-grayLight transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-figma-gray" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-figma-gray hover:text-figma-blue hover:bg-figma-blueLight rounded-xl transition-all duration-200 group"
                    onClick={() => {
                      // Close sidebar when navigating
                      onClose()
                    }}
                  >
                    <Icon className="h-5 w-5 group-hover:text-figma-blue transition-colors" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 bg-figma-grayLight rounded-xl">
            <div className="w-8 h-8 bg-figma-blue rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-figma-dark truncate">User Account</p>
              <p className="text-xs text-figma-gray truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}