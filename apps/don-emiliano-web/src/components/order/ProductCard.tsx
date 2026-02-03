import { addCartItem, increaseCartItem, decreaseCartItem } from '@/stores/order'
import { Plus, Minus } from '@/components/icons/react-icons'
import type { CartItem } from '@/types/Order'
import type { Product } from '@/types/Product'

type Props = { product: Product; cartItem?: CartItem }

export default function ProductCard({ product, cartItem }: Props) {
  const quantity = cartItem?.quantity || 0

  return (
    <div className="flex justify-between px-4 py-2 bg-white border border-gray-200/40 rounded-md drop-shadow-sm">
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-auto object-cover rounded"
          />
        )}

        <div class="flex items-center justify-between gap-4 w-full">
          <div>
            <h3 className="font-bold text-xl text-left">{product.name}</h3>
            <p>{product.description}</p>
          </div>

          <div>
            <span>S/. {product.price}</span>
          </div>
        </div>

        {quantity === 0 ? (
          <button
            className="size-8 w-full flex items-center justify-center gap-2  bg-amber-500 rounded-md cursor-pointer"
            onClick={() => addCartItem(product)}
          >
            <Plus />
            Agregar
          </button>
        ) : (
          <div class="size-8 flex items-center justify-between rounded-md w-full bg-amber-200">
            <button
              onClick={() => decreaseCartItem(product.id)}
              class="flex items-center justify-center size-7 border-transparent bg-transparent rounded-md hover:bg-amber-300 hover:text-amber-300"
            >
              <Minus />
            </button>
            <span class="w-6 text-center font-medium text-black">{quantity}</span>
            <button
              onClick={() => increaseCartItem(product.id)}
              class="flex items-center justify-center size-7 border-transparent bg-transparent rounded-md hover:bg-amber-300 hover:text-amber-300"
            >
              <Plus />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
