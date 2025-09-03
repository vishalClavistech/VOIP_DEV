"use client"

import { useState } from 'react'
import { CallNoteSchema } from '@/lib/schemas'
import { PhoneIcon, MicrophoneIcon, PauseIcon, EllipsisHorizontalIcon, UserPlusIcon, ArrowUturnRightIcon } from '@heroicons/react/24/outline'

type Props = { onClose: () => void }

export function ActiveCallPanel({ onClose }: Props) {
  const [muted, setMuted] = useState(false)
  const [hold, setHold] = useState(false)
  const [notes, setNotes] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  function saveNotes() {
    setError(null)
    const payload = { text: notes, tags: tags.split(',').map((t) => t.trim()).filter(Boolean) }
    const parse = CallNoteSchema.safeParse(payload)
    if (!parse.success) {
      setError(parse.error.issues[0]?.message ?? 'Invalid form')
      return
    }
    alert('Saved!')
  }

  return (
    <div className="fixed right-6 top-6 bottom-6 z-40 w-[420px] max-w-[90vw] card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 rounded-full bg-slate-200" />
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
              <h3 className="text-xl font-semibold">Bently Ericson</h3>
            </div>
          </div>
        </div>
        <button className="btn-ghost" onClick={onClose} aria-label="Close">✕</button>
      </div>

      <div className="grid grid-cols-3 gap-8 text-center mt-10">
        <Control label="Mute" active={muted} onClick={() => setMuted((s) => !s)}>
          <MicrophoneIcon className="h-5 w-5" />
        </Control>
        <Control label="Hold" active={hold} onClick={() => setHold((s) => !s)}>
          <PauseIcon className="h-5 w-5" />
        </Control>
        <Control label="Dial Pad">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </Control>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="card p-4">
          <div className="text-sm font-medium">Notes</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-2 w-full rounded-md border-slate-200 bg-white p-2 min-h-[100px]"
            placeholder="Type call notes..."
          />
        </div>
        <div className="card p-4">
          <div className="text-sm font-medium">Tags</div>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 w-full rounded-md border-slate-200 bg-white p-2"
            placeholder="comma,separated,tags"
          />
        </div>
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="btn-ghost"><UserPlusIcon className="h-5 w-5 mr-1" /> Add</button>
          <button className="btn-ghost"><ArrowUturnRightIcon className="h-5 w-5 mr-1" /> Transfer</button>
          <button className="btn-ghost">More</button>
        </div>
        <button className="rounded-full bg-red-600 text-white h-12 w-12 flex items-center justify-center" aria-label="End call">
          <PhoneIcon className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button className="btn-ghost" onClick={onClose}>Close</button>
        <button className="btn-primary" onClick={saveNotes}>Save</button>
      </div>
    </div>
  )
}

function Control({ children, label, onClick, active }: { children: React.ReactNode; label: string; onClick?: () => void; active?: boolean }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 p-3 rounded-lg border ${active ? 'bg-brand-50 border-brand-200' : 'border-slate-200 hover:bg-slate-50'}`}>
      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">{children}</div>
      <div className="text-xs text-slate-600">{label}</div>
    </button>
  )
}