import { type Order } from '@/types/Order'
import { type Location } from '@/stores/location'

type OrderFull = Order & { location: Location }

export const createOrderMesesage = ({ items, totalPrice, location }: OrderFull) => {
  // 1. Create an array of strings, one for each item
  const itemStrings = items.map(({ name, price }) => ` * ${name}: S/.${price}`)

  // 2. Join that array into a single string, separating each item with a newline
  const productList = itemStrings.join('\n')

  // 3. Return the final, clean message
  return `
*Tu orden*

Mi ubicación: https://www.google.com/maps?q=${location.lat},${location.lng}&hl=es

Productos Seleccionados:
${productList}

Precio total: S/.${totalPrice}
`
}
