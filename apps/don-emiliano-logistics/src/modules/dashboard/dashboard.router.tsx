import { Route } from 'react-router'
import { ActiveTablesPage } from './pages/ActiveTablesPage'
import { CashierLoginPage } from './pages/CashierLoginPage'
import { AdminCashierMonitorPage } from './pages/AdminCashierMonitorPage'
import { FinancialSummaryPage } from './pages/FinancialSummaryPage'
import { InventoryAuditLogsPage } from './pages/InventoryAuditLogsPage'
import { SettingsPage } from './pages/SettingsPage'

export const dashboardRouter = () => {
  return (
    <>
      <Route path="login" element={<CashierLoginPage />} />
      <Route path="dashboard">
        <Route index element={<ActiveTablesPage />} />
        <Route path="tables" element={<ActiveTablesPage />} />
        <Route path="admin" element={<AdminCashierMonitorPage />} />
        <Route path="financial" element={<FinancialSummaryPage />} />
        <Route path="inventory" element={<InventoryAuditLogsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </>
  )
}
