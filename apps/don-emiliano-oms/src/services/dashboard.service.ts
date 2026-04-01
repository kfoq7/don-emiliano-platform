import type { CartItem } from '../hooks/useCart'

export const fetchOperacion = async () => {
  try {
    const response = await fetch('/api/Pedido/VerOperacion', {
      method: 'POST',
    })
    if (response.ok) {
      const data = await response.json()
      return data.Data
    }
  } catch (e) {
    console.error('Error fetching operation details', e)
  }
  return null
}

export const submitOrder = async (
  selectedProducts: CartItem[],
  total: number,
) => {
  const operacionData = await fetchOperacion()
  if (!operacionData || !operacionData.ID_OPERACION) {
    throw new Error(
      'No se pudo validar la sesión de operación. Recargue la página.',
    )
  }

  const operacionId = operacionData.ID_OPERACION

  const storedUserId = localStorage.getItem('oms_userId')
  const storedTableId = localStorage.getItem('oms_tableId')
  const storedTableName = localStorage.getItem('oms_tableName') || storedTableId

  const userId = storedUserId ? parseInt(storedUserId, 10) : 0
  const tableId = storedTableId ? parseInt(storedTableId, 10) : 0

  const formData = new URLSearchParams()

  // Cab
  formData.append('Cab[ID_COMANDA]', '0')
  formData.append('Cab[FECHA]', new Date().toLocaleDateString('en-GB'))
  formData.append(
    'Cab[HORA]',
    new Date().toLocaleTimeString('en-US', { hour12: false }),
  )
  formData.append('Cab[ID_MESA]', tableId.toString())
  formData.append('Cab[ID_MOZO]', userId.toString())
  formData.append('Cab[ID_OPERACION]', operacionId.toString())
  formData.append('Cab[ID_USUARIO]', userId.toString())
  formData.append('Cab[MESA]', storedTableName || tableId.toString())
  formData.append('Cab[OBSERVACON]', '')
  formData.append('Cab[TOTAL]', total.toString())
  formData.append('Cab[ESTADO]', 'P')

  // M
  formData.append('M[PDESCUENTO]', '0')
  formData.append('M[TOTAL]', total.toString())
  formData.append('M[tipo]', 'V')
  formData.append('M[Id]', '0')
  formData.append('M[LIBRE]', '1')
  formData.append('M[MESA]', '')
  formData.append('M[NPERSONAS]', '0')
  formData.append('M[CLIENTE]', '')
  formData.append('M[CUENTEA]', '0')
  formData.append('M[DESCUENTO]', '0')
  formData.append('M[Estado]', '4')
  formData.append('M[FECHAPRO]', '')
  formData.append('M[HORAPRO]', '')
  formData.append('M[ID_MESA]', tableId.toString())
  formData.append('M[ID_OPERACION]', '0')
  formData.append('M[ID_PERSONAL]', '0')
  formData.append('M[ID_USUARIO]', '0')

  // Det
  selectedProducts.forEach((p, index) => {
    formData.append(`Det[${index}][ID_COMANDA]`, '0')
    formData.append(`Det[${index}][CANTIDAD]`, p.quantity.toString())
    formData.append(`Det[${index}][COMBO]`, p.Combo?.toString() || '0')
    formData.append(`Det[${index}][ID_DCOMANDA]`, (index + 1).toString())
    formData.append(`Det[${index}][ID_PRODUCTO]`, p.IdProducto.toString())
    formData.append(`Det[${index}][OBSERVACION]`, p.observacion || '')
    formData.append(`Det[${index}][PUNIT]`, p.Precio.toString())
    formData.append(`Det[${index}][TOTAL]`, (p.Precio * p.quantity).toString())
    formData.append(`Det[${index}][ID_PRODUCOMBO]`, '0')
    formData.append(`Det[${index}][CANTIDADCOMBO]`, '1')
    formData.append(`Det[${index}][CAMBIO]`, 'P')
  })

  const response = await fetch('/api/Pedido/RegistrarComanda', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  })

  if (!response.ok) {
    throw new Error('Error en el servidor: ' + response.statusText)
  }
}
