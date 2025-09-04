import Link from 'next/link'
import { PhoneIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Modern Header */}
      <header className="header">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-white" />
                </div>
                <div className="font-bold text-xl text-secondary-900">Zyra VoIP</div>
              </div>
              <nav className="hidden md:flex items-center gap-1 ml-8">
                <Link href="/dashboard" className="px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">Dashboard</Link>
                <Link href="/settings" className="px-4 py-2 text-secondary-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200">Settings</Link>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="btn-primary">
                <PhoneIcon className="h-4 w-4 mr-2" />
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                Modern VoIP Solution
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-secondary-900 leading-tight mb-6">
                Professional
                <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent"> Call Center</span>
                <br />Management
              </h1>
              <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
                Streamline your call center operations with our modern VoIP dashboard. 
                Manage calls, track performance, and enhance customer experience with 
                real-time analytics and intuitive controls.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="btn-primary text-base px-8 py-4">
                  <PhoneIcon className="h-5 w-5 mr-2" />
                  Get Started
                </Link>
                <Link href="/settings" className="btn-secondary text-base px-8 py-4">
                  <Cog6ToothIcon className="h-5 w-5 mr-2" />
                  Learn More
                </Link>
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="card-strong p-8">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-600/10"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl shadow-medium flex items-center justify-center mx-auto mb-4">
                      <PhoneIcon className="h-10 w-10 text-primary-600" />
                    </div>
                    <div className="text-secondary-700 font-medium">Live Dashboard Preview</div>
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