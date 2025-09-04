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
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-label="Select company"
      >
        <span>{selectedCompany.name}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-strong border border-gray-200 z-50">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-figma-dark">Act!</h3>
          </div>

          {/* Company List */}
          <div className="py-2">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => handleCompanySelect(company)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-figma-grayLight transition-colors ${
                  selectedCompany.id === company.id ? 'bg-figma-blueLight' : ''
                }`}
              >
                {/* Company Icon */}
                <div className="w-8 h-8 bg-figma-green rounded-lg flex items-center justify-center flex-shrink-0">
                  <UserCircleIcon className="h-5 w-5 text-white" />
                </div>
                
                {/* Company Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-figma-dark truncate">
                    {company.name}
                  </div>
                  {company.subtitle && (
                    <div className="text-xs text-figma-gray truncate">
                      {company.subtitle}
                    </div>
                  )}
                </div>

                {/* Chevron */}
                <ChevronDownIcon className="h-4 w-4 text-figma-gray flex-shrink-0" />
              </button>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="px-4 py-3 border-t border-gray-200">
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors">
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}