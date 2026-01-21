import { invoke } from '@tauri-apps/api/core'
import { useState } from 'preact/hooks'

interface UseExportAttendanceProps {
  setError: (error: string) => void
}

export function useExportAttendance({ setError }: UseExportAttendanceProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportToCSV = async (data: any[]) => {
    setIsExporting(true)
    setError('')

    try {
      const result = await invoke<string>('export_attendance', {
        data: JSON.stringify(data),
      })
      console.log(result)
    } catch (err) {
      setError(err as string)
    } finally {
      setIsExporting(false)
    }
  }

  return { isExporting, handleExportToCSV }
}
