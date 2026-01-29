export type Product = {
  id: number
  name: string
  description: string
  category: string
  price: number
  image?: string
}

export type ProductSelected = Omit<Product, 'image'> & {
  observation?: string
}
