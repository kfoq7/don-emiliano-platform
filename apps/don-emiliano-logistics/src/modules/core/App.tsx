import { AppProivder } from './providers'
import { AppRouter } from './router'

export default function App() {
  return (
    <AppProivder>
      <AppRouter />
    </AppProivder>
  )
}
