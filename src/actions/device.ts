"use server";

import { COOKIE_OPTIONS } from "@/constants/cookie";
import { cookies } from "next/headers";

const DEVICE_ID_KEY = "unique_device_id";
const DEVICE_SIZE_KEY = "device_size";

export async function setDeviceInfo(
  deviceId?: string,
  deviceSize?: number,
) {
  const cookieStore = await cookies();

  if (deviceId) {
    cookieStore.set(
      DEVICE_ID_KEY,
      deviceId,
      COOKIE_OPTIONS,
    );
  }

  if (
    deviceSize !== undefined &&
    Number.isFinite(deviceSize)
  ) {
    cookieStore.set(
      DEVICE_SIZE_KEY,
      String(deviceSize),
      COOKIE_OPTIONS,
    );
  }
}

export async function getDeviceInfo() {
  const cookieStore = await cookies();

  const deviceId =
    cookieStore.get(DEVICE_ID_KEY)?.value ?? null;

  const value =
    cookieStore.get(DEVICE_SIZE_KEY)?.value ?? null;

  const deviceSize = value ? Number(value) : null;

  return {
    deviceId,
    deviceSize:
      deviceSize !== null && Number.isFinite(deviceSize)
        ? deviceSize
        : null,
  };
}