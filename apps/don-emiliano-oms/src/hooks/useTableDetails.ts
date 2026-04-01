import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  fetchTableDetailsById,
  printTableReceipt,
  type CartItem,
} from '../services/table-details.service'

export function useTableDetails(numberId: string | undefined) {
  const navigate = useNavigate()
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadDetails = useCallback(async () => {
    if (!numberId) return
    setIsLoading(true)
    try {
      const mappedItems = await fetchTableDetailsById(numberId)
      setItems(mappedItems)
    } catch (error) {
      console.error('Error fetching table details:', error)
      setItems([])
    } finally {
      setIsLoading(false)
    }
  }, [numberId])

  useEffect(() => {
    if (!localStorage.getItem('oms_auth')) {
      navigate('/')
      return
    }
    loadDetails()
  }, [loadDetails, navigate])

  const handleEdit = () => {
    if (numberId) {
      localStorage.setItem('oms_tableId', numberId)
      navigate('/dashboard')
    }
  }

  const handleBack = () => {
    navigate('/active-tables')
  }

  const handlePrint = async () => {
    if (!numberId) return
    try {
      await printTableReceipt(numberId)
      alert('Impresión enviada correctamente')
    } catch (err) {
      console.error('Error al imprimir:', err)
      const errorMsg =
        err instanceof Error ? err.message : 'Error al procesar la impresión'
      if (errorMsg === 'No se encontraron impresoras configuradas') {
        alert(errorMsg)
      } else {
        alert('Error al procesar la impresión')
      }
    }
  }

  const totalAmount = items.reduce((sum, p) => sum + p.Precio * p.quantity, 0)

  return {
    items,
    isLoading,
    totalAmount,
    handleEdit,
    handleBack,
    handlePrint,
  }
}
