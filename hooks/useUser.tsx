/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Subscription, UserDetails } from '@/types'
import { User } from '@supabase/auth-helpers-nextjs'
import {
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react'

import React, { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
  [propName: string]: unknown
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isSessionLoading,
    supabaseClient: supabase,
  } = useSessionContext()

  const user = useSupaUser()

  const accessToken = session?.access_token ?? null
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false)
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getUserDetails = () => supabase.from('users').select('*').single()
  const getSubscription = () =>
    supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true)
      Promise.allSettled([getUserDetails(), getSubscription()])
        .then(([userDetails, subscription]) => {
          if (userDetails.status === 'fulfilled') {
            setUserDetails(userDetails.value.data)
          }
          if (subscription.status === 'fulfilled') {
            setSubscription(subscription.value.data)
          }
        })
        .finally(() => setIsLoadingData(false))
    } else if (!user && !isSessionLoading && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  }, [user, isSessionLoading])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingData || isSessionLoading,
    subscription,
  }

  return <UserContext.Provider value={value} {...props} />
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a MyUserContextProvider')
  }
  return context
}
