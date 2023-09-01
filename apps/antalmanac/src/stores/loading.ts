import { create } from 'zustand';

interface LoadingStore {
    /**
     * Whether the schedule has been attempted to be loaded yet (i.e. when the application is first opened).
     */
    loadedSchedule: boolean;

    setLoadedSchedule: (loaded: boolean) => unknown;
}

/**
 * Just a global store to keep track of loading states.
 */
export const useLoadingStore = create<LoadingStore>((set) => ({
    loadedSchedule: false,
    setLoadedSchedule: (loadedSchedule: boolean) =>
        set((state) => {
            state.loadedSchedule = loadedSchedule;
            return state;
        }),
}));
