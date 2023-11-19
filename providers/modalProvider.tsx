'use client'

import AuthModal from '@/components/auth-modal'
import React, { useEffect, useState } from 'react'

const ModalProvider = (): React.ReactElement | null => {
  const [isMounted, setIsMounted] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <AuthModal />
    </>
  )
}

export default ModalProvider
