# Twilio Voice SDK Integration Guide

This guide explains how to integrate Twilio Voice SDK with the VoIP Dashboard to receive incoming calls on the web with popup notifications.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Setup Instructions](#setup-instructions)
4. [Configuration](#configuration)
5. [Architecture](#architecture)
6. [API Reference](#api-reference)
7. [Usage Examples](#usage-examples)
8. [Troubleshooting](#troubleshooting)
9. [Production Considerations](#production-considerations)

## Overview

The Twilio integration provides:
- **Incoming Call Notifications**: Real-time popup notifications when calls are received
- **Call Management**: Answer, reject, mute, hold, and end calls
- **Device Registration**: Automatic Twilio device registration and management
- **Call State Management**: Real-time call state updates and duration tracking
- **Error Handling**: Comprehensive error handling and user feedback

## Prerequisites

Before setting up the Twilio integration, ensure you have:

1. **Twilio Account**: A Twilio account with Voice capabilities
2. **Twilio Phone Number**: A Twilio phone number for receiving calls
3. **Twilio Application**: A TwiML application configured for voice calls
4. **Node.js**: Version 16 or higher
5. **Next.js**: Version 13 or higher

## Setup Instructions

### 1. Install Dependencies

The Twilio Voice SDK has been installed with the following command:

```bash
npm install @twilio/voice-sdk --legacy-peer-deps
```

### 2. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```env
# Twilio Configuration
NEXT_PUBLIC_TWILIO_ACCOUNT_SID=your_account_sid_here
NEXT_PUBLIC_TWILIO_AUTH_TOKEN=your_auth_token_here
NEXT_PUBLIC_TWILIO_APPLICATION_SID=your_application_sid_here
NEXT_PUBLIC_TWILIO_PHONE_NUMBER=your_twilio_phone_number_here

# Twilio Capability Token (for client-side authentication)
NEXT_PUBLIC_TWILIO_CAPABILITY_TOKEN_URL=/api/twilio/token
```

### 3. Twilio Console Setup

1. **Create a TwiML Application**:
   - Go to [Twilio Console > Voice > TwiML > TwiML Apps](https://console.twilio.com/us1/develop/voice/manage/twiml-apps)
   - Click "Create new TwiML App"
   - Set the Voice URL to your webhook endpoint (e.g., `https://yourdomain.com/api/twilio/voice`)
   - Save the Application SID

2. **Configure Your Phone Number**:
   - Go to [Twilio Console > Phone Numbers > Manage > Active numbers](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming)
   - Click on your phone number
   - Set the Voice Configuration to use your TwiML App
   - Save the configuration

## Configuration

### Twilio Configuration File

The configuration is managed in `src/lib/twilio-config.ts`:

```typescript
export const twilioConfig = {
  accountSid: process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID || '',
  authToken: process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN || '',
  applicationSid: process.env.NEXT_PUBLIC_TWILIO_APPLICATION_SID || '',
  phoneNumber: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER || '',
  tokenUrl: process.env.NEXT_PUBLIC_TWILIO_CAPABILITY_TOKEN_URL || '/api/twilio/token',
  defaultSettings: {
    ringTimeout: 30,
    enableNotifications: true,
    autoAnswer: false,
    enableRecording: false,
  }
}
```

### Validation

Use the `isTwilioConfigured()` function to check if Twilio is properly configured:

```typescript
import { isTwilioConfigured } from '@/lib/twilio-config'

if (!isTwilioConfigured()) {
  console.error('Twilio is not properly configured')
}
```

## Architecture

### Component Structure

```
src/
├── lib/
│   ├── twilio-config.ts          # Configuration management
│   └── twilio-service.ts         # Core Twilio service
├── contexts/
│   └── TwilioContext.tsx         # React context for state management
├── components/
│   └── incoming/
│       └── IncomingCallToast.tsx # Incoming call popup component
└── app/
    └── api/
        └── twilio/
            └── token/
                └── route.ts      # Capability token API endpoint
```

### Data Flow

1. **Initialization**: TwilioProvider initializes the Twilio service
2. **Device Registration**: Service registers with Twilio using capability token
3. **Incoming Call**: Twilio sends call to registered device
4. **Notification**: IncomingCallToast displays popup notification
5. **User Action**: User can answer, reject, or let it timeout
6. **Call Management**: Service handles call state and user interactions

## API Reference

### TwilioService

The main service class for managing Twilio Voice SDK operations.

#### Methods

##### `answerCall(): Promise<void>`
Answers the current incoming call.

```typescript
try {
  await twilioService.answerCall()
} catch (error) {
  console.error('Failed to answer call:', error)
}
```

##### `rejectCall(): Promise<void>`
Rejects the current incoming call.

```typescript
try {
  await twilioService.rejectCall()
} catch (error) {
  console.error('Failed to reject call:', error)
}
```

##### `endCall(): Promise<void>`
Ends the current active call.

```typescript
try {
  await twilioService.endCall()
} catch (error) {
  console.error('Failed to end call:', error)
}
```

##### `toggleMute(): Promise<boolean>`
Toggles mute state of the current call. Returns the new mute state.

```typescript
const isMuted = await twilioService.toggleMute()
console.log('Call is muted:', isMuted)
```

##### `toggleHold(): Promise<boolean>`
Toggles hold state of the current call. Returns the new hold state.

```typescript
const isOnHold = await twilioService.toggleHold()
console.log('Call is on hold:', isOnHold)
```

##### `makeCall(phoneNumber: string): Promise<void>`
Makes an outgoing call to the specified phone number.

```typescript
try {
  await twilioService.makeCall('+1234567890')
} catch (error) {
  console.error('Failed to make call:', error)
}
```

#### Properties

##### `isDeviceReady(): boolean`
Returns whether the Twilio device is ready and registered.

##### `hasActiveCall(): boolean`
Returns whether there is currently an active call.

##### `getCurrentCallState(): CallState | null`
Returns the current call state information.

### React Hooks

#### `useTwilio()`
Main hook for accessing Twilio functionality.

```typescript
import { useTwilio } from '@/contexts/TwilioContext'

function MyComponent() {
  const { 
    incomingCall, 
    currentCallState, 
    isDeviceReady, 
    answerCall, 
    rejectCall 
  } = useTwilio()
  
  // Component logic
}
```

#### `useIncomingCall()`
Hook specifically for incoming call management.

```typescript
import { useIncomingCall } from '@/contexts/TwilioContext'

function IncomingCallComponent() {
  const { 
    incomingCall, 
    hasIncomingCall, 
    answerCall, 
    rejectCall 
  } = useIncomingCall()
  
  // Component logic
}
```

#### `useCallControls()`
Hook for call control functionality.

```typescript
import { useCallControls } from '@/contexts/TwilioContext'

function CallControls() {
  const { 
    currentCallState, 
    hasActiveCall, 
    toggleMute, 
    toggleHold, 
    endCall 
  } = useCallControls()
  
  // Component logic
}
```

## Usage Examples

### Basic Incoming Call Handling

```typescript
import { useIncomingCall } from '@/contexts/TwilioContext'

function CallNotification() {
  const { incomingCall, hasIncomingCall, answerCall, rejectCall } = useIncomingCall()

  if (!hasIncomingCall) return null

  return (
    <div className="incoming-call-popup">
      <h3>Incoming Call from {incomingCall?.from}</h3>
      <button onClick={answerCall}>Answer</button>
      <button onClick={rejectCall}>Reject</button>
    </div>
  )
}
```

### Call Controls

```typescript
import { useCallControls } from '@/contexts/TwilioContext'

function CallControls() {
  const { 
    currentCallState, 
    hasActiveCall, 
    toggleMute, 
    toggleHold, 
    endCall 
  } = useCallControls()

  if (!hasActiveCall) return null

  return (
    <div className="call-controls">
      <button onClick={toggleMute}>
        {currentCallState?.isMuted ? 'Unmute' : 'Mute'}
      </button>
      <button onClick={toggleHold}>
        {currentCallState?.isOnHold ? 'Resume' : 'Hold'}
      </button>
      <button onClick={endCall}>End Call</button>
    </div>
  )
}
```

### Making Outgoing Calls

```typescript
import { useTwilio } from '@/contexts/TwilioContext'

function Dialer() {
  const { makeCall } = useTwilio()
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleCall = async () => {
    try {
      await makeCall(phoneNumber)
    } catch (error) {
      console.error('Call failed:', error)
    }
  }

  return (
    <div>
      <input 
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
      />
      <button onClick={handleCall}>Call</button>
    </div>
  )
}
```

## Troubleshooting

### Common Issues

#### 1. Device Not Registering

**Problem**: Twilio device fails to register
**Solution**: 
- Check if all environment variables are set correctly
- Verify the capability token is being generated properly
- Check browser console for error messages

#### 2. Incoming Calls Not Received

**Problem**: No incoming call notifications appear
**Solution**:
- Verify TwiML application is configured correctly
- Check if phone number is properly configured in Twilio Console
- Ensure webhook URL is accessible and returns valid TwiML

#### 3. Capability Token Errors

**Problem**: "Failed to get capability token" error
**Solution**:
- Check if the token API endpoint is working
- Verify Twilio credentials are correct
- Ensure the API route is properly configured

#### 4. Audio Issues

**Problem**: No audio during calls
**Solution**:
- Check browser permissions for microphone access
- Verify HTTPS is enabled (required for WebRTC)
- Check if audio codecs are supported

### Debug Mode

Enable debug logging by setting the log level in the Twilio service:

```typescript
this.device = new Device(token, {
  logLevel: 1, // Debug level
  // ... other options
})
```

### Browser Compatibility

The Twilio Voice SDK requires:
- Modern browsers with WebRTC support
- HTTPS connection (required for WebRTC)
- Microphone permissions

Supported browsers:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Production Considerations

### Security

1. **Capability Token Generation**: Implement proper server-side token generation with user authentication
2. **Environment Variables**: Use secure environment variable management
3. **HTTPS**: Ensure all connections use HTTPS
4. **CORS**: Configure CORS properly for your domain

### Performance

1. **Token Refresh**: Implement automatic token refresh before expiration
2. **Error Handling**: Implement comprehensive error handling and retry logic
3. **Resource Cleanup**: Ensure proper cleanup of device and call resources

### Monitoring

1. **Call Logging**: Log all call events for monitoring and debugging
2. **Error Tracking**: Implement error tracking and alerting
3. **Performance Metrics**: Monitor call quality and connection stability

### Example Production Token Generation

```typescript
// src/app/api/twilio/token/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { AccessToken } from 'twilio'

export async function GET(request: NextRequest) {
  try {
    // Authenticate user (implement your auth logic)
    const user = await authenticateUser(request)
    
    // Generate capability token
    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_API_KEY!,
      process.env.TWILIO_API_SECRET!,
      { identity: user.id }
    )
    
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_APPLICATION_SID!,
      incomingAllow: true,
    })
    
    token.addGrant(voiceGrant)
    
    return NextResponse.json({ token: token.toJwt() })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
}
```

## Support

For additional support:
- [Twilio Voice SDK Documentation](https://www.twilio.com/docs/voice/sdk)
- [Twilio Console](https://console.twilio.com/)
- [Twilio Support](https://support.twilio.com/)

## License

This integration is part of the VoIP Dashboard project and follows the same license terms.