"use client"

import { useState, useRef, useEffect } from 'react'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline'

interface Company {
  id: string
  name: string
  subtitle?: string
}

interface CompanyDropdownProps {
  readonly companies: Company[]
  readonly selectedCompany: Company
  readonly onCompanyChange: (company: Company) => void
}

export function CompanyDropdown({ companies, selectedCompany, onCompanyChange }: CompanyDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleCompanySelect = (company: Company) => {
    onCompanyChange(company)
    setIsOpen(false)
  }

  return (
    <div className="dropdown dropdown-end" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button 
        className="btn btn-ghost"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen(!isOpen)
          }
        }}
      >
        <span className="text-sm">{selectedCompany.name}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="dropdown-content z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden" style={{ 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          {/* Header Section - User Name */}
          <div className="px-6 py-4">
            <h3 className="text-purple-600 text-2xl font-bold">Nirbhay Dev</h3>
          </div>
          
          {/* My Profile Section */}
          <div className="px-6 py-4">
            <button
              onClick={() => handleCompanySelect(selectedCompany)}
              className="w-full flex items-center gap-4 transition-colors"
            >
              {/* Profile Icon */}
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <UserCircleIcon className="h-4 w-4 text-white" />
              </div>
              
              {/* Profile Info */}
              <div className="flex-1 text-left">
                <div className="text-gray-900 font-medium">My Profile</div>
                <div className="text-gray-500 text-sm">Account settings and more</div>
              </div>

              {/* Right Arrow */}
              <ChevronDownIcon className="h-4 w-4 text-gray-400 rotate-[-90deg]" />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Sign Out Button */}
          <div className="px-6 py-4">
            <button className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-medium rounded-lg transition-all duration-200">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}