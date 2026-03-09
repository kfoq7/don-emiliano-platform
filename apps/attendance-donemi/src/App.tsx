import { useState } from 'preact/hooks'
import { useRetriveAttendanceData } from './hooks/use-retrive-attendance-data'
import { useUploadFiles } from './hooks/use-upload-files'
import { useExportAttendance } from './hooks/use-export-attendance'
import { FileSelectionItem } from './components/FileSelectionItem'
import { FilterSection } from './components/FilterSection'
import { AttendanceTable } from './components/attendance-table'
import { ActionBar } from './components/action-bar'

function App() {
  const {
    attendanceFilePath,
    usersFilePath,
    error,
    setError,
    handleAttendanceFileUpload,
    handleUsersFileUpload,
  } = useUploadFiles()
  const { attendanceData, handleRetriveAttendanceData } =
    useRetriveAttendanceData({
      usersFilePath,
      attendanceFilePath,
      setError,
    })
  const { isExporting, handleExportToCSV } = useExportAttendance({ setError })

  const [filters, setFilters] = useState({
    userId: '',
    userName: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
  })

  const getDateValue = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toISOString().split('T')[0]
  }

  const getTimeValue = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toTimeString().split(' ')[0].substring(0, 5)
  }

  const filteredRecords = attendanceData?.records.filter(record => {
    const matchUserId =
      !filters.userId ||
      record.user_id.toLowerCase().includes(filters.userId.toLowerCase())
    const matchUserName =
      !filters.userName ||
      record.user_name.toLowerCase().includes(filters.userName.toLowerCase())

    const recordDate = getDateValue(record.timestamp)
    const matchStartDate = !filters.startDate || recordDate >= filters.startDate
    const matchEndDate = !filters.endDate || recordDate <= filters.endDate

    const recordTime = getTimeValue(record.timestamp)
    const matchStartTime = !filters.startTime || recordTime >= filters.startTime
    const matchEndTime = !filters.endTime || recordTime <= filters.endTime

    return (
      matchUserId &&
      matchUserName &&
      matchStartDate &&
      matchEndDate &&
      matchStartTime &&
      matchEndTime
    )
  })

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }))
  }

  const clearFilters = () => {
    setFilters({
      userId: '',
      userName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== '')
  const bothFilesSelected = Boolean(usersFilePath && attendanceFilePath)
  const hasData = Boolean(attendanceData) && attendanceData!.records.length > 0

  return (
    <main className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Don Emiliano Chicharroneria
          </h1>
          <p className="mt-0.5 text-sm text-gray-500">
            Sistema de control de asistencia
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-6 py-6">
        {/* Step 1: File Selection */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              1
            </span>
            <h2 className="text-sm font-semibold text-gray-700">
              Seleccionar archivos de datos
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FileSelectionItem
              label="Archivo de Usuarios"
              description="Archivo .dat del dispositivo biometrico con datos de usuarios"
              filePath={usersFilePath}
              onSelect={handleUsersFileUpload}
              icon="users"
            />
            <FileSelectionItem
              label="Archivo de Asistencia"
              description="Archivo .dat del dispositivo biometrico con registros de asistencia"
              filePath={attendanceFilePath}
              onSelect={handleAttendanceFileUpload}
              icon="attendance"
            />
          </div>
        </section>

        {/* Step 2: Process Data */}
        {bothFilesSelected && (
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                2
              </span>
              <h2 className="text-sm font-semibold text-gray-700">
                Procesar datos
              </h2>
            </div>

            <button
              onClick={handleRetriveAttendanceData}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800"
            >
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </svg>
              Combinar y Previsualizar Datos
            </button>
          </section>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <svg
              className="size-5 shrink-0 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Step 3: Data Preview */}
        {hasData && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  3
                </span>
                <h2 className="text-sm font-semibold text-gray-700">
                  Revisar y exportar
                </h2>
              </div>

              <ActionBar
                onExport={() => handleExportToCSV(filteredRecords || [])}
                onUpload={() => {}}
                isExporting={isExporting}
                hasRecords={
                  Boolean(filteredRecords) && filteredRecords!.length > 0
                }
              />
            </div>

            <FilterSection
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <AttendanceTable
              records={filteredRecords || []}
              totalCount={attendanceData!.records.length}
            />
          </section>
        )}
      </div>
    </main>
  )
}

export default App
