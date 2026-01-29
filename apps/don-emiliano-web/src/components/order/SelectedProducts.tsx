import { productItems, useProductItemsTotal } from '@/stores/order'
import { useStore } from '@nanostores/preact'

export default function SelectedProduct() {
  const totalPrice = useProductItemsTotal()
  const selectedProducts = useStore(productItems)

  return (
    <div>
      {Object.values(selectedProducts).map(({ category }) => (
        <div></div>
      ))}
    </div>
  )
}
