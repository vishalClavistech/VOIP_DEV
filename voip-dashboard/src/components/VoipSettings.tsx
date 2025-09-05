"use client"

import { useState } from 'react'
import { Modal } from './Modal'

export function VoipSettings() {
  const [routingMode, setRoutingMode] = useState<'sequence' | 'all'>('sequence')
  const [showDataParseRules, setShowDataParseRules] = useState(true)
  const [showAddEntryModal, setShowAddEntryModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [dataFields, setDataFields] = useState([
    { id: 1, name: 'first_name', checked: true },
    { id: 2, name: 'last_name', checked: false },
    { id: 3, name: 'phone_number', checked: false },
    { id: 4, name: 'is_homeowner (yes, no)', checked: false },
    { id: 5, name: 'is_emergency (yes, no)', checked: false },
  ])

  return (
    <div className="flex gap-6">
      {/* Main Settings Content - 7/11 ratio */}
      <div className="w-[63.6%] bg-figma-white rounded-lg p-6 shadow-soft">
        <h2 className="text-2xl font-bold text-figma-dark mb-6">Settings</h2>
        
        {/* Phone Number Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-figma-dark mb-4">Your Phone Number - 1 (888) 435-9109</h3>
        </div>

        {/* Welcome Greeting Section */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-figma-dark mb-3">Select Welcome Greeting Audio File</h4>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue bg-figma-white">
                <option>Default - greeting</option>
                <option>Custom Greeting 1</option>
                <option>Custom Greeting 2</option>
              </select>
            </div>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-4 py-3 bg-figma-green text-figma-white rounded-lg font-medium flex items-center gap-2 hover:bg-figma-green/90 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload
            </button>
          </div>
        </div>

        {/* Call Routing Settings */}
        <div className="mb-8">
          <h4 className="text-lg font-medium text-figma-dark mb-4">Call Routing Settings</h4>
          
          {/* Routing Toggle */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex bg-figma-grayLight rounded-lg p-1">
              <button 
                onClick={() => setRoutingMode('sequence')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  routingMode === 'sequence' ? 'bg-figma-blue text-figma-white' : 'text-figma-gray hover:text-figma-dark'
                }`}
              >
                Ring in sequence
              </button>
              <button 
                onClick={() => setRoutingMode('all')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  routingMode === 'all' ? 'bg-figma-green text-figma-white' : 'text-figma-gray hover:text-figma-dark'
                }`}
              >
                Ring All
              </button>
            </div>
            <p className="text-figma-gray text-sm">Ring your phones & desktop apps in sequence</p>
          </div>

          {/* Call Routing Table */}
          <div className="bg-figma-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-figma-grayLight">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-figma-dark">Order</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-figma-dark">Enabled / Schedule</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-figma-dark">Phone number / Desktop user</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-figma-dark">Description / Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-figma-dark">Ring Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-figma-dark">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {/* Row 1 - Brian Scruggs */}
                <tr>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-figma-dark">1</span>
                      <div className="flex flex-col">
                        <button className="text-figma-gray hover:text-figma-dark">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button className="text-figma-gray hover:text-figma-dark">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" defaultChecked />
                        <div className="w-10 h-6 bg-figma-green rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-figma-white rounded-full transition-transform"></div>
                        </div>
                      </div>
                      <span className="text-xs text-figma-green font-medium">ON</span>
                      <button className="text-figma-gray hover:text-figma-dark">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-figma-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-figma-dark">Brian Scruggs</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-figma-blue hover:underline cursor-pointer">brian@zyratalk.com</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-figma-dark">30</span>
                      <button className="text-figma-red hover:text-red-600">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-figma-blue hover:underline text-sm">Edit</button>
                  </td>
                </tr>

                {/* Row 2 - Primary Forward Number */}
                <tr>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-figma-dark">2</span>
                      <div className="flex flex-col">
                        <button className="text-figma-gray hover:text-figma-dark">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button className="text-figma-gray hover:text-figma-dark">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" />
                        <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-figma-white rounded-full transition-transform"></div>
                        </div>
                      </div>
                      <span className="text-xs text-figma-gray font-medium">OFF</span>
                      <button className="text-figma-gray hover:text-figma-dark">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-figma-gray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span className="text-sm text-figma-dark">1 (623) 986-5286</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-figma-blue hover:underline cursor-pointer">Primary Forward Number</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-figma-dark">30</span>
                      <button className="text-figma-red hover:text-red-600">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-figma-blue hover:underline text-sm">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            {/* Add New Entry Button */}
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={() => setShowAddEntryModal(true)}
                className="flex items-center gap-2 text-figma-green hover:text-figma-green/80 font-medium"
              >
                <div className="w-6 h-6 bg-figma-green rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4 text-figma-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                Add new entry
              </button>
            </div>
          </div>

          {/* Sequence Behavior Settings */}
          <div className="mt-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <label htmlFor="sequence-retry" className="text-sm font-medium text-figma-dark">How many times should we try this sequence?</label>
                <select id="sequence-retry" className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue">
                  <option>Once</option>
                  <option>Twice</option>
                  <option>Three times</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="no-answer-action" className="text-sm font-medium text-figma-dark">If no one answers, where should we send your callers?</label>
                <select id="no-answer-action" className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue">
                  <option>Trigger AI conversation</option>
                  <option>Send to voicemail</option>
                  <option>Forward to another number</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Parse Rules Sidebar - 4/11 ratio */}
      {showDataParseRules && (
        <div className="w-[36.4%] bg-figma-white rounded-lg p-6 shadow-soft">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-figma-dark">Add data parse rule</h3>
            <button 
              onClick={() => setShowDataParseRules(false)}
              className="text-figma-gray hover:text-figma-dark"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Rule Settings */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" id="mark-fields-required" defaultChecked className="rounded border-gray-300" />
              <label htmlFor="mark-fields-required" className="text-sm text-figma-dark">Mark fields required</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="auto-feed-data" defaultChecked className="rounded border-gray-300" />
              <label htmlFor="auto-feed-data" className="text-sm text-figma-dark">If all required fields are gathered, feed data automatically</label>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="datetime-required" className="rounded border-gray-300" />
              <label htmlFor="datetime-required" className="text-sm text-figma-dark">Date/time required</label>
              <button className="text-figma-red">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="ml-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-figma-grayLight rounded-lg">
                <span className="text-sm text-figma-dark">(UTC 4:00) Eastern Daylight EDT - New York</span>
                <button className="text-figma-gray hover:text-figma-dark">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Address Validation */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <input type="radio" id="use-address-validation" defaultChecked className="text-figma-blue" />
              <label htmlFor="use-address-validation" className="text-sm text-figma-dark">Use address validation</label>
            </div>
            <div className="ml-6">
              <div className="flex items-center gap-2 px-3 py-2 bg-figma-grayLight rounded-lg">
                <span className="text-sm text-figma-dark">USA</span>
                <button className="text-figma-gray hover:text-figma-dark">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* State Service Restriction */}
          <div className="mb-6">
            <label htmlFor="state-selection" className="block text-sm font-medium text-figma-dark mb-2">State only choose this if you service one state</label>
            <select id="state-selection" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue">
              <option>Select State</option>
              <option>California</option>
              <option>New York</option>
              <option>Texas</option>
            </select>
          </div>

          {/* Data Fields */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-figma-dark">Data Fields</h4>
              <button 
                onClick={() => {
                  const newId = Math.max(...dataFields.map(f => f.id)) + 1
                  setDataFields([...dataFields, { id: newId, name: 'new_field', checked: false }])
                }}
                className="text-figma-green hover:text-figma-green/80 text-sm font-medium"
              >
                + Add Field
              </button>
            </div>
            <div className="space-y-3">
              {dataFields.map((field) => (
                <div key={field.id} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={field.checked}
                    onChange={(e) => {
                      setDataFields(dataFields.map(f => 
                        f.id === field.id ? { ...f, checked: e.target.checked } : f
                      ))
                    }}
                    className="rounded border-gray-300" 
                  />
                  <input 
                    type="text" 
                    value={field.name}
                    onChange={(e) => {
                      setDataFields(dataFields.map(f => 
                        f.id === field.id ? { ...f, name: e.target.value } : f
                      ))
                    }}
                    className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-figma-blue" 
                  />
                  <button 
                    onClick={() => {
                      setDataFields(dataFields.filter(f => f.id !== field.id))
                    }}
                    className="text-figma-red hover:text-red-600"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Entry Modal */}
      <Modal 
        isOpen={showAddEntryModal} 
        onClose={() => setShowAddEntryModal(false)}
        title="Add New Entry"
      >
        <div className="bg-figma-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-figma-dark">Add New Entry</h3>
            <button 
              onClick={() => setShowAddEntryModal(false)}
              className="text-figma-gray hover:text-figma-dark"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="entry-type" className="block text-sm font-medium text-figma-dark mb-2">Type</label>
                <select id="entry-type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue">
                  <option>Desktop User</option>
                  <option>Phone Number</option>
                </select>
              </div>
              <div>
                <label htmlFor="entry-enabled" className="block text-sm font-medium text-figma-dark mb-2">Status</label>
                <select id="entry-enabled" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue">
                  <option>Enabled</option>
                  <option>Disabled</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="entry-name" className="block text-sm font-medium text-figma-dark mb-2">Name/Number</label>
              <input 
                type="text" 
                id="entry-name"
                placeholder="Enter name or phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue"
              />
            </div>

            <div>
              <label htmlFor="entry-description" className="block text-sm font-medium text-figma-dark mb-2">Description/Email</label>
              <input 
                type="text" 
                id="entry-description"
                placeholder="Enter description or email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue"
              />
            </div>

            <div>
              <label htmlFor="entry-ring-time" className="block text-sm font-medium text-figma-dark mb-2">Ring Time (seconds)</label>
              <input 
                type="number" 
                id="entry-ring-time"
                defaultValue="30"
                min="1"
                max="300"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-figma-blue"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button"
                onClick={() => setShowAddEntryModal(false)}
                className="px-4 py-2 text-figma-gray hover:text-figma-dark font-medium"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-figma-blue text-figma-white rounded-lg font-medium hover:bg-figma-blue/90 transition-colors"
              >
                Add Entry
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Upload Modal */}
      <Modal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)}
        title="Upload Audio File"
      >
        <div className="bg-figma-white rounded-lg p-6 w-full max-w-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-figma-dark">Upload Audio File</h3>
            <button 
              onClick={() => setShowUploadModal(false)}
              className="text-figma-gray hover:text-figma-dark"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Drag and Drop Area */}
            <button 
              type="button"
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-figma-blue transition-colors cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault()
                const files = e.dataTransfer.files
                if (files.length > 0) {
                  setUploadedFile(files[0])
                  // Simulate upload progress
                  setUploadProgress(0)
                  const interval = setInterval(() => {
                    setUploadProgress(prev => {
                      if (prev >= 100) {
                        clearInterval(interval)
                        return 100
                      }
                      return prev + 10
                    })
                  }, 200)
                }
              }}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <svg className="h-12 w-12 text-figma-gray mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="text-figma-dark font-medium mb-2">Drag and drop your audio file here</p>
              <p className="text-figma-gray text-sm">or click to browse</p>
              <input 
                id="file-input"
                type="file" 
                accept="audio/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setUploadedFile(file)
                    // Simulate upload progress
                    setUploadProgress(0)
                    const interval = setInterval(() => {
                      setUploadProgress(prev => {
                        if (prev >= 100) {
                          clearInterval(interval)
                          return 100
                        }
                        return prev + 10
                      })
                    }, 200)
                  }
                }}
              />
            </button>

            {/* Upload Progress */}
            {uploadProgress > 0 && (
              <div>
                <div className="flex justify-between text-sm text-figma-dark mb-2">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-figma-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Audio Preview */}
            {uploadedFile && uploadProgress === 100 && (
              <div className="bg-figma-grayLight rounded-lg p-4">
                <h4 className="text-sm font-medium text-figma-dark mb-3">Audio Preview</h4>
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 bg-figma-blue text-figma-white rounded-full flex items-center justify-center hover:bg-figma-blue/90 transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-figma-dark">{uploadedFile.name}</p>
                    <p className="text-xs text-figma-gray">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <audio controls className="flex-1">
                    <source src={URL.createObjectURL(uploadedFile)} type={uploadedFile.type} />
                    <track kind="captions" src="" label="Audio file" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-figma-gray hover:text-figma-dark font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Handle upload completion
                  setShowUploadModal(false)
                  setUploadProgress(0)
                  setUploadedFile(null)
                }}
                disabled={uploadProgress < 100}
                className="px-4 py-2 bg-figma-green text-figma-white rounded-lg font-medium hover:bg-figma-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Audio
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}