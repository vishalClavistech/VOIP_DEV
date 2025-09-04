"use client"

import { useState } from 'react'
import { CallNoteSchema } from '@/lib/schemas'
import { 
  PhoneIcon, 
  MicrophoneIcon, 
  PauseIcon, 
  EllipsisHorizontalIcon, 
  UserPlusIcon, 
  ArrowUturnRightIcon,
  XMarkIcon,
  UserCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

type Props = { onClose: () => void }

export function ActiveCallPanel({ onClose }: Props) {
  const [muted, setMuted] = useState(false)
  const [hold, setHold] = useState(false)
  const [notes, setNotes] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState('02:34')

  function saveNotes() {
    setError(null)
    const payload = { text: notes, tags: tags.split(',').map((t) => t.trim()).filter(Boolean) }
    const parse = CallNoteSchema.safeParse(payload)
    if (!parse.success) {
      setError(parse.error.issues[0]?.message ?? 'Invalid form')
      return
    }
    alert('Notes saved successfully!')
  }

  return (
    <div className="fixed right-6 top-6 bottom-6 z-40 w-[420px] max-w-[90vw] card-strong p-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 bg-figma-blueLight rounded-2xl flex items-center justify-center">
              <UserCircleIcon className="h-10 w-10 text-figma-blue" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-figma-green rounded-full border-2 border-figma-white flex items-center justify-center">
              <div className="w-2 h-2 bg-figma-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-figma-dark">Bently Ericson</h3>
            <div className="flex items-center gap-2 text-sm text-figma-gray">
              <ClockIcon className="h-4 w-4" />
              <span>{callDuration}</span>
            </div>
          </div>
        </div>
        <button 
          className="p-2 text-figma-gray hover:text-figma-dark hover:bg-figma-grayLight rounded-lg transition-colors"
          onClick={onClose} 
          aria-label="Close"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Call Controls */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Control 
          label="Mute" 
          active={muted} 
          onClick={() => setMuted((s) => !s)}
          icon={<MicrophoneIcon className="h-5 w-5" />}
          activeColor="accent"
        />
        <Control 
          label="Hold" 
          active={hold} 
          onClick={() => setHold((s) => !s)}
          icon={<PauseIcon className="h-5 w-5" />}
          activeColor="warning"
        />
        <Control 
          label="Dial Pad"
          icon={<EllipsisHorizontalIcon className="h-5 w-5" />}
        />
      </div>

      {/* Notes and Tags */}
      <div className="space-y-4 mb-6">
        <div className="card p-4">
          <div className="text-sm font-semibold text-figma-dark mb-3">Call Notes</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-figma-white p-3 min-h-[100px] text-sm placeholder-figma-gray focus:border-figma-blue focus:ring-2 focus:ring-figma-blue/20 transition-all duration-200 resize-none"
            placeholder="Add notes about this call..."
          />
        </div>
        <div className="card p-4">
          <div className="text-sm font-semibold text-figma-dark mb-3">Tags</div>
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input"
            placeholder="comma,separated,tags"
          />
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-figma-redLight border border-figma-red rounded-xl text-sm text-figma-red">
          {error}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs px-3 py-2">
            <UserPlusIcon className="h-4 w-4 mr-1" />
            Add
          </button>
          <button className="btn-secondary text-xs px-3 py-2">
            <ArrowUturnRightIcon className="h-4 w-4 mr-1" />
            Transfer
          </button>
        </div>
        <button 
          className="w-14 h-14 bg-figma-red hover:bg-red-600 text-figma-white rounded-2xl flex items-center justify-center shadow-medium hover:shadow-strong transition-all duration-200"
          aria-label="End call"
        >
          <PhoneIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <button className="btn-ghost" onClick={onClose}>Close</button>
        <button className="btn-primary" onClick={saveNotes}>Save Notes</button>
      </div>
    </div>
  )
}

function Control({ 
  children, 
  label, 
  onClick, 
  active, 
  icon,
  activeColor = 'primary'
}: { 
  children?: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
  icon?: React.ReactNode
  activeColor?: 'primary' | 'accent' | 'warning'
}) {
  const activeClasses = {
    primary: 'bg-figma-blueLight border-figma-blue text-figma-blue',
    accent: 'bg-figma-redLight border-figma-red text-figma-red',
    warning: 'bg-figma-yellowLight border-figma-yellow text-figma-yellow'
  }

  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-3 p-4 rounded-xl border transition-all duration-200 ${
        active 
          ? activeClasses[activeColor]
          : 'border-gray-200 hover:bg-figma-grayLight text-figma-gray'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
        active 
          ? activeClasses[activeColor].replace('bg-', 'bg-').replace('text-', 'text-')
          : 'bg-figma-grayLight text-figma-gray'
      }`}>
        {icon || children}
      </div>
      <div className="text-xs font-medium">{label}</div>
    </button>
  )
}