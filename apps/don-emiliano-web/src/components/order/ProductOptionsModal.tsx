import { useState, useEffect } from 'preact/hooks'
import type { Product } from '@/types/Product'
import { addCartItem } from '@/stores/order'
import { Plus, Minus, Remove } from '@/components/icons/react-icons'

type Props = {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductOptionsModal({ product, isOpen, onClose }: Props) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (isOpen && product) {
      // Reset state when opening
      const initialOptions: Record<string, string> = {}
      product.options?.forEach(opt => {
        if (opt.values.length > 0) {
          initialOptions[opt.name] = opt.values[0]
        }
      })
      setSelectedOptions(initialOptions)
      setQuantity(1)
    }
  }, [isOpen, product])

  if (!isOpen || !product) return null

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }))
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addCartItem({
        ...product,
        selectedOptions,
      })
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-lg text-heading">{product.name}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Remove className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto">
          {product.description && (
            <p className="text-sm text-ink-muted mb-4">{product.description}</p>
          )}

          <div className="space-y-4">
            {product.options?.map(option => (
              <div key={option.name}>
                <label className="block text-sm font-semibold text-heading mb-2">
                  {option.name}
                </label>
                <div className="flex flex-wrap gap-2">
                  {option.values.map(value => (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(option.name, value)}
                      className={`
                        px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer
                        ${
                          selectedOptions[option.name] === value
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-ink border-gray-200 hover:border-primary/50'
                        }
                      `}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-lg border border-gray-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600 disabled:opacity-50 cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-semibold text-lg min-w-[1.5rem] text-center text-ink">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-600 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-2.5 px-4 rounded-lg font-semibold shadow-md hover:bg-action-hover active:bg-action-pressed transition-colors cursor-pointer"
            >
              Agregar - S/ {(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
