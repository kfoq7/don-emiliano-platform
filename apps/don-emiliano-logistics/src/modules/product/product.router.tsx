import { Route } from 'react-router'
import { ProductPage } from './pages/ProductPage'

export const productRouter = () => {
  return (
    <>
      <Route path="products">
        <Route index element={<ProductPage />} />
      </Route>
    </>
  )
}
