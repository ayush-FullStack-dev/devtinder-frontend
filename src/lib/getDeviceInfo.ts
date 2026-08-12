import {
  getDeviceInfo as getCookieInfo,
  setDeviceInfo,
} from "@/actions/device";

const DEVICE_ID_KEY = "unique_device_id";
const DEVICE_SIZE_KEY = "device_size";

export const getDeviceId = async (storage?: Storage): Promise<string> => {
  const cookieInfo = await getCookieInfo();

  let deviceId = cookieInfo.deviceId ?? storage?.getItem(DEVICE_ID_KEY) ?? null;

  if (!deviceId) {
    deviceId = crypto.randomUUID().replace(/-/g, "");
  }

  storage?.setItem(DEVICE_ID_KEY, deviceId);

  if (cookieInfo.deviceId !== deviceId) {
    await setDeviceInfo(deviceId, cookieInfo.deviceSize ?? undefined);
  }

  return deviceId;
};

export const getDeviceSize = async (
  storage?: Storage,
): Promise<number> => {
  const deviceSize =
    window.innerWidth + window.innerHeight;

  storage?.setItem(
    DEVICE_SIZE_KEY,
    String(deviceSize),
  );

  const cookieInfo = await getCookieInfo();

  if (cookieInfo.deviceSize !== deviceSize) {
    await setDeviceInfo(
      cookieInfo.deviceId ?? undefined,
      deviceSize,
    );
  }

  return deviceSize;
};