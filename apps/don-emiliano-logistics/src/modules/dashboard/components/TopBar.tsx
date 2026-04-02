import { ReactNode } from 'react'

interface TopBarProps {
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; path?: string }[]
  actions?: ReactNode
  user?: {
    name: string
    role: string
  }
}

export const TopBar = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  user,
}: TopBarProps) => {
  return (
    <header className="bg-surface border-b border-border-light px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {breadcrumbs && (
            <div className="flex items-center gap-2 text-sm text-ink-subtle mb-1">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center gap-2">
                  {index > 0 && <span>/</span>}
                  <span
                    className={
                      index === breadcrumbs.length - 1 ? 'text-ink' : ''
                    }
                  >
                    {crumb.label}
                  </span>
                </span>
              ))}
            </div>
          )}
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          {subtitle && (
            <p className="text-sm text-ink-muted mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {actions}

          <div className="flex items-center gap-3 pl-4 border-l border-border-light">
            <div className="flex items-center gap-2 text-sm">
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
              <span className="text-xs font-medium text-success">
                Sincronización Activa
              </span>
            </div>

            <div className="w-px h-8 bg-border-light" />

            <div className="flex items-center gap-2 text-sm">
              <svg
                className="w-4 h-4 text-ink-muted"
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
              <span className="text-ink-muted font-medium">
                {new Date().toLocaleTimeString('es-PE', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>

            {user && (
              <>
                <div className="w-px h-8 bg-border-light" />
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-ink">
                      {user.name}
                    </div>
                    <div className="text-xs text-ink-subtle">{user.role}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-action flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
