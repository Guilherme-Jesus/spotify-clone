'use client'

import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { useRouter } from 'next/navigation'
import { FaUserAlt } from 'react-icons/fa'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'react-hot-toast'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import ButtonCustom from './button-custom'
import IfElse from '@/operators/if-else'
// import usePlayer from '@/hooks/usePlayer'

// import Button from './Button'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter()
  const authModal = useAuthModal()

  const supabaseClient = useSupabaseClient()
  const { user } = useUser()

  const handleLogout = async (): Promise<void> => {
    const { error } = await supabaseClient.auth.signOut()
    router.refresh()

    if (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={twMerge(
        `
        h-fit 
        bg-gradient-to-b 
        from-emerald-800 
        p-6
        `,
        className
      )}
    >
      <div className='mb-4 flex w-full items-center justify-between'>
        <div className='hidden items-center gap-x-2 md:flex'>
          <button
            onClick={(): void => router.back()}
            className='
              flex 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-black 
              transition 
              hover:opacity-75
            '
          >
            <RxCaretLeft className='text-white' size={35} />
          </button>
          <button
            onClick={(): void => router.forward()}
            className='
              flex 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-black 
              transition 
              hover:opacity-75
            '
          >
            <RxCaretRight className='text-white' size={35} />
          </button>
        </div>
        <div className='flex items-center gap-x-2 md:hidden'>
          <button
            onClick={(): void => router.push('/')}
            className='
              flex 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-2 
              transition 
              hover:opacity-75
            '
          >
            <HiHome className='text-black' size={20} />
          </button>
          <button
            onClick={(): void => router.push('/search')}
            className='
              flex 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-2 
              transition 
              hover:opacity-75
            '
          >
            <BiSearch className='text-black' size={20} />
          </button>
        </div>
        <div className='flex items-center justify-between gap-x-4'>
          <IfElse
            condition={user !== null}
            elseChildren={
              <>
                <div>
                  <ButtonCustom
                    onClick={authModal.onOpen}
                    className='
                    bg-transparent 
                    font-medium 
                    text-neutral-300
                  '
                  >
                    Sign up
                  </ButtonCustom>
                </div>
                <div>
                  <ButtonCustom
                    onClick={authModal.onOpen}
                    className='bg-white px-6 py-2'
                  >
                    Log in
                  </ButtonCustom>
                </div>
              </>
            }
          >
            <div className='flex items-center gap-x-4'>
              <ButtonCustom
                onClick={handleLogout}
                className='bg-white px-6 py-2'
              >
                Logout
              </ButtonCustom>
              <ButtonCustom
                onClick={(): void => router.push('/account')}
                className='bg-white'
              >
                <FaUserAlt />
              </ButtonCustom>
            </div>
          </IfElse>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
