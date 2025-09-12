"use client"

import { PhoneIcon } from '@heroicons/react/24/outline'

type Props = { readonly onClose: () => void }

export function IncomingCallToast({ onClose }: Props) {
  return (
    <div className="fixed left-6 bottom-6 z-50 animate-slide-up">
      <div className="bg-figma-white rounded-lg p-6 w-[320px] shadow-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
            <PhoneIcon className="h-8 w-8 text-figma-white" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold text-figma-dark">623-986-5286</div>
            </div>
            </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button className="bg-[#7DBD4C] text-figma-white py-3 px-4 rounded-lg font-medium  transition-colors">
            Accept
          </button>
          <button 
            className="bg-figma-red text-figma-white py-3 px-4 rounded-lg font-medium  transition-colors" 
            onClick={onClose}
          >
            Decline
          </button>
        </div>

        {/* More Information Link */}
        <button className="text-mainColor-500  text-sm border-2 border-mainColor-500 rounded p-4" onClick={onClose}>
          More Information
        </button>
      </div>
    </div>
  )
}