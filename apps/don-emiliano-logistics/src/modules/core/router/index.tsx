import { BrowserRouter as Router, Routes, Route } from 'react-router'

import { authRouter } from '@modules/auth'
import { productRouter } from '@modules/product'

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<div>Home Hello :D</div>} />

        {authRouter()}
        {productRouter()}
      </Routes>
    </Router>
  )
}
