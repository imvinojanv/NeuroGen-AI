import { create } from "zustand";

interface usePremiumModelStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const usePremiumModel = create<usePremiumModelStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));