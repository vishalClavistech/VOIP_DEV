"use client"

import { XMarkIcon } from '@heroicons/react/24/outline'

type Props = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly title: string
  readonly children: React.ReactNode
  readonly showSaveButton?: boolean
  readonly onSave?: () => void
  readonly saveButtonText?: string
  readonly width?: string
}

export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  showSaveButton = false, 
  onSave, 
  saveButtonText = "Save",
  width = "w-96"
}: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`bg-figma-white rounded-lg shadow-lg ${width} max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-figma-dark">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-figma-gray hover:text-figma-dark hover:bg-figma-grayLight rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {showSaveButton && (
          <div className="flex gap-3 p-6 border-t border-gray-200">
            <button 
              onClick={onSave}
              className="flex-1 bg-figma-green text-figma-white py-3 px-4 rounded-lg font-medium hover:bg-figma-green/90 transition-colors"
            >
              {saveButtonText}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-figma-gray text-figma-white py-3 px-4 rounded-lg font-medium hover:bg-figma-gray/90 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}