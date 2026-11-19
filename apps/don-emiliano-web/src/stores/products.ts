import { atom } from 'nanostores'
import { fetchAllProducts } from '@/services/products.service'
import type { Product } from '@/types/Product'

export const $productsStore = atom<Product[]>([])

export const categories = [
  'PORCIONES',
  'SANDWICHES',
  'TAMALES Y GUARNICIONES',
  'BEBIDAS CALIENTES',
  'COMBOS Y PROMOCIONES',
  'PLATOS CONTUNDENTES',
  'JUGOS',
  'FRAPPES',
  'CALDOS',
] as const

export const selectedCategoryAtom = atom<(typeof categories)[number]>('PORCIONES')

// Starts true so the first render shows the spinner instead of a flash of the empty state.
export const $productsLoading = atom<boolean>(true)

export const getAllProductsStore = async () => {
  $productsLoading.set(true)
  try {
    const products = await fetchAllProducts()
    $productsStore.set(products ?? [])
  } finally {
    $productsLoading.set(false)
  }
}
