'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import ButtonCustom from './button-custom'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

function Header({ children, className }: HeaderProps): React.ReactElement {
  const router = useRouter()

  const handleLogout = () => {}
  return (
    <div
      className={twMerge(
        `h-fit
        bg-gradient-to-b
      from-emerald-800
        p-6`,
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
            hover:opacity-75'
          >
            <RxCaretLeft size={35} className='text-white' />
          </button>
          <button
            onClick={(): void => router.forward()}
            className='flex cursor-pointer items-center justify-center rounded-full bg-black transition hover:opacity-75'
          >
            <RxCaretRight size={35} className='text-white' />
          </button>
        </div>
        <div className='flex items-center gap-x-2 md:hidden'>
          <button
            className='
             hover-opacity-75
             items-center
             justify-center
             rounded-full
             bg-white
             p-2
             transition
            '
          >
            <HiHome
              size={20}
              className='text-black'
              onClick={(): void => router.push('/')}
            />
          </button>
          <button
            className='
             hover-opacity-75
             items-center
             justify-center
             rounded-full
             bg-white
             p-2
             transition
            '
          >
            <BiSearch
              size={20}
              className='text-black'
              onClick={(): void => router.push('/search')}
            />
          </button>
        </div>
        <div
          className='
            flex
            items-center
            justify-between
            gap-x-4
            '
        >
          <>
            <div>
              <ButtonCustom
                onClick={() => {}}
                className='
                bg-transparent
                font-medium
                text-neutral-300
               '
              >
                Sign Up
              </ButtonCustom>
            </div>
            <div>
              <ButtonCustom
                onClick={() => {}}
                className='
                bg-white
                px-6
                py-2
               '
              >
                Log In
              </ButtonCustom>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
