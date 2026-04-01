import { useCallback, useEffect, useState } from 'react'
import { Product } from '../types/Products'

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const getProducts = useCallback(async (description: string = '') => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(
        `/api/Pedido/BuscarProductos?Descripcion=${encodeURIComponent(
          description,
        )}`,
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = (await response.json()) as { Data: Product[] }
      setProducts(data.Data ?? [])
    } catch (error) {
      console.error('Error trying to retrieve list of products', error)
      if (error instanceof Error) setError(error.message)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounce search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      getProducts(searchTerm)
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm, getProducts])

  return {
    products,
    isLoading,
    error,
    searchTerm,
    hanldeSearchTermChange: (term: string) => setSearchTerm(term),
  }
}
