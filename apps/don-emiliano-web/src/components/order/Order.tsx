import { useState } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { productsStore, selectedCategoryAtom } from '@/stores/products.ts'
import ProductCard from './ProductCard.tsx'
import { cartItems } from '@/stores/order.ts'

export default function Order() {
  const $products = useStore(productsStore)
  const $cartItems = useStore(cartItems)
  const $selectedCategory = useStore(selectedCategoryAtom)

  const filteredProducts = Object.values($products).filter(
    product => product.category === $selectedCategory,
  )

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            cartItem={Object.values($cartItems).find(item => item.id === product.id)}
          />
        ))}
      </div>
    </>
  )
}
