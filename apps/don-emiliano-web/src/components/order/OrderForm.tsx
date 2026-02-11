import { useStore } from '@nanostores/preact'
import { useState, useEffect } from 'preact/hooks'
import { Divider } from '@/components/ui/Diverder'
import { cartItems, useCartItemsTotal } from '@/stores/order'
import { delivery } from '@/stores/location'

export default function OrderForm() {
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
              <span>Subtotal</span>
              <span>S/ {totalPrice}</span>
            </div>
            {$isDelivery && (
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span>S/ 5.00</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span>Total</span>
              <span>S/ {$isDelivery ? totalPrice + 5 : totalPrice}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
