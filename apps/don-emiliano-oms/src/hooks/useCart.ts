import { useState } from 'react'
import type { Product } from '../types/Products'

export interface CartItem extends Product {
  quantity: number
  observacion?: string
}

export function useCart() {
  const [selectedProducts, setSelectedProducts] = useState<CartItem[]>([])

  const toggleProductSelection = (product: Product) => {
    setSelectedProducts(prev => {
      const exists = prev.find(p => p.IdProducto === product.IdProducto)
      if (exists) {
        return prev.filter(p => p.IdProducto !== product.IdProducto)
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId: number, delta: number) => {
    setSelectedProducts(prev =>
      prev.map(item => {
        if (item.IdProducto === productId) {
          const newQuantity = Math.max(1, item.quantity + delta)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const updateObservacion = (productId: number, observacion: string) => {
    setSelectedProducts(prev =>
      prev.map(item =>
        item.IdProducto === productId ? { ...item, observacion } : item,
      ),
    )
  }

  const clearCart = () => setSelectedProducts([])

  const totalAmount = selectedProducts.reduce(
    (sum, p) => sum + p.Precio * p.quantity,
    0,
  )
  const totalItems = selectedProducts.reduce((sum, p) => sum + p.quantity, 0)

  return {
    selectedProducts,
    toggleProductSelection,
    updateQuantity,
    updateObservacion,
    clearCart,
    totalAmount,
    totalItems,
  }
}
