export type CallDirection = 'inbound' | 'outbound'
export type CallStatus = 'active' | 'completed' | 'missed'

export type CallRecord = {
  id: string
  date: string
  fromNumber: string
  contactName?: string
  hasVoicemail: boolean
  direction: CallDirection
  status: CallStatus
  summary?: string
}

export type CallStats = {
  total: number
  completed: number
  missed: number
  voicemail: number
  active: number
}