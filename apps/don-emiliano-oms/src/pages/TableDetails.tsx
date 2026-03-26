import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import type { Product } from '../types/Products'

interface CartItem extends Product {
  quantity: number
}

export default function TableDetails() {
  const { numberId } = useParams<{ numberId: string }>()
  const navigate = useNavigate()
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem('oms_auth')) {
      navigate('/')
      return
    }

    if (numberId) {
      fetchTableDetails(numberId)
    }
  }, [numberId, navigate])

  const fetchTableDetails = async (tableId: string) => {
    setIsLoading(true)
    try {
      // API call structure
      const response = await fetch(`/api/Pedido/DetalleMesa/?IdMesa=${tableId}`)

      if (response.ok) {
        const data = await response.json()
        const apiItems = data.Data || []

        // Map API response to internal CartItem format
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedItems: CartItem[] = apiItems.map((item: any) => ({
          IdProducto: 0,
          Descripcion: item.Producto,
          Precio: item.Precio,
          Combo: 0,
          quantity: item.Cantidad,
        }))

        setItems(mappedItems)
      } else {
        throw new Error('API failed')
      }
    } catch (error) {
      console.error('Error fetching table details:', error)
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = () => {
    if (numberId) {
      localStorage.setItem('oms_tableId', numberId)
      navigate('/dashboard')
    }
  }

  const handleBack = () => {
    navigate('/active-tables')
  }

  const totalAmount = items.reduce((sum, p) => sum + p.Precio * p.quantity, 0)

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
            {isLoading ? (
              <div className="flex justify-center py-8 text-[var(--color-ink-muted)]">
                <svg
                  className="animate-spin h-8 w-8 text-[var(--color-primary)]"
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
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-8 text-[var(--color-ink-muted)]">
                <p>No hay productos en esta mesa.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.IdProducto}-${index}`}
                    className="flex justify-between items-center py-2 border-b border-[var(--color-border-light)] last:border-0"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[var(--color-heading)]">
                          {item.quantity}x
                        </span>
                        <span className="text-[var(--color-heading)]">
                          {item.Descripcion}
                        </span>
                      </div>
                      <div className="text-sm text-[var(--color-ink-muted)] ml-6">
                        S/ {item.Precio.toFixed(2)} c/u
                      </div>
                    </div>
                    <div className="font-medium text-[var(--color-heading)]">
                      S/ {(item.quantity * item.Precio).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
                onClick={handleEdit}
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
        </div>
      </main>
    </div>
  )
}
