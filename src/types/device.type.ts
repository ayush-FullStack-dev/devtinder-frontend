export type baseDeviceInfo = {
  deviceId: string | null;
  deviceSize: number;
  setDeviceInfo: (localstorage: Storage) => void;
  updateDeviceInfo: (localstorage: Storage) => void;
};
