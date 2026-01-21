import { Route } from 'react-router'

import { LoginPage } from './pages/Login'

export const authRouter = () => {
  return (
    <>
      <Route path="auth">
        <Route path="login" element={<LoginPage />} />
      </Route>
    </>
  )
}
