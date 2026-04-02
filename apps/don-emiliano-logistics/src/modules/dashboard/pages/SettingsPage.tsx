import { DashboardLayout } from '../layouts/DashboardLayout'

export const SettingsPage = () => {
  return (
    <DashboardLayout
      title="Configuración"
      subtitle="Ajustar parámetros de terminal y preferencias del sistema para la Estación 04."
      breadcrumbs={[
        { label: 'Don Emiliano Logistics' },
        { label: 'Terminal' },
        { label: 'Inventario' },
        { label: 'Configuración' },
      ]}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-border-light p-6">
            <h3 className="font-bold text-ink mb-4">Configuración</h3>
            <nav className="space-y-2">
              <button className="w-full flex items-center justify-between px-4 py-3 bg-action text-white rounded-lg">
                <div className="flex items-center gap-3">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <div className="text-sm font-semibold">
                      Gestión de Turnos
                    </div>
                    <div className="text-xs opacity-80">SESIÓN ACTIVA</div>
                  </div>
                </div>
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-hover rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-ink-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-ink">
                      Configuración de Impresora
                    </div>
                    <div className="text-xs text-ink-subtle">
                      3 DISPOSITIVOS CONECTADOS
                    </div>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-ink-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-hover rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-ink-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-ink">
                      Idioma y Región
                    </div>
                    <div className="text-xs text-ink-subtle">
                      ESPAÑOL (PE) / S/
                    </div>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-ink-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button className="w-full flex items-center justify-between px-4 py-3 hover:bg-surface-hover rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-ink-muted"
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
                  <div className="text-left">
                    <div className="text-sm font-semibold text-ink">
                      Seguridad
                    </div>
                    <div className="text-xs text-ink-subtle">
                      AUTORIZACIÓN DE PERSONAL
                    </div>
                  </div>
                </div>
                <svg
                  className="w-5 h-5 text-ink-muted"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>

            <div className="mt-6 pt-6 border-t border-border-light bg-mint-bold rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-mint-deep flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-ink mb-1">
                    Integridad del Terminal
                  </div>
                  <div className="text-xs text-ink-muted mb-2">
                    Todos los servicios en la nube operativos. Última sinc. hace
                    2m.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-border-light p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-ink">Gestión de Turnos</h3>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-full">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-success uppercase">
                  Activo: 06h 42m
                </span>
              </div>
            </div>

            <p className="text-sm text-ink-muted mb-6">
              Gestionar recuentos de caja, transiciones de turno y reportes.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-brand-pink/5 border border-brand-pink/20 rounded-lg p-6">
                <div className="w-12 h-12 bg-brand-pink/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-pink"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-ink mb-2">Finalizar Turno</h4>
                <p className="text-sm text-ink-muted mb-4">
                  Cerrar caja y generar reporte de cuadre.
                </p>
              </div>

              <div className="bg-action/5 border border-action/20 rounded-lg p-6">
                <div className="w-12 h-12 bg-action/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-action"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-ink mb-2">
                  Abrir Cajón de Dinero
                </h4>
                <p className="text-sm text-ink-muted mb-4">
                  Control manual de emergencia para acceso al cajón.
                </p>
              </div>
            </div>

            <div className="bg-surface-hover rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-ink mb-3 uppercase tracking-wide">
                Reportes y Auditoría
              </h4>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-surface-hover border border-border-light rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-ink-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-ink">
                      Imprimir Reporte X
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-ink-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <button className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-surface-hover border border-border-light rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-ink-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-ink">
                      Cuadre de Medio Día
                    </span>
                  </div>
                  <svg
                    className="w-5 h-5 text-ink-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="flex items-center justify-between px-4 py-3 bg-white border border-border-light rounded-lg">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-ink-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="text-sm font-medium text-ink">
                      Alerta de Efectivo Bajo
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-11 h-6 bg-border-light peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-action/40 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-action"></div>
                  </label>
                </div>

                <button className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-surface-hover border border-border-light rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-ink-muted"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div className="text-left">
                      <div className="text-sm font-medium text-ink">
                        Historial de Turnos
                      </div>
                      <div className="text-xs text-ink-subtle">
                        SOLO INTERNO
                      </div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-border-light text-ink-muted rounded text-xs font-semibold">
                    SOLO INTERNO
                  </span>
                </button>
              </div>
            </div>

            <div className="bg-brand-yellow/10 border border-brand-yellow rounded-lg p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-6 h-6 text-brand-yellow flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <div className="text-sm font-semibold text-ink mb-1">
                    Transacción Pendiente Encontrada
                  </div>
                  <p className="text-xs text-ink-muted mb-3">
                    Una transacción sigue en proceso. El turno no se puede
                    finalizar hasta que concluya.
                  </p>
                  <button className="text-xs font-semibold text-action hover:underline">
                    VER TRANSACCIÓN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="fixed bottom-8 right-8 bg-action hover:bg-action-hover text-white px-6 py-4 rounded-xl shadow-lg font-semibold flex items-center gap-2 transition-all">
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </DashboardLayout>
  )
}
