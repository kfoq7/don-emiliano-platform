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
      <div className="mt-4">
        <div className="space-y-6">
          <div className="rounded-md p-4 bg-action-extralight/40">
            <h3 className="text-xl font-semibold text-black tracking-tighter mb-3">
              Resumen de pago
            </h3>
            <div className="space-y-2 mb-3">
              <p className="text-gray-500 text-sm">Cargando...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const hasItems = Object.keys($products).length > 0

  return (
    <div className="mt-4">
      <div className="space-y-6">
        <div className="rounded-md p-4 bg-action-extralight/40">
          <h3 className="text-xl font-semibold text-black tracking-tighter mb-3">
            Resumen de pago
          </h3>

          {!hasItems ? (
            <p className="text-gray-500 text-sm">No hay productos en el carrito</p>
          ) : (
            <div className="space-y-2 mb-3">
              {Object.values($products).map(({ id, price, quantity, name }) => (
                <div key={id} className="flex items-center justify-between gap-2">
                  <span className="text-black text-sm">
                    {quantity}x {name}
                  </span>
                  <span className="text-sm font-medium whitespace-nowrap">
                    S/ {formatPrice(price * quantity)}
                  </span>
                </div>
              ))}

              <Divider />

              <div className="flex items-center justify-between">
                <span className="text-gray-800/50 text-sm">Subtotal</span>
                <span className="text-sm font-medium">S/ {formatPrice(subtotal)}</span>
              </div>

              {$isDelivery && (
                <div className="flex items-center justify-between">
                  <span className="text-action tracking-tighter text-sm">Delivery</span>
                  <span className="text-sm font-medium">S/ {formatPrice(DELIVERY_FEE)}</span>
                </div>
              )}

              <Divider />

              <div className="flex items-center justify-between pt-1">
                <span className="text-xl font-bold text-red-500">Total</span>
                <span className="text-xl font-bold text-red-500">S/ {formatPrice(total)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
