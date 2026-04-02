import { ReactNode } from 'react'
import { Sidebar } from '../components/Sidebar'
import { TopBar } from '../components/TopBar'

interface DashboardLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
  breadcrumbs?: { label: string; path?: string }[]
  actions?: ReactNode
}

export const DashboardLayout = ({
  children,
  title,
  subtitle,
  breadcrumbs,
  actions,
}: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-surface-hover">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          title={title}
          subtitle={subtitle}
          breadcrumbs={breadcrumbs}
          actions={actions}
          user={{
            name: 'Alex Carter',
            role: 'Cajero Principal',
          }}
        />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  )
}
