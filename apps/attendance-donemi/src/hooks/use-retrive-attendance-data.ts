import { useState } from 'preact/hooks'
import { invoke } from '@tauri-apps/api/core'
import { type AttendanceRecordList } from '../types'

type HookOptions = {
  usersFilePath: string
  attendanceFilePath: string
  setError: (error: string) => void
}

export function useRetriveAttendanceData({
  attendanceFilePath,
  usersFilePath,
  setError,
}: HookOptions) {
  const [mergedData, setMergedData] = useState<AttendanceRecordList | null>(
    null,
  )

  async function handleRetriveAttendanceData() {
    if (!usersFilePath || !attendanceFilePath) {
      setError('Please select both files')
      return
    }

    try {
      const content = await invoke<string>('get_attendance_results', {
        usersPath: usersFilePath,
        attendancePath: attendanceFilePath,
      })
      const data: AttendanceRecordList = JSON.parse(content)
      setMergedData(data)
      setError('')
    } catch (error) {
      console.error('Error merging data:', error)
      setError('Error merging data: ' + error)
    }
  }

  return {
    attendanceData: mergedData,
    handleRetriveAttendanceData,
  }
}
