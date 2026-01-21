import { useProductList } from '../hooks/use-product-list'

export const ProductList = () => {
  const { products, isProductsListLoding } = useProductList()

  if (isProductsListLoding && !products) {
    return <div>Products are loding</div>
  }

  return (
    <div>
      {products &&
        products.map(({ id, name, price }) => (
          <div key={id}>
            {name} {price}
          </div>
        ))}
    </div>
  )
}
