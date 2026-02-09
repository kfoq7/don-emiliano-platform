import { atom, map } from 'nanostores'
import productsData from '@/lib/products.json'

export const productsStore = map<Record<number, (typeof productsData)[number]>>({})

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

productsData.forEach(product => {
  productsStore.setKey(product.id, product)
})
