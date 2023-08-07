import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CounterStore {
  counter: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

const useCounterStore = create(
  persist<CounterStore>(
    (set) => ({
      counter: 0,
      increase: () => set((state) => ({ counter: state.counter + 1 })),
      decrease: () => set((state) => ({ counter: state.counter - 1 })),
      reset: () => set(() => ({ counter: 0 }))
    }),
    { name: 'counter-storage', storage: createJSONStorage(() => localStorage) }
  )
);

export default useCounterStore;
