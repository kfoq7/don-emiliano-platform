import { useStore } from '@nanostores/preact'
import { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } from '@/stores/order'
import { useHydration } from '@/lib/hooks/hydration'
import { Minus, Plus, Remove } from '../icons/react-icons'

export default function OrderCartList() {
  const $products = useStore(cartItems)
  const { hydrated } = useHydration({ item: Object.values($products) })

  if (!hydrated) {
    return (
      <div className="h-70 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-ink-muted">Cargando orden...</span>
        </div>
      </div>
    )
  }

  const items = Object.values($products)

  return (
    <>
      {items.length === 0 ? (
        <div className="h-70 flex flex-col items-center justify-center text-center px-4">
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
            <svg
              className="w-7 h-7 text-gray-400"
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
          <span className="text-ink-muted font-medium">Tu carrito esta vacio</span>
          <span className="text-sm text-ink-subtle mt-1">Agrega productos para comenzar</span>
        </div>
      ) : (
        <div className="h-70 overflow-y-auto pr-1">
          <div className="my-2 space-y-2">
            {items.map(({ id, name, price, quantity }, index) => (
              <div
                key={id}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Item info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-heading truncate">{name}</p>
                  <p className="text-xs text-ink-subtle mt-0.5">S/ {price.toFixed(2)} c/u</p>
                </div>

                {/* Quantity controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => decreaseCartItem(id)}
                    className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-red-50 hover:border-red-200 transition-colors cursor-pointer"
                    aria-label="Disminuir"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-ink">{quantity}</span>
                  <button
                    onClick={() => increaseCartItem(id)}
                    className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-200 bg-white hover:bg-green-50 hover:border-green-200 transition-colors cursor-pointer"
                    aria-label="Aumentar"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Subtotal */}
                <span className="text-sm font-semibold text-heading min-w-[4rem] text-right">
                  S/ {(price * quantity).toFixed(2)}
                </span>

                {/* Remove */}
                <button
                  onClick={() => removeCartItem(id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                  aria-label="Eliminar producto"
                >
                  <Remove className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
