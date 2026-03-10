import { type Order } from '@/types/Order'
import { type Location } from '@/stores/location'

type OrderFull = Order & { location: Location | null; isDelivery: boolean }

export const createOrderMesesage = ({ items, totalPrice, location, isDelivery }: OrderFull) => {
  // 1. Create an array of strings, one for each item
  const itemStrings = items.map(({ name, price }) => ` * ${name}: S/.${price}`)

  // 2. Join that array into a single string, separating each item with a newline
  const productList = itemStrings.join('\n')

  // 3. Calculate final total including delivery fee
  const deliveryFee = 5
  const finalTotal = isDelivery ? totalPrice + deliveryFee : totalPrice

  // 4. Build location line only for delivery orders
  const locationLine =
    isDelivery && location
      ? `Mi ubicación: https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
      : 'Tipo de pedido: Recojo en tienda'

  // 5. Return the final, clean message
  return `
*Tu orden*

${locationLine}

Productos Seleccionados:
${productList}

Subtotal: ${totalPrice}
${isDelivery ? `Entrega: S/. ${deliveryFee}` : ''}
Total: S/. ${finalTotal}

\u2705 Envíanos este mensaje ahora. En cuanto lo recibamos estaremos atendiéndole.
`
}
