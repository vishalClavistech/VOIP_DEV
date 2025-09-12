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
    <header className="navbar bg-gradient-to-r from-primary-500 to-success-500 text-white">
      <div className="navbar-start">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className="btn btn-ghost btn-square hover:bg-transparent"
          aria-label="Open menu"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        
        {/* Logo and Title */}
        <div className="ml-4">
          <div className="text-2xl font-bold">{title}</div>
        </div>
      </div>
      
      {/* Right side actions */}
      <div className="navbar-end">
        {showCompanyInfo && (
          <CompanyDropdown
            companies={companies}
            selectedCompany={selectedCompany}
            onCompanyChange={handleCompanyChange}
          />
        )}
      </div>
    </header>
  )
}