import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userStore = create(
    persist(
        (set, get) => ({
            loggedInUser: null,
            token: null,
            setToken: payload => set(() => ({ token: payload })),
            setAuth: payload =>
                set(state => ({ loggedInUser: payload, token: payload.token })),
            purgeAuth: () => set(() => ({ loggedInUser: null, token: null })),
        }),
        {
            name: 'Spectrum',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: state => ({
                token: state.token,
                loggedInUser: state.loggedInUser,
            }),
        },
    ),
);