import { useLogin } from '../hooks/use-login'

export default function Login() {
  const { login, code, setCode, error, loading } = useLogin()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 animate-fade-in-up">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-color-heading mb-2">
            Don Emiliano OMS
          </h1>
          <p className="text-color-ink-muted">
            Sistema de Gestión de Pedidos
          </p>
        </div>

        <form onSubmit={login} className="space-y-6">
          <div>
            <label
              htmlFor="code"
              className="block text-sm font-medium text-color-ink mb-2"
            >
              Código de Acceso
            </label>
            <input
              type="password"
              id="code"
              value={code}
              onChange={e => setCode(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-color-border focus:ring-2 focus:ring-color-primary focus:border-transparent transition-all outline-none"
              placeholder="Ingrese su código"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-color-brand-pink text-sm animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-color-primary hover:bg-color-action-hover text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg active:scale-[0.98] ${
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
