import type { CartItem } from '../hooks/useCart'
import type { Product } from '../types/Products'

interface CartItemProps {
  product: CartItem
  onToggle: (product: Product) => void
  onUpdateQuantity: (productId: number, delta: number) => void
  onUpdateObservacion: (productId: number, obs: string) => void
}

export function CartItemComponent({
  product,
  onToggle,
  onUpdateQuantity,
  onUpdateObservacion,
}: CartItemProps) {
  return (
    <li className="flex flex-col bg-surface-hover p-3 rounded-lg border border-border-light animate-fade-in-right">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1 pr-2">
          <span className="text-sm font-medium text-heading line-clamp-2">
            {product.Descripcion}
          </span>
        </div>
        <button
          onClick={e => {
            e.stopPropagation()
            onToggle(product as Product)
          }}
          className="text-xs text-brand-pink hover:text-action-pressed p-1"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border-light">
        <div className="flex items-center gap-3 bg-white rounded-md border border-border-light px-2 py-1">
          <button
            onClick={() => onUpdateQuantity(product.IdProducto, -1)}
            className="text-ink-muted hover:text-primary disabled:opacity-30"
            disabled={product.quantity <= 1}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 12H4"
              />
            </svg>
          </button>
          <span className="text-sm font-semibold w-6 text-center">
            {product.quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(product.IdProducto, 1)}
            className="text-ink-muted hover:text-primary"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>

        <div className="text-right">
          <span className="block text-xs text-ink-muted">
            S/ {product.Precio.toFixed(2)} c/u
          </span>
          <span className="font-bold text-ink text-sm">
            S/ {(product.Precio * product.quantity).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Observación (opcional)"
          value={product.observacion || ''}
          onChange={e =>
            onUpdateObservacion(product.IdProducto, e.target.value)
          }
          className="w-full text-sm px-3 py-1.5 rounded bg-white border border-border focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-ink-muted"
        />
      </div>
    </li>
  )
}
