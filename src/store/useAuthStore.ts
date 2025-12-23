import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthStore {
    user: User | null;
    isLoggedIn: boolean;
    login: (userData: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            login: (userData) => set({ user: userData, isLoggedIn: true }),
            logout: () => set({ user: null, isLoggedIn: false }),
        }),
        {
            name: 'bigpotli-auth-storage',
        }
    )
);
