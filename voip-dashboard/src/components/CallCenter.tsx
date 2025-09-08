"use client"

import { useState, useEffect } from 'react'
import { 
  MagnifyingGlassIcon, 
  PhoneIcon,
  UserCircleIcon,
  CalendarIcon,
  DocumentArrowDownIcon,
  CheckIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  PlusIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline'
import { CallRecord, CallStats } from '@/lib/types'
import { formatDateTime } from '@/lib/utils'
import { ActiveCallPanel } from './active-call/ActiveCallPanel'
import { IncomingCallToast } from './incoming/IncomingCallToast'
import { Modal } from './Modal'
import { CallModal } from './CallModal'
import { VoipSettings } from './VoipSettings'

type Props = {
  readonly stats: CallStats
  readonly query: string
  readonly setQuery: (q: string) => void
  readonly rows: CallRecord[]
}

export function CallCenter({ stats, query, setQuery, rows }: Props) {
  const [showActive, setShowActive] = useState(false) // Start closed
  const [showReceivePopup, setShowReceivePopup] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [showMakeCallPopup, setShowMakeCallPopup] = useState(false)
  const [showTestButton, setShowTestButton] = useState(true)
  
  // Modal states
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false)
  const [showConversationModal, setShowConversationModal] = useState(false)
  const [showTeamNotesModal, setShowTeamNotesModal] = useState(false)
  const [showParsedDataModal, setShowParsedDataModal] = useState(false)
  const [showAudioModal, setShowAudioModal] = useState(false)
  const [showCallModal, setShowCallModal] = useState(false)
  const [selectedCall, setSelectedCall] = useState<CallRecord | null>(null)
  const [customerName, setCustomerName] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [callTimes, setCallTimes] = useState<Record<string, number>>({})

  // Generate call times only on client side to avoid hydration mismatch
  useEffect(() => {
    const times: Record<string, number> = {}
    rows.forEach((row) => {
      times[row.id] = Math.floor(Math.random() * 200) + 10
    })
    setCallTimes(times)
  }, [rows])

  // Function to handle making calls
  const handleMakeCall = (phoneNumber: string) => {
    // Create a mock call record for the modal
    const mockCall: CallRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      fromNumber: phoneNumber,
      contactName: 'New Call',
      hasVoicemail: false,
      direction: 'outbound',
      status: 'active'
    }
    setSelectedCall(mockCall)
    setShowCallModal(true)
    setShowMakeCallPopup(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-6 py-6">
          <div className="tabs tabs-bordered">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`tab tab-bordered flex items-center gap-2 me-2 py-4 h-auto rounded-md text-md bg-gradient-to-r from-primary-500 to-success-500 text-white ${
                activeTab === 'dashboard' ? 'tab-active' : ''
              }`}
            >
              <PhoneIcon className="h-4 w-4" />
              Dashboard
            </button>
            <button
  onClick={() => setActiveTab('settings')}
  className={`
    relative flex items-center gap-2 h-auto rounded-md
    bg-gradient-to-r from-primary-500 to-success-500
    p-[2px]
    focus:outline-none focus:ring-4 focus:ring-primary-500
    ${activeTab === 'settings' ? 'tab-active' : ''}
  `}
>
  {/* Inner white background */}
  <div className="flex items-center gap-2 rounded-md bg-white w-full h-full px-4 py-2">
    <UserCircleIcon
      className="h-4 w-4 text-primary"
    />
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-success-500 font-medium">
      Settings
    </span>
  </div>
</button>


          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {activeTab === 'dashboard' && (
          <>
            {/* Stats, Search and Export in Same Row */}
            <div className="flex items-center gap-4 mb-6">
              {/* Stats Grid */}
              <div className="flex gap-3 flex-1">
                <StatCard 
                  label="Total Calls" 
                  value={stats.total} 
                  color="blue"
                  size="small"
                />
                <StatCard 
                  label="Completed Calls" 
                  value={stats.completed} 
                  color="default"
                  size="small"
                />
                <StatCard 
                  label="Missed Calls" 
                  value={stats.missed} 
                  color="default"
                />
                <StatCard 
                  label="Voicemail" 
                  value={1} 
                  color="default"
                />
                <StatCard 
                  label="Active Call" 
                  value={stats.active} 
                  color="green"
                />
        </div>

              {/* Search and Filter Bar */}
              <div className="flex items-center gap-4">
                <div className="form-control">
                  <div className="input-group">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search"
                      className="input input-bordered w-64"
                    />
                    <button className="btn btn-square">
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="form-control">
                  <div className="input-group flex">
                    <input
                      placeholder="Date range"
                      className="input input-bordered"
                    />
                    <button className="btn btn-square">
                      <CalendarIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <button className="flex items-center gap-2 me-2 p-4 h-auto rounded-md text-md bg-gradient-to-r from-primary-500 to-success-500 text-white">
                  {/* <DocumentArrowDownIcon className="h-4 w-4" /> */}
                  Export CSV
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'settings' && <VoipSettings />}

        {/* Call Logs Table - Only show on Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="card bg-white shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-gray-50">
                <tr>
                    <Th><CheckIcon className="h-4 w-4" /></Th>
                  <Th>Date</Th>
                  <Th>From number</Th>
                  <Th>Contact name</Th>
                  <Th>Call transcript</Th>
                  <Th>Call recording</Th>
                  <Th>Summary</Th>
                  <Th>Direction</Th>
                    <Th>Team Notes</Th>
                    <Th>Call time</Th>
                    <Th>Call Status</Th>
                    <Th>Parsed Data</Th>
                </tr>
              </thead>
                <tbody>
                {rows.map((row) => (
                    <tr key={row.id} className="hover">
                      <Td>
                        <input type="checkbox" className="checkbox checkbox-sm" />
                      </Td>
                      <Td>
                        <div className="text-sm font-medium text-gray-900">{formatDateTime(row.date)}</div>
                      </Td>
                      <Td>
                        <div className="font-mono text-sm text-gray-900">{row.fromNumber}</div>
                      </Td>
                      <Td>
                        <button 
                          onClick={() => {
                            setSelectedCall(row)
                            setShowAddCustomerModal(true)
                          }}
                          className="text-figma-blue hover:underline text-sm flex items-center gap-1"
                        >
                          {row.contactName ? row.contactName : (
                            <>
                              <PlusIcon className="h-3 w-3" />
                              Add
                            </>
                          )}
                        </button>
                      </Td>
                      <Td>
                        <button 
                          onClick={() => {
                            setSelectedCall(row)
                            setShowConversationModal(true)
                          }}
                          className="text-figma-blue hover:underline text-sm flex items-center gap-1"
                        >
                          <EyeIcon className="h-3 w-3" />
                          View Details
                        </button>
                      </Td>
                      <Td>
                        <button 
                          onClick={() => {
                            setSelectedCall(row)
                            setShowAudioModal(true)
                          }}
                          className="text-figma-blue hover:underline text-sm flex items-center gap-1"
                        >
                          <PlayIcon className="h-3 w-3" />
                          Listen
                        </button>
                      </Td>
                      <Td>
                        <button 
                          onClick={() => {
                            setSelectedCall(row)
                            setShowConversationModal(true)
                          }}
                          className="text-figma-blue hover:underline text-sm flex items-center gap-1"
                        >
                          <EyeIcon className="h-3 w-3" />
                          View Details
                        </button>
                    </Td>
                    <Td>
                        <span className="text-sm text-figma-dark capitalize">{row.direction}</span>
                    </Td>
                    <Td>
                        <button 
                          onClick={() => {
                            setSelectedCall(row)
                            setShowTeamNotesModal(true)
                          }}
                          className="text-figma-blue hover:underline text-sm"
                        >
                          View Notes
                      </button>
                    </Td>
                    <Td>
                        <span className="text-sm text-figma-dark">{callTimes[row.id] || '--'}</span>
                      </Td>
                      <Td>
                        {(() => {
                          let statusColor = 'text-figma-blue';
                          if (row.status === 'completed') {
                            statusColor = 'text-figma-green';
                          } else if (row.status === 'missed') {
                            statusColor = 'text-figma-red';
                          }
                          
                          let statusText = 'Voicemail';
                          if (row.status === 'completed') {
                            statusText = 'Completed';
                          } else if (row.status === 'missed') {
                            statusText = 'Missed';
                          }
                          
                          return (
                            <span className={`text-sm font-bold capitalize ${statusColor}`}>
                              {statusText}
                            </span>
                          );
                        })()}
                      </Td>
                      <Td>
                        <button 
                          onClick={() => {
                            setSelectedCall(row)
                            setShowParsedDataModal(true)
                          }}
                          className="px-3 py-1 bg-figma-blue text-figma-white text-xs rounded hover:bg-figma-blue/90"
                        >
                          View Parsed Data
                        </button>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Active Call Panel */}
        {showActive && (
          <ActiveCallPanel onClose={() => setShowActive(false)} />
        )}

        {/* Receive Popup */}
        {showReceivePopup && (
          <IncomingCallToast onClose={() => {
            setShowReceivePopup(false)
            setShowTestButton(true)
          }} />
        )}

        {/* Test Button for Incoming Call - Remove in production */}
        {showTestButton && (
          <button 
            onClick={() => {
              setShowReceivePopup(true)
              setShowTestButton(false)
            }}
            className="fixed bottom-6 left-6 px-4 py-2 bg-figma-green text-figma-white rounded-lg text-sm z-50"
          >
            Test Incoming Call
          </button>
        )}
    </main>

      {/* Floating Make a Call Button */}
      <button 
        onClick={() => setShowMakeCallPopup(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-figma-blue rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      >
        <PhoneIcon className="h-8 w-8 text-figma-white" />
      </button>
      <div className="fixed bottom-2 right-2 text-xs text-figma-gray text-center">
        <div>Make a call</div>
      </div>


      {/* Customer Information Modal */}
      <Modal
        isOpen={showMakeCallPopup}
        onClose={() => setShowMakeCallPopup(false)}
        title=""
        width="w-[500px]"
      >
        <div className="space-y-6">
          {/* Customer Name */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-figma-dark">John Doe</h2>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button className="px-4 py-2 bg-gradient-to-r from-figma-blue to-figma-green text-figma-white rounded-t-lg font-medium">
              Customer Information
            </button>
            <button className="px-4 py-2 text-figma-gray hover:text-figma-dark font-medium">
              Call History
            </button>
            <button className="px-4 py-2 text-figma-gray hover:text-figma-dark font-medium">
              Job History
            </button>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <div>
              <div className="block text-sm font-medium text-figma-gray mb-1">Phone</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-figma-dark">(123) 456 7890</span>
                  <span className="text-xs bg-figma-blueLight text-figma-blue px-2 py-1 rounded">Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-figma-dark">(123) 456 7890</span>
                  <span className="text-xs bg-figma-grayLight text-figma-gray px-2 py-1 rounded">Internal</span>
                </div>
              </div>
            </div>

            <div>
              <div className="block text-sm font-medium text-figma-gray mb-1">Address</div>
              <div className="flex items-center gap-2">
                <span className="text-figma-dark">123 Address st. City, Country 122345</span>
                <span className="text-xs bg-figma-grayLight text-figma-gray px-2 py-1 rounded">Home</span>
              </div>
            </div>

            <div>
              <div className="block text-sm font-medium text-figma-gray mb-1">Email</div>
              <span className="text-figma-dark">yourmail@mail.com</span>
            </div>

            <div>
              <div className="block text-sm font-medium text-figma-gray mb-1">Customer tags</div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">sales</span>
                <span className="px-3 py-1 bg-figma-blueLight text-figma-blue text-xs rounded-full">support</span>
                <button className="w-6 h-6 bg-figma-grayLight text-figma-gray rounded-full flex items-center justify-center text-sm">+</button>
                <button className="text-figma-blue text-sm hover:underline">+ Add a tag</button>
              </div>
            </div>
          </div>

          {/* Call Action Buttons */}
          <div className="flex justify-end gap-4">
            {/* Call Modal Button */}
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => {
                  const mockCall: CallRecord = {
                    id: Date.now().toString(),
                    date: new Date().toISOString(),
                    fromNumber: '+1 (555) 123-4567',
                    contactName: 'John Doe',
                    hasVoicemail: false,
                    direction: 'outbound',
                    status: 'active'
                  }
                  setSelectedCall(mockCall)
                  setShowCallModal(true)
                  setShowMakeCallPopup(false)
                }}
                className="w-16 h-16 bg-figma-green rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <UserCircleIcon className="h-8 w-8 text-figma-white" />
              </button>
              <span className="text-xs text-figma-gray">Call Modal</span>
            </div>

            {/* Make a Call Button */}
            <div className="flex flex-col items-center gap-2">
              <button 
                onClick={() => {
                  setShowMakeCallPopup(false)
                  setShowActive(true)
                }}
                className="w-16 h-16 bg-figma-blue rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <PhoneIcon className="h-8 w-8 text-figma-white" />
              </button>
              <span className="text-xs text-figma-gray">Make a call</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Customer Modal */}
      <Modal
        isOpen={showAddCustomerModal}
        onClose={() => setShowAddCustomerModal(false)}
        title="Add Customer"
        showSaveButton={true}
        onSave={() => {
          // Here you would save the customer name
          setShowAddCustomerModal(false)
        }}
        saveButtonText="Save"
        width="w-96"
      >
        <div className="mb-4">
          <label htmlFor="customer-name" className="block text-sm font-medium text-figma-gray mb-2">Customer Name</label>
          <input
            id="customer-name"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Enter customer name"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue"
          />
        </div>
      </Modal>

      {/* Conversation Modal */}
      <Modal
        isOpen={showConversationModal}
        onClose={() => setShowConversationModal(false)}
        title={`Call Conversation - ${selectedCall?.fromNumber || 'Unknown'}`}
        width="w-4/5 max-w-4xl"
      >
        <div className="space-y-4">
          <div className="bg-figma-blueLight p-4 rounded-lg">
            <div className="font-semibold text-figma-blue mb-2">AI:</div>
            <div className="text-figma-dark">Hello! Thank you for calling. How can I assist you today?</div>
          </div>
          <div className="bg-figma-grayLight p-4 rounded-lg">
            <div className="font-semibold text-figma-gray mb-2">Human:</div>
            <div className="text-figma-dark">I need help with my account billing. I was charged twice this month.</div>
          </div>
          <div className="bg-figma-blueLight p-4 rounded-lg">
            <div className="font-semibold text-figma-blue mb-2">AI:</div>
            <div className="text-figma-dark">I understand your concern about the double billing. Let me check your account details and resolve this issue for you.</div>
          </div>
          <div className="bg-figma-grayLight p-4 rounded-lg">
            <div className="font-semibold text-figma-gray mb-2">Human:</div>
            <div className="text-figma-dark">Thank you, that would be great. I appreciate your help.</div>
          </div>
        </div>
      </Modal>

      {/* Team Notes Modal */}
      <Modal
        isOpen={showTeamNotesModal}
        onClose={() => setShowTeamNotesModal(false)}
        title="Team Notes"
        showSaveButton={true}
        onSave={() => setShowTeamNotesModal(false)}
        saveButtonText="Add Note"
        width="w-96"
      >
        <div className="space-y-4">
          <div className="bg-figma-grayLight p-3 rounded-lg">
            <div className="text-sm text-figma-gray mb-1">John Doe - 2 hours ago</div>
            <div className="text-figma-dark">Customer was very cooperative and understanding about the billing issue.</div>
          </div>
          <div className="bg-figma-grayLight p-3 rounded-lg">
            <div className="text-sm text-figma-gray mb-1">Sarah Smith - 1 hour ago</div>
            <div className="text-figma-dark">Issue resolved successfully. Customer was satisfied with the solution.</div>
          </div>
          <div className="mb-4">
            <label htmlFor="new-note" className="block text-sm font-medium text-figma-gray mb-2">Add New Note</label>
            <textarea
              id="new-note"
              rows={3}
              placeholder="Enter your note here..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue"
            />
          </div>
        </div>
      </Modal>

      {/* Parsed Data Modal */}
      <Modal
        isOpen={showParsedDataModal}
        onClose={() => setShowParsedDataModal(false)}
        title="Parsed Data"
        width="w-4/5 max-w-6xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-figma-grayLight">
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-figma-gray">Field</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-figma-gray">Value</th>
                <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-figma-gray">Confidence</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Customer Name</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">John Smith</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-green">95%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Issue Type</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Billing</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-green">98%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Account Number</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">ACC-12345</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-yellow">85%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Sentiment</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Neutral</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-green">92%</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Resolution Status</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-dark">Resolved</td>
                <td className="border border-gray-300 px-4 py-2 text-figma-green">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      {/* Audio Player Modal */}
      <Modal
        isOpen={showAudioModal}
        onClose={() => setShowAudioModal(false)}
        title="Audio Recording"
        width="w-96"
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-figma-blue rounded-full flex items-center justify-center mx-auto mb-4">
              <SpeakerWaveIcon className="h-10 w-10 text-figma-white" />
            </div>
            <h3 className="text-lg font-semibold text-figma-dark mb-2">
              Call Recording - {selectedCall?.fromNumber || 'Unknown'}
            </h3>
            <p className="text-sm text-figma-gray">
              {selectedCall?.contactName || 'Unknown Contact'}
            </p>
          </div>

          {/* Audio Controls */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="w-full bg-figma-grayLight rounded-full h-2">
              <div className="bg-figma-blue h-2 rounded-full" style={{ width: '35%' }}></div>
            </div>

            {/* Time Display */}
            <div className="flex justify-between text-sm text-figma-gray">
              <span>1:23</span>
              <span>3:45</span>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button className="p-2 text-figma-gray hover:text-figma-dark">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zM6.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 000 1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-figma-blue rounded-full flex items-center justify-center text-figma-white hover:bg-figma-blue/90 transition-colors"
              >
                {isPlaying ? (
                  <PauseIcon className="h-6 w-6" />
                ) : (
                  <PlayIcon className="h-6 w-6" />
                )}
              </button>
              
              <button className="p-2 text-figma-gray hover:text-figma-dark">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414zM14.293 4.293a1 1 0 00-1.414 0l-5 5a1 1 0 000 1.414l5 5a1 1 0 001.414-1.414L11.414 10l4.293-4.293a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-figma-gray">Volume</span>
                <span className="text-sm text-figma-gray">75%</span>
              </div>
              <div className="w-full bg-figma-grayLight rounded-full h-2">
                <div className="bg-figma-green h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Call Modal */}
      <CallModal
        isOpen={showCallModal}
        onClose={() => setShowCallModal(false)}
        callRecord={selectedCall}
        onMakeCall={handleMakeCall}
      />
    </div>
  )
}

function StatCard({ 
  label, 
  value, 
  color = 'default',
  size = 'normal'
}: { 
  readonly label: string
  readonly value: number
  readonly color?: 'blue' | 'green' | 'default'
  readonly size?: 'small' | 'normal'
}) {
  const isActive = color === 'green';
  const isBlue = color === 'blue';
  const isSmall = size === 'small';

  // Text colors
  const valueColorClass = isBlue ? 'text-figma-blue' : isActive ? 'text-figma-white' : 'text-figma-dark';
  const labelColorClass = isActive ? 'text-figma-white' : 'text-figma-gray';

  // Card background: white normally, green when active
  const cardBgClass = isActive ? 'bg-success-500' : 'bg-figma-white';

  // Card size
  const baseCardClasses = isSmall
    ? `rounded-lg p-2 min-h-[120px] w-36 flex flex-col justify-center`
    : `rounded-lg p-3 min-h-[100px] flex flex-col justify-center`;

  // Border color
  const borderClass = isBlue ? 'border-figma-blue' : isActive ? 'border-success-500' : 'border-gray-200';

  return (
    <div className={`${baseCardClasses} ${cardBgClass} border-2 ${borderClass} shadow-soft`}>
      <div className={isSmall ? `text-3xl font-bold mb-1 ${valueColorClass}` : `text-3xl font-bold mb-2 ${valueColorClass}`}>
        {value}
      </div>
      <div className={isSmall ? `text-xs ${labelColorClass} text-center` : `text-xs ${labelColorClass}`}>
        {label}
      </div>
    </div>
  )
}



function Th({ children }: { readonly children: React.ReactNode }) {
  return <th className="text-left px-6 py-4 font-semibold text-figma-gray text-sm">{children}</th>
}

function Td({ children, className }: { readonly children: React.ReactNode; readonly className?: string }) {
  return <td className={`px-6 py-4 ${className ?? ''}`}>{children}</td>
}