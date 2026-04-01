import { useTableSelection } from '../hooks/useTableSelection'
import { TableGridCard } from '../components/TableGridCard'
import { ZoneTabs } from '../components/ZoneTabs'

export default function TableSelection() {
  const { table, setTable, error, isSubmitting, handleSubmit, navigate } =
    useTableSelection()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <ZoneTabs />
      <TableGridCard
        table={table}
        setTable={setTable}
        error={error}
        isSubmitting={isSubmitting}
        handleSubmit={handleSubmit}
        onCancel={() => navigate('/active-tables')}
      />
    </div>
  )
}
