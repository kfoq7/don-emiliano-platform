import { API_APP } from '../consts/api-servicies'

export interface Table {
  id: number
  name: string
  status: 'occupied' | 'free'
  total?: number
  lastUpdated?: string
  cliente?: string
  nPersonas?: number
}

export interface ApiTable {
  IdMesa: number
  Mesa: string
  Previo: string
  Cliente: string
  Usuario: string
  NPersonas: number
  Cuenta: number
}

export const fetchOperacion = async () => {
  try {
    const response = await fetch(`${API_APP}/Pedido/VerOperacion`, {
      method: 'POST',
    })
    if (response.ok) {
      const data = await response.json()
      return data.Data // Return full data object
    }
  } catch (e) {
    console.error('Error fetching operation ID', e)
  }
  return null
}

export const registerNewTable = async (tableName: string) => {
  const operacionData = await fetchOperacion()
  if (!operacionData || !operacionData.ID_OPERACION) {
    throw new Error(
      'No se pudo verificar la sesión de operación. Intente nuevamente.',
    )
  }

  const operacionId = operacionData.ID_OPERACION

  let fechaAperturaStr = operacionData.FECHA_APERTURA
  if (fechaAperturaStr && fechaAperturaStr.includes('/Date(')) {
    const timestamp = parseInt(fechaAperturaStr.substr(6))
    const date = new Date(timestamp)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    fechaAperturaStr = `${day}/${month}/${year}`
  }

  // 1. Validate Table Availability
  const validationResponse = await fetch(`${API_APP}/Pedido/ValidarMesa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      Mesa: tableName,
      IdOperacion: operacionId,
    }),
  })

  if (validationResponse.ok) {
    const validationData = await validationResponse.json()
    if (validationData.Data > 0) {
      throw new Error(`La mesa ${tableName} ya se encuentra ocupada.`)
    }
  }

  // 2. Register Table
  const userId = localStorage.getItem('oms_userId')
  const now = new Date()

  const payload = {
    PDESCUENTO: 0,
    TOTAL: 0,
    tipo: 'V',
    Id: 0,
    LIBRE: 1,
    MESA: tableName,
    NPERSONAS: 1, // Default to 1
    CLIENTE: 'Cliente Web',
    CUENTEA: 0,
    DESCUENTO: 0,
    Estado: 4,
    FECHA: fechaAperturaStr,
    FECHAPRO: fechaAperturaStr,
    HORAPRO: now,
    ID_MESA: 0,
    ID_OPERACION: operacionId,
    ID_PERSONAL: userId,
    ID_USUARIO: userId,
  }

  const registerResponse = await fetch(`${API_APP}/Pedido/RegistrarMesa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (registerResponse.ok) {
    const registerData = await registerResponse.json()

    if (registerData.Mensaje > 0) {
      return { tableId: registerData.Mensaje, tableName }
    } else {
      throw new Error('No se pudo registrar la mesa.')
    }
  } else {
    throw new Error('Error de conexión al registrar mesa.')
  }
}

export const getActiveTables = async (
  userId: string | null,
): Promise<Table[]> => {
  if (!userId) {
    throw new Error('User ID is required')
  }

  // 1. Get Operation ID
  const operacionData = await fetchOperacion()

  if (!operacionData || !operacionData.ID_OPERACION) {
    throw new Error('No se pudo obtener el ID de operación')
  }
  const operacionId = operacionData.ID_OPERACION

  // 2. Get Tables
  const response = await fetch(
    `${API_APP}/Pedido/ObtenerMesasUsuario/?IdOperacion=${operacionId}&IdUsuario=${userId}`,
  )

  if (response.ok) {
    const data = await response.json()
    const apiTables: ApiTable[] = data.Data || []

    const mappedTables: Table[] = await Promise.all(
      apiTables.map(async t => {
        const { IdMesa } = t

        const tableDetailResponse = await fetch(
          `${API_APP}/Pedido/DetalleMesa/?IdMesa=${IdMesa}`,
        )
        const tableDetail = (await tableDetailResponse.json()).Data as {
          Precio: number
        }[]
        const total = tableDetail.reduce((sum, td) => td.Precio + sum, 0)

        return {
          id: t.IdMesa,
          name: t.Mesa,
          status: 'occupied',
          total,
          lastUpdated: 'Ahora',
          cliente: t.Cliente,
          nPersonas: t.NPersonas,
        }
      }),
    )
    return mappedTables
  } else {
    throw new Error('Error al obtener las mesas')
  }
}
