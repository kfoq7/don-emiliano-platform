interface ActionBarProps {
  onExport: () => void
  onUpload: () => void
  isExporting: boolean
  hasRecords: boolean
}

export function ActionBar({
  onExport,
  onUpload,
  isExporting,
  hasRecords,
}: ActionBarProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onExport}
        disabled={isExporting || !hasRecords}
        className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white
          shadow-sm hover:bg-emerald-700 active:bg-emerald-800
          transition-colors duration-150
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
      >
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        {isExporting ? 'Exportando...' : 'Exportar CSV'}
      </button>

      <button
        onClick={onUpload}
        disabled={!hasRecords}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white
          shadow-sm hover:bg-blue-700 active:bg-blue-800
          transition-colors duration-150
          disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:shadow-none"
      >
        <svg
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
        Subir a Base de Datos
      </button>
    </div>
  )
}
