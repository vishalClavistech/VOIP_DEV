/**
 * Twilio Context
 * 
 * React context for managing Twilio Voice SDK state and incoming calls.
 * Provides a clean interface for components to interact with Twilio services.
 */

"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { twilioService, IncomingCall, CallState, TwilioServiceCallbacks } from '@/lib/twilio-service'

interface TwilioContextType {
  // Call state
  incomingCall: IncomingCall | null
  currentCallState: CallState | null
  isDeviceReady: boolean
  hasActiveCall: boolean
  
  // Call actions
  answerCall: () => Promise<void>
  rejectCall: () => Promise<void>
  endCall: () => Promise<void>
  toggleMute: () => Promise<boolean>
  toggleHold: () => Promise<boolean>
  makeCall: (phoneNumber: string) => Promise<void>
  
  // Device state
  isInitialized: boolean
  error: string | null
}

const TwilioContext = createContext<TwilioContextType | undefined>(undefined)

interface TwilioProviderProps {
  children: React.ReactNode
}

export function TwilioProvider({ children }: TwilioProviderProps) {
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null)
  const [currentCallState, setCurrentCallState] = useState<CallState | null>(null)
  const [isDeviceReady, setIsDeviceReady] = useState(false)
  const [hasActiveCall, setHasActiveCall] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize Twilio service
  useEffect(() => {
    // Only initialize on client side
    if (typeof window === 'undefined') {
      return
    }

    const initializeTwilio = async () => {
      try {
        // Set up callbacks
        const callbacks: TwilioServiceCallbacks = {
          onIncomingCall: (call: IncomingCall) => {
            console.log('Incoming call received:', call)
            setIncomingCall(call)
            setHasActiveCall(true)
          },
          
          onCallStateChange: (state: CallState) => {
            console.log('Call state changed:', state)
            setCurrentCallState(state)
            setHasActiveCall(state.isConnected || state.isRinging)
          },
          
          onDeviceReady: () => {
            console.log('Twilio device ready')
            setIsDeviceReady(true)
            setIsInitialized(true)
            setError(null)
          },
          
          onDeviceError: (err: Error) => {
            console.error('Twilio device error:', err)
            setError(err.message)
            setIsDeviceReady(false)
          },
          
          onCallEnded: (call) => {
            console.log('Call ended:', call)
            setIncomingCall(null)
            setCurrentCallState(null)
            setHasActiveCall(false)
          },
        }

        twilioService.setCallbacks(callbacks)
        setIsInitialized(true)
      } catch (err) {
        console.error('Failed to initialize Twilio:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize Twilio')
        // Don't set isInitialized to true if there's an error
        setIsInitialized(false)
      }
    }

    initializeTwilio()

    // Cleanup on unmount
    return () => {
      twilioService.destroy()
    }
  }, [])

  // Answer incoming call
  const answerCall = useCallback(async () => {
    if (!isInitialized) {
      console.warn('Twilio service not initialized')
      return
    }
    try {
      await twilioService.answerCall()
      setIncomingCall(null) // Clear incoming call state after answering
    } catch (err) {
      console.error('Failed to answer call:', err)
      setError(err instanceof Error ? err.message : 'Failed to answer call')
    }
  }, [isInitialized])

  // Reject incoming call
  const rejectCall = useCallback(async () => {
    if (!isInitialized) {
      console.warn('Twilio service not initialized')
      return
    }
    try {
      await twilioService.rejectCall()
      setIncomingCall(null)
    } catch (err) {
      console.error('Failed to reject call:', err)
      setError(err instanceof Error ? err.message : 'Failed to reject call')
    }
  }, [isInitialized])

  // End current call
  const endCall = useCallback(async () => {
    if (!isInitialized) {
      console.warn('Twilio service not initialized')
      return
    }
    try {
      await twilioService.endCall()
    } catch (err) {
      console.error('Failed to end call:', err)
      setError(err instanceof Error ? err.message : 'Failed to end call')
    }
  }, [isInitialized])

  // Toggle mute
  const toggleMute = useCallback(async (): Promise<boolean> => {
    if (!isInitialized) {
      console.warn('Twilio service not initialized')
      return false
    }
    try {
      const isMuted = await twilioService.toggleMute()
      return isMuted
    } catch (err) {
      console.error('Failed to toggle mute:', err)
      setError(err instanceof Error ? err.message : 'Failed to toggle mute')
      return false
    }
  }, [isInitialized])

  // Toggle hold
  const toggleHold = useCallback(async (): Promise<boolean> => {
    if (!isInitialized) {
      console.warn('Twilio service not initialized')
      return false
    }
    try {
      const isOnHold = await twilioService.toggleHold()
      return isOnHold
    } catch (err) {
      console.error('Failed to toggle hold:', err)
      setError(err instanceof Error ? err.message : 'Failed to toggle hold')
      return false
    }
  }, [isInitialized])

  // Make outgoing call
  const makeCall = useCallback(async (phoneNumber: string) => {
    if (!isInitialized) {
      console.warn('Twilio service not initialized')
      return
    }
    try {
      await twilioService.makeCall(phoneNumber)
    } catch (err) {
      console.error('Failed to make call:', err)
      setError(err instanceof Error ? err.message : 'Failed to make call')
    }
  }, [isInitialized])

  // Clear error
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value: TwilioContextType = {
    incomingCall,
    currentCallState,
    isDeviceReady,
    hasActiveCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleHold,
    makeCall,
    isInitialized,
    error,
  }

  return (
    <TwilioContext.Provider value={value}>
      {children}
    </TwilioContext.Provider>
  )
}

// Custom hook to use Twilio context
export function useTwilio(): TwilioContextType {
  const context = useContext(TwilioContext)
  if (context === undefined) {
    throw new Error('useTwilio must be used within a TwilioProvider')
  }
  return context
}

// Hook for incoming call notifications
export function useIncomingCall() {
  const { incomingCall, answerCall, rejectCall } = useTwilio()
  
  return {
    incomingCall,
    answerCall,
    rejectCall,
    hasIncomingCall: incomingCall !== null,
  }
}

// Hook for call controls
export function useCallControls() {
  const { 
    currentCallState, 
    hasActiveCall, 
    answerCall, 
    rejectCall, 
    endCall, 
    toggleMute, 
    toggleHold 
  } = useTwilio()
  
  return {
    currentCallState,
    hasActiveCall,
    answerCall,
    rejectCall,
    endCall,
    toggleMute,
    toggleHold,
  }
}