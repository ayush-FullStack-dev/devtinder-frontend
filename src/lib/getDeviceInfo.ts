const DEVICE_ID_KEY = "unique_device_id";
const DEVICE_SIZE_KEY = "device_size";

const setCookie = (name: string, value: string) => {
  document.cookie =
    `${name}=${encodeURIComponent(value)}; ` +
    `Path=/; ` +
    `Max-Age=31536000; ` +
    `Secure; ` +
    `SameSite=Lax`;
};

export const getDeviceId = (storage: Storage): string => {
  let deviceId = storage.getItem(DEVICE_ID_KEY);

  if (!deviceId) {
    deviceId = crypto.randomUUID().replace(/-/g, "");

    storage.setItem(DEVICE_ID_KEY, deviceId);
  }

  setCookie(DEVICE_ID_KEY, deviceId);

  return deviceId;
};

export const getDeviceSize = (
  storage: Storage,
  newData = false,
): number => {
  let deviceSize = Number(storage.getItem(DEVICE_SIZE_KEY));

  if (!deviceSize || newData) {
    deviceSize = window.innerWidth + window.innerHeight;

    storage.setItem(DEVICE_SIZE_KEY, String(deviceSize));
  }
  
  setCookie(DEVICE_SIZE_KEY, String(deviceSize));

  return deviceSize;
};