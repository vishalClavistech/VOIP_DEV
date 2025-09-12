import { CallRecord } from './types'

// Static mock data to prevent hydration issues
export const callsMock: CallRecord[] = [
  {
    id: '1',
    date: '04 Dec 2024, 16:21',
    fromNumber: '(414) 334 7441',
    contactName: 'Joe Smith',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'completed',
    summary: 'Billing question'
  },
  {
    id: '2',
    date: '04 Dec 2024, 15:45',
    fromNumber: '(312) 555 0123',
    contactName: 'Sarah Johnson',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Follow up call'
  },
  {
    id: '3',
    date: '04 Dec 2024, 14:30',
    fromNumber: '(773) 456 7890',
    contactName: 'Mike Wilson',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Left a voicemail'
  },
  {
    id: '4',
    date: '04 Dec 2024, 13:15',
    fromNumber: '(847) 123 4567',
    contactName: 'Emily Davis',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Technical support'
  },
  {
    id: '5',
    date: '04 Dec 2024, 12:00',
    fromNumber: '(630) 987 6543',
    contactName: 'David Brown',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Account inquiry'
  },
  {
    id: '6',
    date: '03 Dec 2024, 18:30',
    fromNumber: '(708) 234 5678',
    contactName: 'Lisa Anderson',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Service request'
  },
  {
    id: '7',
    date: '03 Dec 2024, 17:45',
    fromNumber: '(815) 345 6789',
    contactName: 'Tom Miller',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Complaint resolution'
  },
  {
    id: '8',
    date: '03 Dec 2024, 16:20',
    fromNumber: '(224) 456 7890',
    contactName: 'Amy Taylor',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Product information'
  },
  {
    id: '9',
    date: '03 Dec 2024, 15:10',
    fromNumber: '(331) 567 8901',
    contactName: 'Chris Garcia',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Payment issue'
  },
  {
    id: '10',
    date: '03 Dec 2024, 14:00',
    fromNumber: '(872) 678 9012',
    contactName: 'Jessica Martinez',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Appointment scheduling'
  },
  {
    id: '11',
    date: '02 Dec 2024, 19:15',
    fromNumber: '(414) 334 7441',
    contactName: 'Ryan Rodriguez',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'General inquiry'
  },
  {
    id: '12',
    date: '02 Dec 2024, 18:00',
    fromNumber: '(312) 555 0123',
    contactName: 'Jennifer Lee',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Refund request'
  },
  {
    id: '13',
    date: '02 Dec 2024, 16:45',
    fromNumber: '(773) 456 7890',
    contactName: 'Kevin White',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Upgrade inquiry'
  },
  {
    id: '14',
    date: '02 Dec 2024, 15:30',
    fromNumber: '(847) 123 4567',
    contactName: 'Michelle Harris',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Cancellation request'
  },
  {
    id: '15',
    date: '02 Dec 2024, 14:15',
    fromNumber: '(630) 987 6543',
    contactName: 'Daniel Clark',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'New customer onboarding'
  },
  {
    id: '16',
    date: '01 Dec 2024, 20:00',
    fromNumber: '(708) 234 5678',
    contactName: 'Ashley Lewis',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Billing question'
  },
  {
    id: '17',
    date: '01 Dec 2024, 19:30',
    fromNumber: '(815) 345 6789',
    contactName: 'Matthew Walker',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Follow up call'
  },
  {
    id: '18',
    date: '01 Dec 2024, 18:15',
    fromNumber: '(224) 456 7890',
    contactName: 'Amanda Hall',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Left a voicemail'
  },
  {
    id: '19',
    date: '01 Dec 2024, 17:00',
    fromNumber: '(331) 567 8901',
    contactName: 'James Allen',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Technical support'
  },
  {
    id: '20',
    date: '01 Dec 2024, 16:30',
    fromNumber: '(872) 678 9012',
    contactName: 'Stephanie Young',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Account inquiry'
  },
  {
    id: '21',
    date: '30 Nov 2024, 21:00',
    fromNumber: '(414) 334 7441',
    contactName: 'Joe Smith',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Service request'
  },
  {
    id: '22',
    date: '30 Nov 2024, 20:15',
    fromNumber: '(312) 555 0123',
    contactName: 'Sarah Johnson',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Complaint resolution'
  },
  {
    id: '23',
    date: '30 Nov 2024, 19:45',
    fromNumber: '(773) 456 7890',
    contactName: 'Mike Wilson',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Product information'
  },
  {
    id: '24',
    date: '30 Nov 2024, 18:30',
    fromNumber: '(847) 123 4567',
    contactName: 'Emily Davis',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Payment issue'
  },
  {
    id: '25',
    date: '30 Nov 2024, 17:15',
    fromNumber: '(630) 987 6543',
    contactName: 'David Brown',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Appointment scheduling'
  },
  {
    id: '26',
    date: '29 Nov 2024, 22:00',
    fromNumber: '(708) 234 5678',
    contactName: 'Lisa Anderson',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'General inquiry'
  },
  {
    id: '27',
    date: '29 Nov 2024, 21:30',
    fromNumber: '(815) 345 6789',
    contactName: 'Tom Miller',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'Refund request'
  },
  {
    id: '28',
    date: '29 Nov 2024, 20:45',
    fromNumber: '(224) 456 7890',
    contactName: 'Amy Taylor',
    hasVoicemail: false,
    direction: 'inbound',
    status: 'active',
    summary: 'Upgrade inquiry'
  },
  {
    id: '29',
    date: '29 Nov 2024, 19:30',
    fromNumber: '(331) 567 8901',
    contactName: 'Chris Garcia',
    hasVoicemail: true,
    direction: 'inbound',
    status: 'missed',
    summary: 'Cancellation request'
  },
  {
    id: '30',
    date: '29 Nov 2024, 18:15',
    fromNumber: '(872) 678 9012',
    contactName: 'Jessica Martinez',
    hasVoicemail: false,
    direction: 'outbound',
    status: 'completed',
    summary: 'New customer onboarding'
  }
]