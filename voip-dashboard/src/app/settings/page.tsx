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
  return (
    <main className="min-h-screen bg-figma-grayLight">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-figma-blue to-figma-green rounded-xl flex items-center justify-center">
                  <PhoneIcon className="h-6 w-6 text-figma-white" />
                </div>
                <div className="font-bold text-xl text-figma-dark">Zyra VoIP</div>
              </div>
              <nav className="hidden md:flex items-center gap-1 ml-8">
                <a className="px-4 py-2 text-figma-gray hover:text-figma-blue hover:bg-figma-blueLight rounded-lg transition-all duration-200" href="/dashboard">Dashboard</a>
                <a className="px-4 py-2 text-figma-blue bg-figma-blueLight rounded-lg font-medium" href="/settings">Settings</a>
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-figma-blueLight rounded-lg flex items-center justify-center">
                <UserCircleIcon className="h-6 w-6 text-figma-blue" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Debug: Test if content is visible */}
        <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded">
          <p className="text-red-800">Settings page is loading - if you can see this, the component is working</p>
        </div>
        
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
                <select className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Default - greeting</option>
                  <option>Custom greeting</option>
                  <option>Professional greeting</option>
                </select>
                <div className="flex items-center gap-2">
                  <SpeakerWaveIcon className="h-5 w-5 text-figma-gray" />
                  <button className="btn-primary flex items-center gap-2">
                    <ArrowUpTrayIcon className="h-4 w-4" />
                    Upload
                  </button>
                </div>
              </div>
            </div>

            {/* Call Routing Settings */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-figma-dark mb-4">Call Routing Settings</h3>
              <div className="flex flex-col sm:flex-row gap-2 mb-6">
                <button className="btn-primary">
                  Ring in sequence
                </button>
                <button className="btn-secondary border-2 border-figma-green text-figma-green hover:bg-figma-greenLight">
                  Ring All
                </button>
              </div>

              <h4 className="text-md font-medium text-figma-dark mb-4">Ring your phones & desktop apps in sequence:</h4>
              
              {/* Routing Table */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-figma-grayLight px-4 py-3 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium text-figma-gray">
                    <div className="col-span-1">Order</div>
                    <div className="col-span-2">Enabled / Schedule</div>
                    <div className="col-span-3">Phone number / Desktop user</div>
                    <div className="col-span-4">Description / Email</div>
                    <div className="col-span-1">Ring Time</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
                
                {/* Row 1 */}
                <div className="px-4 py-4 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 flex items-center gap-1">
                      <span className="text-sm font-medium text-figma-dark">1</span>
                      <div className="flex flex-col">
                        <ChevronUpIcon className="h-3 w-3 text-figma-gray" />
                        <ChevronDownIcon className="h-3 w-3 text-figma-gray" />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="w-12 h-6 bg-figma-green rounded-full flex items-center justify-end px-1">
                        <div className="w-4 h-4 bg-figma-white rounded-full"></div>
                      </div>
                      <span className="text-xs text-figma-green ml-2">ON</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-figma-gray" />
                      <ComputerDesktopIcon className="h-4 w-4 text-figma-gray" />
                      <span className="text-sm text-figma-dark">Brian Scruggs</span>
                    </div>
                    <div className="col-span-4">
                      <button className="text-sm text-figma-blue hover:underline">brian@zyratalk.com</button>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-figma-dark">30</span>
                    </div>
                    <div className="col-span-1">
                      <button className="w-6 h-6 bg-figma-redLight rounded-full flex items-center justify-center hover:bg-figma-redLight/80">
                        <XMarkIcon className="h-3 w-3 text-figma-red" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Row 2 */}
                <div className="px-4 py-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-1 flex items-center gap-1">
                      <span className="text-sm font-medium text-figma-dark">2</span>
                      <div className="flex flex-col">
                        <ChevronUpIcon className="h-3 w-3 text-figma-gray" />
                        <ChevronDownIcon className="h-3 w-3 text-figma-gray" />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="w-12 h-6 bg-figma-grayLight rounded-full flex items-center px-1">
                        <div className="w-4 h-4 bg-figma-white rounded-full"></div>
                      </div>
                      <span className="text-xs text-figma-gray ml-2">OFF</span>
                    </div>
                    <div className="col-span-3 flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-figma-gray" />
                      <DevicePhoneMobileIcon className="h-4 w-4 text-figma-gray" />
                      <span className="text-sm text-figma-dark">1 (623) 986-5286</span>
                    </div>
                    <div className="col-span-4">
                      <button className="text-sm text-figma-blue hover:underline">Primary Forward Number</button>
                    </div>
                    <div className="col-span-1">
                      <span className="text-sm text-figma-dark">30</span>
                    </div>
                    <div className="col-span-1">
                      <button className="w-6 h-6 bg-figma-redLight rounded-full flex items-center justify-center hover:bg-figma-redLight/80">
                        <XMarkIcon className="h-3 w-3 text-figma-red" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Add New Entry */}
              <button className="mt-4 w-8 h-8 bg-figma-greenLight rounded-full flex items-center justify-center hover:bg-figma-greenLight/80">
                <PlusIcon className="h-4 w-4 text-figma-green" />
              </button>
            </div>

            {/* Sequence Configuration */}
            <div className="space-y-4">
              <div>
                <label htmlFor="sequence-count" className="block text-sm font-medium text-figma-gray mb-2">How many times should we try this sequence?</label>
                <select id="sequence-count" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Once</option>
                  <option>Twice</option>
                  <option>Three times</option>
                </select>
              </div>
              <div>
                <label htmlFor="no-answer-action" className="block text-sm font-medium text-figma-gray mb-2">If no one answers, where should we send your callers?</label>
                <select id="no-answer-action" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Trigger AI conversation</option>
                  <option>Send to voicemail</option>
                  <option>Forward to another number</option>
                </select>
              </div>
            </div>
          </div>

          {/* Right Panel - Data Parse Rules */}
          <div className="w-full lg:w-96 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-figma-dark">Add data parse rule</h3>
              <button className="w-8 h-8 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                <XMarkIcon className="h-4 w-4 text-figma-gray" />
              </button>
            </div>

            {/* Global Settings */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-figma-dark mb-3">Global Settings</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={markFieldsRequired}
                    onChange={(e) => setMarkFieldsRequired(e.target.checked)}
                    className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                  />
                  <span className="text-sm text-figma-gray">Mark fields required</span>
                </label>
                <label className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={autoFeedData}
                    onChange={(e) => setAutoFeedData(e.target.checked)}
                    className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                  />
                  <span className="text-sm text-figma-gray">If all required fields are gathered, feed data automatically</span>
                </label>
              </div>
            </div>

            {/* Date/time required */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <XMarkIcon className="h-4 w-4 text-figma-red" />
                <span className="text-sm font-medium text-figma-dark">Date/time required</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value="(UTC 4:00) Eastern Daylight EDT - New York" 
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-figma-grayLight text-sm text-figma-dark"
                />
                <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                  <XMarkIcon className="h-3 w-3 text-figma-gray" />
                </button>
              </div>
            </div>

            {/* Use address validation */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-figma-green rounded-full flex items-center justify-center">
                  <svg className="h-2 w-2 text-figma-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-figma-dark">Use address validation</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value="USA" 
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-figma-grayLight text-sm text-figma-dark"
                />
                <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                  <XMarkIcon className="h-3 w-3 text-figma-gray" />
                </button>
              </div>
            </div>

            {/* State selection */}
            <div className="mb-6">
              <label htmlFor="state-select" className="block text-sm font-medium text-figma-gray mb-2">State only choose this if you service one state</label>
              <select id="state-select" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
                <option>Select State</option>
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
                <option>Florida</option>
              </select>
            </div>

            {/* Custom Data Fields */}
            <div>
              <h4 className="text-sm font-medium text-figma-dark mb-3">Custom Data Fields</h4>
              <div className="space-y-3">
                {/* first_name */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={firstNameChecked}
                    onChange={(e) => setFirstNameChecked(e.target.checked)}
                    className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                  />
                  <input type="text" placeholder="first_name" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <TrashIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <ArrowUpTrayIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                </div>

                {/* last_name */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={lastNameChecked}
                    onChange={(e) => setLastNameChecked(e.target.checked)}
                    className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                  />
                  <input type="text" placeholder="last_name" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <TrashIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <ArrowUpTrayIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                </div>

                {/* phone_number */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={phoneNumberChecked}
                    onChange={(e) => setPhoneNumberChecked(e.target.checked)}
                    className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                  />
                  <input type="text" placeholder="phone_number" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <TrashIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <ArrowUpTrayIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                </div>

                {/* is_homeowner */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={isHomeownerChecked}
                    onChange={(e) => setIsHomeownerChecked(e.target.checked)}
                    className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                  />
                  <input type="text" placeholder="is_homeowner (yes, no)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <TrashIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                  <button className="w-6 h-6 bg-figma-grayLight rounded-full flex items-center justify-center hover:bg-figma-grayLight/80">
                    <CogIcon className="h-3 w-3 text-figma-gray" />
                  </button>
                </div>

                {/* is_emergency */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={isEmergencyChecked}
                    onChange={(e) => setIsEmergencyChecked(e.target.checked)}
                    className="w-4 h-4 text-figma-blue border-gray-300 rounded focus:ring-figma-blue" 
                  />
                  <input type="text" placeholder="is_emergency (yes, no)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
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
      </div>
    </main>
  )
}