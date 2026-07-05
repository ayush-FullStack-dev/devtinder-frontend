"use client";

import { useEffect } from "react";
import { useDeviceStore } from "@/store/useDevice.store";

export default function DeviceInitializer() {
  const setDeviceInfo = useDeviceStore((state) => state.setDeviceInfo);

  useEffect(() => {
    setDeviceInfo(localStorage);
  }, [setDeviceInfo]);

  return null;
}
