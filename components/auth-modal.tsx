'use client'
import { ReactElement, useEffect } from 'react'
import Modal from './modal'
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import useAuthModal from '@/hooks/useAuthModal'

const AuthModal = (): ReactElement => {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { isOpen, onClose } = useAuthModal()

  const onChange = (open: boolean): void => {
    if (!open) {
      onClose()
    }
  }

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [onClose, router, session])

  return (
    <Modal
      isOpen={isOpen}
      onChange={onChange}
      title='Welcome back'
      description='Login to your account'
    >
      <Auth
        theme='dark'
        providers={['github']}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  )
}

export default AuthModal
