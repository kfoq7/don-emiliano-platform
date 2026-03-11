import { useStore } from '@nanostores/preact'
import { persistentMap } from '@nanostores/persistent'
import { type ProductSelected } from '@/types/Product'
import type { CartItem } from '@/types/Order'

export const cartItems = persistentMap<Record<string, CartItem>>(
  'cartItems',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: true,
  },
)

export function addCartItem(item: ProductSelected) {
  const optionsKey = item.selectedOptions ? `-${JSON.stringify(item.selectedOptions)}` : ''
  const itemId = `${item.id}${optionsKey}`
  const existingEntry = cartItems.get()[itemId]
  if (existingEntry) {
    cartItems.setKey(itemId, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  } else {
    cartItems.setKey(itemId, { ...item, quantity: 1, cartId: itemId })
  }
}

export function increaseCartItem(cartId: string | number) {
  const itemId = String(cartId)
  const existingEntry = cartItems.get()[itemId]
  if (existingEntry) {
    cartItems.setKey(itemId, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  }
}

export function decreaseCartItem(cartId: string | number) {
  const itemId = String(cartId)
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

export function removeCartItem(cartId: string | number) {
  const itemId = String(cartId)
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
