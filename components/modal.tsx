import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { IoMdClose } from 'react-icons/io'

interface ModalProps {
  isOpen: boolean
  onChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
}

const Modal = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}: ModalProps): React.ReactElement => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-neutral-900/90 backdrop-blur-sm' />
        <Dialog.DialogContent
          className='
         fixed
         left-1/2
         top-1/2
         h-full
         max-h-full
         w-full
         -translate-x-2/4
         -translate-y-2/4
         rounded-md
         border
         border-neutral-700
         bg-neutral-800
         p-6
         drop-shadow-md
         focus:outline-none
         md:h-auto
         md:max-h-[85vh]
         md:w-[90vw]
         md:max-w-md
        '
        >
          <Dialog.DialogTitle
            className='
            mb-4
            text-center
            text-xl
            font-bold
           '
          >
            {title}
          </Dialog.DialogTitle>
          <Dialog.DialogDescription
            className='
            mb-5
            text-center
            text-sm
            leading-normal
            '
          >
            {description}
          </Dialog.DialogDescription>
          <div>{children}</div>
          <Dialog.DialogClose asChild>
            <button
              className='
              absolute 
              right-2.5 
              top-2.5
              inline-flex
              h-6
              w-6
              appearance-none
              items-center
              justify-center
              rounded-full
            text-neutral-400
            hover:text-white
              focus:outline-none
             '
              type='button'
            >
              <IoMdClose />
            </button>
          </Dialog.DialogClose>
        </Dialog.DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
