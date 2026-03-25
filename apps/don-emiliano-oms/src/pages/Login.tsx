import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) {
      setError('Por favor ingrese un código válido')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code.trim() }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        localStorage.setItem('oms_auth', 'true')
        localStorage.setItem('oms_userId', data.userId) // Store real DB user ID
        localStorage.setItem('oms_userName', data.name) // Store user name if available
        navigate('/tables')
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-2">
            Don Emiliano OMS
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            Sistema de Gestión de Pedidos
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-[var(--color-ink)] mb-2"
            >
              Código de Acceso
            </label>
            <input
              type="password"
              id="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
              placeholder="Ingrese su código"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-[var(--color-brand-pink)] text-sm animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[var(--color-primary)] hover:bg-[var(--color-action-hover)] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98] ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
