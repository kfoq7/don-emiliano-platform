import type { BusinessHours } from '@/lib/api/admin'

export const DEFAULT_HOURS: Omit<BusinessHours, 'id'>[] = [
  { dayOfWeek: 1, dayName: 'Lunes', openTime: '07:00', closeTime: '15:00', isClosed: false },
  { dayOfWeek: 2, dayName: 'Martes', openTime: '07:00', closeTime: '15:00', isClosed: false },
  { dayOfWeek: 3, dayName: 'Miercoles', openTime: '07:00', closeTime: '15:00', isClosed: false },
  { dayOfWeek: 4, dayName: 'Jueves', openTime: '07:00', closeTime: '15:00', isClosed: false },
  { dayOfWeek: 5, dayName: 'Viernes', openTime: '07:00', closeTime: '15:00', isClosed: false },
  { dayOfWeek: 6, dayName: 'Sabado', openTime: '07:00', closeTime: '15:00', isClosed: false },
  { dayOfWeek: 0, dayName: 'Domingo', openTime: null, closeTime: null, isClosed: true },
]
