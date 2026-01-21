import { client } from '@lib/axios'
import { CreateProduct } from '../types/ProductForms'
import { Product } from '../types/Product'

// Just fetch te API and return the data, not handle errors
export const getAllProducts = async (): Promise<Product[]> => {
  return client.get('/products').then(response => response.data)
}

export const createProduct = async (data: CreateProduct): Promise<Product> => {
  return client.post('/products', data).then(response => response.data)
}
