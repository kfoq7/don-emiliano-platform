import { useState, useEffect } from 'preact/hooks'
import { addCartItem, increaseCartItem, decreaseCartItem } from '@/stores/order'
import { Plus, Minus } from '@/components/icons/react-icons'
import type { CartItem } from '@/types/Order'
import type { Product } from '@/types/Product'

type Props = { product: Product; cartItem?: CartItem }

export default function ProductCard({ product, cartItem }: Props) {
  const [mounted, setMounted] = useState(false)
  const quantity = cartItem?.quantity || 0

  useEffect(() => {
    // This hooks is due to the hydration faileds in get back action page
    setMounted(true)
  }, [])

  return (
    <div className="flex justify-between px-4 py-2 bg-white border border-gray-200/40 rounded-md drop-shadow-sm">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-100 h-auto object-cover rounded"
          />
        )}

        <div className="flex items-center justify-between gap-4 w-full">
          <div>
            <h3 className="font-bold text-xl text-left">{product.name}</h3>
            <p>{product.description}</p>
          </div>

          <div>
            <span>S/. {product.price}</span>
          </div>
        </div>

        {!mounted || quantity === 0 ? (
          <button
            className="size-8 w-full flex items-center justify-center gap-2 bg-action rounded-md cursor-pointer text-white"
            onClick={() => addCartItem(product)}
            disabled={!mounted}
          >
            <Plus className="fill-white" />
            Agregar
          </button>
        ) : (
          <div className="size-8 flex items-center justify-between rounded-md w-full bg-action-extralight">
            <button
              onClick={() => decreaseCartItem(product.id)}
              className="flex items-center justify-center size-7 border-transparent bg-transparent rounded-md hover:bg-amber-300 hover:text-amber-300"
            >
              <Minus />
            </button>
            <span className="w-6 text-center font-medium text-black">{quantity}</span>
            <button
              onClick={() => increaseCartItem(product.id)}
              className="flex items-center justify-center size-7 border-transparent bg-transparent rounded-md hover:bg-amber-300 hover:text-amber-300"
            >
              <Plus />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
