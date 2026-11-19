export interface ProductOption {
  name: string
  values: string[]
  type?: 'select' | 'radio'
}

export interface Category {
  id: number
  name: string
  is_active: boolean
  descrption?: string
}

export interface Product {
  id: number
  name: string
  description: string
  category: Category
  price: number
  is_stock_available?: boolean
  options?: ProductOption[]
  thumbnail?: string
}

export interface ProductSelected extends Omit<Product, 'image'> {
  observation?: string
  selectedOptions?: Record<string, string>
}
