interface Filters {
  userId: string
  userName: string
  startDate: string
  endDate: string
  startTime: string
  endTime: string
}

interface FilterSectionProps {
  filters: Filters
  onFilterChange: (field: string, value: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

function FilterInput({
  label,
  type,
  value,
  placeholder,
  onChange,
}: {
  label: string
  type: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
      />
    </div>
  )
}

export function FilterSection({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
}: FilterSectionProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          <h4 className="text-sm font-semibold text-gray-700">Filtros</h4>
          {hasActiveFilters && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">
              !
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            Limpiar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
        <FilterInput
          label="ID de Usuario"
          type="text"
          value={filters.userId}
          placeholder="Buscar por ID..."
          onChange={v => onFilterChange('userId', v)}
        />
        <FilterInput
          label="Nombre"
          type="text"
          value={filters.userName}
          placeholder="Buscar por nombre..."
          onChange={v => onFilterChange('userName', v)}
        />
        <FilterInput
          label="Fecha Inicio"
          type="date"
          value={filters.startDate}
          onChange={v => onFilterChange('startDate', v)}
        />
        <FilterInput
          label="Fecha Fin"
          type="date"
          value={filters.endDate}
          onChange={v => onFilterChange('endDate', v)}
        />
        <FilterInput
          label="Hora Inicio"
          type="time"
          value={filters.startTime}
          onChange={v => onFilterChange('startTime', v)}
        />
        <FilterInput
          label="Hora Fin"
          type="time"
          value={filters.endTime}
          onChange={v => onFilterChange('endTime', v)}
        />
      </div>
    </div>
  )
}
