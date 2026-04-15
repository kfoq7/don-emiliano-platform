import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerNewTable } from '../services/table.service'

export function useTableSelection() {
  const [table, setTable] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check auth
    if (!localStorage.getItem('oms_auth')) {
      navigate('/')
    }
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!table.trim() || !Number.isInteger(Number(table.trim()))) {
      setError('Por favor ingrese un número de mesa válido')
      return
    }

    setIsSubmitting(true)

    try {
      const { tableId, tableName } = await registerNewTable(table.trim())
      localStorage.setItem('oms_tableId', tableId.toString())
      localStorage.setItem('oms_tableName', tableName)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      if (err instanceof Error) setError(err.message)
      else setError('Ocurrió un error inesperado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    table,
    setTable,
    error,
    isSubmitting,
    handleSubmit,
    navigate,
  }
}
