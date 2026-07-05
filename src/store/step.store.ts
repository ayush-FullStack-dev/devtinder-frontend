import { create } from "zustand";

type stepStore = {
  step: number;
  setStep: (step: number) => void;
};

export const useStepStore = create<stepStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
}));
