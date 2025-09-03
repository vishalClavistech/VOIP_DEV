import { CallRecord } from './types'

export const callsMock: CallRecord[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    fromNumber: '(414) 334 7441',
    contactName: 'Joe Smith',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Billing question'
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    fromNumber: '(414) 334 7441',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Follow up call'
  },
  {
    id: '3',
    date: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    fromNumber: '(414) 334 7441',
    contactName: 'Joe Smith',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Left a voicemail'
  },
  {
    id: '4',
    date: new Date(Date.now() - 1000 * 60 * 220).toISOString(),
    fromNumber: '(414) 334 7441',
    contactName: 'Joe Smith',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'completed'
  }
]