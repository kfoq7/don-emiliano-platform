export interface Table {
  id: string
  number: string
  location: string
  status: 'available' | 'occupied' | 'billing'
  guests?: number
  currentTotal?: number
}

// TODO: Replace with real API endpoint once backend is ready
// Currently using a mock promise to simulate network delay
export const getActiveTables = async (): Promise<Table[]> => {
  // const response = await apiClient.get<Table[]>('/tables')
  // return response.data

  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          number: '01',
          location: 'PLANTA BAJA',
          status: 'occupied',
          guests: 4,
          currentTotal: 12450,
        },
        {
          id: '2',
          number: '02',
          location: 'LADO VENTANA',
          status: 'billing',
          guests: 2,
          currentTotal: 6820,
        },
        {
          id: '3',
          number: '03',
          location: 'TERRAZA JARDÍN',
          status: 'available',
        },
        {
          id: '4',
          number: '04',
          location: 'PLANTA BAJA',
          status: 'occupied',
          guests: 6,
          currentTotal: 21500,
        },
        {
          id: '5',
          number: '05',
          location: 'PLANTA BAJA',
          status: 'occupied',
          guests: 2,
          currentTotal: 4210,
        },
        {
          id: '6',
          number: '06',
          location: 'RINCÓN',
          status: 'billing',
          guests: 4,
          currentTotal: 15645,
        },
        {
          id: '7',
          number: '07',
          location: 'TERRAZA JARDÍN',
          status: 'available',
        },
        {
          id: '8',
          number: '08',
          location: 'TERRAZA JARDÍN',
          status: 'available',
        },
      ])
    }, 800)
  })
}
