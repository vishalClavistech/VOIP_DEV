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
        <div className="dropdown-content z-50 w-80 bg-white rounded-box shadow-xl border border-gray-200">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900">Act!</h3>
          </div>

          {/* Company List */}
          <div className="py-2">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanySelect(company)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-100 transition-colors ${
                  selectedCompany.id === company.id ? 'bg-blue-50' : ''
                }`}
              >
                {/* Company Icon */}
                <div className="avatar placeholder">
                  <div className="bg-green-500 text-white rounded-lg w-8">
                    <UserCircleIcon className="h-5 w-5" />
                  </div>
                </div>
                
                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {company.name}
                  </div>
                  {company.subtitle && (
                    <div className="text-xs text-gray-500 truncate">
                      {company.subtitle}
                    </div>
                  )}
                </div>

                {/* Chevron */}
                <ChevronDownIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-3 border-t border-gray-200">
            <button className="btn btn-primary w-full">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}