import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function TableSelection() {
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

  const fetchOperacion = async () => {
    try {
      const response = await fetch('/api/Pedido/VerOperacion', {
        method: 'POST',
      })
      if (response.ok) {
        const data = await response.json()
        return data.Data // Return the whole Data object
      }
    } catch (e) {
      console.error('Error fetching operation details', e)
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!table.trim()) {
      setError('Por favor ingrese un número de mesa válido')
      return
    }

    setIsSubmitting(true)

    try {
      const operacionData = await fetchOperacion()
      if (!operacionData || !operacionData.ID_OPERACION) {
        throw new Error(
          'No se pudo verificar la sesión de operación. Intente nuevamente.',
        )
      }

      const operacionId = operacionData.ID_OPERACION

      // Parse Date if necessary, based on mesa.txt it seems to come as /Date(...)/
      // But assuming for now it might be cleaner string or we handle it
      // In panelmesas.txt: new Date(parseInt( response.Data.FECHA_APERTURA.substr(6)));
      let fechaAperturaStr = operacionData.FECHA_APERTURA
      if (fechaAperturaStr && fechaAperturaStr.includes('/Date(')) {
        const timestamp = parseInt(fechaAperturaStr.substr(6))
        const date = new Date(timestamp)
        // Format dd/mm/yyyy
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        fechaAperturaStr = `${day}/${month}/${year}`
      }

      // 1. Validate Table Availability
      const validationResponse = await fetch('/api/Pedido/ValidarMesa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Mesa: table.trim(),
          IdOperacion: operacionId,
        }),
      })

      if (validationResponse.ok) {
        const validationData = await validationResponse.json()

        // If Data > 0, it means table is occupied
        if (validationData.Data > 0) {
          setError(`La mesa ${table.trim()} ya se encuentra ocupada.`)
          setIsSubmitting(false)
          return
        }
      }

      // 2. Register Table
      const userId = localStorage.getItem('oms_userId')
      const now = new Date()
      // Matches the structure in mesa.txt
      const payload = {
        PDESCUENTO: 0,
        TOTAL: 0,
        tipo: 'V',
        Id: 0,
        LIBRE: 1,
        MESA: table.trim(),
        NPERSONAS: 1, // Default to 1
        CLIENTE: 'Cliente Web',
        CUENTEA: 0,
        DESCUENTO: 0,
        Estado: 4,
        FECHA: fechaAperturaStr, // Use date from operation
        FECHAPRO: fechaAperturaStr,
        HORAPRO: now,
        ID_MESA: 0,
        ID_OPERACION: operacionId,
        ID_PERSONAL: userId,
        ID_USUARIO: userId,
      }

      const registerResponse = await fetch('/api/Pedido/RegistrarMesa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (registerResponse.ok) {
        const registerData = await registerResponse.json()

        if (registerData.Mensaje > 0) {
          // Success - Store ID and redirect
          localStorage.setItem('oms_tableId', registerData.Mensaje) // The ID returned by the API
          navigate('/dashboard')
        } else {
          throw new Error('No se pudo registrar la mesa.')
        }
      } else {
        throw new Error('Error de conexión al registrar mesa.')
      }
    } catch (err) {
      console.error(err)
      if (err instanceof Error) setError(err.message)
      else setError('Ocurrió un error inesperado.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-heading)] mb-2">
            Seleccionar Mesa
          </h1>
          <p className="text-[var(--color-ink-muted)]">
            Indique la mesa para el pedido
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="table"
              className="block text-sm font-medium text-[var(--color-ink)] mb-2"
            >
              Número de Mesa
            </label>
            <input
              type="number"
              id="table"
              value={table}
              onChange={e => setTable(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none"
              placeholder="Ej. 1, 5, 12"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-[var(--color-brand-pink)] text-sm animate-fade-in">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-action-hover)] disabled:bg-[var(--color-action-disabled)] disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98] flex justify-center items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Procesando...</span>
                </>
              ) : (
                'Continuar al Pedido'
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/active-tables')}
              className="w-full bg-[var(--color-surface-hover)] hover:bg-[var(--color-border-light)] text-[var(--color-ink)] font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
