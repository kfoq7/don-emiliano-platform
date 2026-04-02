import { DashboardLayout } from '../layouts/DashboardLayout'
import { StatusBadge } from '../components/StatusBadge'
import { useTables } from '../hooks/useTables'

export const ActiveTablesPage = () => {
  const { data: tables = [], isLoading, isError } = useTables()

  const openOrders = tables.filter(t => t.status === 'occupied').length
  const pendingPayments = tables.filter(t => t.status === 'billing').length
  const dailyRevenue = tables
    .filter(t => t.currentTotal)
    .reduce((sum, t) => sum + (t.currentTotal || 0), 0)

  return (
    <DashboardLayout
      title="Mesas Activas"
      subtitle="Vista General del Piso y Gestión de Invitados"
      breadcrumbs={[{ label: 'Dashboard' }, { label: 'Mesas' }]}
    >
      <div className="mb-6 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm font-medium text-ink-muted">DISPONIBLE</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-action" />
          <span className="text-sm font-medium text-ink-muted">OCUPADA</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-yellow" />
          <span className="text-sm font-medium text-ink-muted">COBRANDO</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading && (
          <div className="col-span-full py-12 text-center text-ink-muted animate-pulse">
            Cargando mesas...
          </div>
        )}
        {isError && (
          <div className="col-span-full py-12 text-center text-brand-pink">
            Error al cargar las mesas. Por favor intente nuevamente.
          </div>
        )}
        {!isLoading &&
          !isError &&
          tables.map(table => (
            <div
              key={table.id}
              className="bg-surface rounded-xl border border-border-light p-6 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-4xl font-bold text-ink mb-1">
                    {table.number}
                  </div>
                  <div className="text-xs text-ink-subtle uppercase tracking-wide">
                    {table.location}
                  </div>
                </div>
                <StatusBadge status={table.status}>
                  {table.status === 'billing'
                    ? 'LISTO PARA COBRAR'
                    : table.status === 'occupied'
                      ? 'OCUPADA'
                      : 'DISPONIBLE'}
                </StatusBadge>
              </div>

              {table.status !== 'available' && table.guests && (
                <div className="space-y-3 pt-4 border-t border-border-light">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-ink-muted">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span className="font-medium">
                        {table.guests} Invitados
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between">
                    <span className="text-xs text-ink-subtle uppercase">
                      Total Actual
                    </span>
                    <span className="text-xl font-bold text-ink">
                      S/ {(table.currentTotal! / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {table.status === 'available' && (
                <div className="pt-4 border-t border-border-light">
                  <button className="w-full flex items-center justify-center gap-2 text-action hover:bg-action/10 rounded-lg py-2 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className="grid grid-cols-3 gap-6 bg-surface rounded-xl p-6 border border-border-light">
        <div>
          <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
            PEDIDOS ABIERTOS
          </div>
          <div className="text-3xl font-bold text-ink">{openOrders}</div>
        </div>
        <div>
          <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
            PAGOS PENDIENTES
          </div>
          <div className="text-3xl font-bold text-brand-yellow">
            {pendingPayments}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
            INGRESOS DIARIOS
          </div>
          <div className="text-3xl font-bold text-success">
            S/ {(dailyRevenue / 100).toFixed(2)}
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 bg-action hover:bg-action-hover text-white px-6 py-4 rounded-xl shadow-lg font-semibold flex items-center gap-2 transition-all">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Transacción Rápida
      </button>
    </DashboardLayout>
  )
}
