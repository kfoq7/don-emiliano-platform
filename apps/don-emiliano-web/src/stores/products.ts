import { atom, map } from 'nanostores'
import { fetchAllProducts } from '@/services/products.service'
import type { Product } from '@/types/Product'
//
// export const productsStore = map<Record<number, (typeof productsData)[number]>>({})
export const $productsStore = atom<Product[]>([])

// TODO: move to JSON statci file or retrive from database, and parsert to TitleCase
// export const categoriesStore = atom<string[]>([
//   'porciones',
//   'bebidas calientes',
//   'guarniciones',
//   'jugos',
//   'frappes',
//   'caldo',
// ])
export const categories = [
  'PORCIONES',
  'BEBIDAS CALIENTES',
  'GUARNICIONES',
  'JUGOS',
  'FRAPPES',
  'CALDOS',
] as const

export const selectedCategoryAtom = atom<(typeof categories)[number]>('PORCIONES')

export const getAllProductsStore = async () =>
  fetchAllProducts().then(products => $productsStore.set(products ?? []))

// productsData.forEach(product => {
//   productsStore.setKey(product.id, product)
// })
//
// export const getAllProductsStore = async () =>
//   fetchAllProducts().then(products => productsStore.set(products))
