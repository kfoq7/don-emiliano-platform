import { useStore } from '@nanostores/preact'
import { persistentMap } from '@nanostores/persistent'
import { type ProductSelected } from '@/types/Product'

export const productItems = persistentMap<Record<string, ProductSelected & { quantity: number }>>(
  'productItems',
  {},
  {
    encode: JSON.stringify,
    decode: JSON.parse,
    listen: true,
  },
)

export function addProductItem(item: Product) {
  const itemId = `${item.id}`
  const existingEntry = productItems.get()[itemId]
  if (existingEntry) {
    productItems.setKey(itemId, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  } else {
    productItems.setKey(itemId, { ...item, quantity: 1 })
  }
}

export function increaseProductItem(id: number) {
  const itemId = `${id}`
  const existingEntry = productItems.get()[itemId]
  if (existingEntry) {
    productItems.setKey(itemId, {
      ...existingEntry,
      quantity: existingEntry.quantity + 1,
    })
  }
}

export function decreaseProductItem(id: number) {
  const itemId = `${id}`
  const existingEntry = productItems.get()[itemId]
  if (existingEntry) {
    if (existingEntry.quantity > 1) {
      productItems.setKey(itemId, {
        ...existingEntry,
        quantity: existingEntry.quantity - 1,
      })
    } else {
      productItems.setKey(itemId, undefined)
    }
  }
}

export function removeProductItem(id: number) {
  const itemId = `${id}`
  productItems.setKey(itemId, undefined)
}

// export function getProductItemsTotal(): number {
//   const items = productItems.get()
//   return Object.values(items).reduce((total, item) => total + item.price * item.quantity, 0)
// }

export function useProductItemsTotal(): number {
  const items = useStore(productItems)
  return Object.values(items).reduce((total, item) => total + item.price * item.quantity, 0)
}
