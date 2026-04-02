interface StatCardProps {
  label: string
  value: string | number | React.ReactNode
  subtitle?: string | React.ReactNode
  icon?: React.ReactNode
  trend?: {
    value: string
    isPositive: boolean
  }
  variant?: 'default' | 'primary' | 'yellow' | 'ink'
}

export const StatCard = ({
  label,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
}: StatCardProps) => {
  const variantStyles = {
    default: 'bg-surface border-border-light',
    primary: 'bg-action text-white',
    yellow: 'bg-brand-yellow text-ink',
    ink: 'bg-ink text-white',
  }

  return (
    <div
      className={`rounded-xl border p-6 ${variantStyles[variant as keyof typeof variantStyles]} transition-all hover:shadow-lg`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`text-xs font-semibold uppercase tracking-wide ${variant === 'default' ? 'text-ink-muted' : 'opacity-90'}`}
        >
          {label}
        </div>
        {icon && <div className="opacity-80">{icon}</div>}
      </div>

      <div className="space-y-2">
        <div
          className={`text-4xl font-bold ${variant === 'default' ? 'text-ink' : ''}`}
        >
          {value}
        </div>

        {subtitle && (
          <div
            className={`text-sm ${variant === 'default' ? 'text-ink-muted' : 'opacity-80'}`}
          >
            {subtitle}
          </div>
        )}

        {trend && (
          <div
            className={`text-sm font-medium ${trend.isPositive ? 'text-success' : 'text-brand-pink'}`}
          >
            {trend.isPositive ? '↗' : '↘'} {trend.value}
          </div>
        )}
      </div>
    </div>
  )
}
