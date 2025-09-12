"use client"

import { useState, useEffect } from 'react'
import { CallNoteSchema } from '@/lib/schemas'
import { CallRecord } from '@/lib/types'
import { 
  PhoneIcon, 
  MicrophoneIcon, 
  PauseIcon, 
  UserPlusIcon, 
  ArrowUturnRightIcon,
  XMarkIcon,
  UserCircleIcon,
  ClockIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'

type Props = { 
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly callRecord?: CallRecord | null
  readonly onMakeCall?: (phoneNumber: string) => void
}

export function CallModal({ isOpen, onClose, callRecord, onMakeCall }: Props) {
  const [muted, setMuted] = useState(false)
  const [hold, setHold] = useState(false)
  const [notes, setNotes] = useState<string>('')
  const [tags, setTags] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [callDuration, setCallDuration] = useState('00:00')
  const [showDialPad, setShowDialPad] = useState(false)
  const [dialPadValue, setDialPadValue] = useState('')
  const [isIncoming, setIsIncoming] = useState(false)

  // Simulate call duration timer
  useEffect(() => {
    if (!isOpen) return
    
    const interval = setInterval(() => {
      setCallDuration(prev => {
        const [minutes, seconds] = prev.split(':').map(Number)
        const newSeconds = seconds + 1
        if (newSeconds >= 60) {
          return `${minutes + 1}:00`
        }
        return `${minutes}:${newSeconds.toString().padStart(2, '0')}`
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen])

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setCallDuration('00:00')
      setMuted(false)
      setHold(false)
      setNotes('')
      setTags('')
      setError(null)
      setShowDialPad(false)
      setDialPadValue('')
    }
  }, [isOpen])

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

  function handleDialPadInput(value: string) {
    setDialPadValue(prev => prev + value)
  }

  function handleMakeCall() {
    if (onMakeCall && dialPadValue) {
      onMakeCall(dialPadValue)
    }
  }

  function handleAnswerCall() {
    setIsIncoming(false)
    // Simulate answering the call
  }

  function handleEndCall() {
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-figma-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 text-center">
          <button 
            className="absolute top-4 right-4 p-2 text-figma-gray   rounded-lg transition-colors"
            onClick={onClose} 
            aria-label="Close"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          
          {/* Profile Picture */}
          <div className="relative mx-auto mb-4">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
              <UserCircleIcon className="h-16 w-16 text-gray-400" />
            </div>
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-figma-white flex items-center justify-center ${
              isIncoming ? 'bg-figma-yellow animate-pulse' : 'bg-figma-green'
            }`}>
              <div className="w-2 h-2 bg-figma-white rounded-full"></div>
            </div>
          </div>
          
          {/* Contact Name */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-figma-green rounded-full"></div>
            <h3 className="text-2xl font-bold text-figma-dark">
              {callRecord?.contactName || callRecord?.fromNumber || 'Unknown Caller'}
            </h3>
            <button className="p-1 text-figma-gray ">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Call Duration */}
          <div className="flex items-center justify-center gap-2 text-sm text-figma-gray">
            <ClockIcon className="h-4 w-4" />
            <span>{callDuration}</span>
          </div>
        </div>

        <div className="px-6 pb-6">
          {/* Primary Call Controls */}
          <div className="mb-8">
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Control 
                label="Mute" 
                active={muted} 
                onClick={() => setMuted((s) => !s)}
                icon={<MicrophoneIcon className="h-6 w-6" />}
                activeColor="accent"
              />
              <Control 
                label="Hold" 
                active={hold} 
                onClick={() => setHold((s) => !s)}
                icon={<PauseIcon className="h-6 w-6" />}
                activeColor="warning"
              />
              <Control 
                label="Dial Pad"
                onClick={() => setShowDialPad(!showDialPad)}
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                activeColor="primary"
              />
            </div>
            
            {/* Secondary Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Control 
                label="Notes" 
                onClick={() => {/* Focus on notes */}}
                icon={<DocumentTextIcon className="h-6 w-6" />}
                activeColor="primary"
              />
              <Control 
                label="Tags" 
                onClick={() => {/* Focus on tags */}}
                icon={
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                }
                activeColor="primary"
              />
            </div>
          </div>

          {/* Dial Pad */}
          {showDialPad && (
            <div className="mb-6 p-4 bg-figma-grayLight rounded-xl">
              <div className="bg-figma-white p-4 rounded-lg text-center mb-4">
                <div className="text-2xl font-mono text-figma-dark">{dialPadValue || 'Enter number'}</div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(num => (
                  <button
                    key={num}
                    onClick={() => handleDialPadInput(num)}
                    className="w-full h-12 bg-figma-white border border-gray-200 rounded-lg  transition-colors font-semibold text-figma-dark"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setDialPadValue('')}
                  className="flex-1 btn-secondary"
                >
                  Clear
                </button>
                <button 
                  onClick={handleMakeCall}
                  className="flex-1 btn-primary"
                  disabled={!dialPadValue}
                >
                  Call
                </button>
              </div>
            </div>
          )}

          {/* Notes and Tags */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="call-notes" className="block text-sm font-medium text-figma-gray mb-2">Call Notes</label>
              <textarea
                id="call-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-figma-white p-3 min-h-[80px] text-sm placeholder-figma-gray focus:border-figma-blue focus:ring-2 focus:ring-figma-blue/20 transition-all duration-200 resize-none"
                placeholder="Add notes about this call..."
              />
            </div>
            <div>
              <label htmlFor="call-tags" className="block text-sm font-medium text-figma-gray mb-2">Tags</label>
              <input
                id="call-tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-figma-white p-3 text-sm placeholder-figma-gray focus:border-figma-blue focus:ring-2 focus:ring-figma-blue/20 transition-all duration-200"
                placeholder="comma,separated,tags"
              />
            </div>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-figma-redLight border border-figma-red rounded-xl text-sm text-figma-red">
              {error}
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="flex items-center justify-between">
            {/* Left Actions */}
            <div className="flex items-center gap-4">
              <button className="flex flex-col items-center gap-1 text-figma-gray  transition-colors">
                <div className="w-10 h-10 bg-figma-grayLight rounded-lg flex items-center justify-center">
                  <UserPlusIcon className="h-5 w-5" />
                </div>
                <span className="text-xs">Add</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-figma-gray  transition-colors">
                <div className="w-10 h-10 bg-figma-grayLight rounded-lg flex items-center justify-center">
                  <ArrowUturnRightIcon className="h-5 w-5" />
                </div>
                <span className="text-xs">Transfer</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-figma-gray  transition-colors">
                <div className="w-10 h-10 bg-figma-grayLight rounded-lg flex items-center justify-center">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-xs">More</span>
              </button>
            </div>

            {/* End Call Button */}
            <button 
              className="w-16 h-16 bg-figma-red  text-figma-white rounded-full flex items-center justify-center shadow-lg  transition-all duration-200"
              onClick={handleEndCall}
              aria-label="End call"
            >
              <PhoneIcon className="h-8 w-8 rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Control({ 
  label, 
  onClick, 
  active, 
  icon,
  activeColor = 'primary'
}: { 
  readonly label: string
  readonly onClick?: () => void
  readonly active?: boolean
  readonly icon?: React.ReactNode
  readonly activeColor?: 'primary' | 'accent' | 'warning'
}) {
  const activeClasses = {
    primary: 'bg-figma-blueLight text-figma-blue',
    accent: 'bg-figma-redLight text-figma-red',
    warning: 'bg-figma-yellowLight text-figma-yellow'
  }

  return (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center gap-2 transition-all duration-200"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors ${
        active 
          ? activeClasses[activeColor]
          : 'bg-figma-grayLight text-figma-gray '
      }`}>
        {icon}
      </div>
      <div className="text-xs font-medium text-figma-gray">{label}</div>
    </button>
  )
}