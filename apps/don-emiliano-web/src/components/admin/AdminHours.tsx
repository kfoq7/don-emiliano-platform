import { useState, useEffect } from 'preact/hooks'
import {
  fetchBusinessHours,
  updateBusinessHours,
  seedBusinessHours,
  type BusinessHours,
} from '@/lib/api/admin'
import AdminLodingSpinner from './AdminLoadingSpinner'
import { DEFAULT_HOURS } from '@/consts/hours'

export default function AdminHours() {
  const [hours, setHours] = useState<BusinessHours[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingId, setSavingId] = useState<number | null>(null)

  useEffect(() => {
    loadHours()
  }, [])

  async function loadHours() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchBusinessHours()
      if (data.length === 0) {
        // If no hours exist yet, seed them
        const seeded = await seedBusinessHours()
        setHours(sortByDay(seeded))
      } else {
        setHours(sortByDay(data))
      }
    } catch {
      setError('No se pudo conectar al servidor. Mostrando horarios por defecto.')
      // Show default hours as fallback for UI preview
      setHours(DEFAULT_HOURS.map((h, i) => ({ ...h, id: i + 1 })) as BusinessHours[])
    } finally {
      setLoading(false)
    }
  }

  function sortByDay(data: BusinessHours[]): BusinessHours[] {
    // Sort Mon(1) -> Sat(6) -> Sun(0)
    return [...data].sort((a, b) => {
      const orderA = a.dayOfWeek === 0 ? 7 : a.dayOfWeek
      const orderB = b.dayOfWeek === 0 ? 7 : b.dayOfWeek
      return orderA - orderB
    })
  }

  async function handleToggleClosed(day: BusinessHours) {
    const updated = { ...day, isClosed: !day.isClosed }
    if (updated.isClosed) {
      updated.openTime = null
      updated.closeTime = null
    } else {
      updated.openTime = '07:00'
      updated.closeTime = '15:00'
    }

    setHours(prev => prev.map(h => (h.id === day.id ? updated : h)))
    setSavingId(day.id)

    try {
      await updateBusinessHours(day.id, {
        openTime: updated.openTime,
        closeTime: updated.closeTime,
        isClosed: updated.isClosed,
      })
    } catch {
      // Revert on error
      setHours(prev => prev.map(h => (h.id === day.id ? day : h)))
    } finally {
      setSavingId(null)
    }
  }

  async function handleTimeChange(
    day: BusinessHours,
    field: 'openTime' | 'closeTime',
    value: string,
  ) {
    const updated = { ...day, [field]: value }
    setHours(prev => prev.map(h => (h.id === day.id ? updated : h)))
    setSavingId(day.id)

    try {
      await updateBusinessHours(day.id, {
        openTime: updated.openTime,
        closeTime: updated.closeTime,
        isClosed: updated.isClosed,
      })
    } catch {
      setHours(prev => prev.map(h => (h.id === day.id ? day : h)))
    } finally {
      setSavingId(null)
    }
  }

  if (loading) {
    return <AdminLodingSpinner message="Cargando horarios..." />
  }

  return (
    <div>
      {error && (
        <div className="mb-4 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          {error}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-primary text-white px-5 py-3.5">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Horario de Atencion
          </h3>
          <p className="text-sm text-white/80 mt-0.5">
            Configura el horario de apertura y cierre para cada dia
          </p>
        </div>

        <div className="divide-y divide-gray-100">
          {hours.map(day => (
            <div
              key={day.id}
              className={`px-5 py-4 transition-colors ${
                day.isClosed ? 'bg-gray-50/80' : 'hover:bg-gray-50/50'
              } ${savingId === day.id ? 'opacity-70' : ''}`}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Day name */}
                <div className="w-28 shrink-0">
                  <span
                    className={`font-semibold text-base ${day.isClosed ? 'text-gray-400' : 'text-gray-900'}`}
                  >
                    {day.dayName}
                  </span>
                </div>

                {/* Time inputs */}
                <div className="flex items-center gap-3 flex-1">
                  {day.isClosed ? (
                    <span className="text-sm text-gray-400 italic">Cerrado</span>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 shrink-0">Abre</label>
                        <input
                          type="time"
                          value={day.openTime ?? ''}
                          onChange={e =>
                            handleTimeChange(day, 'openTime', (e.target as HTMLInputElement).value)
                          }
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                      <span className="text-gray-300">-</span>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-gray-500 shrink-0">Cierra</label>
                        <input
                          type="time"
                          value={day.closeTime ?? ''}
                          onChange={e =>
                            handleTimeChange(day, 'closeTime', (e.target as HTMLInputElement).value)
                          }
                          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Closed toggle */}
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs ${day.isClosed ? 'text-red-500 font-medium' : 'text-gray-400'}`}
                  >
                    {day.isClosed ? 'Cerrado' : 'Abierto'}
                  </span>
                  <button
                    onClick={() => handleToggleClosed(day)}
                    disabled={savingId === day.id}
                    className={`
                      relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 cursor-pointer
                      focus:outline-none focus:ring-2 focus:ring-primary/30
                      ${day.isClosed ? 'bg-red-400' : 'bg-emerald-500'}
                      ${savingId === day.id ? 'opacity-50 cursor-wait' : ''}
                    `}
                    aria-label={`${day.isClosed ? 'Abrir' : 'Cerrar'} ${day.dayName}`}
                  >
                    <span
                      className={`
                        inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200
                        ${day.isClosed ? 'translate-x-1' : 'translate-x-6'}
                      `}
                    />
                  </button>
                </div>
              </div>

              {/* Saving indicator */}
              {savingId === day.id && (
                <div className="mt-1.5 text-xs text-primary flex items-center gap-1">
                  <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Guardando...
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
