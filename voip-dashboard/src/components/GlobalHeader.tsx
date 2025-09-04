"use client"

import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { CompanyDropdown } from './CompanyDropdown'

interface Company {
  id: string
  name: string
  subtitle?: string
}

interface GlobalHeaderProps {
  readonly onMenuClick: () => void
  readonly title?: string
  readonly showCompanyInfo?: boolean
}

export function GlobalHeader({ onMenuClick, title = "VoIP Dashboard", showCompanyInfo = false }: GlobalHeaderProps) {
  const [selectedCompany, setSelectedCompany] = useState<Company>({
    id: '1',
    name: 'Roman Electric, Plumbing, Heating & Cooling',
    subtitle: 'Account settings and more'
  })

  const companies: Company[] = [
    {
      id: '1',
      name: 'Roman Electric, Plumbing, Heating & Cooling',
      subtitle: 'Account settings and more'
    },
    {
      id: '2',
      name: 'ABC Construction',
      subtitle: 'Construction services'
    },
    {
      id: '3',
      name: 'XYZ Plumbing',
      subtitle: 'Plumbing solutions'
    }
  ]

  const handleCompanyChange = (company: Company) => {
    setSelectedCompany(company)
  }
  return (
    <header className="bg-gradient-to-r from-figma-blue to-figma-green text-figma-white">
      <div className="mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open menu"
            >
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
            
            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold">{title}</div>
            </div>
          </div>
          
          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {showCompanyInfo && (
              <CompanyDropdown
                companies={companies}
                selectedCompany={selectedCompany}
                onCompanyChange={handleCompanyChange}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}