"use client"

import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useIncomingCall } from '@/contexts/TwilioContext'
import { useState, useEffect } from 'react'

type Props = { readonly onClose: () => void }

export function IncomingCallToast({ onClose }: Props) {
  const { incomingCall, answerCall, rejectCall, hasIncomingCall } = useIncomingCall()
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-close after 30 seconds if not answered
  useEffect(() => {
    if (hasIncomingCall) {
      const timer = setTimeout(() => {
        handleReject()
      }, 30000) // 30 seconds timeout

      return () => clearTimeout(timer)
    }
  }, [hasIncomingCall])

  const handleAccept = async () => {
    try {
      setIsAnimating(true)
      await answerCall()
      onClose()
    } catch (error) {
      console.error('Failed to answer call:', error)
      setIsAnimating(false)
    }
  }

  const handleReject = async () => {
    try {
      setIsAnimating(true)
      await rejectCall()
      onClose()
    } catch (error) {
      console.error('Failed to reject call:', error)
      setIsAnimating(false)
    }
  }

  // Don't render if no incoming call
  if (!hasIncomingCall || !incomingCall) {
    return null
  }

  // Format phone number for display
  const formatPhoneNumber = (phoneNumber: string) => {
    // Remove any non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '')
    
    // Format as (XXX) XXX-XXXX for US numbers
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      const number = cleaned.slice(1)
      return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`
    } else if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    
    return phoneNumber
  }

  return (
    <div className="fixed left-6 bottom-6 z-50 animate-slide-up">
      <div className="bg-figma-white rounded-lg p-6 w-[320px] shadow-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center animate-pulse">
            <PhoneIcon className="h-8 w-8 text-figma-white" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold text-figma-dark">
              {formatPhoneNumber(incomingCall.from)}
            </div>
            <div className="text-sm text-figma-gray">
              Incoming call
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-figma-gray hover:text-figma-dark transition-colors"
            disabled={isAnimating}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button 
            className="bg-[#7DBD4C] text-figma-white py-3 px-4 rounded-lg font-medium hover:bg-figma-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAccept}
            disabled={isAnimating}
          >
            {isAnimating ? 'Answering...' : 'Accept'}
          </button>
          <button 
            className="bg-figma-red text-figma-white py-3 px-4 rounded-lg font-medium hover:bg-figma-red/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
            onClick={handleReject}
            disabled={isAnimating}
          >
            {isAnimating ? 'Declining...' : 'Decline'}
          </button>
        </div>

        {/* Call Information */}
        <div className="text-xs text-figma-gray space-y-1">
          <div>To: {formatPhoneNumber(incomingCall.to)}</div>
          <div>Time: {incomingCall.timestamp.toLocaleTimeString()}</div>
        </div>

        {/* More Information Link */}
        <button 
          className="text-mainColor-500 hover:underline text-sm border-2 border-mainColor-500 rounded p-2 w-full mt-3 disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={onClose}
          disabled={isAnimating}
        >
          More Information
        </button>
      </div>
    </div>
  )
}