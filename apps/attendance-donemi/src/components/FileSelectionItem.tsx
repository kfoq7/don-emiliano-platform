interface FileSelectionItemProps {
  label: string
  description: string
  filePath: string
  onSelect: () => void
  icon: 'users' | 'attendance'
}

const icons = {
  users: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
      />
    </svg>
  ),
  attendance: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  ),
}

export function FileSelectionItem({
  label,
  description,
  filePath,
  onSelect,
  icon,
}: FileSelectionItemProps) {
  const hasFile = Boolean(filePath)

  return (
    <div
      className={`relative flex items-start gap-4 rounded-xl border-2 border-dashed p-4 transition-all duration-200 ${
        hasFile
          ? 'border-emerald-300 bg-emerald-50/50'
          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/30'
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
          hasFile
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        {icons[icon]}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-gray-900">{label}</h4>
          {hasFile && (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
              Listo
            </span>
          )}
        </div>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>

        {hasFile && (
          <p className="mt-2 truncate rounded-md bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-600">
            {filePath}
          </p>
        )}

        <button
          onClick={onSelect}
          className={`mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            hasFile
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
            />
          </svg>
          {hasFile ? 'Cambiar archivo' : 'Seleccionar archivo'}
        </button>
      </div>
    </div>
  )
}
