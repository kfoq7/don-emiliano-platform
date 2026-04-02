import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router'

import { authRouter } from '@modules/auth'
import { productRouter } from '@modules/product'
import { dashboardRouter } from '@modules/dashboard'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/login" replace />} />

        {authRouter()}
        {productRouter()}
        {dashboardRouter()}
      </Routes>
    </Router>
  )
}
