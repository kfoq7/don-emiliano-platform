import { useEffect, useState } from 'react'
import type { Product } from '../types/Products'

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProducts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/Pedido/BuscarProductos?Descripcion=')
      const data = (await response.json()) as { Data: Product[] }
      return data.Data
    } catch (error) {
      console.error('Error trying to retrieve list of products', error)
      if (error instanceof Error) setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProducts().then(products => {
      setProducts(products ?? [])
    })
  }, [])

  if (isLoading) {
    return <div>Cargando productos...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      {products &&
        products.map(({ IdProducto, Descripcion, Precio }) => (
          <div key={IdProducto}>
            {IdProducto} {Descripcion} {Precio}
          </div>
        ))}
    </div>
  )
}
