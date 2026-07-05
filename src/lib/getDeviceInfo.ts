export const getDeviceId = (storage: Storage): string => {
  const localStorage = storage;
  const deviceIdStorageName = "unquie_device_id";
  let deviceId: string | null = null;
  deviceId = localStorage.getItem(deviceIdStorageName);
  if (!deviceId) {
    deviceId = crypto.randomUUID().replace(/-/g, "");
    localStorage.setItem(deviceIdStorageName, deviceId);
  }

  return deviceId;
};

export const getDeviceSize = (storage: Storage, newData?: boolean): number => {
  const localStorage = storage;
  const deviceSizeStorageName = "device_size";
  let deviceSize: number | null = null;

  deviceSize = Number(localStorage.getItem(deviceSizeStorageName));
  if (!deviceSize || newData) {
    deviceSize = window.innerWidth * 10000 + window.innerHeight;
    localStorage.setItem(deviceSizeStorageName, `${deviceSize}`);
  }

  return deviceSize;
};
