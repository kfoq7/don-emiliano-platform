import { useStore } from '@nanostores/preact'
import {
  $productsLoading,
  $productsStore,
  getAllProductsStore,
  selectedCategoryAtom,
} from '@/stores/products'
import ProductCard from './ProductCard.tsx'
import { cartItems } from '@/stores/order.ts'
import { useEffect } from 'preact/hooks'

export default function Order() {
  const $products = useStore($productsStore)
  const $cartItems = useStore(cartItems)
  const $selectedCategory = useStore(selectedCategoryAtom)
  const $loading = useStore($productsLoading)

  const filteredProducts = Object.values($products).filter(
    product => product.category.name === $selectedCategory,
  )

  useEffect(() => {
    getAllProductsStore()
  }, [])

  if ($loading) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin mb-4" />
        <p className="text-ink-muted font-medium">Cargando productos...</p>
      </div>
    )
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <p className="text-ink-muted font-medium">No hay productos en esta categoria</p>
        <p className="text-sm text-ink-subtle mt-1">
          Selecciona otra categoria para ver mas opciones
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {filteredProducts.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.06}s` }}
        >
          <ProductCard
            product={product}
            cartItem={Object.values($cartItems).find(item => item.id === product.id)}
          />
        </div>
      ))}
    </div>
  )
}
