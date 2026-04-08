import type { Product } from '../types/Products'

interface ProductCardProps {
  product: Product
  isSelected: boolean
  onToggle: (product: Product) => void
  quantity?: number
  onUpdateQuantity?: (productId: number, delta: number) => void
}

export function ProductCard({
  product,
  isSelected,
  onToggle,
  quantity,
  onUpdateQuantity,
}: ProductCardProps) {
  return (
    <li
      className={`p-4 transition-colors duration-150 flex flex-col justify-between group select-none
        ${isSelected ? 'bg-surface-mint' : 'hover:bg-surface-hover cursor-pointer'}`}
      onClick={() => {
        if (!isSelected) {
          onToggle(product)
        }
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className="flex items-center gap-3 flex-1"
          onClick={() => {
            if (isSelected) {
              onToggle(product)
            }
          }}
        >
          <div
            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors cursor-pointer
            ${
              isSelected
                ? 'bg-brand-green border-brand-green'
                : 'border-border group-hover:border-primary'
            }`}
          >
            {isSelected && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          <div>
            <span
              className={`block font-medium transition-colors ${
                isSelected ? 'text-brand-deep' : 'text-heading'
              }`}
            >
              {product.Descripcion}
            </span>
            <span className="text-xs text-ink-muted">
              ID: {product.IdProducto}
            </span>
          </div>
        </div>
        <span className="font-bold text-ink whitespace-nowrap">
          S/ {product.Precio.toFixed(2)}
        </span>
      </div>

      {isSelected && quantity !== undefined && onUpdateQuantity && (
        <div className="flex items-center justify-between mt-3 pl-8">
          <div className="flex items-center gap-3 bg-white rounded-md border border-border-light px-2 py-1">
            <button
              onClick={e => {
                e.stopPropagation()
                onUpdateQuantity(product.IdProducto, -1)
              }}
              className="text-ink-muted hover:text-primary disabled:opacity-30 p-1"
              disabled={quantity <= 1}
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
              {quantity}
            </span>
            <button
              onClick={e => {
                e.stopPropagation()
                onUpdateQuantity(product.IdProducto, 1)
              }}
              className="text-ink-muted hover:text-primary p-1"
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
          <span className="text-sm font-semibold text-primary">
            S/ {(product.Precio * quantity).toFixed(2)}
          </span>
        </div>
      )}
    </li>
  )
}
