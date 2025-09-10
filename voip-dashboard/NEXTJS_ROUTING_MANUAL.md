# Next.js Routing Manual - App Router Complete Guide

## Table of Contents
1. [Introduction](#introduction)
2. [App Router vs Pages Router](#app-router-vs-pages-router)
3. [File-based Routing](#file-based-routing)
4. [Layout System](#layout-system)
5. [Page Components](#page-components)
6. [Loading & Error Handling](#loading--error-handling)
7. [Dynamic Routes](#dynamic-routes)
8. [Route Groups](#route-groups)
9. [Parallel Routes](#parallel-routes)
10. [Intercepting Routes](#intercepting-routes)
11. [Navigation](#navigation)
12. [Search Parameters](#search-parameters)
13. [Middleware](#middleware)
14. [Server Components vs Client Components](#server-components-vs-client-components)
15. [Data Fetching](#data-fetching)
16. [Best Practices](#best-practices)
17. [Troubleshooting](#troubleshooting)

---

## Introduction

Next.js 13+ introduced the App Router, a new routing system built on React Server Components. It provides a more powerful and flexible way to handle routing, layouts, and data fetching in Next.js applications.

### Key Features
- **File-based Routing**: Routes are defined by the file system
- **Nested Layouts**: Shared layouts that persist across routes
- **Server Components**: Components that render on the server
- **Streaming**: Progressive loading of page content
- **Error Boundaries**: Built-in error handling
- **Loading States**: Automatic loading UI
- **Parallel Routes**: Multiple pages in the same layout
- **Intercepting Routes**: Modal-like routing patterns

---

## App Router vs Pages Router

### Pages Router (Legacy)
```
pages/
├── index.js          # / route
├── about.js          # /about route
├── blog/
│   ├── index.js      # /blog route
│   └── [slug].js     # /blog/[slug] route
└── api/
    └── users.js      # /api/users route
```

### App Router (Current)
```
app/
├── layout.js         # Root layout
├── page.js           # / route
├── about/
│   └── page.js       # /about route
├── blog/
│   ├── layout.js     # Blog layout
│   ├── page.js       # /blog route
│   └── [slug]/
│       └── page.js   # /blog/[slug] route
└── api/
    └── users/
        └── route.js  # /api/users route
```

---

## File-based Routing

### Basic Routes
```
app/
├── page.js           # / (home page)
├── about/
│   └── page.js       # /about
├── contact/
│   └── page.js       # /contact
└── dashboard/
    └── page.js       # /dashboard
```

### Nested Routes
```
app/
├── dashboard/
│   ├── page.js       # /dashboard
│   ├── settings/
│   │   └── page.js   # /dashboard/settings
│   └── profile/
│       └── page.js   # /dashboard/profile
```

### Route Segments
Each folder in the `app` directory represents a route segment:

- `app/dashboard` → `/dashboard`
- `app/dashboard/settings` → `/dashboard/settings`
- `app/dashboard/settings/profile` → `/dashboard/settings/profile`

---

## Layout System

### Root Layout
Every app must have a root layout at `app/layout.js`:

```jsx
// app/layout.js
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VoIP Dashboard',
  description: 'Modern call center management',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="voip">
      <body className={inter.className}>
        <SidebarProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </SidebarProvider>
      </body>
    </html>
  )
}
```

### Nested Layouts
Create layouts that apply to specific route segments:

```jsx
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### Layout Nesting
Layouts are nested automatically:

```
app/
├── layout.js         # Root layout (applies to all routes)
├── dashboard/
│   ├── layout.js     # Dashboard layout (applies to /dashboard/*)
│   ├── page.js       # Uses both root + dashboard layouts
│   └── settings/
│       ├── layout.js # Settings layout (applies to /dashboard/settings/*)
│       └── page.js   # Uses root + dashboard + settings layouts
```

---

## Page Components

### Basic Page
```jsx
// app/page.js
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10">
      <header className="navbar bg-white shadow-lg">
        <div className="navbar-start">
          <button className="btn btn-ghost btn-square">
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </header>
      <section className="relative overflow-hidden">
        <div className="mx-auto px-6 py-20">
          <h1 className="text-4xl lg:text-6xl font-bold">VoIP Dashboard</h1>
        </div>
      </section>
    </main>
  )
}
```

### Page with Metadata
```jsx
// app/dashboard/page.js
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | VoIP',
  description: 'Call center dashboard with real-time analytics',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <h1>Dashboard</h1>
    </div>
  )
}
```

### Dynamic Metadata
```jsx
// app/blog/[slug]/page.js
import { Metadata } from 'next'

export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPost({ params }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

---

## Loading & Error Handling

### Loading UI
Create loading states with `loading.js`:

```jsx
// app/dashboard/loading.js
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  )
}
```

### Error Handling
Create error boundaries with `error.js`:

```jsx
// app/dashboard/error.js
'use client'

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button 
        onClick={reset}
        className="btn btn-primary"
      >
        Try again
      </button>
    </div>
  )
}
```

### Not Found Pages
Create 404 pages with `not-found.js`:

```jsx
// app/dashboard/not-found.js
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Not Found</h2>
      <p className="text-gray-600 mb-4">Could not find requested resource</p>
      <a href="/dashboard" className="btn btn-primary">
        Return to Dashboard
      </a>
    </div>
  )
}
```

---

## Dynamic Routes

### Single Dynamic Segment
```
app/
└── blog/
    └── [slug]/
        └── page.js   # /blog/[slug]
```

```jsx
// app/blog/[slug]/page.js
export default function BlogPost({ params }) {
  return (
    <div>
      <h1>Blog Post: {params.slug}</h1>
    </div>
  )
}
```

### Multiple Dynamic Segments
```
app/
└── blog/
    └── [category]/
        └── [slug]/
            └── page.js   # /blog/[category]/[slug]
```

```jsx
// app/blog/[category]/[slug]/page.js
export default function BlogPost({ params }) {
  return (
    <div>
      <h1>Category: {params.category}</h1>
      <h2>Slug: {params.slug}</h2>
    </div>
  )
}
```

### Catch-all Routes
```
app/
└── docs/
    └── [...slug]/
        └── page.js   # /docs/[...slug]
```

```jsx
// app/docs/[...slug]/page.js
export default function DocsPage({ params }) {
  return (
    <div>
      <h1>Docs: {params.slug.join('/')}</h1>
    </div>
  )
}
```

### Optional Catch-all Routes
```
app/
└── shop/
    └── [[...slug]]/
        └── page.js   # /shop and /shop/[...slug]
```

---

## Route Groups

Route groups allow you to organize routes without affecting the URL structure:

```
app/
├── (marketing)/
│   ├── about/
│   │   └── page.js   # /about
│   └── contact/
│       └── page.js   # /contact
├── (dashboard)/
│   ├── dashboard/
│   │   └── page.js   # /dashboard
│   └── settings/
│       └── page.js   # /settings
└── layout.js
```

### Different Layouts for Route Groups
```jsx
// app/(marketing)/layout.js
export default function MarketingLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </div>
  )
}

// app/(dashboard)/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
```

---

## Parallel Routes

Parallel routes allow you to render multiple pages simultaneously in the same layout:

```
app/
├── layout.js
├── page.js
├── @sidebar/
│   └── page.js
└── @main/
    └── page.js
```

```jsx
// app/layout.js
export default function RootLayout({ children, sidebar, main }) {
  return (
    <html>
      <body>
        <div className="flex">
          <div className="w-64">
            {sidebar}
          </div>
          <div className="flex-1">
            {main}
          </div>
        </div>
      </body>
    </html>
  )
}
```

---

## Intercepting Routes

Intercepting routes allow you to show a modal while preserving the URL:

```
app/
├── @modal/
│   └── (..)photo/
│       └── [id]/
│           └── page.js
├── photo/
│   └── [id]/
│       └── page.js
└── layout.js
```

```jsx
// app/@modal/(..)photo/[id]/page.js
export default function PhotoModal({ params }) {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3>Photo {params.id}</h3>
        <p>This is a modal version of the photo page</p>
      </div>
    </div>
  )
}
```

---

## Navigation

### Link Component
```jsx
import Link from 'next/link'

// Basic navigation
<Link href="/dashboard">Dashboard</Link>

// With styling
<Link href="/dashboard" className="btn btn-primary">
  Go to Dashboard
</Link>

// External links
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External Link
</Link>
```

### useRouter Hook
```jsx
'use client'

import { useRouter } from 'next/navigation'

export default function Navigation() {
  const router = useRouter()

  const handleNavigation = () => {
    router.push('/dashboard')
  }

  const handleBack = () => {
    router.back()
  }

  const handleForward = () => {
    router.forward()
  }

  const handleRefresh = () => {
    router.refresh()
  }

  return (
    <div>
      <button onClick={handleNavigation}>Go to Dashboard</button>
      <button onClick={handleBack}>Back</button>
      <button onClick={handleForward}>Forward</button>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  )
}
```

### Programmatic Navigation
```jsx
'use client'

import { useRouter } from 'next/navigation'

export default function CallCenter({ callId }) {
  const router = useRouter()

  const handleCallEnd = () => {
    // Navigate to dashboard after call ends
    router.push('/dashboard')
  }

  const handleCallAnswer = () => {
    // Navigate to active call page
    router.push(`/dashboard/calls/${callId}`)
  }

  return (
    <div>
      <button onClick={handleCallAnswer}>Answer Call</button>
      <button onClick={handleCallEnd}>End Call</button>
    </div>
  )
}
```

---

## Search Parameters

### Reading Search Parameters
```jsx
// app/dashboard/page.js
export default function DashboardPage({ searchParams }) {
  const { filter, sort, page } = searchParams

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Filter: {filter}</p>
      <p>Sort: {sort}</p>
      <p>Page: {page}</p>
    </div>
  )
}
```

### Updating Search Parameters
```jsx
'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function FilterControls() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (filter) => {
    const params = new URLSearchParams(searchParams)
    params.set('filter', filter)
    router.push(`/dashboard?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/dashboard')
  }

  return (
    <div className="flex gap-2">
      <button onClick={() => updateFilter('active')}>Active</button>
      <button onClick={() => updateFilter('completed')}>Completed</button>
      <button onClick={() => updateFilter('missed')}>Missed</button>
      <button onClick={clearFilters}>Clear</button>
    </div>
  )
}
```

---

## Middleware

Middleware runs before the request is completed and can modify the response:

```jsx
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if user is authenticated
  const token = request.cookies.get('auth-token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
  ],
}
```

### Advanced Middleware
```jsx
// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next()
  
  // Add custom headers
  response.headers.set('X-Custom-Header', 'VoIP-Dashboard')
  
  // Set cookies
  response.cookies.set('last-visited', request.nextUrl.pathname)
  
  // Log requests
  console.log(`${request.method} ${request.nextUrl.pathname}`)
  
  return response
}
```

---

## Server Components vs Client Components

### Server Components (Default)
```jsx
// app/dashboard/page.js (Server Component)
import { getCalls } from '@/lib/api'

export default async function DashboardPage() {
  const calls = await getCalls()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {calls.map(call => (
          <div key={call.id} className="card">
            <h3>{call.from}</h3>
            <p>{call.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Client Components
```jsx
'use client'

import { useState, useEffect } from 'react'

export default function CallCenter() {
  const [calls, setCalls] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCalls().then(data => {
      setCalls(data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <div className="loading loading-spinner loading-lg"></div>
  }

  return (
    <div>
      <h1>Call Center</h1>
      <div className="grid grid-cols-3 gap-4">
        {calls.map(call => (
          <div key={call.id} className="card">
            <h3>{call.from}</h3>
            <p>{call.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### When to Use Each
- **Server Components**: Data fetching, static content, SEO-critical content
- **Client Components**: Interactive elements, state management, browser APIs

---

## Data Fetching

### Server-Side Data Fetching
```jsx
// app/dashboard/page.js
async function getCalls() {
  const res = await fetch('https://api.example.com/calls', {
    cache: 'no-store', // Always fetch fresh data
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch calls')
  }
  
  return res.json()
}

export default async function DashboardPage() {
  const calls = await getCalls()
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {calls.map(call => (
          <div key={call.id} className="card">
            <h3>{call.from}</h3>
            <p>{call.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Caching Strategies
```jsx
// Static data (cached at build time)
const res = await fetch('https://api.example.com/static-data', {
  cache: 'force-cache'
})

// Dynamic data (cached for 60 seconds)
const res = await fetch('https://api.example.com/dynamic-data', {
  next: { revalidate: 60 }
})

// Always fresh data
const res = await fetch('https://api.example.com/fresh-data', {
  cache: 'no-store'
})
```

### Error Handling
```jsx
// app/dashboard/page.js
async function getCalls() {
  try {
    const res = await fetch('https://api.example.com/calls')
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    
    return res.json()
  } catch (error) {
    console.error('Failed to fetch calls:', error)
    return []
  }
}

export default async function DashboardPage() {
  const calls = await getCalls()
  
  if (calls.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No calls available</p>
      </div>
    )
  }
  
  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {calls.map(call => (
          <div key={call.id} className="card">
            <h3>{call.from}</h3>
            <p>{call.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Best Practices

### 1. Use Server Components When Possible
```jsx
// ✅ Good - Server Component for data fetching
export default async function DashboardPage() {
  const calls = await getCalls()
  return <div>{/* render calls */}</div>
}

// ❌ Avoid - Client Component for static data
'use client'
export default function DashboardPage() {
  const [calls, setCalls] = useState([])
  useEffect(() => {
    fetchCalls().then(setCalls)
  }, [])
  return <div>{/* render calls */}</div>
}
```

### 2. Organize Routes Logically
```
app/
├── (auth)/
│   ├── login/
│   └── register/
├── (dashboard)/
│   ├── dashboard/
│   ├── calls/
│   └── settings/
└── (marketing)/
    ├── about/
    └── contact/
```

### 3. Use Layouts for Shared UI
```jsx
// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### 4. Handle Loading and Error States
```jsx
// app/dashboard/loading.js
export default function Loading() {
  return <div className="loading loading-spinner loading-lg"></div>
}

// app/dashboard/error.js
'use client'
export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

### 5. Use TypeScript for Type Safety
```tsx
// app/dashboard/page.tsx
interface Call {
  id: string
  from: string
  status: 'active' | 'completed' | 'missed'
  duration?: number
}

export default async function DashboardPage(): Promise<JSX.Element> {
  const calls: Call[] = await getCalls()
  
  return (
    <div>
      {calls.map(call => (
        <div key={call.id}>
          <h3>{call.from}</h3>
          <p>{call.status}</p>
        </div>
      ))}
    </div>
  )
}
```

---

## Troubleshooting

### Common Issues

#### 1. Hydration Mismatch
**Problem**: Server and client render different content
**Solution**: 
- Ensure server and client components are used correctly
- Check for browser-only APIs in server components
- Use `useEffect` for client-side only code

#### 2. Route Not Found
**Problem**: 404 errors for valid routes
**Solution**:
- Check file naming conventions
- Ensure `page.js` exists in route folder
- Verify route structure matches expected URL

#### 3. Layout Not Applied
**Problem**: Layout styles not showing
**Solution**:
- Check if `layout.js` exists in correct directory
- Verify layout component exports default function
- Ensure layout wraps children properly

#### 4. Dynamic Routes Not Working
**Problem**: Dynamic segments not captured
**Solution**:
- Check bracket naming: `[slug]` not `{slug}`
- Verify `params` prop in page component
- Ensure dynamic route is in correct directory

#### 5. Metadata Not Showing
**Problem**: Page metadata not appearing
**Solution**:
- Check if metadata is exported from page
- Verify metadata object structure
- Ensure metadata is in correct file

### Debug Mode
Enable Next.js debug mode:
```bash
DEBUG=* next dev
```

### Route Debugging
Use Next.js route debugging:
```jsx
// Add to any page component
export default function DebugPage({ params, searchParams }) {
  console.log('Params:', params)
  console.log('Search Params:', searchParams)
  
  return <div>Debug page</div>
}
```

---

## Examples from VoIP Dashboard

### Root Layout
```jsx
// app/layout.tsx
import { Inter } from 'next/font/google'
import { SidebarProvider } from '@/contexts/SidebarContext'
import GlobalLayout from '@/components/GlobalLayout'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VoIP Dashboard',
  description: 'Modern call center management with real-time analytics',
}

export default function RootLayout({
  children,
}: {
  readonly children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="voip">
      <body className={inter.className}>
        <SidebarProvider>
          <GlobalLayout>{children}</GlobalLayout>
        </SidebarProvider>
      </body>
    </html>
  )
}
```

### Dashboard Page
```jsx
// app/dashboard/page.tsx
import CallCenter from '@/components/CallCenter'

export const metadata = {
  title: 'Dashboard | VoIP',
  description: 'Call center dashboard with real-time call management',
}

export default function DashboardPage() {
  return <CallCenter />
}
```

### Settings Page
```jsx
// app/settings/page.tsx
import VoipSettings from '@/components/VoipSettings'

export const metadata = {
  title: 'Settings | VoIP',
  description: 'Configure your VoIP dashboard settings',
}

export default function SettingsPage() {
  return <VoipSettings />
}
```

### Dynamic Call Route
```jsx
// app/dashboard/calls/[id]/page.tsx
interface CallPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CallPageProps) {
  return {
    title: `Call ${params.id} | VoIP`,
    description: `Details for call ${params.id}`,
  }
}

export default function CallPage({ params }: CallPageProps) {
  return (
    <div>
      <h1>Call Details</h1>
      <p>Call ID: {params.id}</p>
    </div>
  )
}
```

This manual provides comprehensive guidance for using Next.js App Router effectively in your VoIP Dashboard project. The App Router's file-based routing system combined with server components creates a powerful and performant application architecture.