"use client"

import { PhoneIcon } from '@heroicons/react/24/outline'

type Props = { onClose: () => void }

export function IncomingCallToast({ onClose }: Props) {
  return (
    <div className="fixed left-6 bottom-6 z-50">
      <div className="card p-4 w-[320px]">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-blue-100 text-brand-700 flex items-center justify-center">
            <PhoneIcon className="h-6 w-6" />
          </div>
          <div className="font-semibold text-lg">623-986-5286</div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button className="rounded-md bg-green-600 text-white py-2">Accept</button>
          <button className="rounded-md bg-red-600 text-white py-2" onClick={onClose}>Decline</button>
        </div>
        <button className="mt-3 w-full btn-ghost" onClick={onClose}>More Information</button>
      </div>
    </div>
  )
}