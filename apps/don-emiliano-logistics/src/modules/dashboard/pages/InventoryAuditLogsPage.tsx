import { DashboardLayout } from '../layouts/DashboardLayout'

interface AuditLog {
  timestamp: string
  product: string
  quantity: string
  authorizedBy: {
    name: string
    initials: string
  }
  status: 'verified' | 'pending'
  icon?: string
}

interface VoidedItem {
  timestamp: string
  product: string
  action: string
  cashier: string
  reason: string
  requiresOverride?: boolean
}

const mockInflows: AuditLog[] = [
  {
    timestamp: 'Oct 24, 09:12 AM',
    product: 'Tequila Añejo Premium',
    quantity: '+24 Cajas',
    authorizedBy: { name: 'Enrique M.', initials: 'EM' },
    status: 'verified',
    icon: '🍷',
  },
  {
    timestamp: 'Oct 24, 08:45 AM',
    product: 'Café Espresso Fino',
    quantity: '+50 Kg',
    authorizedBy: { name: 'Luisa A.', initials: 'LA' },
    status: 'verified',
    icon: '☕',
  },
]

const mockVoids: VoidedItem[] = [
  {
    timestamp: 'Oct 24, 11:22 AM',
    product: 'Vino Importado – Reserva',
    action: 'ELIMINACIÓN PERMANENTE',
    cashier: 'Juarez S.',
    reason: 'Dañado al llegar',
    requiresOverride: true,
  },
  {
    timestamp: 'Oct 24, 10:15 AM',
    product: 'Harina Artesanal 25Kg',
    action: 'TRANSACCIÓN ANULADA',
    cashier: 'Juan',
    reason: '',
    requiresOverride: false,
  },
]

export const InventoryAuditLogsPage = () => {
  return (
    <DashboardLayout
      title="Registros de Auditoría de Inventario"
      subtitle="Seguimiento seguro de movimientos de stock, eliminaciones y ajustes. Todas las acciones tienen marca de tiempo criptográfica y están asignadas al personal autorizado."
      breadcrumbs={[
        { label: 'Dashboard' },
        { label: 'Inventario' },
        { label: 'Logística' },
      ]}
      actions={
        <input
          type="search"
          placeholder="Buscar pista de auditoría..."
          className="px-4 py-2 border border-border-light rounded-lg text-sm w-64 text-ink bg-surface placeholder:text-ink-subtle"
        />
      }
    >
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-surface rounded-xl border-l-4 border-action p-6">
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-action"
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
            <div className="text-xs font-semibold text-action uppercase tracking-wide">
              Ingresos
            </div>
          </div>
          <div className="text-4xl font-bold text-ink mb-1">1,248</div>
          <div className="text-sm text-ink-muted">
            Unidades repuestas esta semana
          </div>
        </div>

        <div className="bg-surface rounded-xl border-l-4 border-brand-pink p-6">
          <div className="flex items-center gap-3 mb-3">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <div className="text-xs font-semibold text-brand-pink uppercase tracking-wide">
              Anulaciones
            </div>
          </div>
          <div className="text-4xl font-bold text-ink mb-1">14</div>
          <div className="text-sm text-ink-muted">
            Artículos eliminados/devueltos
          </div>
        </div>

        <div className="bg-surface rounded-xl border-l-4 border-brand-yellow p-6">
          <div className="flex items-center gap-3 mb-3">
            <svg
              className="w-6 h-6 text-brand-yellow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-xs font-semibold text-brand-yellow uppercase tracking-wide">
              Integridad
            </div>
          </div>
          <div className="text-4xl font-bold text-ink mb-1">100%</div>
          <div className="text-sm text-ink-muted">
            Cadena de auditoría validada
          </div>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border-light p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-action/10 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-action"
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
            <h3 className="text-lg font-bold text-ink">
              Ingresos de Productos
            </h3>
          </div>
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
            EXPORTAR CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Marca de Tiempo
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Producto
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Cantidad
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Autorizado Por
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {mockInflows.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-border-light hover:bg-surface-hover"
                >
                  <td className="py-4 px-4 text-sm text-ink-muted">
                    {log.timestamp}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-hover rounded-lg flex items-center justify-center text-lg">
                        {log.icon}
                      </div>
                      <span className="font-medium text-ink">
                        {log.product}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-mint-bold text-ink rounded-full text-sm font-semibold">
                      {log.quantity}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-action text-white flex items-center justify-center text-xs font-semibold">
                        {log.authorizedBy.initials}
                      </div>
                      <span className="text-sm text-ink">
                        {log.authorizedBy.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-action italic">
                      VERIFICADO
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border-light p-6">
        <div className="flex items-center gap-3 mb-4">
          <svg
            className="w-6 h-6 text-brand-pink"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-bold text-brand-pink">
            Artículos Anulados y Eliminados
          </h3>
        </div>

        <div className="bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2">
            <svg
              className="w-5 h-5 text-brand-pink flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div className="text-sm text-brand-pink">
              <span className="font-semibold">NOTA DE AUDITORÍA:</span> TODAS
              LAS ELIMINACIONES REQUIEREN CÓDIGO DE ANULACIÓN DEL SUPERVISOR.
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-light">
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Marca de Tiempo
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Producto
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Acción
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Cajero
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-ink-muted uppercase tracking-wide">
                  Razón
                </th>
              </tr>
            </thead>
            <tbody>
              {mockVoids.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-border-light hover:bg-surface-hover"
                >
                  <td className="py-4 px-4 text-sm text-brand-pink font-medium">
                    {item.timestamp}
                  </td>
                  <td className="py-4 px-4 font-medium text-ink">
                    {item.product}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-brand-pink text-white rounded text-xs font-semibold uppercase">
                      {item.action}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-ink">{item.cashier}</td>
                  <td className="py-4 px-4 text-sm text-ink-subtle italic">
                    {item.reason || 'Dañado al llegar'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-6 border-t border-border-light flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center">
              <span className="text-white text-lg">👨‍💼</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">
                Auditor Activo
              </div>
              <div className="text-xs text-ink-muted">
                Auditor Jefe Roberto D.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 bg-surface border border-border-light hover:bg-surface-hover text-ink rounded-lg font-semibold transition-colors">
              IMPRIMIR RESUMEN DIARIO
            </button>
            <button className="px-5 py-2.5 bg-action hover:bg-action-hover text-white rounded-lg font-semibold transition-colors">
              FINALIZAR REGISTRO Y CERRAR DÍA
            </button>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border-light flex items-center gap-2 text-sm">
          <svg
            className="w-5 h-5 text-action"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <span className="font-semibold text-action">
              Estado de Seguridad:
            </span>{' '}
            <span className="text-ink-muted">
              Rastro Encriptado de Extremo a Extremo
            </span>
          </div>
          <div className="ml-auto w-3 h-3 bg-success rounded-full" />
        </div>
      </div>
    </DashboardLayout>
  )
}
