import React from 'react'
import { twMerge } from 'tailwind-merge'

interface BoxProps {
  className?: string
  children: React.ReactNode
}

function Box({ children, className }: BoxProps): React.ReactElement {
  return (
    <div
      className={twMerge(`h-fit w-full rounded-lg bg-neutral-900`, className)}
    >
      {children}
    </div>
  )
}

export default Box
