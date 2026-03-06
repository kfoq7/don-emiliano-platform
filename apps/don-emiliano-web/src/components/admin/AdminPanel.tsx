import { useState } from 'preact/hooks'
import AdminProducts from './AdminProducts'
import AdminHours from './AdminHours'

type Tab = 'products' | 'hours'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'products', label: 'Productos', icon: 'products' },
  { id: 'hours', label: 'Horarios', icon: 'hours' },
]

function TabIcon({ icon, className }: { icon: string; className?: string }) {
  if (icon === 'products') {
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    )
  }

  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  )
}

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('products')

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
                ${
                  isActive ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              <TabIcon icon={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'products' && <AdminProducts />}
      {activeTab === 'hours' && <AdminHours />}
    </div>
  )
}
