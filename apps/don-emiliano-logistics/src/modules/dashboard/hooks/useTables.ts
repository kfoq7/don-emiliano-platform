import { useQuery } from '@tanstack/react-query'
import { getActiveTables, Table } from '../services/tables.service'

export const useTables = () => {
  return useQuery<Table[], Error>({
    queryKey: ['tables'],
    queryFn: getActiveTables,
    refetchInterval: 30000, // Auto-refresh every 30s
  })
}
