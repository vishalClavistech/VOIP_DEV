import Link from 'next/link'
import { PhoneIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="font-semibold text-xl">VoIP</div>
            <nav className="ml-8 hidden md:flex items-center gap-2">
              <Link href="/dashboard" className="btn-ghost text-white/90 hover:text-white">Dashboard</Link>
              <Link href="/settings" className="btn-ghost text-white/90 hover:text-white">Settings</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link className="btn-ghost text-white/90 hover:text-white" href="/dashboard">Open App</Link>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold">Next.js VoIP Dashboard</h1>
            <p className="mt-3 text-slate-600">A reference UI that mirrors a modern call center interface with stats, searchable call logs, an active call panel, and an incoming call toast.</p>
            <div className="mt-6 flex gap-3">
              <Link href="/dashboard" className="btn-primary">
                <PhoneIcon className="h-5 w-5 mr-1.5" /> Launch Dashboard
              </Link>
              <Link href="/settings" className="btn-ghost">
                <Cog6ToothIcon className="h-5 w-5 mr-1.5" /> Settings
              </Link>
            </div>
          </div>
          <div className="card p-6">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-400">UI Preview</div>
          </div>
        </div>
      </section>
    </main>
  )
}