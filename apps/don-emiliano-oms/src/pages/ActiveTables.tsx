import { useNavigate } from 'react-router-dom'
import { useActiveTables } from '../hooks/useActiveTables'
import { TableCard } from '../components/TableCard'

export default function ActiveTables() {
  const { tables, isLoading, error, refreshTables } = useActiveTables()
  const navigate = useNavigate()

  const handleEditTable = (tableId: number) => {
    navigate(`/tables/${tableId}`)
  }

  const handleCreateTable = () => {
    navigate('/tables')
  }

  const handleLogout = () => {
    localStorage.removeItem('oms_auth')
    localStorage.removeItem('oms_userId')
    localStorage.removeItem('oms_tableId')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-surface-hover">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border-light sticky top-0 z-50">
        <div className="max-w-[var(--spacing-middle)] mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-heading">
            Mesas Activas
          </h1>
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-ink-muted hover:text-primary transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="max-w-[var(--spacing-middle)] mx-auto px-4 py-8">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={refreshTables}
            className="flex items-center gap-2 text-primary font-medium hover:text-action-hover transition-colors"
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
            className="bg-primary hover:bg-action-hover text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors flex items-center gap-2"
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
          <div className="text-center py-12 text-ink-muted">
            <svg
              className="animate-spin h-8 w-8 mx-auto mb-4 text-primary"
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
          <div className="bg-brand-pink/10 text-brand-pink p-4 rounded-lg text-center border border-brand-pink/20">
            {error}
            <button
              onClick={refreshTables}
              className="block mx-auto mt-2 text-sm font-semibold underline hover:no-underline"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : tables.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-border-light">
            <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4 text-ink-muted">
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
            <h3 className="text-lg font-medium text-heading mb-1">
              No hay mesas activas
            </h3>
            <p className="text-ink-muted mb-6">
              Comienza registrando un nuevo pedido.
            </p>
            <button
              onClick={handleCreateTable}
              className="text-primary font-semibold hover:underline"
            >
              Crear Nueva Mesa
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map(table => (
              <TableCard
                key={table.id}
                table={table}
                onEdit={handleEditTable}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
