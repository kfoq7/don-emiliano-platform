import { useState } from 'react'
import { useNavigate } from 'react-router'

export const CashierLoginPage = () => {
  const navigate = useNavigate()
  const [employeeId, setEmployeeId] = useState('')
  const [pin, setPin] = useState('')
  const [activeField, setActiveField] = useState<'id' | 'pin'>('id')

  const handleKeypadClick = (value: string) => {
    if (value === 'backspace') {
      if (activeField === 'id') {
        setEmployeeId(prev => prev.slice(0, -1))
      } else {
        setPin(prev => prev.slice(0, -1))
      }
    } else if (value === 'clear') {
      if (activeField === 'id') {
        setEmployeeId('')
      } else {
        setPin('')
      }
    } else {
      if (activeField === 'id' && employeeId.length < 10) {
        setEmployeeId(prev => prev + value)
      } else if (activeField === 'pin' && pin.length < 4) {
        setPin(prev => prev + value)
      }
    }
  }

  const handleLogin = () => {
    if (employeeId && pin.length === 4) {
      navigate('/dashboard/tables')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-border-light to-surface-hover flex">
      <div className="w-5/12 bg-ink text-white p-16 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Don Emiliano Logistics</h1>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Terminal de Precisión
              <br />
              Acceso
            </h2>
            <p className="text-mint-bold text-lg">
              Solo personal autorizado. Por favor, verifique su identidad usando
              sus credenciales de empleado o llave de estación.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-8 border-t border-white/20">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="font-semibold">SESIÓN ENCRIPTADA</div>
              <div className="text-sm text-mint-bold">
                ID DE ESTACIÓN: 04-METRO-SUR
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-16">
        <div className="w-full max-w-lg">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-ink">Inicio de Sesión</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-success uppercase">
                Sistema en Línea
              </span>
            </div>
          </div>

          <p className="text-ink-muted mb-8">
            Seleccione un campo y use el teclado numérico a continuación.
          </p>

          <div className="space-y-4 mb-8">
            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
                ID de Empleado
              </label>
              <div
                onClick={() => setActiveField('id')}
                className={`relative bg-surface border-2 rounded-lg px-4 py-4 flex items-center gap-3 cursor-pointer transition-all ${
                  activeField === 'id'
                    ? 'border-action shadow-sm'
                    : 'border-border-light'
                }`}
              >
                <svg
                  className="w-5 h-5 text-ink-subtle"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  type="text"
                  value={employeeId}
                  placeholder="Ingrese el número de ID"
                  readOnly
                  className="flex-1 outline-none text-ink placeholder:text-border"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">
                PIN de Seguridad
              </label>
              <div
                onClick={() => setActiveField('pin')}
                className={`relative bg-surface border-2 rounded-lg px-4 py-4 flex items-center gap-3 cursor-pointer transition-all ${
                  activeField === 'pin'
                    ? 'border-action shadow-sm'
                    : 'border-border-light'
                }`}
              >
                <svg
                  className="w-5 h-5 text-ink-subtle"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <div className="flex-1 flex gap-1">
                  {pin.length === 0 && (
                    <span className="text-border">• • • •</span>
                  )}
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span key={index} className="text-2xl">
                      {index < pin.length ? '•' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
              <button
                key={num}
                onClick={() => handleKeypadClick(num)}
                className="bg-surface hover:bg-surface-hover border border-border-light rounded-lg py-4 text-xl font-semibold text-ink transition-all hover:shadow-sm"
              >
                {num}
              </button>
            ))}
            <button
              onClick={() => handleKeypadClick('clear')}
              className="bg-surface hover:bg-surface-hover border border-border-light rounded-lg py-4 flex items-center justify-center transition-all hover:shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              onClick={() => handleKeypadClick('0')}
              className="bg-surface hover:bg-surface-hover border border-border-light rounded-lg py-4 text-xl font-semibold text-ink transition-all hover:shadow-sm"
            >
              0
            </button>
            <button
              onClick={() => handleKeypadClick('backspace')}
              className="bg-surface hover:bg-surface-hover border border-border-light rounded-lg py-4 flex items-center justify-center transition-all hover:shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
                />
              </svg>
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={!employeeId || pin.length !== 4}
            className="w-full bg-action hover:bg-action-hover disabled:bg-action-disabled disabled:text-white/60 text-white py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed"
          >
            <span>Entrar</span>
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>

          <div className="flex items-center justify-between mt-6 text-xs text-ink-subtle">
            <button className="text-action hover:underline font-medium">
              OLVIDÉ MI CONTRASEÑA
            </button>
            <span>V2.4.0-ESTABLE</span>
          </div>

          <div className="mt-12 pt-6 border-t border-border-light flex items-center justify-center gap-6 text-xs text-ink-subtle">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">RED SEGURA</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span>AUTO-BLOQUEO: 5M</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
