import { useState } from 'preact/hooks'
import { open } from '@tauri-apps/plugin-dialog'

export function useUploadFiles() {
  const [usersFilePath, setUsersFilePath] = useState('')
  const [attendanceFilePath, setAttendanceFilePath] = useState('')
  const [error, setError] = useState('')

  async function handleUsersFileUpload() {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: 'JSON Files',
            extensions: ['*'],
          },
        ],
      })

      if (selected) {
        setUsersFilePath(selected)
        setError('')
      }
    } catch (error) {
      console.error('Error selecting users file:', error)
      setError('Error selecting users file')
    }
  }

  async function handleAttendanceFileUpload() {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: 'JSON Files',
            extensions: ['*'],
          },
        ],
      })

      if (selected) {
        setAttendanceFilePath(selected)
        setError('')
      }
    } catch (error) {
      console.error('Error selecting attendance file:', error)
      setError('Error selecting attendance file')
    }
  }

  return {
    usersFilePath,
    attendanceFilePath,
    error,
    setError,
    handleUsersFileUpload,
    handleAttendanceFileUpload,
  }
}
