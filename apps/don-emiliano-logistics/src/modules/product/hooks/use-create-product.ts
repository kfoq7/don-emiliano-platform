import { useMutation } from '@tanstack/react-query'
import { createProduct } from '../services/product'
import type { CreateProduct } from '../types/ProductForms'

export function useCreateProduct() {
  const { data, isPending, mutate, mutateAsync } = useMutation({
    mutationFn: (productData: CreateProduct) => createProduct(productData),
  })

  return {
    product: data,
    isCreateProductPending: isPending,
    createProduct: mutate,
    createProductAsync: mutateAsync,
  }
}
