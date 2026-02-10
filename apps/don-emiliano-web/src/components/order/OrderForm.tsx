import { useStore } from '@nanostores/preact'
import { cartItems } from '@/stores/order'

export default function OrderForm() {
  const $products = useStore(cartItems)

  return (
    <div class="mt-4">
      <form className="space-y-6">
        <div class="rounded-md p-2 bg-action-extralight">
          <h3 class="font-semibold text-black mb-3">Resumen de pago</h3>

          <div>
            {Object.values($products).map(({ id, quantity, name }) => (
              <div key={id}>
                <span className="">
                  {quantity}x {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  )
}
