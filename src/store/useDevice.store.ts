import { create } from "zustand";
import { persist } from "zustand/middleware";
import { baseDeviceInfo } from "@/types/device.type";
import {
  getDeviceId,
  getDeviceSize,
} from "@/lib/getDeviceInfo";

export const useDeviceStore = create<
  baseDeviceInfo & {
    setHasHydrated: () => void;
    _hasHydrated: boolean;
    setDeviceInfo: (storage: Storage) => Promise<void>;
    updateDeviceInfo: (storage: Storage) => Promise<void>;
  }
>()(
  persist(
    (set, get) => ({
      deviceId: null,
      deviceSize: 0,
      _hasHydrated: false,

      setHasHydrated: () => {
        set({ _hasHydrated: true });
      },

      setDeviceInfo: async (storage: Storage) => {
        const deviceInfo = get();

        if (deviceInfo.deviceId && deviceInfo.deviceSize) {
          return;
        }

        const [deviceId, deviceSize] = await Promise.all([
          getDeviceId(storage),
          getDeviceSize(storage),
        ]);

        set({
          deviceId,
          deviceSize,
        });
      },

      updateDeviceInfo: async (storage: Storage) => {
        const deviceInfo = get();

        if (!deviceInfo.deviceSize) {
          return;
        }

        const deviceSize = await getDeviceSize(storage);

        set({
          deviceSize,
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