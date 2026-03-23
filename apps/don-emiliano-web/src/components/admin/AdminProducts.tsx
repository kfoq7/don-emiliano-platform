import { useState, useEffect } from 'preact/hooks'
import { toTitleCase } from '@/utils/to-title-case'
import { ToggleSwitch } from '@/components/ui/ToggleSwitch'
import {
  fetchAllProducts,
  toggleProductAvailability,
  type ProductCategory,
  type AdminProduct,
} from '@/lib/api/admin'
import AdminLodingSpinner from './AdminLoadingSpinner'

export default function AdminProducts() {
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [savingProductId, setSavingProductId] = useState<number | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)
    setError(null)

    try {
      const products = await fetchAllProducts()
      const categoryMap = new Map<string, AdminProduct[]>()

      products.forEach(product => {
        const existingProducts = categoryMap.get(product.category) || []
        categoryMap.set(product.category, [...existingProducts, product])
      })

      const categories = Array.from(categoryMap.entries()).map(([category, products], index) => ({
        id: index,
        name: category,
        products,
      }))

      setCategories(categories)

      // Select first category if none selected and categories exist
      if (categories.length > 0 && selectedCategoryId === null) {
        setSelectedCategoryId(categories[0].id)
      }
    } catch {
      setError('No se pudo cargar los productos')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggle(product: AdminProduct, newValue: boolean) {
    setSavingProductId(product.id)

    // Optimistic update
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        products: cat.products.map(p =>
          p.id === product.id ? { ...p, isStockAvailable: newValue } : p,
        ),
      })),
    )

    try {
      await toggleProductAvailability(product.id, newValue)
    } catch {
      // Revert on error
      setCategories(prev =>
        prev.map(cat => ({
          ...cat,
          products: cat.products.map(p =>
            p.id === product.id ? { ...p, isStockAvailable: !newValue } : p,
          ),
        })),
      )
    } finally {
      setSavingProductId(null)
    }
  }

  const selectedCategory = categories.find(c => c.id === selectedCategoryId)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex items-center gap-3 text-ink-muted">
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Cargando productos...
        </div>
      </div>
    )
  }

  if (error) {
    return <AdminLodingSpinner message="Cargando productos..." />
  }

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-ink-muted">No hay categorias registradas</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[250px_1fr]">
      {/* Categories Sidebar */}
      <div className="space-y-2">
        {categories.map(category => {
          const isActive = selectedCategoryId === category.id
          const availableCount = category.products.filter(p => p.isStockAvailable).length
          const totalCount = category.products.length

          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategoryId(category.id)}
              className={`
                w-full border px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? 'border-primary bg-primary/5 text-primary shadow-sm'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base">{toTitleCase(category.name)}</h3>
                  <p className="text-xs mt-0.5 opacity-70">
                    {availableCount}/{totalCount} disponibles
                  </p>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${isActive ? 'text-primary' : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          )
        })}
      </div>

      {/* Products List */}
      <div>
        {selectedCategory && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-primary text-white px-5 py-3.5 flex items-center justify-between">
              <h3 className="font-semibold text-lg">{toTitleCase(selectedCategory.name)}</h3>
              <span className="text-sm text-white/80">
                {selectedCategory.products.filter(p => p.isStockAvailable).length} de{' '}
                {selectedCategory.products.length} disponibles
              </span>
            </div>

            <div className="bg-white divide-y divide-gray-100">
              {selectedCategory.products.length === 0 ? (
                <div className="px-5 py-8 text-center text-gray-400 text-sm">
                  No hay productos en esta categoria
                </div>
              ) : (
                selectedCategory.products.map(product => (
                  <div
                    key={product.id}
                    className={`
                      px-5 py-4 transition-all duration-200
                      ${!product.isStockAvailable ? 'bg-gray-50/60' : 'hover:bg-gray-50/40'}
                      ${savingProductId === product.id ? 'opacity-60' : ''}
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <ToggleSwitch
                          id={product.id}
                          checked={product.isStockAvailable}
                          defaultChecked={product.isStockAvailable}
                          onChange={(checked: boolean) => handleToggle(product, checked)}
                        />

                        <div className="min-w-0 flex-1">
                          <h4
                            className={`font-medium truncate ${
                              product.isStockAvailable
                                ? 'text-gray-900'
                                : 'text-gray-400 line-through'
                            }`}
                          >
                            {toTitleCase(product.name)}
                          </h4>
                        </div>

                        {/* Saving indicator */}
                        {savingProductId === product.id && (
                          <div className="mt-1.5 text-xs text-primary flex items-center gap-1">
                            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Guardando...
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`font-semibold ${
                            product.isStockAvailable ? 'text-primary' : 'text-gray-300'
                          }`}
                        >
                          S/ {Number(product.price).toFixed(2)}
                        </span>

                        <span
                          className={`
                            text-xs font-medium px-2 py-0.5 rounded-full
                            ${
                              product.isStockAvailable
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-red-50 text-red-500'
                            }
                          `}
                        >
                          {product.isStockAvailable ? 'Disponible' : 'No disponible'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
