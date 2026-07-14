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
  image?: string
  is_stock_cvailable?: boolean
  options?: ProductOption[]
  thumbnail: string
}

export interface ProductSelected extends Omit<Product, 'image'> {
  observation?: string
  selectedOptions?: Record<string, string>
}
