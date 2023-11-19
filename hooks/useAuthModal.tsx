import { create } from 'zustand'

interface AuthModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: (): void => set({ isOpen: true }),
  onClose: (): void => set({ isOpen: false }),
}))

export default useAuthModal
