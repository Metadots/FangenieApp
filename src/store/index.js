import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userStore = create(
    persist(
        (set, get) => ({
            loggedInUser: null,
            loading: true,
            setAuth: payload =>
                set(state => ({ loggedInUser: payload, token: payload.token })),
            purgeAuth: () => set(() => ({ loggedInUser: null, token: null })),
            setLoading: (loadingState) => set(() => ({ loading: loadingState })), // To update the loading state
        }),
        {
            name: 'Spectrum',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: state => ({
                loggedInUser: state.loggedInUser,
            }),
            onRehydrateStorage: () => (state) => {
                // When storage is rehydrated, set loading to false
                if (state) {
                    state.setLoading(false); // Set loading to false after data is retrieved
                }
            },

        },
    ),
);