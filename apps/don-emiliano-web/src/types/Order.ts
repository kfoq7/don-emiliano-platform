import type { Product } from './Product'

export interface CartItem extends Product {
  quantity: number
  selectedOptions?: Record<string, string>
  cartId?: string
}

export interface Order {
  totalPrice: number
  items: Partial<CartItem>[]
}
