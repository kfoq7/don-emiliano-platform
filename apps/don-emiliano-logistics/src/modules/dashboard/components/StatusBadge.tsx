interface StatusBadgeProps {
  status: 'available' | 'occupied' | 'billing' | 'active' | 'low-cash'
  children?: React.ReactNode
}

export const StatusBadge = ({ status, children }: StatusBadgeProps) => {
  const styles = {
    available: 'bg-[#0a5f5f] text-white',
    occupied: 'bg-[#0a4f6f] text-white',
    billing: 'bg-[#ffd73f] text-[#1a1a1a]',
    active: 'bg-[#0a5f5f] text-white',
    'low-cash': 'bg-[#ffd73f] text-[#1a1a1a]',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {children || status.replace('-', ' ')}
    </span>
  )
}
