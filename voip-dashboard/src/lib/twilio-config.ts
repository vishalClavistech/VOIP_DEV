/**
 * Twilio Configuration
 * 
 * This file contains the configuration for Twilio Voice SDK integration.
 * Make sure to set the environment variables in .env.local
 */

export const twilioConfig = {
  // Twilio Account SID
  accountSid: process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID || '',
  
  // Twilio Auth Token (for server-side operations)
  authToken: process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN || '',
  
  // Twilio Application SID (for Voice SDK)
  applicationSid: process.env.NEXT_PUBLIC_TWILIO_APPLICATION_SID || '',
  
  // Twilio Phone Number
  phoneNumber: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER || '',
  
  // API endpoint for generating capability tokens
  tokenUrl: process.env.NEXT_PUBLIC_TWILIO_CAPABILITY_TOKEN_URL || '/api/twilio/token',
  
  // Default settings
  defaultSettings: {
    // Ring timeout in seconds
    ringTimeout: 30,
    
    // Enable/disable incoming call notifications
    enableNotifications: true,
    
    // Auto-answer incoming calls (set to false for manual answering)
    autoAnswer: false,
    
    // Enable/disable call recording
    enableRecording: false,
  }
}

// Validation function to check if Twilio is properly configured
export const isTwilioConfigured = (): boolean => {
  return !!(
    twilioConfig.accountSid &&
    twilioConfig.applicationSid &&
    twilioConfig.phoneNumber
  )
}

// Get Twilio configuration for client-side use
export const getClientConfig = () => ({
  accountSid: twilioConfig.accountSid,
  applicationSid: twilioConfig.applicationSid,
  phoneNumber: twilioConfig.phoneNumber,
  tokenUrl: twilioConfig.tokenUrl,
  settings: twilioConfig.defaultSettings,
})