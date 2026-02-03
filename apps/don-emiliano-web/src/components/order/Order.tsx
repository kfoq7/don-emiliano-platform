import { useState } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { productsStore } from '@/stores/products.ts'
import ProductCard from './ProductCard.tsx'
import { cartItems } from '@/stores/order.ts'

export default function Order() {
  const $products = useStore(productsStore)
  const $cartItems = useStore(cartItems)
  const categories = ['porciones', 'bebidas calientes', 'guarniciones', 'jugos', 'frappes', 'caldo']
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  const filteredProducts = Object.values($products).filter(
    product => product.category === selectedCategory,
  )

  return (
    <>
      <div className="max-w-3xl mt-4 mb-2">
        <div className="flex flex-row gap-2 overflow-y-auto">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded cursor-pointer text-nowrap ${
                selectedCategory === category
                  ? 'bg-amber-400 text-black font-semibold'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div class="h-120 overflow-y-auto">
        <div className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={Object.values($cartItems).find(item => item.id === product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
