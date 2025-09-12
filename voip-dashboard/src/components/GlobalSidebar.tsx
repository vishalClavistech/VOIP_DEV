"use client"

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
  const navigationItems = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Dashboard', href: '/', icon: ChartBarIcon },
    { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
    { name: 'Call Center', href: '/', icon: PhoneIcon },
    { name: 'Team', href: '#', icon: UserGroupIcon },
    { name: 'Reports', href: '#', icon: DocumentTextIcon },
    { name: 'Notifications', href: '#', icon: BellIcon },
  ]

  return (
    <>
      {/* Overlay - only show when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar - hidden by default, slides in when open */}
      <div className={`
        fixed top-0 left-0 z-50 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <PhoneIcon className="h-6 w-6 text-white" />
            </div>
            <div className="font-bold text-xl text-gray-900">Zyra VoIP</div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm hover:bg-transparent"
            aria-label="Close sidebar"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="menu w-full">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 hover:bg-transparent"
                    onClick={() => {
                      // Close sidebar when navigating
                      onClose()
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl">
            <div className="avatar placeholder">
              <div className="bg-blue-500 text-white rounded-lg w-8">
                <span className="text-sm font-medium">U</span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">User Account</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}