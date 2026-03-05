import { useStore } from '@nanostores/preact'
import { useState, useEffect } from 'preact/hooks'
import { Divider } from '@/components/ui/Divider'
import { cartItems, useCartItemsTotal } from '@/stores/order'
import { delivery } from '@/stores/location'

const DELIVERY_FEE = 5.0

function formatPrice(price: number): string {
  return price.toFixed(2)
}

export default function OrderSummary() {
  const [mounted, setMounted] = useState(false)
  const $products = useStore(cartItems)
  const $isDelivery = useStore(delivery)
  const subtotal = useCartItemsTotal()
  const total = $isDelivery ? subtotal + DELIVERY_FEE : subtotal

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="mt-6">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-heading">Resumen de pago</h3>
          </div>
          <div className="flex items-center justify-center py-6">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  const hasItems = Object.keys($products).length > 0

  return (
    <div className="mt-6 animate-fade-in-up">
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-heading">Resumen de pago</h3>
            {hasItems && (
              <p className="text-xs text-ink-subtle">
                {Object.keys($products).length} producto
                {Object.keys($products).length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {!hasItems ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <p className="text-ink-muted font-medium">No hay productos en el carrito</p>
            <a
              href="/haz-tu-pedido"
              className="inline-block mt-2 text-sm text-primary font-medium hover:underline"
            >
              Ir al menu
            </a>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Item list */}
            {Object.values($products).map(({ id, price, quantity, name }) => (
              <div key={id} className="flex items-center justify-between gap-2 py-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    {quantity}
                  </span>
                  <span className="text-sm text-ink truncate">{name}</span>
                </div>
                <span className="text-sm font-semibold text-heading whitespace-nowrap">
                  S/ {formatPrice(price * quantity)}
                </span>
              </div>
            ))}

            <Divider />

            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-muted">Subtotal</span>
              <span className="text-sm font-medium text-ink">S/ {formatPrice(subtotal)}</span>
            </div>

            {/* Delivery fee */}
            {$isDelivery && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-muted flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                    />
                  </svg>
                  Delivery
                </span>
                <span className="text-sm font-medium text-ink">S/ {formatPrice(DELIVERY_FEE)}</span>
              </div>
            )}

            <Divider />

            {/* Total */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xl font-extrabold text-heading">Total</span>
              <span className="text-xl font-extrabold text-primary">S/ {formatPrice(total)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
