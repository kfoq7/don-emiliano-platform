import { useState, useEffect, useCallback } from 'react'
import { getActiveTables, Table } from '../services/table.service'
import { useNavigate } from 'react-router-dom'

export const useActiveTables = () => {
  const [tables, setTables] = useState<Table[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchTables = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    const userId = localStorage.getItem('oms_userId')

    try {
      const activeTables = await getActiveTables(userId)
      setTables(activeTables)
    } catch (err) {
      console.error('Error fetching tables:', err)
      setError('No se pudo cargar la lista de mesas.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem('oms_auth')) {
      navigate('/')
    } else {
      fetchTables()
    }
  }, [navigate, fetchTables])

  const refreshTables = () => {
    fetchTables()
  }

  return {
    tables,
    isLoading,
    error,
    refreshTables,
  }
}
