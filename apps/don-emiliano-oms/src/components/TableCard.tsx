import { Table } from '../services/table.service'

interface TableCardProps {
  table: Table
  onEdit: (id: number) => void
}

export const TableCard = ({ table, onEdit }: TableCardProps) => {
  return (
    <div
      onClick={() => onEdit(table.id)}
      className="bg-white p-6 rounded-xl shadow-sm border border-color-border-light hover:shadow-md transition-shadow cursor-pointer group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <svg
          className="w-5 h-5 text-color-ink-muted"
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
        <div className="bg-color-surface-mint text-color-brand-deep px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          Ocupada
        </div>
        <span className="text-xs text-color-ink-muted font-medium">
          {table.lastUpdated}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-color-heading mb-2">
        {table.name}
      </h3>

      <div className="flex items-end justify-between mt-4 pt-4 border-t border-color-border-light">
        <div>
          <span className="text-xs text-color-ink-muted block">
            Total Actual
          </span>
          <span className="text-lg font-bold text-color-primary">
            S/ {table.total?.toFixed(2)}
          </span>
        </div>
        <button className="text-sm font-medium text-color-primary group-hover:translate-x-1 transition-transform flex items-center bg-transparent border-0 p-0 cursor-pointer">
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
  )
}
