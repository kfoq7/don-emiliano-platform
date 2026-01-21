export interface AttendanceRecord {
  user_id: string
  user_name: string
  timestamp: string
}

export interface AttendanceRecordList {
  records: AttendanceRecord[]
}
