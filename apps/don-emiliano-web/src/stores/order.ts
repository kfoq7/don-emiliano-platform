import { useStore } from '@nanostores/preact'
import { persistentMap } from '@nanostores/persistent'
import { type ProductSelected } from '@/types/Product'
import type { CartItem } from '@/types/Order'

export const cartItems = persistentMap<Record<string, CartItem>>(
  'productItems',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: true,
  },
)

export function addCartItem(item: ProductSelected) {
  const itemId = `${item.id}`
  const existingEntry = cartItems.get()[itemId]
  if (existingEntry) {
    cartItems.setKey(itemId, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  } else {
    cartItems.setKey(itemId, { ...item, quantity: 1 })
  }
}

export function increaseCartItem(id: number) {
  const itemId = `${id}`
  const existingEntry = cartItems.get()[itemId]
  if (existingEntry) {
    cartItems.setKey(itemId, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  }
}

export function decreaseCartItem(id: number) {
  const itemId = `${id}`
  const existingEntry = cartItems.get()[itemId]
  if (existingEntry) {
    if (existingEntry.quantity > 1) {
      cartItems.setKey(itemId, {
        ...existingEntry,
        quantity: existingEntry.quantity - 1,
      })
    } else {
      cartItems.setKey(itemId, undefined)
    }
  }
}

export function removeCartItem(id: number) {
  const itemId = `${id}`
  cartItems.setKey(itemId, undefined)
}

// export function getProductItemsTotal(): number {
//   const items = productItems.get()
//   return Object.values(items).reduce((total, item) => total + item.price * item.quantity, 0)
// }

export function useCartItemsTotal(): number {
  const items = useStore(cartItems)
  return Object.values(items).reduce((total, item) => total + item.price * item.quantity, 0)
}
