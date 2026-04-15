import { API_APP } from '../consts/api-servicies'
import type { Product } from '../types/Products'

export interface CartItem extends Product {
  quantity: number
}

export const fetchTableDetailsById = async (
  tableId: string,
): Promise<CartItem[]> => {
  const response = await fetch(
    `${API_APP}/Pedido/DetalleMesa/?IdMesa=${tableId}`,
  )
  if (!response.ok) {
    throw new Error('API failed')
  }

  const data = await response.json()
  const apiItems = data.Data || []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return apiItems.map((item: any) => ({
    IdProducto: 0,
    Descripcion: item.Producto,
    Precio: item.Precio,
    Combo: 0,
    quantity: item.Cantidad,
  }))
}

export const printTableReceipt = async (tableId: string): Promise<void> => {
  const printersRes = await fetch(`${API_APP}/Pedido/getImpresorasPrevio`)
  if (!printersRes.ok) throw new Error('Failed to get printers')
  const printers = await printersRes.json()

  if (printers && printers.length > 0) {
    const ruta = printers[0].Ruta || printers[0].ruta
    const printRes = await fetch('/api/Pedido/ImprimirPrevio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ IdMesa: tableId, Ruta: ruta }),
    })
    if (!printRes.ok) throw new Error('Failed to print')
  } else {
    throw new Error('No se encontraron impresoras configuradas')
  }
}
