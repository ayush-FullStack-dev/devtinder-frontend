"use client";

import { useEffect } from "react";
import { useDeviceStore } from "@/store/useDevice.store";

export default function DeviceInitializer() {
  const setDeviceInfo = useDeviceStore((state) => state.setDeviceInfo);

  useEffect(() => {
    setDeviceInfo(localStorage);

    const deviceId = localStorage.getItem("deviceId");
    const deviceSize = localStorage.getItem("deviceSize");

    if (deviceId) {
      document.cookie = `deviceId=${encodeURIComponent(deviceId)}; Path=/; Secure; SameSite=Lax`;
    }

    if (deviceSize) {
      document.cookie = `deviceSize=${encodeURIComponent(deviceSize)}; Path=/; Secure; SameSite=Lax`;
    }
  }, [setDeviceInfo]);

  return null;
}