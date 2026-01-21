import { useState } from 'preact/hooks'
import { useRetriveAttendanceData } from './hooks/use-retrive-attendance-data'
import { useUploadFiles } from './hooks/use-upload-files'
import { useExportAttendance } from './hooks/use-export-attendance'

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

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('es-ES')
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

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

  return (
    <main className="min-h-screen px-4 py-2">
      <h1 className="text-4xl font-bold tracking-tighter">
        Don Emilano Chicharroneria - Datos de asistencía
      </h1>

      <div className="mt-10 py-2">
        <h2 className="text-2xl font-semibold mb-4">
          Subir datos de asistencía
        </h2>

        <div className="flex gap-3">
          <button
            onClick={handleUsersFileUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Seleccionar Archivo de Usuarios
          </button>
          <button
            onClick={handleAttendanceFileUpload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Seleccionar Archivo de Asistencia
          </button>
        </div>

        {usersFilePath && (
          <p className="mt-4 text-gray-700">
            Archivo de usuarios:{' '}
            <span className="font-medium">{usersFilePath}</span>
          </p>
        )}
        {attendanceFilePath && (
          <p className="text-gray-700">
            Archivo de asistencia:{' '}
            <span className="font-medium">{attendanceFilePath}</span>
          </p>
        )}

        {usersFilePath && attendanceFilePath && (
          <div className="mt-5">
            <button
              onClick={handleRetriveAttendanceData}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors font-medium"
            >
              Combinar y Previsualizar Datos
            </button>
          </div>
        )}

        {error && <p className="text-red-600 mt-4 font-medium">{error}</p>}

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => handleExportToCSV(filteredRecords || [])}
            disabled={
              isExporting || !filteredRecords || filteredRecords.length === 0
            }
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isExporting ? 'Exportando...' : 'Exportar a Excel (CSV)'}
          </button>
        </div>

        {attendanceData && attendanceData.records.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">
              Previsualización de Datos ({filteredRecords?.length || 0} de{' '}
              {attendanceData.records.length} registros)
            </h3>

            {/* Filters Section */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-700">Filtros</h4>
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Limpiar Filtros
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID de Usuario
                  </label>
                  <input
                    type="text"
                    value={filters.userId}
                    onChange={e =>
                      handleFilterChange('userId', e.currentTarget.value)
                    }
                    placeholder="Buscar por ID..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    value={filters.userName}
                    onChange={e =>
                      handleFilterChange('userName', e.currentTarget.value)
                    }
                    placeholder="Buscar por nombre..."
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha Inicio
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={e =>
                      handleFilterChange('startDate', e.currentTarget.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha Fin
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={e =>
                      handleFilterChange('endDate', e.currentTarget.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora Inicio
                  </label>
                  <input
                    type="time"
                    value={filters.startTime}
                    onChange={e =>
                      handleFilterChange('startTime', e.currentTarget.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hora Fin
                  </label>
                  <input
                    type="time"
                    value={filters.endTime}
                    onChange={e =>
                      handleFilterChange('endTime', e.currentTarget.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 text-left border-b border-gray-200 font-semibold text-gray-700">
                      ID de Usuario
                    </th>
                    <th className="px-4 py-3 text-left border-b border-gray-200 font-semibold text-gray-700">
                      Nombre
                    </th>
                    <th className="px-4 py-3 text-left border-b border-gray-200 font-semibold text-gray-700">
                      Fecha
                    </th>
                    <th className="px-4 py-3 text-left border-b border-gray-200 font-semibold text-gray-700">
                      Hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords && filteredRecords.length > 0 ? (
                    filteredRecords.map((record, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                      >
                        <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
                          {record.user_id}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
                          {record.user_name}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
                          {formatDate(record.timestamp)}
                        </td>
                        <td className="px-4 py-3 border-b border-gray-200 text-gray-800">
                          {formatTime(record.timestamp)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-gray-500"
                      >
                        No se encontraron registros con los filtros aplicados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium">
                Subir a Base de Datos
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default App
