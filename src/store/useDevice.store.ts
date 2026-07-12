import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseDeviceInfo } from "@/types/device.type";
import { getDeviceId, getDeviceSize } from "@/lib/getDeviceInfo";

export const useDeviceStore = create<
  baseDeviceInfo & {
    setHasHydrated: () => void;
    _hasHydrated: boolean;
  }
>()(
  persist(
    (set, get) => ({
      deviceId: null,
      deviceSize: 0,
      _hasHydrated: false,
      setHasHydrated: () => set({ _hasHydrated: true }),
      setDeviceInfo: (localstorage: Storage): void => {
        const deviceInfo = get();

        if (deviceInfo.deviceId && deviceInfo.deviceSize) {
          return;
        }

        set({
          deviceId: getDeviceId(localstorage),
          deviceSize: getDeviceSize(localstorage),
        });
      },

      updateDeviceInfo: (localstorage: Storage) => {
        const deviceInfo = get();

        if (!deviceInfo.deviceSize) {
          return;
        }

        set({
          deviceSize: getDeviceSize(localstorage),
        });
      },
    }),
    {
      name: "device-base-info",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated();
      },
    },
  ),
);
