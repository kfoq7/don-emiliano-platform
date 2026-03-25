import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TableSelection() {
  const [table, setTable] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (table.trim()) {
      localStorage.setItem('oms_tableId', table.trim())
      navigate('/dashboard')
    } else {
      setError('Por favor ingrese un número de mesa válido')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-2">
            Seleccionar Mesa
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            Indique la mesa para el pedido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="table"
              className="block text-sm font-medium text-[var(--color-ink)] mb-2"
            >
              Número de Mesa
            </label>
            <input
              type="number"
              id="table"
              value={table}
              onChange={e => setTable(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
              placeholder="Ej. 1, 5, 12"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-[var(--color-brand-pink)] text-sm animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-action-hover)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
          >
            Continuar al Pedido
          </button>
        </form>
      </div>
    </div>
  )
}
