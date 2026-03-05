import { atom } from 'nanostores'
import type { AdminProduct, BusinessHours, ProductCategory } from '@/lib/api/admin'

// Active tab in admin panel
export type AdminTab = 'products' | 'hours'
export const activeTabAtom = atom<AdminTab>('products')

// Categories with products (from API)
export const categoriesAtom = atom<ProductCategory[]>([])

// Selected category in the sidebar
export const selectedCategoryIdAtom = atom<number | null>(null)

// Business hours (from API)
export const businessHoursAtom = atom<BusinessHours[]>([])

// Loading states
export const isLoadingProductsAtom = atom<boolean>(false)
export const isLoadingHoursAtom = atom<boolean>(false)

// Error states
export const productsErrorAtom = atom<string | null>(null)
export const hoursErrorAtom = atom<string | null>(null)

// Saving indicator for individual product toggles
export const savingProductIdAtom = atom<number | null>(null)

// Saving indicator for individual business hours
export const savingHoursIdAtom = atom<number | null>(null)
