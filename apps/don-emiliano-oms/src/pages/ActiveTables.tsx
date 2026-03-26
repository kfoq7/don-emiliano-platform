import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Table {
  id: number
  name: string
  status: 'occupied' | 'free'
  total?: number
  lastUpdated?: string
  cliente?: string
  nPersonas?: number
}

// Interface matching the API response structure
interface ApiTable {
  IdMesa: number
  Mesa: string
  Previo: string
  Cliente: string
  Usuario: string
  NPersonas: number
  Cuenta: number
}

export default function ActiveTables() {
  const [tables, setTables] = useState<Table[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem('oms_auth')) {
      navigate('/')
    } else {
      fetchTables()
    }
  }, [navigate])

  const fetchOperacion = async () => {
    try {
      const response = await fetch('/api/Pedido/VerOperacion', {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        return data.Data // Return full data object
      }
    } catch (e) {
      console.error('Error fetching operation ID', e)
    }
    return null
  }

  const fetchTables = async () => {
    setIsLoading(true)
    setError(null)
    const userId = localStorage.getItem('oms_userId')
    console.log('Fetching tables for user:', userId)

    try {
      // 1. Get Operation ID
      const operacionData = await fetchOperacion()

      if (!operacionData || !operacionData.ID_OPERACION) {
        throw new Error('No se pudo obtener el ID de operación')
      }
      const operacionId = operacionData.ID_OPERACION

      // 2. Get Tables
      const response = await fetch(
        `/api/Pedido/ObtenerMesasUsuario/?IdOperacion=${operacionId}&IdUsuario=${userId}`,
      )

      if (response.ok) {
        const data = await response.json()
        const apiTables: ApiTable[] = data.Data || []

        const mappedTables: Table[] = apiTables.map(t => ({
          id: t.IdMesa,
          name: t.Mesa,
          status: 'occupied',
          total: t.Cuenta,
          lastUpdated: 'Ahora',
          cliente: t.Cliente,
          nPersonas: t.NPersonas,
        }))
        setTables(mappedTables)
      } else {
        throw new Error('Error al obtener las mesas')
      }
    } catch (err) {
      console.error('Error fetching tables:', err)
      setError('No se pudo cargar la lista de mesas.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditTable = (tableId: number) => {
    navigate(`/tables/${tableId}`)
  }

  const handleCreateTable = () => {
    navigate('/tables')
  }

  const handleRefresh = () => {
    fetchTables()
  }

  const handleLogout = () => {
    localStorage.removeItem('oms_auth')
    localStorage.removeItem('oms_userId')
    localStorage.removeItem('oms_tableId')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-hover)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[var(--color-border-light)] sticky top-0 z-50">
        <div className="max-w-[var(--spacing-middle)] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[var(--color-heading)]">
            Mesas Activas
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-[var(--spacing-middle)] mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-[var(--color-primary)] font-medium hover:text-[var(--color-action-hover)] transition-colors"
            title="Actualizar lista"
          >
            <svg
              className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Actualizar</span>
          </button>

          <button
            onClick={handleCreateTable}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-action-hover)] text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Nueva Mesa
          </button>
        </div>

        {/* Content */}
        {isLoading && tables.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-ink-muted)]">
            <svg
              className="animate-spin h-8 w-8 mx-auto mb-4 text-[var(--color-primary)]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Cargando mesas...
          </div>
        ) : error ? (
          <div className="bg-[var(--color-brand-pink)]/10 text-[var(--color-brand-pink)] p-4 rounded-lg text-center border border-[var(--color-brand-pink)]/20">
            {error}
            <button
              onClick={fetchTables}
              className="block mx-auto mt-2 text-sm font-semibold underline hover:no-underline"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : tables.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-[var(--color-border-light)]">
            <div className="w-16 h-16 bg-[var(--color-surface-hover)] rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--color-ink-muted)]">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-[var(--color-heading)] mb-1">
              No hay mesas activas
            </h3>
            <p className="text-[var(--color-ink-muted)] mb-6">
              Comienza registrando un nuevo pedido.
            </p>
            <button
              onClick={handleCreateTable}
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              Crear Nueva Mesa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map(table => (
              <div
                key={table.id}
                onClick={() => handleEditTable(table.id)}
                className="bg-white p-6 rounded-xl shadow-sm border border-[var(--color-border-light)] hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-5 h-5 text-[var(--color-ink-muted)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[var(--color-surface-mint)] text-[var(--color-brand-deep)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Ocupada
                  </div>
                  <span className="text-xs text-[var(--color-ink-muted)] font-medium">
                    {table.lastUpdated}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[var(--color-heading)] mb-2">
                  {table.name}
                </h3>

                <div className="flex items-end justify-between mt-4 pt-4 border-t border-[var(--color-border-light)]">
                  <div>
                    <span className="text-xs text-[var(--color-ink-muted)] block">
                      Total Actual
                    </span>
                    <span className="text-lg font-bold text-[var(--color-primary)]">
                      S/ {table.total?.toFixed(2)}
                    </span>
                  </div>
                  <button className="text-sm font-medium text-[var(--color-primary)] group-hover:translate-x-1 transition-transform flex items-center bg-transparent border-0 p-0 cursor-pointer">
                    Ver Detalle
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
