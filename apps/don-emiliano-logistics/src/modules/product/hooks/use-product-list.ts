import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../services/product.ts'

/**
 * Fetch all product list
 */
export function useProductList() {
  const { data, isLoading } = useQuery({
    queryKey: ['product-list'],
    queryFn: getAllProducts,
  })

  return {
    products: data,
    isProductsListLoding: isLoading,
  }
}
