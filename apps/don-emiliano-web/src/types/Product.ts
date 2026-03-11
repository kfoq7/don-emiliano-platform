export interface ProductOption {
  name: string
  values: string[]
  type?: 'select' | 'radio'
}

export interface Product {
  id: number
  name: string
  description: string
  category: string
  price: number
  image?: string
  isStockAvailable?: boolean
  options?: ProductOption[]
}

export interface ProductSelected extends Omit<Product, 'image'> {
  observation?: string
  selectedOptions?: Record<string, string>
}
