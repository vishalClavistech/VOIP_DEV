# Call Modal Features

## Overview
The CallModal component provides a clean, modern call interface similar to the Bandwidth Ericsson screen, featuring streamlined call controls and notes functionality with a focus on essential features.

## Features

### Call Controls
- **Mute/Unmute**: Toggle microphone on/off with visual feedback
- **Hold/Resume**: Put call on hold or resume with warning color
- **Dial Pad**: Access to interactive phone keypad

### Dial Pad
- **Interactive Dial Pad**: Full numeric keypad with *, 0, # keys
- **Number Display**: Shows entered number
- **Clear Function**: Clear entered number
- **Make Call**: Initiate call with entered number

### Call Information
- **Contact Display**: Shows caller name and number
- **Call Duration**: Real-time timer showing call length
- **Call Direction**: Visual indicator for inbound/outbound calls
- **Call Status**: Active call indicator with pulsing animation

### Notes and Tags
- **Call Notes**: Large text area for detailed call notes
- **Tags**: Comma-separated tags for call categorization
- **Save Functionality**: Validates and saves notes with error handling

### Quick Actions
- **Add**: Add participant to the call
- **Transfer**: Transfer call to another agent
- **More**: Additional call options

### Call States
- **Incoming Call**: Shows answer/decline buttons
- **Active Call**: Shows end call and save notes buttons
- **Call Controls**: All controls available during active calls

## Usage

### Opening the Modal
1. Click the blue floating "Make a call" button (bottom right)
2. In the customer information modal, click the green "Call Modal" button
3. Or trigger programmatically with `setShowCallModal(true)`

### Making Calls
1. Open the modal
2. Click "Show" on the Dial Pad section
3. Enter phone number using the keypad
4. Click "Call" to initiate

### Taking Notes
1. Use the "Call Notes" text area to add detailed notes
2. Add comma-separated tags in the "Tags" field
3. Click "Save Notes" to save with validation

### Call Controls
- All controls are immediately responsive
- Visual feedback shows active states
- Controls persist throughout the call session

## Integration
The CallModal is fully integrated into the CallCenter component and can be triggered from:
- Make Call Modal (customer information modal)
- Programmatic calls
- Call record interactions

## Layout
- **Make Call Button**: Blue floating button at bottom right corner
- **Call Modal Button**: Green button inside the Make Call Modal
- **Both buttons**: Positioned at the right bottom corner as requested

## Design Features
- **Clean Interface**: Streamlined design focusing on essential controls
- **Centered Layout**: Profile picture and contact name prominently displayed
- **Visual Hierarchy**: Clear separation between primary and secondary actions
- **Compact Modal**: Smaller width (max-w-md) for focused experience
- **Professional Appearance**: Modern, minimalist design similar to reference interface

## Styling
- Uses Figma design system colors
- Responsive layout (mobile-friendly)
- Smooth animations and transitions
- Professional call center appearance