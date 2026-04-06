export function TableGridCard({
  table,
  setTable,
  error,
  isSubmitting,
  handleSubmit,
  onCancel,
}: {
  table: string
  setTable: (v: string) => void
  error: string
  isSubmitting: boolean
  handleSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}) {
  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-heading mb-2">
          Seleccionar Mesa
        </h1>
        <p className="text-ink-muted">
          Indique la mesa para el pedido
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="table"
            className="block text-sm font-medium text-ink mb-2"
          >
            Número de Mesa
          </label>
          <input
            type="number"
            id="table"
            value={table}
            onChange={e => setTable(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-color-primary focus:border-transparent transition-all outline-none"
            placeholder="Ej. 1, 5, 12"
            autoFocus
          />
        </div>

        {error && (
          <div className="text-brand-pink text-sm animate-fade-in">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-action-hover disabled:bg-action-disabled disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Procesando...</span>
              </>
            ) : (
              'Continuar al Pedido'
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full bg-surface-hover hover:bg-border-light text-ink font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}
