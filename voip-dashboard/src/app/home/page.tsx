"use client"

import Link from 'next/link'
import { PhoneIcon, Cog6ToothIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useSidebar } from '@/contexts/SidebarContext'

export default function HomePage() {
  const { toggleSidebar } = useSidebar()

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-primary/10">
      {/* Modern Header */}
      <header className="navbar bg-white shadow-lg">
        <div className="navbar-start">
          {/* Menu Button for Home Page */}
          <button
            onClick={toggleSidebar}
            className="btn btn-ghost btn-square"
            aria-label="Open menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-3 ml-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
              <PhoneIcon className="h-6 w-6 text-white" />
            </div>
            <div className="font-bold text-xl text-gray-900">Zyra VoIP</div>
          </div>
        </div>
        
        <div className="navbar-center hidden md:flex">
          <nav className="menu menu-horizontal px-1">
            <Link href="/" className="btn btn-ghost">Dashboard</Link>
            <Link href="/settings" className="btn btn-ghost">Settings</Link>
          </nav>
        </div>
        
        <div className="navbar-end">
          <Link href="/" className="btn btn-primary">
            <PhoneIcon className="h-4 w-4 mr-2" />
            Launch App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-fade-in">
              <div className="badge badge-primary gap-2 mb-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                Modern VoIP Solution
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Professional{' '}
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">Call Center</span>
                <br />
                Management
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Streamline your call center operations with our modern VoIP dashboard. 
                Manage calls, track performance, and enhance customer experience with 
                real-time analytics and intuitive controls.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="btn btn-primary btn-lg">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Get Started
                </Link>
                <Link href="/settings" className="btn btn-outline btn-lg">
                  <Cog6ToothIcon className="h-5 w-5 mr-2" />
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="card bg-white shadow-xl p-8">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-green-100/50"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-4">
                      <PhoneIcon className="h-10 w-10 text-blue-500" />
                    </div>
                    <div className="text-gray-900 font-medium">Live Dashboard Preview</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}