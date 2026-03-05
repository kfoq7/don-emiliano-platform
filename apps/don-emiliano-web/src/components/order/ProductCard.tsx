import { useState, useEffect } from 'preact/hooks'
import { addCartItem, increaseCartItem, decreaseCartItem } from '@/stores/order'
import { Plus, Minus } from '@/components/icons/react-icons'
import type { CartItem } from '@/types/Order'
import type { Product } from '@/types/Product'

type Props = { product: Product; cartItem?: CartItem }

export default function ProductCard({ product, cartItem }: Props) {
  const [mounted, setMounted] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const quantity = cartItem?.quantity || 0

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleAdd = () => {
    addCartItem(product)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 400)
  }

  return (
    <div
      className={`
        group relative flex flex-col bg-white rounded-xl border border-gray-100 
        shadow-sm hover:shadow-lg hover:border-primary/20
        transition-all duration-300 overflow-hidden
        ${justAdded ? 'cart-pop' : ''}
      `}
    >
      {/* Product image */}
      {product.image && (
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Price badge on image */}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            <span className="text-sm font-bold text-primary">S/ {product.price.toFixed(2)}</span>
          </div>
          {/* Quantity indicator on image if in cart */}
          {mounted && quantity > 0 && (
            <div className="absolute top-3 left-3 bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
              {quantity}
            </div>
          )}
        </div>
      )}

      {/* Content area */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 mb-3">
          <h3 className="font-bold text-base text-heading leading-snug">{product.name}</h3>
          {product.description && (
            <p className="mt-1 text-sm text-ink-muted leading-relaxed line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* No image fallback: show price inline */}
        {!product.image && (
          <div className="mb-3">
            <span className="text-lg font-bold text-primary">S/ {product.price.toFixed(2)}</span>
          </div>
        )}

        {/* Add to cart / quantity controls */}
        {!mounted || quantity === 0 ? (
          <button
            className="
              w-full flex items-center justify-center gap-2 
              bg-primary text-white py-2.5 px-4 rounded-lg 
              font-semibold text-sm cursor-pointer
              hover:bg-action-hover active:bg-action-pressed
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-sm hover:shadow-md
            "
            onClick={handleAdd}
            disabled={!mounted}
          >
            <Plus className="fill-white w-4 h-4" />
            Agregar
          </button>
        ) : (
          <div className="flex items-center justify-between bg-action-extralight/60 rounded-lg p-1">
            <button
              onClick={() => decreaseCartItem(product.id)}
              className="
                flex items-center justify-center w-9 h-9 
                rounded-lg bg-white shadow-sm
                hover:bg-red-50 active:bg-red-100
                transition-colors duration-150 cursor-pointer
              "
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="min-w-[2rem] text-center font-bold text-ink text-base">
              {quantity}
            </span>
            <button
              onClick={() => increaseCartItem(product.id)}
              className="
                flex items-center justify-center w-9 h-9 
                rounded-lg bg-white shadow-sm
                hover:bg-green-50 active:bg-green-100
                transition-colors duration-150 cursor-pointer
              "
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
