# VoIP Dashboard - Complete Execution Flow Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Configuration Files & Execution Order](#configuration-files--execution-order)
4. [Build System & Development Process](#build-system--development-process)
5. [Next.js App Router Flow](#nextjs-app-router-flow)
6. [Component Lifecycle & State Management](#component-lifecycle--state-management)
7. [Data Flow & Dependencies](#data-flow--dependencies)
8. [Styling System Execution](#styling-system-execution)
9. [User Interaction Flow](#user-interaction-flow)
10. [Performance Considerations](#performance-considerations)
11. [Troubleshooting & Debugging](#troubleshooting--debugging)
12. [Production Deployment Flow](#production-deployment-flow)

---

## Project Overview

The VoIP Dashboard is a modern call center interface built with:
- **Framework**: Next.js 14.2.5 (App Router)
- **Language**: TypeScript 5.5.4
- **Styling**: Tailwind CSS 3.4.7 + DaisyUI 5.1.7
- **Validation**: Zod 3.23.8
- **Icons**: Heroicons 2.1.5
- **Package Manager**: pnpm

### Key Features
- **Global Navigation System**
  - DaisyUI drawer component for sidebar navigation
  - Menu button in header for sidebar toggle
  - Company dropdown with multi-company support
  - Responsive design (drawer on all screen sizes)
- **Call Management**
  - Real-time call statistics dashboard
  - Searchable call logs with filtering
  - Active call management panel
  - Incoming call notifications
  - Call modal for detailed call management
- **User Interface**
  - DaisyUI component library integration
  - Custom VoIP theme with brand colors
  - Form validation with Zod schemas
  - Responsive design with Tailwind CSS + DaisyUI
  - Smooth animations and transitions
  - Context-based state management
  - Accessible components with ARIA support

---

## System Architecture

### File Structure
```
voip-dashboard/
├── Configuration Layer
│   ├── package.json          # Dependencies & scripts
│   ├── next.config.mjs       # Next.js configuration
│   ├── tsconfig.json         # TypeScript configuration
│   ├── tailwind.config.ts    # Tailwind CSS configuration
│   ├── postcss.config.mjs    # PostCSS configuration
│   └── next-env.d.ts         # Next.js TypeScript definitions
├── Application Layer
│   └── src/
│       ├── app/              # Next.js App Router
│       │   ├── layout.tsx    # Root layout with SidebarProvider
│       │   ├── page.tsx      # Homepage with menu button
│       │   ├── globals.css   # Global styles + sidebar animations
│       │   ├── dashboard/
│       │   │   └── page.tsx  # Dashboard page
│       │   └── settings/
│       │       └── page.tsx  # Settings page
│       ├── components/       # React components
│       │   ├── CallCenter.tsx           # Main dashboard component
│       │   ├── GlobalLayout.tsx         # Global layout wrapper
│       │   ├── GlobalHeader.tsx         # Global header with menu
│       │   ├── GlobalSidebar.tsx        # Global sidebar drawer
│       │   ├── CompanyDropdown.tsx      # Company selection dropdown
│       │   ├── CallModal.tsx            # Call management modal
│       │   ├── Modal.tsx                # Base modal component
│       │   ├── VoipSettings.tsx         # VoIP settings component
│       │   ├── active-call/
│       │   │   └── ActiveCallPanel.tsx  # Active call management
│       │   └── incoming/
│       │       └── IncomingCallToast.tsx # Incoming call notifications
│       ├── contexts/         # React Context providers
│       │   └── SidebarContext.tsx       # Global sidebar state management
│       └── lib/              # Utilities & data
│           ├── types.ts      # TypeScript types
│           ├── schemas.ts    # Zod validation schemas
│           ├── mock.ts       # Mock data
│           └── utils.ts      # Utility functions
```

---

## Configuration Files & Execution Order

### 1. package.json (Entry Point)
```json
{
  "name": "voip-dashboard",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build", 
    "start": "next start",
    "lint": "next lint"
  }
}
```

**Execution Role**: 
- Defines project metadata
- Specifies dependencies and versions
- Provides npm/pnpm scripts for development workflow
- Sets module type to ESM (`"type": "module"`)

### 2. next.config.mjs (Next.js Configuration)
```javascript
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: false
  }
}
export default nextConfig
```

**Execution Role**:
- Configures Next.js behavior
- Enables React Strict Mode for development
- Disables experimental instrumentation hook
- Uses ESM export syntax

### 3. tsconfig.json (TypeScript Configuration)
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Execution Role**:
- Configures TypeScript compiler
- Sets up path aliases (`@/*` → `./src/*`)
- Enables strict type checking
- Configures JSX preservation for Next.js
- Sets up module resolution for bundler

### 4. tailwind.config.ts (Tailwind CSS Configuration)
```typescript
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1864ab',
          50: '#e7f5ff',
          100: '#d0ebff',
          // ... brand color palette
        }
      },
      boxShadow: {
        card: '0 8px 30px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
} satisfies Config
```

**Execution Role**:
- Defines content paths for CSS purging
- Extends default theme with custom colors
- Adds custom box shadows
- Configures Tailwind CSS processing

### 5. postcss.config.mjs (PostCSS Configuration)
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**Execution Role**:
- Configures PostCSS plugins
- Integrates Tailwind CSS processing
- Adds autoprefixer for vendor prefixes
- Processes CSS transformations

### 6. next-env.d.ts (Next.js TypeScript Definitions)
```typescript
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

**Execution Role**:
- Provides Next.js TypeScript definitions
- Enables type checking for Next.js features
- Auto-generated file (should not be edited)

### 7. DaisyUI Configuration (tailwind.config.ts)
```typescript
plugins: [require('daisyui')],
daisyui: {
  themes: [
    {
      voip: {
        "primary": "#3B82F6",
        "secondary": "#10B981", 
        "accent": "#F59E0B",
        "neutral": "#6B7280",
        "base-100": "#FFFFFF",
        "base-200": "#F9FAFB",
        "base-300": "#F3F4F6",
        "info": "#3B82F6",
        "success": "#10B981",
        "warning": "#F59E0B",
        "error": "#EF4444",
      },
    },
    "light",
    "dark",
  ],
  darkTheme: "dark",
  base: true,
  styled: true,
  utils: true,
  prefix: "",
  logs: true,
  themeRoot: ":root",
},
```

**Execution Role**:
- Configures DaisyUI component library
- Defines custom VoIP theme with brand colors
- Enables multiple theme support (light/dark)
- Provides consistent design system
- Auto-generates component styles

---

## Build System & Development Process

### Development Server Startup Sequence

#### Step 1: Command Execution
```bash
pnpm dev
# Executes: next dev
```

#### Step 2: Configuration Loading (0-50ms)
```
1. package.json loads → Dependencies resolved
2. next.config.mjs loads → Next.js configuration applied
3. tsconfig.json loads → TypeScript compiler initialized
4. tailwind.config.ts loads → Tailwind CSS processor initialized
5. postcss.config.mjs loads → PostCSS plugins configured
6. next-env.d.ts loads → TypeScript definitions available
```

#### Step 3: Build System Initialization (50-100ms)
```
1. TypeScript compiler starts
2. Tailwind CSS processor initializes
3. PostCSS processes CSS files
4. Next.js App Router system loads
5. Development server starts on port 3000
6. Hot Module Replacement (HMR) enabled
```

#### Step 4: File System Watching (100ms+)
```
1. File watchers established for:
   - src/**/*.{js,ts,jsx,tsx}
   - Configuration files
   - CSS files
2. HMR ready for live updates
3. Server ready to accept requests
```

---

## Next.js App Router Flow

### Route Resolution Mechanism

#### File-Based Routing Structure
```
src/app/
├── layout.tsx           # Root layout (executes for ALL routes)
├── page.tsx            # Homepage route (/)
├── globals.css         # Global styles (imported by layout.tsx)
├── dashboard/
│   └── page.tsx        # Dashboard route (/dashboard)
└── settings/
    └── page.tsx        # Settings route (/settings)
```

#### Route Matching Logic
```
User Request → Next.js App Router → File Resolution

/ → src/app/page.tsx
/dashboard → src/app/dashboard/page.tsx
/settings → src/app/settings/page.tsx
/unknown → 404 page (not-found.tsx if exists)
```

### Layout System Execution

#### Root Layout (layout.tsx) - ALWAYS EXECUTES FIRST
```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { GlobalLayout } from '@/components/GlobalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VoIP Dashboard',
  description: 'Sample VoIP dashboard with Next.js, Tailwind, and Zod',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </SidebarProvider>
      </body>
    </html>
  )
}
```

**Execution Flow**:
1. **Import Resolution**: `globals.css`, Inter font, SidebarProvider, and GlobalLayout load
2. **Metadata Generation**: SEO metadata created
3. **HTML Structure**: Base HTML structure renders
4. **Context Provider**: SidebarProvider wraps the entire app for global state
5. **Global Layout**: GlobalLayout provides sidebar and header structure
6. **Children Placeholder**: `{children}` waits for route content
7. **Font Application**: Inter font applied to body

#### Route-Specific Pages

##### Homepage (/)
```typescript
// src/app/page.tsx
"use client"

import Link from 'next/link'
import { PhoneIcon, Cog6ToothIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useSidebar } from '@/contexts/SidebarContext'

export default function HomePage() {
  const { toggleSidebar } = useSidebar()

  return (
    <main className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Modern Header with Menu Button */}
      <header className="header">
        <div className="mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Menu Button for Home Page */}
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-lg hover:bg-figma-grayLight transition-colors"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6 text-figma-gray" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-white" />
                </div>
                <div className="font-bold text-xl text-secondary-900">Zyra VoIP</div>
              </div>
              {/* Navigation and CTA buttons */}
            </div>
          </div>
        </div>
      </header>
      {/* Hero section and other content */}
    </main>
  )
}
```

**Execution Flow**:
1. **Client Component**: `"use client"` directive enables client-side features
2. **Context Access**: useSidebar hook accesses global sidebar state
3. **Menu Button**: Toggle button for sidebar drawer
4. **Header Rendering**: Custom header with branding and navigation
5. **Content Rendering**: Hero section and other homepage content

##### Dashboard (/dashboard)
```typescript
// src/app/dashboard/page.tsx
"use client"

import { useMemo, useState } from 'react'
import { CallCenter } from '@/components/CallCenter'
import { callsMock } from '@/lib/mock'
import { CallRecord } from '@/lib/types'

export default function DashboardPage() {
  // State initialization
  const [query, setQuery] = useState('')
  const [data] = useState<CallRecord[]>(callsMock)
  
  // Statistics calculation
  const stats = useMemo(() => {
    const total = data.length
    const completed = data.filter((c) => c.status === 'completed').length
    const missed = data.filter((c) => c.status === 'missed').length
    const voicemail = data.filter((c) => c.hasVoicemail).length
    const active = data.filter((c) => c.status === 'active').length
    return { total, completed, missed, voicemail, active }
  }, [data])
  
  // Search filtering
  const filtered = useMemo(() => {
    if (!query.trim()) return data
    const q = query.toLowerCase()
    return data.filter((c) =>
      [c.fromNumber, c.contactName ?? '', c.direction, c.summary ?? '']
        .some((f) => f?.toLowerCase().includes(q))
    )
  }, [data, query])
  
  return (
    <CallCenter
      stats={stats}
      query={query}
      setQuery={setQuery}
      rows={filtered}
    />
  )
}
```

**Execution Flow**:
1. **Client Component**: `"use client"` directive enables client-side features
2. **Import Resolution**: Components and utilities load
3. **State Initialization**: useState hooks initialize
4. **Memoization**: useMemo hooks calculate derived state
5. **Component Rendering**: CallCenter component renders with props

---

## Global Layout System

### GlobalLayout Component Execution

#### GlobalLayout.tsx - Layout Wrapper
```typescript
// src/components/GlobalLayout.tsx
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
  const isHomePage = pathname === '/'
  const showGlobalHeader = !isHomePage

  return (
    <div className="min-h-screen bg-figma-grayLight">
      {/* Global Sidebar */}
      <GlobalSidebar isOpen={isOpen} onClose={closeSidebar} />
      
      {/* Main Content Area */}
      <div className="w-full">
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
```

**Execution Flow**:
1. **Path Detection**: usePathname determines current route
2. **Context Access**: useSidebar accesses global sidebar state
3. **Conditional Logic**: Determines header visibility based on route
4. **Sidebar Rendering**: GlobalSidebar renders with state
5. **Header Rendering**: GlobalHeader renders conditionally
6. **Content Wrapping**: Children content renders in main element

### SidebarContext - Global State Management

#### SidebarContext.tsx - Context Provider
```typescript
// src/contexts/SidebarContext.tsx
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
```

**Execution Flow**:
1. **State Initialization**: isOpen state starts as false
2. **Effect Setup**: Keyboard and body scroll management
3. **Function Creation**: Toggle, open, close functions
4. **Memoization**: Context value memoized for performance
5. **Provider Rendering**: Context provided to all children

### GlobalSidebar Component - Drawer Implementation

#### GlobalSidebar.tsx - Sidebar Drawer
```typescript
// src/components/GlobalSidebar.tsx
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
        {/* Header with close button */}
        {/* Navigation items */}
        {/* Footer with user profile */}
      </div>
    </>
  )
}
```

**Execution Flow**:
1. **Mount Check**: Ensures component is mounted before rendering
2. **Overlay Rendering**: Dark backdrop when sidebar is open
3. **Sidebar Positioning**: Fixed position with transform animations
4. **Navigation Items**: Dynamic list of navigation options
5. **Accessibility**: Keyboard navigation and ARIA labels

### CompanyDropdown Component - Company Selection

#### CompanyDropdown.tsx - Company Dropdown
```typescript
// src/components/CompanyDropdown.tsx
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
          {/* Header with "Act!" title */}
          {/* Company list with icons and subtitles */}
          {/* Footer with Sign Out button */}
        </div>
      )}
    </div>
  )
}
```

**Execution Flow**:
1. **State Management**: Local dropdown open/close state
2. **Click Outside**: Event listener for closing dropdown
3. **Company Selection**: Handles company change and closes dropdown
4. **Animation**: Chevron rotation on open/close
5. **Positioning**: Absolute positioning with proper z-index

---

## DaisyUI Component Integration

### Component Mapping

#### Custom Components → DaisyUI Components
```
GlobalSidebar → drawer + drawer-side + menu
GlobalHeader → navbar + navbar-start + navbar-end
CompanyDropdown → dropdown + dropdown-content
CallCenter Tabs → tabs + tab + tab-bordered
Search Input → input + input-group + form-control
Call Logs Table → table + table-zebra
Buttons → btn + btn-primary + btn-ghost
Cards → card + card-body + shadow-xl
Badges → badge + badge-primary
Checkboxes → checkbox + checkbox-sm
```

#### Theme Integration
```typescript
// Custom VoIP theme applied via data-theme="voip"
<html lang="en" data-theme="voip">

// DaisyUI semantic color classes
className="bg-primary text-primary-content"     // Primary brand color
className="bg-secondary text-secondary-content" // Secondary brand color
className="bg-base-100 text-base-content"       // Main background/text
className="bg-base-200 text-base-content/70"    // Secondary background/text
className="btn btn-primary"                     // Primary button
className="input input-bordered"                // Bordered input
className="card bg-base-100 shadow-xl"          // Card component
```

### Accessibility Features
- **ARIA Support**: All DaisyUI components include proper ARIA attributes
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Focus Management**: Proper focus indicators and management
- **Screen Reader**: Compatible with screen readers and assistive technologies
- **Color Contrast**: Meets WCAG accessibility standards

### Performance Benefits
- **Smaller Bundle**: DaisyUI components are optimized and tree-shakeable
- **Consistent Styling**: Reduces CSS bundle size by eliminating custom styles
- **Theme Switching**: Built-in theme switching without JavaScript
- **Responsive Design**: Mobile-first responsive components
- **Browser Support**: Works across all modern browsers

---

## Component Lifecycle & State Management

### React Component Lifecycle Phases

#### 1. Mount Phase (Initial Render)

##### DashboardPage Mount Sequence
```typescript
// 1. Function Component executes
export default function DashboardPage() {
  
  // 2. useState hooks initialize (in declaration order)
  const [query, setQuery] = useState('')           // query = ''
  const [data] = useState<CallRecord[]>(callsMock) // data = mock data
  
  // 3. useMemo hooks calculate (in declaration order)
  const stats = useMemo(() => {
    // Calculates: total, completed, missed, voicemail, active
    return { total, completed, missed, voicemail, active }
  }, [data]) // Dependency: data
  
  const filtered = useMemo(() => {
    // Filters data based on query
    return data.filter(/* search logic */)
  }, [data, query]) // Dependencies: data, query
  
  // 4. JSX renders
  return <CallCenter {...props} />
}
```

**Mount Timeline**:
```
0ms:   Function component executes
10ms:  useState('') initializes query state
20ms:  useState(callsMock) initializes data state
30ms:  useMemo calculates stats (depends on data)
40ms:  useMemo calculates filtered (depends on data, query)
50ms:  JSX renders CallCenter component
60ms:  CallCenter component mounts
70ms:  DOM updates
```

#### 2. Update Phase (Re-renders)

##### State Update Flow
```typescript
// User types in search box:
// 1. onChange event fires
// 2. setQuery('new value') called
// 3. Component re-renders
// 4. query state updates
// 5. filtered useMemo recalculates (because query dependency changed)
// 6. CallCenter receives new props
// 7. CallCenter re-renders with filtered data
```

**Update Timeline**:
```
0ms:   User types in search input
10ms:  onChange event fires
20ms:  setQuery('new value') called
30ms:  Component function re-executes
40ms:  useState returns current values
50ms:  useMemo recalculates filtered (query dependency changed)
60ms:  JSX re-renders
70ms:  CallCenter receives new props
80ms:  CallCenter re-renders
90ms:  DOM updates with filtered data
```

#### 3. Unmount Phase (Cleanup)
```typescript
// When navigating away from dashboard:
// 1. Component unmounts
// 2. State is destroyed
// 3. Event listeners cleaned up
// 4. DOM nodes removed
```

### CallCenter Component Lifecycle

#### Mount Phase
```typescript
// src/components/CallCenter.tsx
export function CallCenter({ stats, query, setQuery, rows }: Props) {
  // 1. State initialization
  const [showActive, setShowActive] = useState(true)   // Active panel visible
  const [incoming, setIncoming] = useState(false)      // No incoming call
  
  // 2. JSX renders
  return (
    <main className="min-h-screen">
      {/* Header */}
      {/* Statistics cards */}
      {/* Search input */}
      {/* Call records table */}
      {/* Conditional components */}
      {showActive && <ActiveCallPanel onClose={() => setShowActive(false)} />}
      {incoming && <IncomingCallToast onClose={() => setIncoming(false)} />}
    </main>
  )
}
```

#### Update Phase
```typescript
// When user interacts:
// 1. Search input changes → setQuery called → parent re-renders → new rows prop
// 2. Toggle incoming button → setIncoming(true) → IncomingCallToast renders
// 3. Close active panel → setShowActive(false) → ActiveCallPanel unmounts
```

### Child Component Lifecycles

#### ActiveCallPanel Lifecycle
```typescript
// src/components/active-call/ActiveCallPanel.tsx
export function ActiveCallPanel({ onClose }: Props) {
  // 1. State initialization (when component mounts)
  const [muted, setMuted] = useState(false)
  const [hold, setHold] = useState(false)
  const [notes, setNotes] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  
  // 2. Event handlers
  function saveNotes() {
    // Validation with Zod
    const parse = CallNoteSchema.safeParse(payload)
    if (!parse.success) {
      setError(parse.error.issues[0]?.message ?? 'Invalid form')
      return
    }
    alert('Saved!')
  }
  
  // 3. JSX renders
  return <div className="fixed right-6 top-6 bottom-6 z-40 w-[420px]">...</div>
}
```

#### IncomingCallToast Lifecycle
```typescript
// src/components/incoming/IncomingCallToast.tsx
export function IncomingCallToast({ onClose }: Props) {
  // 1. Component mounts (when incoming state becomes true)
  // 2. JSX renders immediately
  return (
    <div className="fixed left-6 bottom-6 z-50">
      {/* Call notification UI */}
    </div>
  )
  
  // 3. Component unmounts (when onClose called)
}
```

---

## Data Flow & Dependencies

### Data Loading & Processing

#### 1. Mock Data Loading
```typescript
// src/lib/mock.ts
import { CallRecord } from './types'

export const callsMock: CallRecord[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    fromNumber: '(414) 334 7441',
    contactName: 'Joe Smith',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Billing question'
  },
  // ... more mock data
]
```

#### 2. Type Definitions
```typescript
// src/lib/types.ts
export type CallDirection = 'inbound' | 'outbound'
export type CallStatus = 'active' | 'completed' | 'missed'

export type CallRecord = {
  id: string
  date: string
  fromNumber: string
  contactName?: string
  hasVoicemail: boolean
  direction: CallDirection
  status: CallStatus
  summary?: string
}

export type CallStats = {
  total: number
  completed: number
  missed: number
  voicemail: number
  active: number
}
```

#### 3. Validation Schemas
```typescript
// src/lib/schemas.ts
import { z } from 'zod'

export const PhoneNumberSchema = z.string().trim().regex(/^[0-9\-()+\s]{7,20}$/i, 'Invalid phone number')

export const CallNoteSchema = z.object({
  text: z.string().trim().min(1, 'Note is required').max(2000, 'Note is too long'),
  tags: z.array(z.string().trim().min(1)).max(20).default([])
})

export const SettingsSchema = z.object({
  ringtone: z.string().min(1).default('classic'),
  notifications: z.boolean().default(true),
  internalExtension: z.string().trim().min(2).max(8)
})
```

#### 4. Utility Functions
```typescript
// src/lib/utils.ts
export function formatDateTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString(undefined, {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
```

### Data Flow Architecture

#### 1. Data Initialization
```
Mock Data → DashboardPage State → Statistics Calculation → CallCenter Props
```

#### 2. Search & Filtering Flow
```
User Input → setQuery → useMemo Recalculation → Filtered Data → CallCenter Re-render
```

#### 3. Form Validation Flow
```
User Input → Zod Schema Validation → Error State → UI Feedback
```

---

## Styling System Execution

### Tailwind CSS Processing

#### 1. CSS Generation
```
Tailwind Config → Content Scanning → CSS Generation → PostCSS Processing → Final CSS
```

#### 2. Global Styles
```css
/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* App globals */
:root {
  --bg: 247 248 250;
}

html, body, #__next {
  height: 100%;
}

body {
  @apply bg-slate-50 text-slate-900 antialiased;
}

.card {
  @apply rounded-xl bg-white shadow-card border border-slate-200;
}

.btn {
  @apply inline-flex items-center justify-center rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-primary {
  @apply btn bg-brand-600 text-white hover:bg-brand-700;
}

.btn-ghost {
  @apply btn bg-transparent hover:bg-slate-100;
}
```

#### 3. Component-Specific Styles
```typescript
// Tailwind classes applied directly in components
<div className="min-h-screen bg-gradient-to-r from-brand-700 to-brand-500">
  <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
    {/* Component styles */}
  </div>
</div>
```

### PostCSS Processing Pipeline

#### 1. CSS Processing Order
```
1. Tailwind CSS directives (@tailwind base, components, utilities)
2. Custom CSS rules
3. Tailwind CSS processing (class generation)
4. Autoprefixer (vendor prefixes)
5. Final CSS output
```

#### 2. Build-Time Optimizations
```
1. CSS purging (unused classes removed)
2. Vendor prefix addition
3. CSS minification (production)
4. Source map generation (development)
```

---

## User Interaction Flow

### Interactive State Changes

#### 1. Search Functionality
```typescript
// User types in search box:
// 1. onChange event fires
// 2. setQuery(newValue) called
// 3. DashboardPage re-renders
// 4. filtered useMemo recalculates
// 5. CallCenter receives new rows prop
// 6. Table re-renders with filtered data
```

#### 2. Call Management
```typescript
// User clicks "Toggle Incoming":
// 1. onClick event fires
// 2. setIncoming(prev => !prev) called
// 3. CallCenter re-renders
// 4. IncomingCallToast conditionally renders/unmounts
```

#### 3. Form Validation
```typescript
// User submits call notes:
// 1. saveNotes function executes
// 2. Zod schema validation runs
// 3. Error state updates (if validation fails)
// 4. Success feedback (if validation passes)
```

### Event Handling Flow

#### 1. Event Propagation
```
DOM Event → React SyntheticEvent → Event Handler → State Update → Re-render
```

#### 2. State Update Chain
```
User Action → Event Handler → State Setter → Component Re-render → Child Props Update → Child Re-render
```

---

## Performance Considerations

### Optimization Strategies

#### 1. Memoization
```typescript
// useMemo for expensive calculations
const stats = useMemo(() => {
  // Expensive statistics calculation
  return calculateStats(data)
}, [data]) // Only recalculates when data changes

const filtered = useMemo(() => {
  // Expensive filtering operation
  return data.filter(/* search logic */)
}, [data, query]) // Only recalculates when data or query changes
```

#### 2. Component Splitting
```typescript
// Conditional rendering to avoid unnecessary mounts
{showActive && <ActiveCallPanel onClose={() => setShowActive(false)} />}
{incoming && <IncomingCallToast onClose={() => setIncoming(false)} />}
```

#### 3. CSS Optimization
```typescript
// Tailwind CSS purging removes unused styles
// PostCSS autoprefixer adds vendor prefixes
// CSS minification in production builds
```

### Memory Management

#### 1. State Cleanup
```typescript
// Components automatically clean up state when unmounted
// Event listeners are cleaned up by React
// DOM nodes are removed from memory
```

#### 2. Event Listener Management
```typescript
// React SyntheticEvent system manages event listeners
// No manual cleanup required for most cases
// useEffect cleanup for custom event listeners
```

---

## Troubleshooting & Debugging

### Common Issues & Solutions

#### 1. Build Errors
```bash
# TypeScript errors
pnpm run lint

# Build errors
pnpm run build

# Development server issues
pnpm dev
```

#### 2. Component State Issues
```typescript
// Debug state changes
console.log('State update:', { query, data, stats, filtered })

// Debug component re-renders
console.log('Component re-rendered:', { props, state })
```

#### 3. Styling Issues
```bash
# Check Tailwind CSS generation
# Verify content paths in tailwind.config.ts
# Check PostCSS configuration
```

#### 4. Route Issues
```typescript
// Check file structure matches expected routes
// Verify layout.tsx exists in app directory
// Check page.tsx files in route directories
```

### Debugging Tools

#### 1. React Developer Tools
```
- Component tree inspection
- State and props debugging
- Performance profiling
```

#### 2. Next.js Development Tools
```
- Hot Module Replacement status
- Build error reporting
- Route information
```

#### 3. Browser Developer Tools
```
- Network tab for resource loading
- Console for JavaScript errors
- Elements tab for DOM inspection
```

---

## Production Deployment Flow

### Build Process

#### 1. Production Build
```bash
pnpm run build
```

**Build Steps**:
```
1. TypeScript compilation
2. Next.js optimization
3. CSS processing and minification
4. JavaScript bundling and minification
5. Static asset optimization
6. Build output generation
```

#### 2. Production Server
```bash
pnpm start
```

**Server Features**:
```
1. Optimized JavaScript bundles
2. Minified CSS
3. Static asset serving
4. Server-side rendering
5. Performance optimizations
```

### Deployment Considerations

#### 1. Environment Variables
```bash
# Production environment variables
NODE_ENV=production
PORT=3000
```

#### 2. Static Asset Optimization
```
1. Image optimization
2. CSS minification
3. JavaScript bundling
4. Gzip compression
```

#### 3. Performance Monitoring
```
1. Bundle size analysis
2. Performance metrics
3. Error tracking
4. User experience monitoring
```

---

## Complete Execution Timeline

### Development Server Startup (0-250ms)
```
0ms:    pnpm dev command executed
10ms:   package.json loads and dependencies resolved
20ms:   next.config.mjs loads and configuration applied
30ms:   tsconfig.json loads and TypeScript compiler initialized
40ms:   tailwind.config.ts loads and CSS processor initialized (includes purple colors)
50ms:   postcss.config.mjs loads and PostCSS plugins configured
60ms:   next-env.d.ts loads and TypeScript definitions available
70ms:   Development server starts on port 3000
80ms:   File watchers established for hot reloading
90ms:   Server ready to accept requests
100ms:  User visits /dashboard
110ms:  Next.js App Router resolves route
120ms:  layout.tsx executes (root layout with SidebarProvider)
130ms:  globals.css loads and applies styles (includes sidebar animations)
140ms:  SidebarContext initializes with isOpen=false
150ms:  GlobalLayout component mounts
160ms:  GlobalHeader component mounts (with CompanyDropdown)
170ms:  GlobalSidebar component mounts (hidden initially)
180ms:  dashboard/page.tsx executes
190ms:  useState hooks initialize
200ms:  useMemo hooks calculate
210ms:  CallCenter component mounts
220ms:  ActiveCallPanel mounts (showActive=true)
230ms:  DOM renders
240ms:  Application ready for user interaction
250ms:  Sidebar drawer ready (hidden, can be toggled)
```

### User Interaction Flow (250ms+)

#### Sidebar Interaction Flow
```
250ms:  User clicks menu button (☰)
260ms:  toggleSidebar() called
270ms:  SidebarContext state updates (isOpen=true)
280ms:  GlobalSidebar re-renders with translate-x-0
290ms:  Overlay appears with backdrop
300ms:  Sidebar slides in from left (300ms animation)
310ms:  Body scroll disabled (sidebar-open class)
320ms:  Sidebar fully visible and interactive
```

#### Company Dropdown Interaction Flow
```
250ms:  User clicks company name in header
260ms:  CompanyDropdown state updates (isOpen=true)
270ms:  Dropdown menu appears with fade-in
280ms:  Chevron rotates 180 degrees
290ms:  Company list renders with hover effects
300ms:  User clicks different company
310ms:  handleCompanySelect() called
320ms:  onCompanyChange() updates parent state
330ms:  Dropdown closes with animation
340ms:  Header updates with new company name
```

#### Search Interaction Flow
```
250ms:  User types in search input
260ms:  onChange event fires
270ms:  setQuery('new value') called
280ms:  DashboardPage re-renders
290ms:  useMemo recalculates filtered data
300ms:  CallCenter receives new props
310ms:  CallCenter re-renders
320ms:  Table updates with filtered data
330ms:  DOM updates
340ms:  User sees filtered results
```

#### Sidebar Close Interaction Flow
```
250ms:  User clicks X button or overlay
260ms:  closeSidebar() called
270ms:  SidebarContext state updates (isOpen=false)
280ms:  GlobalSidebar re-renders with translate-x-full
290ms:  Sidebar slides out to left (300ms animation)
300ms:  Overlay disappears
310ms:  Body scroll re-enabled
320ms:  Sidebar fully hidden
```

---

## Key Execution Rules

### 1. File Execution Order (Always)
```
Configuration Files → Root Layout → SidebarProvider → GlobalLayout → Route Page → Components → Child Components
```

### 2. Component Execution Order
```
RootLayout → SidebarProvider → GlobalLayout → GlobalHeader/GlobalSidebar → Route Page → CallCenter → Child Components
```

### 3. Hook Execution Order (Critical)
```
useState → useMemo → useEffect → Custom Hooks (useSidebar) → Context Hooks
```

### 4. Route Resolution Priority
```
1. layout.tsx (executes for ALL routes with SidebarProvider)
2. GlobalLayout.tsx (wraps all routes)
3. page.tsx (executes for specific route)
4. loading.tsx (if exists)
5. error.tsx (if exists)
6. not-found.tsx (if exists)
```

### 5. State Update Flow
```
User Action → Event Handler → State Setter → Context Update → Re-render → useMemo Recalculation → Child Props Update → Child Re-render
```

### 6. Sidebar State Management Flow
```
Menu Click → toggleSidebar() → SidebarContext Update → GlobalSidebar Re-render → Animation → DOM Update
```

### 7. Company Dropdown Flow
```
Company Click → handleCompanySelect() → onCompanyChange() → Parent State Update → Header Re-render → Dropdown Close
```

---

## Conclusion

This comprehensive execution flow documentation provides a complete understanding of how the VoIP Dashboard application works from server startup to user interaction. The system demonstrates modern React patterns, efficient state management, and a scalable architecture suitable for production call center applications.

The key to understanding this flow is recognizing that:
1. **Configuration files** set up the build environment
2. **Next.js App Router** handles routing and layout
3. **DaisyUI Integration** provides consistent component library
4. **Global Layout System** provides consistent navigation and structure
5. **Context-based State Management** handles global sidebar state
6. **React components** manage state and user interaction
7. **Tailwind CSS + DaisyUI** provides styling and responsive design
8. **Zod schemas** ensure data validation and type safety

### New Architecture Features:
- **DaisyUI Components**: Modern, accessible component library integration
- **Custom VoIP Theme**: Brand-specific color scheme and styling
- **Global Sidebar Drawer**: DaisyUI drawer component with smooth animations
- **Company Dropdown**: Multi-company selection with modern UI
- **Context-based State**: Global sidebar state management
- **Responsive Design**: Drawer behavior on all screen sizes
- **Accessibility**: Built-in ARIA support and keyboard navigation
- **Performance**: Optimized components and memoized context values

### DaisyUI Benefits:
- **Consistent Design**: Unified component system across the application
- **Accessibility**: WCAG compliant components out of the box
- **Maintainability**: Reduced custom CSS and component complexity
- **Theme Support**: Easy theme switching and customization
- **Performance**: Optimized bundle size and rendering

This architecture provides a solid foundation for building scalable, maintainable web applications with modern development practices, enhanced user experience, and professional-grade component library integration.

---

## Quick Reference Commands

### Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### File Structure Quick Reference
```
src/app/layout.tsx                    # Root layout with SidebarProvider
src/app/page.tsx                     # Homepage (/) with menu button
src/app/dashboard/page.tsx           # Dashboard (/dashboard)
src/app/settings/page.tsx            # Settings (/settings)
src/components/GlobalLayout.tsx      # Global layout wrapper
src/components/GlobalHeader.tsx      # Global header with menu
src/components/GlobalSidebar.tsx     # Global sidebar drawer
src/components/CompanyDropdown.tsx   # Company selection dropdown
src/components/CallCenter.tsx        # Main dashboard component
src/contexts/SidebarContext.tsx      # Global sidebar state management
src/lib/                             # Utilities, types, schemas
```

### Key Configuration Files
```
package.json       # Dependencies and scripts
next.config.mjs    # Next.js configuration
tsconfig.json      # TypeScript configuration
tailwind.config.ts # Tailwind CSS configuration
postcss.config.mjs # PostCSS configuration
```

---

## New Features Summary

### Global Sidebar System
- **Drawer Design**: Slides over content instead of pushing it aside
- **Context Management**: Global state via SidebarContext
- **Smooth Animations**: 300ms slide-in/out transitions
- **Accessibility**: Keyboard navigation (Escape key) and ARIA labels
- **Body Scroll Control**: Prevents background scrolling when open

### Company Dropdown
- **Modern UI**: Matches design specifications with "Act!" header
- **Multi-Company Support**: Easy switching between companies
- **Interactive Elements**: Hover effects and smooth animations
- **Click Outside**: Closes when clicking outside the dropdown
- **Sign Out Integration**: Purple button for user actions

### Enhanced Architecture
- **Global Layout**: Consistent structure across all pages
- **Conditional Headers**: Different headers for home vs dashboard
- **Performance Optimized**: Memoized context values
- **Type Safety**: Full TypeScript support with readonly props
- **Responsive Design**: Works seamlessly on all screen sizes

---

*This document serves as a complete technical reference for understanding the VoIP Dashboard application's execution flow, from initial server startup through user interactions and component lifecycles, including the new global sidebar and company dropdown features.*