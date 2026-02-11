import { useStore } from '@nanostores/preact'
import { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } from '@/stores/order'
import { useHydration } from '@/lib/hooks/hydration'
import { Minus, Plus, Remove } from '../icons/react-icons'

export default function OrderCartList() {
  const $products = useStore(cartItems)
  const { hydrated } = useHydration({ item: Object.values($products) })

  if (!hydrated) {
    return (
      <div className="h-120 overflow-y-scroll flex items-center justify-center">
        <span className="text-gray-500">Cargando orden...</span>
      </div>
    )
  }

  return (
    <>
      {Object.values($products).length === 0 ? (
        <div className="h-70 flex flex-col items-center justify-center">
          <span className="text-gray-500 text-lg font-medium">Tu carrito está vacío</span>
          <span className="text-gray-400 text-sm">Agrega productos para comenzar</span>
        </div>
      ) : (
        <div className="h-70 overflow-y-auto">
          <div className="my-2 h-full space-y-3">
            {Object.values($products).map(({ id, name, price, quantity }) => (
              <div
                key={id}
                className="flex items-center gap-3 px-2 py-3 rounded-lg bg-action-extralight/40"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm ">{name}</p>
                  <p className="text-sm">S/ {price} c/u</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseCartItem(id)}
                    className="border border-gray-300/80 drop-shadow-md rounded-md p-0.5 hover:bg-amber-300"
                  >
                    <Minus />
                  </button>
                  <span className="text-sm text-gray-700">{quantity}</span>
                  <button
                    onClick={() => increaseCartItem(id)}
                    className="border border-gray-300/80 drop-shadow-md rounded-md p-0.5"
                  >
                    <Plus />
                  </button>

                  <div class="text-right">S/ {price * quantity}</div>
                  <button
                    onClick={() => removeCartItem(id)}
                    class="rounded-full p-1 border border-gray-200 bg-gray-300 cursor-pointer hover:border-red-200 hover:bg-red-300"
                  >
                    <Remove />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
