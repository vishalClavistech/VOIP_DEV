"use client"

import { useState } from 'react'
import { MagnifyingGlassIcon, SpeakerWaveIcon, PlusIcon } from '@heroicons/react/24/outline'
import { CallRecord, CallStats } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { ActiveCallPanel } from './active-call/ActiveCallPanel'
import { IncomingCallToast } from './incoming/IncomingCallToast'

type Props = {
  stats: CallStats
  query: string
  setQuery: (q: string) => void
  rows: CallRecord[]
}

export function CallCenter({ stats, query, setQuery, rows }: Props) {
  const [showActive, setShowActive] = useState(true)
  const [incoming, setIncoming] = useState(false)

  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-white">
        <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-semibold text-xl">VoIP</div>
            <nav className="ml-6 flex gap-2">
              <a className="btn-ghost text-white/90 hover:text-white" href="/dashboard">Dashboard</a>
              <a className="btn-ghost text-white/90 hover:text-white" href="/settings">Settings</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-ghost text-white/90 hover:text-white" onClick={() => setIncoming((s) => !s)}>
              Toggle Incoming
            </button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <StatCard label="Total Calls" value={stats.total} />
          <StatCard label="Completed Calls" value={stats.completed} />
          <StatCard label="Missed Calls" value={stats.missed} />
          <StatCard label="Voicemail" value={stats.voicemail} />
          <StatCard label="Active Call" value={stats.active} />
        </div>

        <div className="mt-6">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full rounded-lg border-slate-200 bg-white pl-10 pr-3 py-2.5 shadow-sm outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="mt-6 card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <Th>Date</Th>
                  <Th>From number</Th>
                  <Th>Contact name</Th>
                  <Th>Call transcript</Th>
                  <Th>Call recording</Th>
                  <Th>Summary</Th>
                  <Th>Direction</Th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <Td>{formatDateTime(row.date)}</Td>
                    <Td>
                      <a href="#" className="text-brand-700 hover:underline">{row.fromNumber}</a>
                    </Td>
                    <Td className="text-brand-700">{row.contactName ?? <button className="inline-flex items-center gap-1 text-brand-700"><PlusIcon className="h-4 w-4" /> Add</button>}</Td>
                    <Td>
                      <a href="#" className="text-brand-700 hover:underline">View Details</a>
                    </Td>
                    <Td>
                      <button className="inline-flex items-center gap-1 text-brand-700">
                        Listen <SpeakerWaveIcon className="h-4 w-4" />
                      </button>
                    </Td>
                    <Td>
                      <a href="#" className="text-brand-700 hover:underline">View Details</a>
                    </Td>
                    <Td className="text-slate-600">{row.direction === 'inbound' ? 'Incoming' : 'Outgoing'}</Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showActive && (
          <ActiveCallPanel onClose={() => setShowActive(false)} />
        )}

        {incoming && (
          <IncomingCallToast onClose={() => setIncoming(false)} />
        )}
      </section>
    </main>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-4">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="text-xs mt-2 text-slate-600">{label}</div>
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="text-left px-4 py-3 font-medium">{children}</th>
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 ${className ?? ''}`}>{children}</td>
}