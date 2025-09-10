/**
 * Twilio Voice Service
 * 
 * This service handles Twilio Voice SDK integration for incoming and outgoing calls.
 * It manages device registration, call handling, and provides a clean API for the UI.
 */

import { Device, Call } from '@twilio/voice-sdk'
import { twilioConfig, isTwilioConfigured } from './twilio-config'

export interface IncomingCall {
  callSid: string
  from: string
  to: string
  call: Call
  timestamp: Date
}

export interface CallState {
  isConnected: boolean
  isRinging: boolean
  isMuted: boolean
  isOnHold: boolean
  duration: number
  direction: 'inbound' | 'outbound'
  status: string
}

export interface TwilioServiceCallbacks {
  onIncomingCall?: (call: IncomingCall) => void
  onCallStateChange?: (state: CallState) => void
  onDeviceReady?: () => void
  onDeviceError?: (error: Error) => void
  onCallEnded?: (call: Call) => void
}

class TwilioVoiceService {
  private device: Device | null = null
  private currentCall: Call | null = null
  private callbacks: TwilioServiceCallbacks = {}
  private isInitialized = false
  private callStartTime: Date | null = null
  private callTimer: NodeJS.Timeout | null = null

  constructor() {
    this.initializeDevice()
  }

  /**
   * Initialize Twilio Device
   */
  private async initializeDevice(): Promise<void> {
    // Only initialize on client side
    if (typeof window === 'undefined') {
      console.log('Twilio Device initialization skipped on server side')
      return
    }

    if (!isTwilioConfigured()) {
      console.error('Twilio is not properly configured. Please check your environment variables.')
      return
    }

    try {
      // Get capability token from your backend
      const token = await this.getCapabilityToken()
      
      // Initialize the device
      this.device = new Device(token, {
        logLevel: 1, // Debug level
      })

      // Set up event listeners
      this.setupDeviceEventListeners()
      
      this.isInitialized = true
      console.log('Twilio Device initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Twilio Device:', error)
      this.callbacks.onDeviceError?.(error as Error)
    }
  }

  /**
   * Get capability token from backend
   */
  private async getCapabilityToken(): Promise<string> {
    try {
      // Use window.location.origin to get the full URL
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
      const fullUrl = `${baseUrl}${twilioConfig.tokenUrl}`
      
      const response = await fetch(fullUrl)
      if (!response.ok) {
        throw new Error(`Failed to get capability token: ${response.statusText}`)
      }
      const data = await response.json()
      return data.token
    } catch (error) {
      console.error('Error getting capability token:', error)
      throw error
    }
  }

  /**
   * Set up device event listeners
   */
  private setupDeviceEventListeners(): void {
    if (!this.device) return

    // Device is ready
    this.device.on('registered', () => {
      console.log('Twilio Device registered and ready')
      this.callbacks.onDeviceReady?.()
    })

    // Device registration failed
    this.device.on('register', (error) => {
      console.error('Device registration failed:', error)
      this.callbacks.onDeviceError?.(error)
    })

    // Incoming call
    this.device.on('incoming', (call: Call) => {
      console.log('Incoming call received')
      
      const incomingCall: IncomingCall = {
        callSid: '', // Will be populated when call is accepted
        from: 'Unknown', // Will be populated from call parameters
        to: 'Unknown', // Will be populated from call parameters
        call,
        timestamp: new Date(),
      }

      this.currentCall = call
      this.setupCallEventListeners(call)
      this.callbacks.onIncomingCall?.(incomingCall)
    })

    // Device errors
    this.device.on('error', (error) => {
      console.error('Device error:', error)
      this.callbacks.onDeviceError?.(error)
    })
  }

  /**
   * Set up call event listeners
   */
  private setupCallEventListeners(call: Call): void {
    // Call state changes
    call.on('accept', () => {
      console.log('Call accepted')
      this.callStartTime = new Date()
      this.startCallTimer()
      this.updateCallState()
    })

    call.on('disconnect', () => {
      console.log('Call disconnected')
      this.stopCallTimer()
      this.currentCall = null
      this.callStartTime = null
      this.updateCallState()
      this.callbacks.onCallEnded?.(call)
    })

    call.on('cancel', () => {
      console.log('Call cancelled')
      this.stopCallTimer()
      this.currentCall = null
      this.callStartTime = null
      this.updateCallState()
      this.callbacks.onCallEnded?.(call)
    })

    call.on('reject', () => {
      console.log('Call rejected')
      this.stopCallTimer()
      this.currentCall = null
      this.callStartTime = null
      this.updateCallState()
      this.callbacks.onCallEnded?.(call)
    })
  }

  /**
   * Start call duration timer
   */
  private startCallTimer(): void {
    this.callTimer = setInterval(() => {
      this.updateCallState()
    }, 1000)
  }

  /**
   * Stop call duration timer
   */
  private stopCallTimer(): void {
    if (this.callTimer) {
      clearInterval(this.callTimer)
      this.callTimer = null
    }
  }

  /**
   * Update call state and notify callbacks
   */
  private updateCallState(): void {
    if (!this.currentCall) {
    this.callbacks.onCallStateChange?.({
      isConnected: false,
      isRinging: false,
      isMuted: false,
      isOnHold: false,
      duration: 0,
      direction: 'inbound',
      status: 'closed',
    })
      return
    }

    const duration = this.callStartTime 
      ? Math.floor((Date.now() - this.callStartTime.getTime()) / 1000)
      : 0

    const status = this.currentCall.status()
    const isConnected = status === 'open'
    const isRinging = status === 'ringing'

    this.callbacks.onCallStateChange?.({
      isConnected,
      isRinging,
      isMuted: this.currentCall.isMuted(),
      isOnHold: false, // Hold functionality not available in v2
      duration,
      direction: 'inbound',
      status,
    })
  }

  /**
   * Register callbacks
   */
  public setCallbacks(callbacks: TwilioServiceCallbacks): void {
    this.callbacks = { ...this.callbacks, ...callbacks }
  }

  /**
   * Answer incoming call
   */
  public async answerCall(): Promise<void> {
    if (!this.currentCall) {
      throw new Error('No active call to answer')
    }

    try {
      await this.currentCall.accept()
      console.log('Call answered successfully')
    } catch (error) {
      console.error('Failed to answer call:', error)
      throw error
    }
  }

  /**
   * Reject incoming call
   */
  public async rejectCall(): Promise<void> {
    if (!this.currentCall) {
      throw new Error('No active call to reject')
    }

    try {
      await this.currentCall.reject()
      console.log('Call rejected successfully')
    } catch (error) {
      console.error('Failed to reject call:', error)
      throw error
    }
  }

  /**
   * End current call
   */
  public async endCall(): Promise<void> {
    if (!this.currentCall) {
      throw new Error('No active call to end')
    }

    try {
      await this.currentCall.disconnect()
      console.log('Call ended successfully')
    } catch (error) {
      console.error('Failed to end call:', error)
      throw error
    }
  }

  /**
   * Mute/unmute current call
   */
  public async toggleMute(): Promise<boolean> {
    if (!this.currentCall) {
      throw new Error('No active call to mute')
    }

    try {
      const isMuted = this.currentCall.isMuted()
      if (isMuted) {
        await this.currentCall.mute(false)
      } else {
        await this.currentCall.mute(true)
      }
      this.updateCallState()
      return !isMuted
    } catch (error) {
      console.error('Failed to toggle mute:', error)
      throw error
    }
  }

  /**
   * Hold/unhold current call (Not available in Twilio Voice SDK v2)
   */
  public async toggleHold(): Promise<boolean> {
    console.warn('Hold functionality is not available in Twilio Voice SDK v2')
    return false
  }

  /**
   * Make outgoing call
   */
  public async makeCall(phoneNumber: string): Promise<void> {
    if (!this.device) {
      throw new Error('Device not initialized')
    }

    try {
      const call = await this.device.connect({
        params: {
          To: phoneNumber,
          From: twilioConfig.phoneNumber,
        }
      })

      this.currentCall = call
      this.setupCallEventListeners(call)
      console.log('Outgoing call initiated to:', phoneNumber)
    } catch (error) {
      console.error('Failed to make call:', error)
      throw error
    }
  }

  /**
   * Get current call state
   */
  public getCurrentCallState(): CallState | null {
    if (!this.currentCall) return null

    const duration = this.callStartTime 
      ? Math.floor((Date.now() - this.callStartTime.getTime()) / 1000)
      : 0

    const status = this.currentCall.status()
    const isConnected = status === 'open'
    const isRinging = status === 'ringing'

    return {
      isConnected,
      isRinging,
      isMuted: this.currentCall.isMuted(),
      isOnHold: false, // Hold functionality not available in v2
      duration,
      direction: 'inbound',
      status,
    }
  }

  /**
   * Check if device is ready
   */
  public isDeviceReady(): boolean {
    return this.device?.state === Device.State.Registered
  }

  /**
   * Check if there's an active call
   */
  public hasActiveCall(): boolean {
    return this.currentCall !== null
  }

  /**
   * Destroy the service and cleanup
   */
  public destroy(): void {
    if (this.currentCall) {
      this.currentCall.disconnect()
    }
    
    if (this.device) {
      this.device.destroy()
    }
    
    this.stopCallTimer()
    this.isInitialized = false
  }
}

// Export singleton instance
export const twilioService = new TwilioVoiceService()