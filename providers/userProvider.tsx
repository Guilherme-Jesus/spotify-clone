'use client'

import { MyUserContextProvider } from '@/hooks/useUser'

interface UserProviderProps {
  children: React.ReactNode
}

const UserProvider = ({ children }: UserProviderProps): React.ReactElement => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>
}
export default UserProvider
