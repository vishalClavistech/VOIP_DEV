"use client"

import { useState } from 'react'
import { 
  PhoneIcon, 
  UserCircleIcon,
  SpeakerWaveIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
  TrashIcon,
  CogIcon,
  ArrowUpTrayIcon,
  CalendarIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'

export default function SettingsPage() {
  // State for form controls to prevent hydration mismatches
  const [markFieldsRequired, setMarkFieldsRequired] = useState(true)
  const [autoFeedData, setAutoFeedData] = useState(true)
  const [firstNameChecked, setFirstNameChecked] = useState(true)
  const [lastNameChecked, setLastNameChecked] = useState(false)
  const [phoneNumberChecked, setPhoneNumberChecked] = useState(false)
  const [isHomeownerChecked, setIsHomeownerChecked] = useState(false)
  const [isEmergencyChecked, setIsEmergencyChecked] = useState(false)
  
  // State for routing buttons
  const [routingMode, setRoutingMode] = useState<'sequence' | 'all'>('sequence')
  
  // State for table rows
  const [tableRows, setTableRows] = useState([
    { id: 1, enabled: true, name: 'Brian Scruggs', email: 'brian@zyratalk.com', phone: '', type: 'desktop', ringTime: 30 },
    { id: 2, enabled: false, name: '1 (623) 986-5286', email: 'Primary Forward Number', phone: '1 (623) 986-5286', type: 'mobile', ringTime: 30 }
  ])
  
  // State for edit modal
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingRow, setEditingRow] = useState<typeof tableRows[0] | null>(null)
  
  // State for form inputs in modal
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    ringTime: 30,
    enabled: false
  })

  return (
    <div className="mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-figma-dark mb-8">Settings</h1>
      
      {/* Main Content - Two Panel Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Call Routing Settings */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Phone Number Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-figma-dark">Your Phone Number - 1 (888) 435-9109</h1>
          </div>

          {/* Welcome Greeting Audio File */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-figma-dark mb-4">Select welcome greeting audio file</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 relative">
                <select className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white">
                  <option>Default - greeting</option>
                  <option>Custom greeting</option>
                  <option>Professional greeting</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button className="px-4 py-3 bg-figma-blue text-white rounded-lg hover:bg-figma-blue/90 transition-colors">
                <ArrowUpTrayIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Call Routing Settings */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-figma-dark mb-4">Call Routing Settings</h3>
            <div className="flex flex-col sm:flex-row gap-2 mb-6">
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  console.log('Routing mode changed to sequence')
                  setRoutingMode('sequence')
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                  routingMode === 'sequence' 
                    ? 'bg-figma-blue text-white' 
                    : 'border-2 border-figma-gray text-figma-gray hover:border-figma-blue hover:text-figma-blue'
                }`}
              >
                Ring in sequence
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  console.log('Routing mode changed to all')
                  setRoutingMode('all')
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                  routingMode === 'all' 
                    ? 'bg-figma-green text-white' 
                    : 'border-2 border-figma-gray text-figma-gray hover:border-figma-green hover:text-figma-green'
                }`}
              >
                Ring All
              </button>
            </div>

            <h4 className="text-md font-medium text-figma-dark mb-4">Ring your phones & desktop apps in sequence:</h4>
            
            {/* Routing Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Table Header */}
              <div className="bg-figma-grayLight px-4 py-3 grid grid-cols-12 gap-4 text-sm font-medium text-figma-gray">
                <div className="col-span-1">#</div>
                <div className="col-span-2">Enabled / Schedule</div>
                <div className="col-span-3">Name/Phone</div>
                <div className="col-span-3">Email/Description</div>
                <div className="col-span-1">Ring Time</div>
                <div className="col-span-1">Actions</div>
              </div>

              {/* Table Rows */}
              {tableRows.map((row, index) => (
                <div key={row.id} className="px-4 py-3 border-t border-gray-200 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <span className="text-sm text-figma-dark">{index + 1}</span>
                  </div>
                  <div className="col-span-2">
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log(`Toggling row ${row.id} from ${row.enabled} to ${!row.enabled}`)
                        const newRows = [...tableRows]
                        newRows[index].enabled = !newRows[index].enabled
                        setTableRows(newRows)
                      }}
                      className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <div className={`w-12 h-6 rounded-full flex items-center transition-all duration-200 ${
                        row.enabled ? 'bg-figma-green justify-end' : 'bg-figma-grayLight justify-start'
                      } px-1`}>
                        <div className="w-4 h-4 bg-figma-white rounded-full"></div>
                      </div>
                      <span className={`text-xs ml-2 ${row.enabled ? 'text-figma-green' : 'text-figma-gray'}`}>
                        {row.enabled ? 'ON' : 'OFF'}
                      </span>
                    </button>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-figma-gray" />
                    {row.type === 'desktop' ? (
                      <ComputerDesktopIcon className="h-4 w-4 text-figma-gray" />
                    ) : (
                      <DevicePhoneMobileIcon className="h-4 w-4 text-figma-gray" />
                    )}
                    <span className="text-sm text-figma-dark">{row.name}</span>
                  </div>
                  <div className="col-span-3">
                    <button className="text-sm text-figma-blue hover:underline">{row.email}</button>
                  </div>
                  <div className="col-span-1">
                    <span className="text-sm text-figma-dark">{row.ringTime}</span>
                  </div>
                  <div className="col-span-1 flex gap-1">
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log(`Edit button clicked for row ${row.id}`)
                        setEditingRow(row)
                        setEditFormData({
                          name: row.name,
                          email: row.email,
                          ringTime: row.ringTime,
                          enabled: row.enabled
                        })
                        setShowEditModal(true)
                      }}
                      className="w-6 h-6 bg-figma-blueLight rounded-full flex items-center justify-center hover:bg-figma-blueLight/80 cursor-pointer transition-all"
                    >
                      <CogIcon className="h-3 w-3 text-figma-blue" />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        console.log(`Delete button clicked for row ${row.id}`)
                        const newRows = tableRows.filter(r => r.id !== row.id)
                        setTableRows(newRows)
                      }}
                      className="w-6 h-6 bg-figma-redLight rounded-full flex items-center justify-center hover:bg-figma-redLight/80 cursor-pointer transition-all"
                    >
                      <XMarkIcon className="h-3 w-3 text-figma-red" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Entry */}
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  console.log('Add new entry button clicked')
                  // Create a new empty row
                  const newRow = {
                    id: Math.max(...tableRows.map(r => r.id)) + 1,
                    enabled: false,
                    name: 'New Entry',
                    email: 'new@example.com',
                    phone: '',
                    type: 'desktop',
                    ringTime: 30
                  }
                  setEditingRow(newRow)
                  setShowEditModal(true)
                }}
                className="mt-4 w-8 h-8 bg-figma-greenLight rounded-full flex items-center justify-center hover:bg-figma-greenLight/80 cursor-pointer transition-all"
              >
                <PlusIcon className="h-4 w-4 text-figma-green" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Data Parse Rules */}
        <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-figma-dark mb-4">Data Parse Rules</h3>
          
          {/* Add Data Parse Rule */}
          <div className="mb-6">
            <h4 className="text-md font-medium text-figma-dark mb-4">Add data parse rule</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={markFieldsRequired}
                  onChange={(e) => setMarkFieldsRequired(e.target.checked)}
                  className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                />
                <input type="text" placeholder="first_name (required)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                  <TrashIcon className="h-3 w-3 text-figma-gray" />
                </button>
                <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                  <CogIcon className="h-3 w-3 text-figma-gray" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-figma-dark">Edit Entry</h3>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  console.log('Modal close button clicked')
                  setShowEditModal(false)
                  setEditingRow(null)
                  setEditFormData({
                    name: '',
                    email: '',
                    ringTime: 30,
                    enabled: false
                  })
                }}
                className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80 cursor-pointer transition-all"
              >
                <XMarkIcon className="h-4 w-4 text-figma-gray" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-figma-gray mb-2">Name/Phone</label>
                <input 
                  type="text" 
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-figma-gray mb-2">Email/Description</label>
                <input 
                  type="text" 
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-figma-gray mb-2">Ring Time (seconds)</label>
                <input 
                  type="number" 
                  value={editFormData.ringTime}
                  onChange={(e) => setEditFormData({...editFormData, ringTime: parseInt(e.target.value) || 0})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={editFormData.enabled}
                  onChange={(e) => setEditFormData({...editFormData, enabled: e.target.checked})}
                  className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue"
                />
                <span className="text-sm text-figma-gray">Enabled</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  console.log('Modal cancel button clicked')
                  setShowEditModal(false)
                  setEditingRow(null)
                  setEditFormData({
                    name: '',
                    email: '',
                    ringTime: 30,
                    enabled: false
                  })
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  console.log('Modal save button clicked')
                  if (editingRow) {
                    const updatedRows = tableRows.map(row => 
                      row.id === editingRow.id 
                        ? {
                            ...row,
                            name: editFormData.name,
                            email: editFormData.email,
                            ringTime: editFormData.ringTime,
                            enabled: editFormData.enabled
                          }
                        : row
                    )
                    setTableRows(updatedRows)
                    console.log('Table updated with new data:', editFormData)
                  }
                  setShowEditModal(false)
                  setEditingRow(null)
                }}
                className="flex-1 px-4 py-2 bg-figma-blue text-white rounded-lg hover:bg-figma-blue/90 cursor-pointer transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}