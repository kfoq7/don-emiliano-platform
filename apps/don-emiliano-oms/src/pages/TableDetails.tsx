import { useParams } from 'react-router-dom'
import { useTableDetails } from '../hooks/useTableDetails'
import { OrderItemList } from '../components/OrderItemList'
import { TableSummary } from '../components/TableSummary'

export default function TableDetails() {
  const { numberId } = useParams<{ numberId: string }>()

  const { items, isLoading, totalAmount, handleEdit, handleBack, handlePrint } =
    useTableDetails(numberId)

  return (
    <div className="min-h-screen bg-[var(--color-surface-hover)]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[var(--color-border-light)] sticky top-0 z-50">
        <div className="max-w-[var(--spacing-middle)] mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 text-[var(--color-ink-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] rounded-full transition-colors"
              aria-label="Volver"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-[var(--color-heading)]">
              Mesa {numberId}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-[var(--spacing-middle)] mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-[var(--color-border-light)] overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border-light)] flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--color-heading)]">
              Resumen del Pedido
            </h2>
            <span className="bg-[var(--color-surface-mint)] text-[var(--color-brand-deep)] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              Ocupada
            </span>
          </div>

          <div className="p-6">
            <OrderItemList isLoading={isLoading} items={items} />
          </div>

          <TableSummary
            totalAmount={totalAmount}
            onPrint={handlePrint}
            onEdit={handleEdit}
          />
        </div>
      </main>
    </div>
  )
}
