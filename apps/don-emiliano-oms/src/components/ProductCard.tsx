import type { Product } from '../types/Products'

interface ProductCardProps {
  product: Product
  isSelected: boolean
  onToggle: (product: Product) => void
}

export function ProductCard({
  product,
  isSelected,
  onToggle,
}: ProductCardProps) {
  return (
    <li
      onClick={() => onToggle(product)}
      className={`p-4 cursor-pointer transition-colors duration-150 flex justify-between items-center group select-none
        ${isSelected ? 'bg-surface-mint' : 'hover:bg-surface-hover'}`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors
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
      <span className="font-bold text-ink">S/ {product.Precio.toFixed(2)}</span>
    </li>
  )
}
