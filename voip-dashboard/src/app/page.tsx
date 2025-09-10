"use client"

import { useMemo, useState } from 'react'
import { CallCenter } from '@/components/CallCenter'
import { callsMock } from '@/lib/mock'
import { CallRecord } from '@/lib/types'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [data] = useState<CallRecord[]>(callsMock)

  const stats = useMemo(() => {
    const total = data.length
    const completed = data.filter((c) => c.status === 'completed').length
    const missed = data.filter((c) => c.status === 'missed').length
    const voicemail = data.filter((c) => c.hasVoicemail).length
    const active = data.filter((c) => c.status === 'active').length
    return { total, completed, missed, voicemail, active }
  }, [data])

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