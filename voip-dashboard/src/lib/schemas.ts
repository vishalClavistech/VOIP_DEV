import { z } from 'zod'

export const PhoneNumberSchema = z.string().trim().regex(/^[0-9\-()+\s]{7,20}$/i, 'Invalid phone number')

export const CallNoteSchema = z.object({
  text: z.string().trim().min(1, 'Note is required').max(2000, 'Note is too long'),
  tags: z.array(z.string().trim().min(1)).max(20).default([])
})

export const SettingsSchema = z.object({
  ringtone: z.string().min(1).default('classic'),
  notifications: z.boolean().default(true),
  internalExtension: z.string().trim().min(2).max(8)
})

export type Settings = z.infer<typeof SettingsSchema>
export type CallNote = z.infer<typeof CallNoteSchema>