import { useStore } from '@nanostores/preact'
import { useState, useEffect } from 'preact/hooks'
import { Divider } from '@/components/ui/Diverder'
import { cartItems, useCartItemsTotal } from '@/stores/order'
import { delivery } from '@/stores/location'

export default function OrderSummary() {
  const [mounted, setMounted] = useState(false)
  const $products = useStore(cartItems)
  const $isDelivery = useStore(delivery)
  const totalPrice = useCartItemsTotal()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div class="mt-4">
        <form className="space-y-6">
          <div class="rounded-md p-2 bg-action-extralight/40">
            <h3 class="font-semibold text-black mb-3">Resumen de pago</h3>
            <div className="space-y-2 mb-3">
              <p class="text-gray-500 text-sm">Cargando...</p>
            </div>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div class="mt-4">
      <form className="space-y-6">
        <div class="rounded-md p-2 bg-action-extralight/40">
          <h3 class="text-xl font-semibold text-black tracking-tighter mb-3">Resumen de pago</h3>

          <div className="space-y-2 mb-3">
            {Object.values($products).map(({ id, price, quantity, name }) => (
              <div key={id} class="flex items-center justify-between">
                <span className="text-black">
                  {quantity}x {name}
                </span>
                <span>S/ {price * quantity}</span>
              </div>
            ))}
            <Divider />
            <div className="flex items-center justify-between">
              <span className="text-gray-800/50">Subtotal</span>
              <span>S/ {totalPrice}</span>
            </div>
            {$isDelivery && (
              <div className="flex items-center justify-between">
                <span className="text-action tracking-tighter">Delivery</span>
                <span>S/ 5.00</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span class="text-xl font-bold text-red-500">Total</span>
              <span class="text-xl font-bold text-red-500">
                S/ {$isDelivery ? totalPrice + 5 : totalPrice}
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
