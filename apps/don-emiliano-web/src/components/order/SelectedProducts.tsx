import { cartItems, useCartItemsTotal } from '@/stores/order'
import { useStore } from '@nanostores/preact'

export default function SelectedProduct() {
  const totalPrice = useCartItemsTotal()
  const selectedProducts = useStore(cartItems)

  return (
    <div>
      {Object.values(selectedProducts).map(({ category }) => (
        <div></div>
      ))}
    </div>
  )
}
