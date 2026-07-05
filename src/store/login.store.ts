import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginIdentifySuccessResponse } from "@/types/auth/login/loginIdenfity.type";

export interface UseLoginStoreType {
  step: number;
  setStep: (step: number) => void;
  loginIdentifyInfo: loginIdentifySuccessResponse | null;
  setLoginIdentifyInfo: (data: loginIdentifySuccessResponse | null) => void;
  setHasHydrated: () => void;
  _hasHydrated: boolean;
}

export const useLoginStore = create<UseLoginStoreType>()(
  persist(
    (set) => ({
      step: 1,
      loginIdentifyInfo: null,
      setStep: (step) => set({ step }),
      setLoginIdentifyInfo: (data) => set({ loginIdentifyInfo: data }),
      _hasHydrated: false,
      setHasHydrated: () => set({ _hasHydrated: true }),
    }),
    {
      name: "login-store",
       storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    },
  ),
);
