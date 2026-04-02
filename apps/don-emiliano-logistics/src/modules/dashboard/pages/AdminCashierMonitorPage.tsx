import { DashboardLayout } from '../layouts/DashboardLayout'
import { StatCard } from '../components/StatCard'
import { StatusBadge } from '../components/StatusBadge'

interface Terminal {
  id: string
  cashier: {
    name: string
    avatar: string
  }
  terminal: string
  location: string
  status: 'active' | 'low-cash'
  sessionDuration: string
  totalSales: number
  avgMinutes: number
  badge?: string
}

const mockTerminals: Terminal[] = [
  {
    id: '1',
    cashier: { name: 'Mateo Rodriguez', avatar: 'MR' },
    terminal: 'TERMINAL 01',
    location: 'SALA PRINCIPAL',
    status: 'active',
    sessionDuration: '06h 42m',
    totalSales: 241020,
    avgMinutes: 3.2,
  },
  {
    id: '2',
    cashier: { name: 'Elena Sofia', avatar: 'ES' },
    terminal: 'TERMINAL 04',
    location: 'EXPRÉS',
    status: 'low-cash',
    sessionDuration: '02h 15m',
    totalSales: 489200,
    avgMinutes: 1.8,
    badge: 'EFECTIVO BAJO',
  },
  {
    id: '3',
    cashier: { name: 'Lucas Vane', avatar: 'LV' },
    terminal: 'TERMINAL 02',
    location: 'ZONA DE CARGA',
    status: 'active',
    sessionDuration: '08h 12m',
    totalSales: 110545,
    avgMinutes: 5.4,
  },
  {
    id: '4',
    cashier: { name: 'Clara Kent', avatar: 'CK' },
    terminal: 'TERMINAL 05',
    location: 'OFICINA',
    status: 'active',
    sessionDuration: '04h 55m',
    totalSales: 352010,
    avgMinutes: 2.1,
  },
  {
    id: '5',
    cashier: { name: 'Julian Aris', avatar: 'JA' },
    terminal: 'TERMINAL 03',
    location: 'DRIVE THRU',
    status: 'active',
    sessionDuration: '01h 05m',
    totalSales: 94230,
    avgMinutes: 0.9,
  },
  {
    id: '6',
    cashier: { name: 'Maria Zen', avatar: 'MZ' },
    terminal: 'TERMINAL 07',
    location: 'PUERTA B',
    status: 'active',
    sessionDuration: '03h 22m',
    totalSales: 151945,
    avgMinutes: 0,
    badge: 'RED',
  },
]

export const AdminCashierMonitorPage = () => {
  const activeCashiers = mockTerminals.filter(t => t.status === 'active').length
  const totalRevenue = mockTerminals.reduce((sum, t) => sum + t.totalSales, 0)

  return (
    <DashboardLayout
      title="Monitoreo de Cajeros"
      subtitle="Supervisión en tiempo real de terminales activos y velocidad de transacción."
      breadcrumbs={[
        { label: 'Admin' },
        { label: 'Logística' },
        { label: 'Reportes' },
      ]}
      actions={
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-border-light rounded-lg text-sm font-medium text-ink-muted hover:bg-surface-hover flex items-center gap-2">
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            FILTRAR
          </button>
          <button className="px-4 py-2 border border-border-light rounded-lg text-sm font-medium text-ink-muted hover:bg-surface-hover flex items-center gap-2">
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            EXPORTAR
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Estado en Vivo"
          value={
            <div className="flex items-baseline gap-2">
              <span>Cajeros Activos</span>
            </div>
          }
          subtitle={
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-ink">
                {activeCashiers}
                <span className="text-lg text-ink-subtle">/15</span>
              </span>
              <span className="text-sm text-success flex items-center gap-1">
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
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
                80%
              </span>
            </div>
          }
        />

        <StatCard
          label="Ingresos Totales"
          value={
            <div>
              Turno Actual
              <div className="text-4xl font-bold text-ink mt-2">
                S/ {(totalRevenue / 100).toFixed(2)}
              </div>
            </div>
          }
        />

        <StatCard
          label="Alertas Críticas"
          value="Requiere Atención"
          subtitle="2 Terminales reportan bajo efectivo o retraso técnico."
          variant="yellow"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      </div>

      <div className="bg-surface rounded-xl border border-border-light p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-ink">
            Cuadrícula de Terminales Activos
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockTerminals.map(terminal => (
            <div
              key={terminal.id}
              className="border border-border-light rounded-lg p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-action text-white flex items-center justify-center font-semibold">
                    {terminal.cashier.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-ink">
                      {terminal.cashier.name}
                    </div>
                    <div className="text-xs text-ink-subtle">
                      {terminal.terminal} • {terminal.location}
                    </div>
                  </div>
                </div>
                <StatusBadge status={terminal.status}>
                  {terminal.badge ||
                    (terminal.status === 'active' ? 'ACTIVO' : terminal.status)}
                </StatusBadge>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-light">
                <div>
                  <div className="text-xs text-ink-subtle uppercase tracking-wide mb-1">
                    Sesión
                  </div>
                  <div className="text-lg font-bold text-ink">
                    {terminal.sessionDuration}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-ink-subtle uppercase tracking-wide mb-1">
                    Ventas Totales
                  </div>
                  <div className="text-lg font-bold text-ink">
                    S/ {(terminal.totalSales / 100).toFixed(2)}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  {terminal.avgMinutes > 0 ? (
                    <>
                      <div className="text-xs text-ink-subtle uppercase tracking-wide mb-1">
                        {terminal.avgMinutes} min prom.
                      </div>
                      <button className="text-sm font-medium text-action hover:underline">
                        VER LIBRO
                      </button>
                    </>
                  ) : (
                    <button className="px-3 py-1.5 bg-action text-white text-xs font-semibold rounded hover:bg-action-hover">
                      DIAGNÓSTICO
                    </button>
                  )}
                </div>
              </div>

              {terminal.badge === 'EFECTIVO BAJO' && (
                <button className="w-full mt-4 px-4 py-2 bg-brand-yellow hover:bg-[#ffe566] text-ink font-semibold rounded-lg transition-colors">
                  REABASTECER
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border-light p-6">
        <h3 className="text-lg font-bold text-ink mb-4">Salud del Sistema</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-muted">
              Latencia de Sinc. Nube
            </span>
            <div className="flex items-center gap-3">
              <div className="w-64 h-2 bg-border-light rounded-full overflow-hidden">
                <div className="h-full bg-success w-[95%]" />
              </div>
              <span className="text-sm font-semibold text-success">
                12ms • Estable
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-ink-muted">Pasarela de Pagos</span>
            <span className="text-sm font-semibold text-success">Activa</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border-light flex items-center justify-between">
          <div className="text-sm text-ink-muted">
            Volumen de Ventas Predictivo para la Próxima Hora
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-ink-subtle"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span className="text-2xl font-bold text-ink">+S/ 4,200.00</span>
              <span className="text-sm text-ink-muted">esperado</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
