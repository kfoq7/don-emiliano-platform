interface TableSummaryProps {
  totalAmount: number
  onPrint: () => void
  onEdit: () => void
}

export function TableSummary({
  totalAmount,
  onPrint,
  onEdit,
}: TableSummaryProps) {
  return (
    <div className="bg-[var(--color-surface-hover)] p-6 border-t border-[var(--color-border-light)]">
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-[var(--color-heading)]">
          Total
        </span>
        <span className="text-2xl font-bold text-[var(--color-primary)]">
          S/ {totalAmount.toFixed(2)}
        </span>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrint}
          className="flex-1 bg-white border border-[var(--color-border-light)] hover:bg-[var(--color-surface-hover)] text-[var(--color-heading)] font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2"
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Imprimir
        </button>
        <button
          onClick={onEdit}
          className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-action-hover)] text-white font-semibold py-3 px-4 rounded-lg shadow-sm transition-colors flex justify-center items-center gap-2"
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
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Editar Pedido
        </button>
      </div>
    </div>
  )
}
