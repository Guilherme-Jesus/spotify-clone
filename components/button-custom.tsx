import React, { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonCustomProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ButtonCustom = forwardRef<HTMLButtonElement, ButtonCustomProps>(
  ({ children, className, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
        className={twMerge(
          `flex
            w-full
            rounded-full
            border
            border-transparent
            bg-green-500
            px-3
            py-3
            font-bold
            text-black
            transition
            hover:opacity-75
            disabled:cursor-not-allowed
            disabled:opacity-50
            `,
          className
        )}
      >
        {children}
      </button>
    )
  }
)

ButtonCustom.displayName = 'ButtonCustom'
export default ButtonCustom
