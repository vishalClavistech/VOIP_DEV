#!/usr/bin/env node

/**
 * Twilio Setup Script
 * 
 * This script helps set up the Twilio integration by:
 * 1. Checking if environment variables are set
 * 2. Validating Twilio configuration
 * 3. Providing setup instructions
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function checkEnvironmentVariables() {
  log('\n🔍 Checking environment variables...', 'cyan')
  
  const envPath = path.join(__dirname, '..', '.env.local')
  const requiredVars = [
    'NEXT_PUBLIC_TWILIO_ACCOUNT_SID',
    'NEXT_PUBLIC_TWILIO_AUTH_TOKEN',
    'NEXT_PUBLIC_TWILIO_APPLICATION_SID',
    'NEXT_PUBLIC_TWILIO_PHONE_NUMBER',
  ]
  
  let allSet = true
  
  if (!fs.existsSync(envPath)) {
    log('❌ .env.local file not found', 'red')
    allSet = false
  } else {
    const envContent = fs.readFileSync(envPath, 'utf8')
    
    requiredVars.forEach(varName => {
      if (envContent.includes(`${varName}=your_`) || !envContent.includes(varName)) {
        log(`❌ ${varName} not properly configured`, 'red')
        allSet = false
      } else {
        log(`✅ ${varName} is set`, 'green')
      }
    })
  }
  
  return allSet
}

function checkDependencies() {
  log('\n📦 Checking dependencies...', 'cyan')
  
  const packageJsonPath = path.join(__dirname, '..', 'package.json')
  
  if (!fs.existsSync(packageJsonPath)) {
    log('❌ package.json not found', 'red')
    return false
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
  const hasTwilioSDK = packageJson.dependencies && packageJson.dependencies['@twilio/voice-sdk']
  
  if (hasTwilioSDK) {
    log('✅ @twilio/voice-sdk is installed', 'green')
    return true
  } else {
    log('❌ @twilio/voice-sdk is not installed', 'red')
    return false
  }
}

function displaySetupInstructions() {
  log('\n📋 Twilio Setup Instructions:', 'yellow')
  log('1. Create a Twilio account at https://www.twilio.com/', 'blue')
  log('2. Get your Account SID and Auth Token from the Twilio Console', 'blue')
  log('3. Create a TwiML Application:', 'blue')
  log('   - Go to Voice > TwiML > TwiML Apps', 'blue')
  log('   - Create a new TwiML App', 'blue')
  log('   - Set Voice URL to your webhook endpoint', 'blue')
  log('4. Configure your phone number:', 'blue')
  log('   - Go to Phone Numbers > Manage > Active numbers', 'blue')
  log('   - Click on your phone number', 'blue')
  log('   - Set Voice Configuration to use your TwiML App', 'blue')
  log('5. Update .env.local with your Twilio credentials', 'blue')
  log('6. Implement the capability token API endpoint', 'blue')
  log('7. Test the integration', 'blue')
}

function displayNextSteps() {
  log('\n🚀 Next Steps:', 'green')
  log('1. Update your .env.local file with real Twilio credentials', 'blue')
  log('2. Implement the capability token API endpoint in production', 'blue')
  log('3. Test incoming calls by calling your Twilio phone number', 'blue')
  log('4. Check the browser console for any errors', 'blue')
  log('5. Refer to TWILIO_INTEGRATION_GUIDE.md for detailed documentation', 'blue')
}

function main() {
  log('🎯 Twilio Integration Setup Checker', 'bright')
  log('=====================================', 'bright')
  
  const envOk = checkEnvironmentVariables()
  const depsOk = checkDependencies()
  
  if (envOk && depsOk) {
    log('\n✅ Twilio integration is properly configured!', 'green')
    displayNextSteps()
  } else {
    log('\n❌ Twilio integration needs configuration', 'red')
    displaySetupInstructions()
  }
  
  log('\n📚 For detailed documentation, see TWILIO_INTEGRATION_GUIDE.md', 'cyan')
}

// Run the script
main()