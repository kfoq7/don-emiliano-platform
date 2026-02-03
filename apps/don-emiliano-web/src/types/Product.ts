export interface Product {
  id: number
  name: string
  description: string
  category: string
  price: number
  image?: string
}

export interface ProductSelected extends Omit<Product, 'image'> {
  observation?: string
}
