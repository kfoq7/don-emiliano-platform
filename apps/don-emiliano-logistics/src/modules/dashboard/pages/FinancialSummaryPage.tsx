import { DashboardLayout } from '../layouts/DashboardLayout'

interface Transaction {
  id: string
  type: 'inflow' | 'outflow'
  title: string
  time: string
  source: string
  amount: number
  icon?: string
}

const mockTransactions: Transaction[] = [
  {
    id: '402',
    type: 'inflow',
    title: 'Venta Terminal POS',
    time: '14:22',
    source: 'ESTACIÓN 04',
    amount: 42500,
  },
  {
    id: '401',
    type: 'inflow',
    title: 'Tarifa Logística Online',
    time: '13:58',
    source: 'PLATAFORMA WEB',
    amount: 184000,
  },
  {
    id: '400',
    type: 'inflow',
    title: 'Depósito Pedido Mayorista',
    time: '13:12',
    source: 'PANEL ADMIN',
    amount: 500000,
  },
  {
    id: '399',
    type: 'inflow',
    title: 'Transacción Minorista',
    time: '12:45',
    source: 'ESTACIÓN 02',
    amount: 12450,
  },
]

const mockOutflows: Transaction[] = [
  {
    id: 'o1',
    type: 'outflow',
    title: 'Proveedor: Arabica Gold',
    time: '11:00',
    source: 'REPOSICIÓN INVENTARIO',
    amount: 320000,
    icon: '☕',
  },
  {
    id: 'o2',
    type: 'outflow',
    title: 'Empaques Mayorista',
    time: '10:15',
    source: 'MATERIALES',
    amount: 85000,
    icon: '📦',
  },
  {
    id: 'o3',
    type: 'outflow',
    title: 'Recibo Luz (Principal)',
    time: '09:00',
    source: 'PAGO-AUTO',
    amount: 145000,
    icon: 'SERV',
  },
  {
    id: 'o4',
    type: 'outflow',
    title: 'Mantenimiento de Flota',
    time: '08:30',
    source: 'VEHÍCULO #03',
    amount: 93750,
    icon: 'MANT',
  },
]

const metrics = [
  {
    label: 'Ticket Promedio',
    value: 'S/ 142.80',
    trend: '+5.2%',
    isPositive: true,
  },
  {
    label: 'Tasa de Conversión',
    value: '68.4%',
    trend: '-1.2%',
    isPositive: false,
  },
  { label: 'Items Por Pedido', value: '3.4', trend: '+0.8%', isPositive: true },
  {
    label: 'Eficiencia Estación 04',
    value: '94.2%',
    status: 'Óptimo',
    statusColor: 'var(--color-success)',
  },
]

export const FinancialSummaryPage = () => {
  const totalInflow = mockTransactions.reduce((sum, t) => sum + t.amount, 0)
  const totalOutflow = mockOutflows.reduce((sum, t) => sum + t.amount, 0)
  const netProfit = totalInflow - totalOutflow

  return (
    <DashboardLayout
      title="Resumen Financiero"
      subtitle="Reconciliación y Estado de Cuenta"
      breadcrumbs={[
        { label: 'General Financiero' },
        { label: 'Reconciliación' },
        { label: 'Reportes' },
      ]}
      actions={
        <input
          type="search"
          placeholder="Buscar transacciones..."
          className="px-4 py-2 border border-border-light rounded-lg text-sm w-64 text-ink bg-surface placeholder:text-ink-subtle"
        />
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-action text-white rounded-xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide opacity-90 mb-2">
                Beneficio Neto de Hoy
              </div>
              <div className="text-5xl font-bold">
                S/ {(netProfit / 100).toFixed(2)}
              </div>
            </div>
            <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
              <svg
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/20">
            <div>
              <div className="text-xs uppercase tracking-wide opacity-70 mb-1">
                Ingreso Total
              </div>
              <div className="text-2xl font-bold">
                S/ {(totalInflow / 100).toFixed(2)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wide opacity-70 mb-1">
                Egreso Total
              </div>
              <div className="text-2xl font-bold text-brand-yellow">
                S/ {(totalOutflow / 100).toFixed(2)}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <svg
              className="w-5 h-5 text-surface-mint"
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
            <span className="text-surface-mint font-semibold">
              +12.4% vs Ayer
            </span>
          </div>
        </div>

        <div className="bg-brand-yellow text-ink rounded-xl p-8">
          <div className="text-sm font-semibold uppercase tracking-wide mb-2">
            Liquidaciones Pendientes
          </div>
          <div className="text-5xl font-bold mb-4">S/ 1,204.00</div>
          <p className="text-sm mb-6">
            3 transacciones requieren revisión de terminal
          </p>
          <button className="bg-ink hover:bg-ink-muted text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            REVISAR AHORA
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-surface rounded-xl border border-border-light p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-success"
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
            </div>
            <div>
              <h3 className="font-bold text-ink">Ingresos por Ventas</h3>
              <p className="text-xs text-ink-subtle">Flujo en Vivo</p>
            </div>
          </div>

          <div className="space-y-3">
            {mockTransactions.map(transaction => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-hover rounded-lg flex items-center justify-center text-sm font-bold text-ink-muted">
                    #{transaction.id}
                  </div>
                  <div>
                    <div className="font-semibold text-ink">
                      {transaction.title}
                    </div>
                    <div className="text-xs text-ink-subtle">
                      {transaction.time} • {transaction.source}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold text-success">
                  +S/ {(transaction.amount / 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface rounded-xl border border-border-light p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-brand-pink/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-brand-pink"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-ink">Egresos Operativos</h3>
              <p className="text-xs text-ink-subtle">Cuentas por Pagar</p>
            </div>
          </div>

          <div className="space-y-3">
            {mockOutflows.map(outflow => (
              <div
                key={outflow.id}
                className="flex items-center justify-between py-3 border-b border-border-light last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-hover rounded-lg flex items-center justify-center text-sm font-bold text-ink-muted">
                    {outflow.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-ink">
                      {outflow.title}
                    </div>
                    <div className="text-xs text-ink-subtle">
                      {outflow.time} • {outflow.source}
                    </div>
                  </div>
                </div>
                <div className="text-lg font-bold text-brand-pink">
                  -S/ {(outflow.amount / 100).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-surface rounded-xl border border-border-light p-6"
          >
            <div className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
              {metric.label}
            </div>
            <div className="text-3xl font-bold text-ink mb-2">
              {metric.value}
            </div>
            {metric.trend && (
              <div
                className={`text-sm font-medium ${metric.isPositive ? 'text-success' : 'text-brand-pink'}`}
              >
                {metric.isPositive ? '↗' : '↘'} {metric.trend}
              </div>
            )}
            {metric.status && (
              <div className="flex items-center gap-2 text-sm">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: metric.statusColor }}
                />
                <span
                  className="font-medium"
                  style={{ color: metric.statusColor }}
                >
                  {metric.status}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button className="bg-action hover:bg-action-hover text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
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
        <button className="bg-surface hover:bg-surface-hover border border-border-light text-ink px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors">
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </button>
      </div>
    </DashboardLayout>
  )
}
