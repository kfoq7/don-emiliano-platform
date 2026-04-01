import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!code.trim()) {
      setError('Por favor ingrese un código válido')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(`/server/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.trim() }),
      })

      const data = await response.json()
      if (response.ok && data.success) {
        localStorage.setItem('oms_auth', 'true')
        localStorage.setItem('oms_userId', data.data.userId) // Store real DB user ID
        localStorage.setItem('oms_userName', data.data.name) // Store user name if available
        navigate('/active-tables')
      } else {
        setError(data.message || 'Error de autenticación')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Error de conexión con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return {
    login: handleLogin,
    code,
    setCode,
    error,
    loading,
  }
}
