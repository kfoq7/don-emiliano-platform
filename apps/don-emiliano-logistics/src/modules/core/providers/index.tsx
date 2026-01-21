import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export interface Props {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export const AppProivder: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
